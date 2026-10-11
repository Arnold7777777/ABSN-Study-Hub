const large=document.querySelector('#large');
large?.addEventListener('click',()=>{document.body.classList.toggle('large');large.setAttribute('aria-pressed',document.body.classList.contains('large'))});
const q=document.querySelector('#search'),g=document.querySelector('#system'),cards=[...document.querySelectorAll('[data-topic]')];
function filter(){let count=0;const t=(q?.value||'').trim().toLowerCase();
 for(const c of cards){const show=(!t||c.dataset.topic.includes(t))&&(!g?.value||c.dataset.group===g.value);c.hidden=!show;if(show)count++}
 const n=document.querySelector('#count');if(n)n.textContent=count+(count===1?' infographic':' infographics');
 const none=document.querySelector('#none');if(none)none.hidden=count>0}
q?.addEventListener('input',filter);g?.addEventListener('change',filter);
document.querySelector('#print')?.addEventListener('click',()=>window.print());
