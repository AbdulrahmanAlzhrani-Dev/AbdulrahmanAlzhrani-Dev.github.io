const root=document.documentElement;
const body=document.body;
const langToggle=document.getElementById('lang-toggle');
const themeToggle=document.getElementById('theme-toggle');
const menuToggle=document.getElementById('menu-toggle');
const navLinks=document.getElementById('nav-links');
const nav=document.getElementById('navbar');
const savedLang=localStorage.getItem('language')||'ar';
const savedTheme=localStorage.getItem('theme')||'dark';

function setLanguage(lang){
  root.lang=lang; root.dir=lang==='ar'?'rtl':'ltr';
  document.querySelectorAll('[data-ar][data-en]').forEach(el=>{el.textContent=el.getAttribute(`data-${lang}`)});
  document.querySelectorAll('[data-ar-alt][data-en-alt]').forEach(el=>{el.alt=el.getAttribute(`data-${lang}-alt`)});
  langToggle.innerHTML=`<span>${lang==='ar'?'EN':'AR'}</span>`;
  localStorage.setItem('language',lang);
}
function setTheme(theme){
  body.setAttribute('data-theme',theme);
  themeToggle.innerHTML=theme==='dark'?'<i class="fa-solid fa-sun"></i>':'<i class="fa-solid fa-moon"></i>';
  themeToggle.setAttribute('aria-label',theme==='dark'?'Switch to light theme':'Switch to dark theme');
  localStorage.setItem('theme',theme);
}
setLanguage(savedLang); setTheme(savedTheme);
langToggle.addEventListener('click',()=>setLanguage(root.lang==='ar'?'en':'ar'));
themeToggle.addEventListener('click',()=>setTheme(body.getAttribute('data-theme')==='dark'?'light':'dark'));
menuToggle.addEventListener('click',()=>{const open=navLinks.classList.toggle('open');menuToggle.setAttribute('aria-expanded',open);menuToggle.innerHTML=open?'<i class="fa-solid fa-xmark"></i>':'<i class="fa-solid fa-bars"></i>'});
navLinks.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{navLinks.classList.remove('open');menuToggle.setAttribute('aria-expanded','false');menuToggle.innerHTML='<i class="fa-solid fa-bars"></i>'}));
window.addEventListener('scroll',()=>nav.classList.toggle('scrolled',window.scrollY>12),{passive:true});
const sections=[...document.querySelectorAll('main section[id]')];
const links=[...document.querySelectorAll('.nav-link')];
const sectionObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){links.forEach(l=>l.classList.toggle('active',l.getAttribute('href')===`#${entry.target.id}`))}})},{rootMargin:'-35% 0px -55% 0px'});
sections.forEach(s=>sectionObserver.observe(s));
const revealObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');revealObserver.unobserve(e.target)}}),{threshold:.08});
document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));
document.getElementById('year').textContent=new Date().getFullYear();
