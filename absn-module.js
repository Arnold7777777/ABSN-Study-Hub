/* absn-module.js - the small amount of behavior a single-module page needs:
   fill the module quiz from the JSON block, and let the floating cluster be
   dragged the way it can be on the course hubs. Nothing else. */
(function(){
  var el=document.getElementById('qbank'); if(!el) return;
  var QS=[]; try{ QS=JSON.parse(el.textContent)||[]; }catch(e){ return; }
  var slot=document.querySelector('.slot[data-slot="quiz"]');
  if(!slot || !QS.length) return;

  function render(q,n,key){
    var multi=q.type==='sata';
    var d=document.createElement('div');
    d.className='qz'; d.dataset.multi=multi?'1':'';
    d.dataset.ans=JSON.stringify(q.ans||[]);
    var opts=(q.opts||[]).map(function(o,i){
      return '<label data-i="'+i+'"><input type="'+(multi?'checkbox':'radio')+
             '" name="'+key+'" value="'+i+'"><span>'+o+'</span></label>';
    }).join('');
    d.innerHTML='<div><span class="qnum">Q'+n+'</span>'+
      (multi?'<span class="qtype">Select all that apply</span>':'')+'</div>'+
      '<p class="qq">'+q.q+'</p>'+opts+
      '<div><button type="button" class="qbtn">Check</button><span class="qmark"></span></div>'+
      '<div class="qwhy" hidden><b>Why:</b> '+(q.why||'')+'</div>';
    d.querySelector('.qbtn').addEventListener('click',function(){
      var ans=JSON.parse(d.dataset.ans);
      var picked=[].slice.call(d.querySelectorAll('input'))
                   .filter(function(i){return i.checked;})
                   .map(function(i){return +i.value;});
      if(!picked.length) return;
      [].forEach.call(d.querySelectorAll('label'),function(l){
        var i=+l.dataset.i, isAns=ans.indexOf(i)>-1, got=picked.indexOf(i)>-1;
        l.classList.remove('right','wrong');
        if(isAns) l.classList.add('right'); else if(got) l.classList.add('wrong');
      });
      var right=ans.length===picked.length &&
                ans.every(function(a){return picked.indexOf(a)>-1;});
      var m=d.querySelector('.qmark');
      m.textContent=right?'Correct':'Not quite';
      m.className='qmark '+(right?'ok':'no');
      d.querySelector('.qwhy').hidden=false;
      d.dataset.done=right?'ok':'no';
      score();
    });
    return d;
  }
  function score(){
    var all=slot.querySelectorAll('.qz'), done=0, ok=0;
    [].forEach.call(all,function(d){ if(d.dataset.done){done++; if(d.dataset.done==='ok')ok++;} });
    var s=slot.querySelector('.qscore');
    if(s) s.textContent = done ? (ok+' of '+done+' answered correctly')
                               : (all.length+' questions');
  }

  slot.classList.add('filled');
  var empty=slot.querySelector('.empty'); if(empty) empty.remove();
  var p=slot.querySelector('p');
  if(p) p.textContent='Answer first, then check. The rationale explains the wrong answers too.';
  var h=slot.querySelector('h4');
  if(h && !h.querySelector('.cnt')){
    var c=document.createElement('span'); c.className='cnt'; c.textContent=QS.length;
    h.appendChild(document.createTextNode(' ')); h.appendChild(c);
  }
  var sc=document.createElement('p'); sc.className='qscore'; slot.appendChild(sc);
  QS.forEach(function(q,i){ slot.appendChild(render(q,i+1,'q'+i)); });
  score();
})();

/* Open in a new tab, and close this one behind us when asked. window.close()
   only works on a script-opened window, so if the browser refuses we navigate
   instead - she still gets where she asked to go. */
function hop(url, closeThis){
  if(!closeThis){
    /* No window-features string here. Passing one - even just 'noopener' -
       makes the browser treat this as a POPUP rather than a tab, and popup
       blockers silently swallow it. That is what broke the Hub button while
       Quiz and Podcasts, which take the branch below, kept working.
       Null the opener by hand instead; same security, and it opens. */
    var t=window.open(url,'_blank');
    if(t){ try{ t.opener=null; }catch(e){} } else { location.href=url; }
    return;
  }
  var w=window.open(url,'_blank');
  setTimeout(function(){
    try{ window.close(); }catch(e){}
    if(!window.closed){ location.href=url; if(w){ try{ w.close(); }catch(e){} } }
  },120);
}

/* The floating cluster can be dragged and remembers where it was put.
   Under 6px of travel is a click, 6px or more is a drag. Arrow keys nudge it,
   because dragging should not be the only way to move something. */
(function(){
  var nb=document.getElementById('navBtns'); if(!nb) return;
  var KEY='navBtnsPos';
  function clamp(x,y){
    var r=nb.getBoundingClientRect(), m=6;
    return [Math.max(m,Math.min(x,window.innerWidth-r.width-m)),
            Math.max(m,Math.min(y,window.innerHeight-r.height-m))];
  }
  function place(x,y,save){
    var p=clamp(x,y);
    nb.style.left=p[0]+'px'; nb.style.top=p[1]+'px';
    nb.style.right='auto'; nb.style.bottom='auto';
    if(save){ try{ localStorage.setItem(KEY,JSON.stringify(p)); }catch(e){} }
  }
  try{
    var saved=JSON.parse(localStorage.getItem(KEY)||'null');
    if(saved && saved.length===2) place(saved[0],saved[1],false);
  }catch(e){}
  var down=null, moved=false;
  nb.addEventListener('pointerdown',function(e){
    if(e.target.closest('button') && e.pointerType==='mouse' && e.button!==0) return;
    var r=nb.getBoundingClientRect();
    down={dx:e.clientX-r.left, dy:e.clientY-r.top, x0:e.clientX, y0:e.clientY,
          id:e.pointerId};
    moved=false;
    /* Do NOT capture the pointer here. A captured pointer sends the following
       click to the CONTAINER instead of the button inside it, so the button's
       onclick never runs - that is what stopped the Hub button working on every
       module page. Capture only once a real drag has started. */
  });
  nb.addEventListener('pointermove',function(e){
    if(!down) return;
    if(Math.abs(e.clientX-down.x0)+Math.abs(e.clientY-down.y0) < 6) return;
    if(!moved){ try{ nb.setPointerCapture(down.id); }catch(err){} }
    moved=true; nb.classList.add('dragging');
    place(e.clientX-down.dx, e.clientY-down.dy, false);
  });
  nb.addEventListener('pointerup',function(e){
    if(!down) return;
    nb.classList.remove('dragging');
    if(moved){
      var r=nb.getBoundingClientRect(); place(r.left,r.top,true);
      try{ nb.releasePointerCapture(down.id); }catch(err){}
      e.preventDefault(); e.stopPropagation();
    }
    down=null;
  },true);
  window.addEventListener('resize',function(){
    var r=nb.getBoundingClientRect(); place(r.left,r.top,false);
  });
})();
