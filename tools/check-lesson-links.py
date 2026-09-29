#!/usr/bin/env python3
"""Check the quiz -> study page links in absn-lesson-links.js.

Ninety-eight entries once sat in the wrong object in that file - appended to
SYSTEM, which is only ever looked up by body-system code, so every one of them
was dead. Nothing noticed for a long time, and 299 questions quietly offered a
whole shelf instead of the page they had. This is the check that would have
caught it on the next run.

Exits non-zero on the two faults that are unambiguously wrong: an entry in the
wrong object, and a mapping whose target file does not exist. Everything else is
printed for a human to read.

    python3 tools/check-lesson-links.py
    python3 tools/check-lesson-links.py --verbose   # list the near-misses
"""
import collections, json, os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SCRIPT = os.path.join(ROOT, "absn-lesson-links.js")
BANKS = ["super-mega-quiz.html", "nur234-quiz.html",
         "nur235-quiz.html", "nur258-quiz.html"]
PAPER = re.compile(r"practice test|content mastery|\bATI\b|exam\s*\d|final review", re.I)

ROW = re.compile(r'^\s*"((?:[^"\\]|\\.)*)"\s*:\s*(.+?),?\s*$')


def maps():
    """LESSON and SYSTEM as they really are, plus anything filed in the wrong one."""
    lines = open(SCRIPT).read().split("\n")
    out, misfiled = {}, []
    for name, close in (("LESSON", "};"), ("SYSTEM", "  };")):
        i = lines.index("  var %s = {" % name)
        j = lines.index(close, i)
        rows = {}
        for line in lines[i + 1:j]:
            m = ROW.match(line)
            if not m:
                continue
            key = json.loads('"%s"' % m.group(1))
            raw = m.group(2).rstrip(",")
            try:
                val = json.loads(raw)
            except ValueError:
                continue
            is_page = isinstance(val, str)
            # LESSON holds "path"; SYSTEM holds ["path", "Label"]
            if (name == "LESSON") != is_page:
                misfiled.append((name, key, val))
            rows[key] = val
        out[name] = rows
    return out["LESSON"], out["SYSTEM"], misfiled


def norm(t):
    t = t.lower().replace("&", " and ").replace("—", " ").replace("–", " ")
    return " ".join(re.sub(r"[^a-z0-9]+", " ", t).split())


def questions():
    """Every question in every bank, as (topic, has_own_card)."""
    for name in BANKS:
        path = os.path.join(ROOT, name)
        if not os.path.exists(path):
            continue
        m = re.search(r'<script type="application/json" id="qbank">(.*?)</script>',
                      open(path).read(), re.S)
        if not m:
            continue
        data = json.loads(m.group(1))
        rows = []
        if isinstance(data, dict):
            for v in data.values():
                rows.extend(v)
        else:
            rows = data
        for q in rows:
            if isinstance(q, dict):
                yield name, (q.get("topic") or q.get("topicFull") or "").strip(), bool(q.get("card"))


def main():
    verbose = "--verbose" in sys.argv
    LESSON, SYSTEM, misfiled = maps()
    bad = 0

    print("LESSON %d entries, SYSTEM %d body systems" % (len(LESSON), len(SYSTEM)))

    if misfiled:
        bad += len(misfiled)
        print("\nFILED IN THE WRONG OBJECT: %d" % len(misfiled))
        for where, key, val in misfiled:
            print("   %-8s %-44s %s" % (where, key[:44], val))
        print("   A page path belongs in LESSON; a [path, label] pair belongs in SYSTEM.")

    dead = [(k, v) for k, v in LESSON.items()
            if not os.path.exists(os.path.join(ROOT, v.split("#")[0]))]
    dead += [(k, v[0]) for k, v in SYSTEM.items()
             if isinstance(v, list) and not os.path.exists(os.path.join(ROOT, v[0].split("#")[0]))]
    if dead:
        bad += len(dead)
        print("\nMAPPINGS WHOSE TARGET IS MISSING: %d" % len(dead))
        for k, v in dead:
            print("   %-44s -> %s" % (k[:44], v))

    tiers = collections.Counter()
    unmapped = collections.Counter()
    for _, topic, has_card in questions():
        if has_card:
            tiers["1 its own card"] += 1
        elif topic and topic in LESSON:
            tiers["2 a mapped page"] += 1
        elif topic and not PAPER.search(topic):
            tiers["3 a search for its topic"] += 1
            unmapped[topic] += 1
        else:
            tiers["4 a body-system shelf"] += 1
    total = sum(tiers.values())
    print("\nWhere %d questions point:" % total)
    for k in sorted(tiers):
        print("   %-26s %5d  (%4.1f%%)" % (k, tiers[k], 100.0 * tiers[k] / total))

    keys = collections.defaultdict(set)
    for k in LESSON:
        keys[norm(k)].add(k)
    near = [(t, n, sorted(keys[norm(t)])[0]) for t, n in unmapped.items() if norm(t) in keys]
    print("\nTopics that are an existing key with different punctuation: %d (%d questions)"
          % (len(near), sum(n for _, n, _ in near)))
    if near and not verbose:
        print("   --verbose to list them")
    for t, n, k in sorted(near, key=lambda x: -x[1]):
        if verbose:
            print("   %4d  %-38s == %s" % (n, t[:38], k))

    if bad:
        print("\n%d problem%s above need fixing." % (bad, "" if bad == 1 else "s"))
    return 1 if bad else 0


if __name__ == "__main__":
    sys.exit(main())
