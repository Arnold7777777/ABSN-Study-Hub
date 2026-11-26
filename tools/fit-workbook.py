#!/usr/bin/env python3
"""Fit the NUR Lecture Library workbook's columns and rows to their text.

    python3 tools/fit-workbook.py IN.xlsx OUT.xlsx [--report]

Caroline, 25 Nov: "make the rows fit the content better"; 26 Nov: "make the text fit better across all
rows and columns". Run it last, after every other change to the workbook.

What it does, on every tab:
  * Columns: measures each cell's text in Arial's real character widths (Liberation Sans is
    metric-identical), then picks a width that holds most cells on one line, never narrower than the
    header's longest word or a nav button's label above it, never wider than 60. A column of long
    sentences (Notes, Topic, File) stops at its cap and wraps.
  * Long-text columns are left-aligned (centred paragraphs are hard to read); short ones stay centred.
  * Rows: every row with text gets the height its tallest wrapped cell needs - word-wrapped the way
    Sheets does it at that column's pixel width - so nothing is cut off and nothing has dead space.
  * START HERE keeps its hand-set column widths (merged layout); its rows are still fitted.

Sheets ignores the xlsx "auto" height on import, so heights must be written explicitly.
"""
import math
import re
import sys
import copy

import openpyxl
from openpyxl.utils import get_column_letter as L

try:
    from PIL import ImageFont
except ImportError:  # python3 -m pip install Pillow
    sys.exit('Pillow is needed: python3 -m pip install Pillow')

FONT_FILES = {
    False: '/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf',
    True: '/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf',
}
_fonts = {}


def font(sz, bold):
    k = (round(sz * 4 / 3), bool(bold))
    if k not in _fonts:
        _fonts[k] = ImageFont.truetype(FONT_FILES[k[1]], k[0])
    return _fonts[k]


def is_wide(ch):
    o = ord(ch)
    return o >= 0x1F000 or 0x2600 <= o <= 0x27BF or 0x2B00 <= o <= 0x2BFF


def px(text, sz=12, bold=False):
    """Rendered width in pixels at Sheets' 96 dpi."""
    f = font(sz, bold)
    em = round(sz * 4 / 3)
    plain = ''.join(c for c in text if not is_wide(c) and c not in '️‍')
    return f.getlength(plain) + sum(1.25 * em for c in text if is_wide(c))


LABEL = re.compile(r',\s*"((?:[^"]|"")*)"\s*\)\s*$')


def text_of(v):
    if v is None:
        return ''
    s = str(v)
    if s.startswith('=HYPERLINK'):
        m = LABEL.search(s)
        return m.group(1).replace('""', '"') if m else 'link'
    if s.startswith('='):
        return ''
    return s


def col_px(w):
    return w * 7 + 5           # Excel/Sheets: characters -> pixels


def px_to_w(p):
    return (p - 5) / 7


PAD = 8                        # cell padding Sheets keeps on the left and right together


def wrap_lines(text, width_px, sz, bold):
    """Count lines the way Sheets word-wraps: break at spaces, split a word only if it alone is too wide."""
    n = 0
    avail = max(20, width_px - PAD)
    space = px(' ', sz, bold)
    for para in text.split('\n'):
        words = para.split(' ')
        line = 0.0
        lines = 1
        for w in words:
            ww = px(w, sz, bold)
            if ww > avail:                       # one long word (a file name): it breaks by characters
                if line:
                    lines += 1
                lines += int(ww // avail)
                line = ww % avail
                continue
            need = ww if line == 0 else line + space + ww
            if need <= avail:
                line = need
            else:
                lines += 1
                line = ww
        n += lines
    return n


HEADER_WORDS = {'Exam', 'Module', 'Course', 'Class', 'Episode', 'Notes', 'File', 'Topic', 'Lecturer', 'Recording'}


def header_row(ws):
    for r in range(1, 9):
        vals = [str(c.value).strip() for c in ws[r] if c.value is not None]
        if len(vals) >= 3 and HEADER_WORDS & set(vals):
            return r
    return None


def last_row(ws):
    for r in range(ws.max_row, 0, -1):
        if any(c.value is not None for c in ws[r]):
            return r
    return 0


def merged_maps(ws):
    top, inner = {}, set()
    for m in ws.merged_cells.ranges:
        top[(m.min_row, m.min_col)] = (m.min_col, m.max_col, m.max_row - m.min_row + 1)
        for r in range(m.min_row, m.max_row + 1):
            for c in range(m.min_col, m.max_col + 1):
                if (r, c) != (m.min_row, m.min_col):
                    inner.add((r, c))
    return top, inner


def cell_font(cell):
    f = cell.font
    return (f.sz or 10) if f else 10, bool(f and f.b)


MAX_W, MIN_W = 60, 8
LINK_W = 34                    # link columns (PowerPoint, Transcript) wrap rather than widen the tab


def fit_columns(ws, hr, last, report):
    top, inner = merged_maps(ws)
    merged_cols = {(r, c) for (r, c) in top}
    widths = {}
    for c in range(1, ws.max_column + 1):
        cells = []
        for r in range(hr + 1, last + 1):
            if (r, c) in inner or (r, c) in merged_cols:
                continue
            cell = ws.cell(r, c)
            t = text_of(cell.value)
            if t:
                sz, b = cell_font(cell)
                cells.append((cell, t, sz, b))
        head = ws.cell(hr, c)
        ht = text_of(head.value).strip()
        if not cells and not ht:
            continue
        hsz, hb = cell_font(head)
        # floor: the header's longest word, and any nav-button label in the rows above the header
        floor = max([px(w, hsz, hb) for w in ht.split()] or [0]) + PAD + 4
        for r in range(1, hr):
            if (r, c) in inner or (r, c) in top:
                continue
            cl = ws.cell(r, c)
            t = text_of(cl.value)
            if t and len(t) <= 24:             # a button label, not a sentence of instructions
                sz, b = cell_font(cl)
                floor = max(floor, max(px(s, sz, b) for s in t.split('\n')) + PAD + 4)
        if not cells:                          # header only: keep the width it had
            target = max(floor, col_px(ws.column_dimensions[L(c)].width or 13))
        else:
            full = sorted(max(px(s, sz, b) for s in t.split('\n')) + PAD + 4 for _, t, sz, b in cells)
            target = full[min(len(full) - 1, int(len(full) * 0.85))]
        cap = 30 if ht in ('Module', 'Exam', 'Week / Module') else LINK_W if 'PowerPoint' in ht or ht in ('Original location', 'Transcript', 'Open', 'Link', 'Listen', 'Watch') else MAX_W
        w = max(MIN_W, min(cap, px_to_w(max(target, floor))))
        w = round(w * 2) / 2
        old = ws.column_dimensions[L(c)].width
        ws.column_dimensions[L(c)].width = w
        widths[c] = w
        long_text = cells and sorted(px(t, sz, b) for _, t, sz, b in cells)[len(cells) // 2] > 230
        for cell, t, sz, b in cells:
            al = copy.copy(cell.alignment)
            al.wrap_text = True
            if long_text and not str(cell.value).startswith('=HYPERLINK'):
                al.horizontal = 'left'
            cell.alignment = al
        if report:
            print('   %s %-24s %5s -> %5s%s' % (L(c), ht[:24], old, w, '  (left)' if long_text else ''))
    return widths


def fit_rows(ws, first, last):
    top, inner = merged_maps(ws)
    dw = ws.sheet_format.defaultColWidth or 13
    width = {c: (ws.column_dimensions[L(c)].width or dw) for c in range(1, ws.max_column + 1)}
    changed = 0
    for r in range(first, last + 1):
        best, anyv = 0, False
        for c in range(1, ws.max_column + 1):
            if (r, c) in inner:
                continue
            cell = ws.cell(r, c)
            t = text_of(cell.value)
            if not t:
                continue
            anyv = True
            sz, b = cell_font(cell)
            if (r, c) in top:
                c0, c1, nrows = top[(r, c)]
                wpx = sum(col_px(width.get(k, dw)) for k in range(c0, c1 + 1))
            else:
                wpx, nrows = col_px(width.get(c, dw)), 1
            wrap = cell.alignment.wrap_text if cell.alignment else False
            lines = wrap_lines(t, wpx, sz, b) if wrap else t.count('\n') + 1
            h_px = lines * sz * 4 / 3 * 1.22 + 8
            best = max(best, h_px * 0.75 / nrows)
        if not anyv:
            continue
        h = round(min(409, max(21, best)), 1)
        rd = ws.row_dimensions[r]
        if rd.height != h:
            rd.height = h
            changed += 1
    return changed


def main():
    a = [x for x in sys.argv[1:] if not x.startswith('--')]
    report = '--report' in sys.argv
    if len(a) != 2:
        sys.exit(__doc__)
    wb = openpyxl.load_workbook(a[0])
    for ws in wb.worksheets:
        last = last_row(ws)
        hr = header_row(ws)
        if report:
            print('==', ws.title, 'header row', hr, 'last row', last)
        if hr and ws.title != 'START HERE':
            fit_columns(ws, hr, last, report)
        n = fit_rows(ws, (hr + 1) if hr else 5, last)
        if hr:
            fit_rows(ws, hr, hr)
        if report:
            print('   rows refitted:', n)
    wb.save(a[1])
    print('saved', a[1])


if __name__ == '__main__':
    main()
