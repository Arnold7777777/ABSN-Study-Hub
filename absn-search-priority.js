/* Caroline's result order: relevant pictures, playable media, then reading. */
(function(root){
  'use strict';
  function kind(entry,page){
    entry=entry||{};page=page||{};
    if(entry.k||page.k)return entry.k||page.k;
    var url=(page.u||'').toLowerCase(),title=(entry.h||'').toLowerCase();
    if(/\.(?:webp|png|jpe?g|gif)(?:[?#]|$)/.test(url)||/\/(?:pediatric-visuals|visual-mnemonics)\/(?!index)/.test(url))return 'infographic';
    if(/open\.spotify\.com\/episode\//.test(url))return 'podcast';
    if(/youtu\.be\/|youtube\.com\/watch|\.(?:mp4|webm)(?:[?#]|$)/.test(url))return 'video';
    if(/^(?:[^a-z]*)(?:infographic|illustrated review|picture guide|visual mnemonic)\b/.test(title))return 'infographic';
    return 'text';
  }
  function rank(entry,page){var k=kind(entry,page);return k==='infographic'?0:(k==='video'||k==='podcast'?1:2);}
  function compare(a,b){return rank(a[1],a[2])-rank(b[1],b[2])||b[0]-a[0];}
  function label(entry,page){return {infographic:'🖼️ Infographic / visual',video:'▶ Video',podcast:'🎧 Podcast',text:'📖 Reading'}[kind(entry,page)]||'📖 Reading';}
  var api={kind:kind,rank:rank,compare:compare,label:label};root.AbsnSearchPriority=api;
  if(typeof module!=='undefined'&&module.exports)module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
