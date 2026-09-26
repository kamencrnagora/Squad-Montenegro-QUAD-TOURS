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