let deferredPrompt;
const installBtn=document.getElementById('installBtn');
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferredPrompt=e;if(installBtn)installBtn.hidden=false;});
if(installBtn){installBtn.addEventListener('click',async()=>{if(!deferredPrompt)return;deferredPrompt.prompt();await deferredPrompt.userChoice;deferredPrompt=null;installBtn.hidden=true;});}
const menuBtn=document.getElementById('menuBtn'),nav=document.getElementById('nav');
if(menuBtn&&nav)menuBtn.addEventListener('click',()=>nav.classList.toggle('open'));
const helloBtn=document.getElementById('helloBtn');
if(helloBtn)helloBtn.addEventListener('click',()=>alert('¡Hola! Ya estás usando JavaScript.'));
const questions=[
{q:'¿Qué etiqueta se usa para el título principal?',a:['<h1>','<title>','<p>'],c:0,why:'¡Correcto! <h1> representa el encabezado principal.'},
{q:'¿Qué lenguaje se utiliza para dar estilos y colores?',a:['HTML','CSS','JavaScript'],c:1,why:'¡Muy bien! CSS controla la presentación visual.'},
{q:'¿Qué palabra permite declarar una función en JavaScript?',a:['style','function','image'],c:1,why:'¡Correcto! function se utiliza para declarar funciones.'}
];
let current=0,score=0,answered=false;
const qEl=document.getElementById('question'),answers=document.getElementById('answers'),feedback=document.getElementById('feedback'),next=document.getElementById('nextBtn'),scoreEl=document.getElementById('score');
function render(){if(!qEl)return;answered=false;feedback.textContent='';qEl.textContent=questions[current].q;answers.innerHTML='';questions[current].a.forEach((a,i)=>{const b=document.createElement('button');b.className='answer';b.textContent=a;b.addEventListener('click',()=>{if(answered)return;answered=true;const ok=i===questions[current].c;if(ok)score++;feedback.textContent=ok?questions[current].why:'Respuesta incorrecta. La correcta es '+questions[current].a[questions[current].c]+'.';answers.querySelectorAll('button').forEach(x=>x.disabled=true);scoreEl.textContent='Puntuación: '+score+' / 3';});answers.appendChild(b);});scoreEl.textContent='Pregunta '+(current+1)+' de 3 · Puntos: '+score;next.textContent=current===2?'Ver resultado':'Siguiente pregunta';}
if(next)next.addEventListener('click',()=>{if(!answered){feedback.textContent='Selecciona una respuesta antes de continuar.';return;}if(current<2){current++;render();}else{qEl.textContent='¡Terminaste!';answers.innerHTML='';feedback.textContent='Tu puntuación final es '+score+' de 3. ¡Sigue aprendiendo!';next.textContent='Repetir práctica';next.onclick=()=>{current=0;score=0;next.onclick=null;render();};}});render();
if('serviceWorker'in navigator&&location.protocol!=='file:'){window.addEventListener('load',()=>navigator.serviceWorker.register('./service-worker.js').catch(()=>{}));}
