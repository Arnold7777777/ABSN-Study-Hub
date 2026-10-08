/* Native links and details still work without this enhancement. */
(()=>{'use strict';
const root=document.getElementById('peds379');if(!root)return;
const rows=[...root.querySelectorAll('.p379-row')];const expand=root.querySelector('[data-p379-expand]');
const sync=()=>{const all=rows.every(e=>e.open);expand.textContent=all?'Collapse all comparisons':'Expand all comparisons';expand.setAttribute('aria-pressed',String(all))};
expand.hidden=false;expand.addEventListener('click',()=>{const open=!rows.every(e=>e.open);rows.forEach(e=>e.open=open);sync()});rows.forEach(e=>e.addEventListener('toggle',sync));sync();
const dialog=document.getElementById('p379-dialog');const photo=document.getElementById('p379-dialog-image');const title=document.getElementById('p379-dialog-title');const original=document.getElementById('p379-original');const zoom=dialog.querySelector('[data-p379-zoom]');let returnTo=null;
if(typeof dialog.showModal==='function'){
root.querySelectorAll('[data-p379-picture]').forEach(link=>link.addEventListener('click',event=>{if(event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;event.preventDefault();returnTo=link;photo.src=link.href;photo.alt=link.querySelector('img').alt;title.textContent=link.dataset.title;original.href=link.href;dialog.dataset.zoomed='false';zoom.textContent='Zoom to detail';zoom.setAttribute('aria-pressed','false');dialog.showModal();dialog.querySelector('[data-p379-close]').focus()}));
dialog.querySelector('[data-p379-close]').addEventListener('click',()=>dialog.close());dialog.addEventListener('close',()=>returnTo?.focus());
zoom.addEventListener('click',()=>{const on=dialog.dataset.zoomed!=='true';dialog.dataset.zoomed=String(on);zoom.setAttribute('aria-pressed',String(on));zoom.textContent=on?'Fit picture':'Zoom to detail';dialog.querySelector('.p379-dialog-viewport').scrollTo(0,0)});
}
let printState=null;window.addEventListener('beforeprint',()=>{printState=rows.map(e=>e.open);rows.forEach(e=>e.open=true)});window.addEventListener('afterprint',()=>{if(printState)rows.forEach((e,i)=>e.open=printState[i]);printState=null;sync()});
})();
