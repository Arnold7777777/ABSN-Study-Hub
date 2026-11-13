"""Published simple module guides and direct exam PowerPoint groups."""
COURSE_HOMES = {175:'../NUR-175-Study-Guide/index.html',198:'../NUR-198-Study-Guide/NUR198%20Study%20Hub.html',
                234:'nur234.html',235:'nur235.html',258:'nur258.html'}
EXAM_MODULES = {
    175:[[1,2,3],[4,5,6,7],[8,9,10]],198:[[1,2,3],[4,5,6],[7,8],[9,10],[11,12]],
    234:[[1,2,3,4],[5,6,7],[8,9,10],[11,12,13,14]],235:[[1,2,3,4],[5,6,7],[8,9],[10,11,12]],
    258:[[1,2,3],[4,5,6],[7,8],[9,10],[11,12]]}

def exam_slug(course,module):
    return next((f'exam{i}' for i,mods in enumerate(EXAM_MODULES[course],1) if module in mods),'final')

def module_guide(course,module,prefix='study-reviews/'):
    exam=exam_slug(course,module)
    fragment=f'topic-{module}'
    if course==175 and module==14:
        fragment='topic-13'
    if course==258 and module in (9,10):
        fragment='blood-basics-5' if module==9 else 'cancer-basics-10'
    if module==14 and course in (235,258):
        fragment='jump'
    return f'{prefix}nur{course}-{exam}-simple.html#{fragment}'

def deck_group(course,exam,prefix='../'):
    slug='final' if exam in ('F','final') else 'exam'+str(exam).removeprefix('exam')
    fragment='course-deck-list' if slug=='final' else 'decks-'+slug
    return prefix+COURSE_HOMES[course]+'#'+fragment
