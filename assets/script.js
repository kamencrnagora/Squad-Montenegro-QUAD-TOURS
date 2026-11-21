(function(){
document.documentElement.classList.add('js');
document.querySelectorAll('[data-expires]').forEach(function(el){
if(Date.now()>new Date(el.getAttribute('data-expires')).getTime()) el.hidden=true;
});
var btn=document.querySelector('.menu-btn'), nav=document.getElementById('nav');
btn.addEventListener('click',function(){var o=nav.classList.toggle('open');btn.setAttribute('aria-expanded',o);});
nav.addEventListener('click',function(e){if(e.target.tagName==='A'){nav.classList.remove('open');btn.setAttribute('aria-expanded','false');}});
var bars=document.querySelectorAll('.trail');
if('IntersectionObserver' in window){
var io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target);}});},{threshold:.4});
bars.forEach(function(b){io.observe(b);});
} else {bars.forEach(function(b){b.classList.add('in');});}
var hv=document.querySelector('.hero video');
if(hv && window.matchMedia('(prefers-reduced-motion: reduce)').matches){hv.removeAttribute('autoplay');hv.pause();}
var dlg=document.getElementById('lightbox'), box=document.getElementById('lb-content');
function close(){box.innerHTML='';if(dlg.open)dlg.close();}
document.querySelectorAll('a.lb').forEach(function(a){
a.addEventListener('click',function(e){
e.preventDefault();
var im=a.querySelector('img'), h='<img src="'+a.getAttribute('href')+'" alt="'+(im?im.alt:'')+'">';
box.innerHTML=h;dlg.showModal();
});
});
dlg.querySelector('.close').addEventListener('click',close);
dlg.addEventListener('click',function(e){if(e.target===dlg)close();});
dlg.addEventListener('close',function(){box.innerHTML='';});
var f=document.getElementById('inquiry');
if(f){
var st=f.querySelector('.form-status');
if(/[?&]sent=1/.test(location.search)) st.textContent=f.getAttribute('data-ok');
f.addEventListener('submit',function(e){
e.preventDefault();
var b=f.querySelector('button[type=submit]');
st.textContent=f.getAttribute('data-sending'); b.disabled=true;
var data={}; new FormData(f).forEach(function(v,k){data[k]=v;});
fetch('https://formsubmit.co/ajax/squad.mne@gmail.com',{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(data)})
.then(function(r){return r.text().then(function(t){var j=null;try{j=JSON.parse(t);}catch(x){}return {j:j,status:r.status};});})
.then(function(x){
if(x.j&&(x.j.success===true||x.j.success==='true')){st.textContent=f.getAttribute('data-ok');f.reset();return;}
var why=(x.j&&x.j.message)?String(x.j.message):('HTTP '+x.status);
st.textContent=f.getAttribute('data-err')+' ('+why+')';
if(window.console)console.warn('FormSubmit response:',x);
})
.catch(function(){
if(navigator.onLine===false){st.textContent=f.getAttribute('data-err');return;}
f.submit();
})
.then(function(){b.disabled=false;});
});
}
})();

/* ===== WINTER 20% PROMO (samo početna stranica) =====
   Da dugme "Redeem the offer" vodi na tvoj link, upiši ga između navodnika ispod, npr:
   var PROMO_LINK='https://tvoj-link.com';
   Ako ostane prazno, dugme otvara WhatsApp sa gotovom porukom. */
(function(){
var PROMO_LINK='';
var top=document.getElementById('top');
if(!top||!top.classList.contains('hero')) return;
var D={
en:{t:'WINTER <b>20%</b> DISCOUNT',b:'Redeem the offer',x:'Close',a:'Winter 20% discount',w:'Hi! I would like to redeem the winter 20% discount.'},
sr:{t:'ZIMSKI POPUST <b>20%</b>',b:'Iskoristi ponudu',x:'Zatvori',a:'Zimski popust 20%',w:'Zdravo! Želio/la bih da iskoristim zimski popust od 20%.'},
ru:{t:'ЗИМНЯЯ СКИДКА <b>20%</b>',b:'Воспользоваться предложением',x:'Закрыть',a:'Зимняя скидка 20%',w:'Здравствуйте! Хочу воспользоваться зимней скидкой 20%.'},
de:{t:'WINTERRABATT <b>20 %</b>',b:'Angebot einlösen',x:'Schließen',a:'Winterrabatt 20 %',w:'Hallo! Ich möchte den Winterrabatt von 20 % einlösen.'},
fr:{t:"RÉDUCTION D'HIVER <b>20 %</b>",b:"Profiter de l'offre",x:'Fermer',a:"Réduction d'hiver 20 %",w:"Bonjour ! Je souhaite profiter de la réduction d'hiver de 20 %."},
nl:{t:'WINTERKORTING <b>20%</b>',b:'Aanbieding verzilveren',x:'Sluiten',a:'Winterkorting 20%',w:'Hallo! Ik wil graag de winterkorting van 20% gebruiken.'}
};
var d=D[(document.documentElement.lang||'en').split('-')[0]]||D.en;
var css='.promo{position:fixed;right:16px;bottom:84px;z-index:95;width:min(330px,calc(100vw - 32px));background:#21140B;color:#F1E6D6;border:2px solid #F26A1B;border-radius:6px;padding:20px 18px 16px;box-shadow:0 14px 40px rgba(0,0,0,.55);opacity:0;transform:translateY(30px) scale(.94);transition:opacity .3s ease,transform .55s cubic-bezier(.2,1.35,.4,1)}'
+'.promo[hidden]{display:none}.promo.in{opacity:1;transform:none}'
+'.promo-t{font-family:"Big Shoulders Display","Arial Narrow",Impact,sans-serif;font-weight:900;text-transform:uppercase;font-size:2rem;line-height:.95;margin:0 28px 14px 0}'
+'.promo-t b{color:#F5B700;font-size:1.25em}.promo-btn{display:block;text-align:center}'
+'.promo-x{position:absolute;top:4px;right:6px;width:36px;height:36px;border:0;background:none;color:#F1E6D6;font-size:1.7rem;line-height:1;cursor:pointer}.promo-x:hover{color:#F26A1B}'
+'@media(max-width:700px){.promo{left:0;right:0;bottom:0;width:auto;border-width:2px 0 0;border-radius:0;padding:10px 44px 10px 14px;display:flex;align-items:center;gap:12px;transform:translateY(100%)}.promo[hidden]{display:none}.promo.in{transform:none}.promo-t{flex:1;min-width:0;font-size:1.3rem;margin:0}.promo-btn{flex:0 1 46%;padding:.6em .8em;font-size:.88rem;line-height:1.2}.has-promo .fab{bottom:84px}}'
+'@media(prefers-reduced-motion:reduce){.promo{transition:opacity .2s ease;transform:none!important}}';
var st=document.createElement('style'); st.textContent=css; document.head.appendChild(st);
var p=document.createElement('aside'); p.className='promo'; p.id='promo'; p.hidden=true; p.setAttribute('aria-label',d.a);
p.innerHTML='<button class="promo-x" type="button" aria-label="'+d.x+'">&times;</button><p class="promo-t">'+d.t+'</p><a class="btn promo-btn" target="_blank" rel="noopener">'+d.b+'</a>';
p.querySelector('.promo-btn').href=PROMO_LINK||('https://wa.me/38268505590?text='+encodeURIComponent(d.w));
document.body.appendChild(p);
var KEY='sq_promo_closed', closed=false, forced=(location.hash==='#winter');
try{closed=sessionStorage.getItem(KEY)==='1';}catch(e){}
function hide(){document.documentElement.classList.remove('has-promo');p.classList.remove('in');setTimeout(function(){p.hidden=true;},300);try{sessionStorage.setItem(KEY,'1');}catch(e){}}
p.querySelector('.promo-x').addEventListener('click',hide);
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&!p.hidden)hide();});
if(closed&&!forced) return;
setTimeout(function(){p.hidden=false;document.documentElement.classList.add('has-promo');void p.offsetWidth;p.classList.add('in');},forced?500:1500);
})();
