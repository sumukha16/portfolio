/* ── PARTICLES ── */
const cvs=document.getElementById('canvas');
const c=cvs.getContext('2d');
let W,H,pts=[];
function resize(){W=cvs.width=window.innerWidth;H=cvs.height=window.innerHeight}
resize();window.addEventListener('resize',resize);
class Dot{
  constructor(){this.reset()}
  reset(){
    this.x=Math.random()*W;this.y=Math.random()*H;
    this.vx=(Math.random()-.5)*.35;this.vy=(Math.random()-.5)*.35;
    this.r=Math.random()*1.5+.4;this.a=Math.random()*.4+.1;
    this.col=Math.random()>.5?'79,240,183':'59,201,240';
  }
  step(){
    this.x+=this.vx;this.y+=this.vy;
    if(this.x<0||this.x>W||this.y<0||this.y>H)this.reset();
  }
  draw(){
    c.beginPath();c.arc(this.x,this.y,this.r,0,Math.PI*2);
    c.fillStyle=`rgba(${this.col},${this.a})`;c.fill();
  }
}
// fewer particles on small screens
const count=window.innerWidth<640?40:80;
for(let i=0;i<count;i++)pts.push(new Dot());
function lines(){
  const maxD=window.innerWidth<640?80:120;
  for(let i=0;i<pts.length;i++)for(let j=i+1;j<pts.length;j++){
    const dx=pts[i].x-pts[j].x,dy=pts[i].y-pts[j].y,d=Math.sqrt(dx*dx+dy*dy);
    if(d<maxD){
      c.beginPath();c.moveTo(pts[i].x,pts[i].y);c.lineTo(pts[j].x,pts[j].y);
      c.strokeStyle=`rgba(79,240,183,${.07*(1-d/maxD)})`;c.lineWidth=.5;c.stroke();
    }
  }
}
(function loop(){c.clearRect(0,0,W,H);pts.forEach(p=>{p.step();p.draw()});lines();requestAnimationFrame(loop)})();

/* ── SCROLL PROGRESS ── */
const prog=document.getElementById('prog');
window.addEventListener('scroll',()=>{
  prog.style.width=(window.scrollY/(document.body.scrollHeight-window.innerHeight)*100)+'%';
},{ passive:true });

/* ── NAV SOLID ON SCROLL ── */
const nav=document.getElementById('nav');
window.addEventListener('scroll',()=>nav.classList.toggle('solid',window.scrollY>60),{passive:true});

/* ── HAMBURGER ── */
const ham=document.getElementById('ham');
const mm=document.getElementById('mobileMenu');
ham.addEventListener('click',()=>{
  ham.classList.toggle('open');
  mm.classList.toggle('open');
  document.body.style.overflow=mm.classList.contains('open')?'hidden':'';
});
document.querySelectorAll('.mm-link').forEach(a=>a.addEventListener('click',()=>{
  ham.classList.remove('open');mm.classList.remove('open');
  document.body.style.overflow='';
}));

/* ── TYPEWRITER ── */
const roles=['CSE Student','Backend Developer','Problem Solver','Fresher & Builder','Tech Enthusiast'];
let ri=0,ci=0,del=false;
const tw=document.getElementById('tw');
function type(){
  const w=roles[ri];
  tw.textContent=del?w.slice(0,ci-1):w.slice(0,ci+1);
  del?ci--:ci++;
  if(!del&&ci>w.length){del=true;setTimeout(type,1800);return}
  if(del&&ci<0){del=false;ri=(ri+1)%roles.length;setTimeout(type,400);return}
  setTimeout(type,del?55:110);
}
setTimeout(type,1800);

/* ── 3D SCROLL REVEALS ── */
const ro=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')});
},{threshold:0.1,rootMargin:'0px 0px -30px 0px'});
document.querySelectorAll('.r3d,.r3d-l,.r3d-r,.r3d-flip').forEach(el=>ro.observe(el));

/* ── SKILL BARS ── */
const bo=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting)
      e.target.querySelectorAll('.sk-bar').forEach(b=>setTimeout(()=>b.style.width=b.dataset.w+'%',200));
  });
},{threshold:0.2});
const sk=document.getElementById('skillsSec');
if(sk)bo.observe(sk);

/* ── COUNTER ── */
function animCount(el,target){
  let v=0;const s=Math.ceil(target/25);
  const t=setInterval(()=>{v+=s;if(v>=target){v=target;clearInterval(t)}el.textContent=v+'+';},45);
}
const co=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.querySelectorAll('[data-count]').forEach(el=>animCount(el,+el.dataset.count));
      co.unobserve(e.target);
    }
  });
},{threshold:0.3});
const ab=document.getElementById('about');if(ab)co.observe(ab);

/* ── NAV ACTIVE SECTION ── */
const secs=document.querySelectorAll('section[id]');
const nls=document.querySelectorAll('.nav-links a');
window.addEventListener('scroll',()=>{
  let cur='';
  secs.forEach(s=>{if(window.scrollY>=s.offsetTop-120)cur=s.id});
  nls.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+cur));
},{passive:true});

/* ── PARALLAX ORBS (desktop only) ── */
if(window.innerWidth>900){
  window.addEventListener('scroll',()=>{
    const y=window.scrollY;
    const o1=document.querySelector('.orb1');
    const o2=document.querySelector('.orb2');
    if(o1)o1.style.transform=`translate(${y*.04}px,${y*-.07}px)`;
    if(o2)o2.style.transform=`translate(${y*-.03}px,${y*.05}px)`;
  },{passive:true});
}
