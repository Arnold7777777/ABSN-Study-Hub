"""Semantic, mobile-friendly lists for the study reviews."""
import re


def study_list(items, kind='bullet'):
    items = list(items)
    if not items:
        return ''
    tag, attr = {'bullet': ('ul', 'class="guide-details"'),
                 'steps': ('ol', 'class="guide-steps"'),
                 'choices': ('ol', 'class="guide-choices" type="A"')}[kind]
    return f'<{tag} {attr}>' + ''.join(f'<li>{item}</li>' for item in items) + f'</{tag}>'


def detail_points(fragment):
    """Only split plain text at complete clauses; keep rich text, units and caveats intact."""
    if '<' in fragment:
        return [fragment]
    parts = []
    start = depth = 0
    for match in re.finditer(r'[()]|(?<=[.;])\s+', fragment):
        token = match.group()
        if token == '(':
            depth += 1
        elif token == ')':
            depth = max(0, depth - 1)
        elif not depth:
            before = fragment[:match.start()]
            after = fragment[match.end():]
            # Encoded punctuation (e.g. &amp;) is not a list separator.
            if re.search(r'&(?:#\w+|\w+);$|\b(?:e\.g|i\.e|Dr|vs|etc|no|Fig)\.$', before, re.I):
                continue
            if before.endswith(';') or re.match(r'[A-Z]', after):
                parts.append(fragment[start:match.start()])
                start = match.end()
    return parts + [fragment[start:]]


def answer_list(fragment):
    return study_list(detail_points(fragment))
