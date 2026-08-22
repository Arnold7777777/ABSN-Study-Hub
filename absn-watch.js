/* absn-watch.js - "I would rather watch this than read it."

   Adds a Watch block to the bottom of a study or module page: one button per
   nursing YouTube channel, each opening a SEARCH for this page's topic.

   Why searches and not embedded videos.
   ---------------------------------------------------------------------
   A search link cannot point at the wrong video, because it does not point
   at a video at all. Guessing a YouTube ID gets you either a dead link or -
   far worse - something unrelated playing under this site's name. Every
   pill here is built from the page's own topic at runtime, so it is correct
   by construction and can never rot.

   Real embedded players come later, one at a time, from URLs Caroline has
   actually watched. Until then this is the honest version, and it works on
   every page today.

   The topic comes from the page's <h1>, cleaned of the decoration the
   headings carry. A page can override it with:

       <meta name="absn-watch" content="preeclampsia">

   and a page can opt out entirely with content="off".
*/
(function () {
  'use strict';

  var CHANNELS = [
    { name: 'Level Up RN',        icon: '📐', cls: 'w1' },
    { name: 'Simple Nursing',     icon: '🧠', cls: 'w2' },
    { name: 'Nurse In The Making',icon: '📓', cls: 'w3' },
    { name: 'RegisteredNurseRN',  icon: '🩺', cls: 'w4' }
  ];

  /* The textbook button.

     This used to be a YouTube playlist Caroline supplied, labelled "Textbook
     podcasts", and it went on all 477 pages. She then asked for it to point
     at the actual textbook instead, so the playlist is gone.

     What replaces it is a SEARCH for the book, for the same reason the
     channel buttons are searches: a search cannot point at the wrong thing,
     because it does not point at a thing at all. I could not verify a
     publisher URL from here - shop.lww.com and wolterskluwer.com are both
     unreachable from this machine - and an unverified link on 477 pages is
     exactly the kind of thing that rots.

     The med-surg pages of this site cite Hinkle chapters throughout, so that
     is the book named here. To replace this with a real link - her own
     e-book, or the publisher page once she has confirmed it - put the URL in
     BOOK.url and it will appear on every page that uses this block:

         var BOOK = { label: 'Brunner & Suddarth (Hinkle)',
                      url:   'https://...' };
  */
  /* One entry per course, because Caroline wants to listen to EACH class's
     textbook and not only the med-surg one.

     'book' is the textbook title, and it is filled in only where this site
     already evidences it. Her med-surg pages cite Hinkle chapters twenty-six
     times, so that one is known. NOTHING ELSE ON THE SITE NAMES A TEXTBOOK -
     the maternal pages cite "ch. 9 · ATI ch. 3" with no author, the
     paediatric and pathophysiology pages cite none at all - so the rest are
     deliberately blank rather than guessed. Guessing which book a course uses
     is exactly the way to send her to lectures for the wrong edition of the
     wrong text.

     A blank 'book' is not a broken button: the search falls back to the
     course SUBJECT, which is always true, so every page still finds
     class-appropriate lectures. Filling one in only sharpens it.

     To add one, put the title in and it appears on that course's pages:

         maternal: { subject: 'maternity newborn nursing', book: 'Lowdermilk' }
  */
  var COURSE = {
    medsurg:      { subject: 'medical surgical nursing',   book: 'Brunner & Suddarth Hinkle' },
    maternal:     { subject: 'maternity newborn nursing',  book: '' },
    peds:         { subject: 'pediatric nursing',          book: '' },
    patho:        { subject: 'pathophysiology',            book: '' },
    mentalhealth: { subject: 'mental health nursing',      book: '' },
    fundamentals: { subject: 'fundamentals of nursing',    book: '' },
    pharm:        { subject: 'pharmacology nursing',       book: '' },
    physiology:   { subject: 'anatomy and physiology',     book: '' }
  };

  var BOOK = {
    label: 'Textbook lectures',
    /* Caroline: "last minute lectures on youtube has the textbooks". So the
       textbook button searches that channel for THIS page's chapter material
       rather than pointing at a publisher's shop.

       Still a search, not a channel URL, for the reason every other button
       here is a search: I cannot open YouTube from this machine, so any id I
       wrote down would be a guess. A search built from the page's own topic
       is correct by construction and cannot rot. */
    channel: 'Last Minute Lectures',
    url:     ''          /* set this to pin ONE link for the whole site */
  };

  /* Per-module textbook videos Caroline has given me by URL.

     A pinned link beats the search, but only where she has actually supplied
     one - I cannot open YouTube from this machine, so every entry here has to
     come from her, never from me guessing an id. A page can also pin its own
     with <meta name="absn-textbook" content="..."> and that wins over this map. */
  var PINNED = {
    'nur258-module-01-sensory-eye-ear.html':
      'https://www.youtube.com/watch?v=kgm8cRZyoPE&list=PLI3TocC2xS27gxhDgf56_DuOpaL4zRjMh&index=58'
  };

  function pinnedBook() {
    var m = document.querySelector('meta[name="absn-textbook"]');
    if (m && m.content) return m.content;
    var f = (location.pathname.split('/').pop() || '').toLowerCase();
    return PINNED[f] || '';
  }

  /* This used to be restricted to med-surg pages, because the button named
     the med-surg textbook and putting that on a newborn page was the original
     mistake. Now that the search is the channel plus THIS page's own topic,
     there is nothing med-surg about it - the maternal and paediatric pages
     search for their own subjects - so it belongs everywhere. */
  function bookShown() { return !!COURSE[family()]; }

  /* Which set of playlists belongs on this page. Maternal cards are
     NG-319 to NG-338, paediatric cards NG-343 to NG-362; everything else on
     this site is adult med-surg or fundamentals. */
  function family() {
    var f = (location.pathname.split('/').pop() || '');
    if (/^nur234/i.test(f))            return 'maternal';
    if (/^nur235/i.test(f))            return 'peds';
    if (/^patho/i.test(f))             return 'patho';
    if (/^nur175|^mh-/i.test(f))       return 'mentalhealth';
    if (/^nur125/i.test(f))            return 'fundamentals';
    if (/^pharmacolog|^pharm-/i.test(f)) return 'pharm';
    if (/^physiology/i.test(f))        return 'physiology';
    var ng = f.match(/^NG-(\d+)/i);
    if (ng) {
      var n = parseInt(ng[1], 10);
      if (n >= 319 && n <= 338) return 'maternal';
      if (n >= 343 && n <= 362) return 'peds';
    }
    /* the deep-dive folders are subject libraries, not courses */
    var dir = (location.pathname.split('/').slice(-2)[0] || '');
    if (/^mh$/i.test(dir))    return 'mentalhealth';
    if (/^pharm$/i.test(dir)) return 'pharm';
    return 'medsurg';
  }

  function playlists() {
    /* a page can still pin its own playlist */
    var override = meta('absn-playlist');
    if (override) {
      var bits = override.split('|');
      if (bits[0]) return [{ label: (bits[1] || 'Podcasts').trim(),
        url: 'https://www.youtube.com/playlist?list=' + bits[0].trim() }];
    }
    if (!bookShown()) return [];
    /* Channel + this course's book (when it is known) + this page's topic.
       Where the book is unknown the course SUBJECT stands in, so a patho page
       searches pathophysiology rather than borrowing the med-surg text. */
    var c = COURSE[family()] || COURSE.medsurg;
    var q = BOOK.channel + ' ' + (c.book || c.subject) + ' ' + topic();
    return [{
      label: BOOK.label,
      url: pinnedBook() || BOOK.url ||
           ('https://www.youtube.com/results?search_query=' + encodeURIComponent(q))
    }];
  }


  function meta(name) {
    var m = document.querySelector('meta[name="' + name + '"]');
    return m ? (m.getAttribute('content') || '').trim() : '';
  }

  /* the h1 carries emoji, an NG number and the site name; none of that
     belongs in a search box */
  function topic() {
    var override = meta('absn-watch');
    if (override) return override;

    var h1 = document.querySelector('h1');
    var raw = h1 ? h1.textContent : (document.title || '');

    /* Headings are dotted lists of parts, and the topic is not always the
       first one. "Lithium · NG-250 · Nursing Field Notes" leads with it;
       "M13 · Shock & MODS" does not - taking the first part there gave a
       Watch block that searched for "M13". So: throw away the parts that are
       only labels, and keep the longest thing left. */
    var junk = /^(M\d+|NG-\d+|NUR\s*\d+|Week\s*\d+|Module\s*\d+|Nursing Field Notes|ADHD.*|.*deep-dive.*)$/i;
    var t = raw.split('\u00B7')
      .map(function (x) { return x.replace(/\s+/g, ' ').trim(); })
      .filter(function (x) { return x && !junk.test(x); })
      .sort(function (a, b) { return b.length - a.length; })[0] || raw;

    t = t.replace(/NG-\d+/g, '');
    t = t.replace(/^M\d+\s+/, '');            /* "M2 The Infant" -> "The Infant" */
    /* emoji, dingbats and variation selectors - matched as surrogate pairs
       so this works without the /u flag on older engines */
    t = t.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]|[\u2190-\u2BFF\uFE0F\u20E3]/g, '');
    t = t.replace(/\b(study page|field notes|nursing field notes)\b/gi, '');
    t = t.replace(/\s+/g, ' ').trim().replace(/^[\s\-–—:]+|[\s\-–—:]+$/g, '');

    /* Some headings are just an abbreviation - "MI", "DVT", "CBT", "ABC".
       Searching YouTube for "MI" is useless, so fall back to the file name,
       which spells the topic out: NG-071_mi-myocardial-infarction.html.

       The test is "is this an abbreviation", not "is this short". A plain
       length cutoff of six threw away real one-word topics: the burns module
       searched for "nur258 module 04 burns" instead of "Burns", because Burns
       is five letters. An acronym is short AND has no lower-case letters. */
    if (t.length <= 3 || (t.length < 7 && t === t.toUpperCase() && /[A-Z]/.test(t))) {
      var slug = (location.pathname.split('/').pop() || '')
        .replace(/\.html?$/i, '')
        .replace(/^NG-\d+[_-]?/i, '')
        .replace(/[-_]+/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
      if (slug.length > t.length) t = slug;
    }
    return t;
  }

  function style() {
    if (document.getElementById('absnWatchCss')) return;
    var s = document.createElement('style');
    s.id = 'absnWatchCss';
    /* No backdrop-filter anywhere: a blurred compositing layer renders these
       coloured blocks empty on Caroline's machine. */
    s.textContent =
      '.absn-watch{margin:30px 0 8px;padding:18px 18px 20px;border-radius:18px;' +
      ' background:rgba(13,8,26,.68);border:1px solid rgba(255,255,255,.30);' +
      ' border-left:5px solid rgba(255,214,106,.85);box-shadow:0 8px 26px rgba(0,0,0,.38);' +
      ' color:#fff;font-family:inherit}' +
      '.absn-watch h2{font-size:1.24rem;margin:0 0 4px;font-weight:900;letter-spacing:.01em;' +
      ' display:flex;align-items:center;gap:9px}' +
      '.absn-watch .wsub{margin:0 0 14px;font-size:1rem;line-height:1.5;color:#e7d9ff;max-width:70ch}' +
      '.absn-watch .wrow{display:flex;flex-wrap:wrap;gap:10px}' +
      '.absn-watch a{display:inline-flex;align-items:center;gap:8px;text-decoration:none;' +
      ' color:#fff;font-weight:800;font-size:1rem;line-height:1.25;padding:11px 15px;' +
      ' border-radius:13px;border:1px solid rgba(255,255,255,.34);' +
      ' box-shadow:0 5px 16px rgba(0,0,0,.45)}' +
      '.absn-watch a:hover{filter:brightness(1.14)}' +
      '.absn-watch a:focus-visible{outline:3px solid #ffd76a;outline-offset:3px}' +
      '.absn-watch a.w1{background:linear-gradient(135deg,#0b6656,#0f7d6b)}' +
      '.absn-watch a.w2{background:linear-gradient(135deg,#52277d,#7c3aed)}' +
      '.absn-watch a.w3{background:linear-gradient(135deg,#a01038,#c81746)}' +
      '.absn-watch a.w4{background:linear-gradient(135deg,#1a4099,#1d4ed8)}' +
      '.absn-watch a.w5{background:linear-gradient(135deg,#c08200,#ffc233);color:#231a02}' +
      '.absn-watch .wplay{margin-top:10px}' +
      '.absn-watch .wnote{margin:13px 0 0;font-size:.95rem;line-height:1.5;color:#c9b8e6}' +
      '@media print{.absn-watch{display:none}}';
    document.head.appendChild(s);
  }

  function build(t) {
    var sec = document.createElement('section');
    sec.className = 'absn-watch';
    sec.setAttribute('aria-label', 'Watch a video about ' + t);

    var h = document.createElement('h2');
    h.appendChild(document.createTextNode('\uD83C\uDFA5 Rather watch it?'));
    sec.appendChild(h);

    var sub = document.createElement('p');
    sub.className = 'wsub';
    sub.appendChild(document.createTextNode(
      'Each button searches that channel for '));
    var b = document.createElement('b');
    b.textContent = t;
    sub.appendChild(b);
    sub.appendChild(document.createTextNode('. They open on YouTube in a new tab.'));
    sec.appendChild(sub);

    var row = document.createElement('div');
    row.className = 'wrow';
    CHANNELS.forEach(function (c) {
      var a = document.createElement('a');
      a.className = c.cls;
      a.href = 'https://www.youtube.com/results?search_query=' +
               encodeURIComponent(c.name + ' ' + t);
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.textContent = c.icon + ' ' + c.name;
      row.appendChild(a);
    });
    sec.appendChild(row);

    var pls = playlists();
    if (pls.length) {
      var prow = document.createElement('div');
      prow.className = 'wrow wplay';
      pls.forEach(function (pl) {
        var a = document.createElement('a');
        a.className = 'w5';
        a.href = pl.url;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.textContent = '\uD83D\uDCD8 ' + pl.label;
        prow.appendChild(a);
      });
      sec.appendChild(prow);
    }

    var note = document.createElement('p');
    note.className = 'wnote';
    note.textContent = 'These are searches, not picked videos — so they always ' +
      'work, but check the date and the channel before you trust one.';
    sec.appendChild(note);
    return sec;
  }

  /* after the last section, so it reads as the end of the page rather than
     an interruption in the middle of it */
  function place(sec) {
    var secs = document.querySelectorAll('section');
    var last = secs.length ? secs[secs.length - 1] : null;
    if (last && last.parentNode) {
      last.parentNode.insertBefore(sec, last.nextSibling);
    } else {
      document.body.appendChild(sec);
    }
  }

  function go() {
    if (meta('absn-watch').toLowerCase() === 'off') return;
    if (document.querySelector('.absn-watch')) return;
    var t = topic();
    if (!t || t.length < 3) return;      /* nothing sensible to search for */
    style();
    place(build(t));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', go);
  } else {
    go();
  }
})();
