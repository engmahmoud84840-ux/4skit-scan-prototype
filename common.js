// مشترك بين كل شاشات النموذج التجريبي: الحالة في الصفحة الرئيسية (parent.APP)، والأيقونات من icons.js
const APP=parent.APP;
const ic=(n,z,flip)=>{const v=IC[n][0],s=z||(v=="0 0 20 20"?20:24);return `<svg class="i" viewBox="${v}" style="width:${s}px;height:${s}px;${flip?'transform:scaleX(-1)':''}">${IC[n][1]}</svg>`;};
const go=(s,a)=>parent.go(s,a||{});
const S={get lang(){return APP.lang},get mode(){return matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'},fs:1};
function C(){return S.mode=='dark'?{bar:'#1F2937',bg:'#111827',tx:'#F9FAFB',t2:'#9CA3AF',bd:'#374151',pri:'#7DD3D3',on:'#003738',sec:'rgba(125,211,211,.16)',sb:'#F9FAFB',st:'#171A1A',sa:'#0F6B6D',err:'#FCA5A5',ph:'#273244',dlg:'#273244',tr:'#374151',th:'#9CA3AF'}
:{bar:'#FFFFFF',bg:'#F3F4F6',tx:'#171A1A',t2:'#5F6673',bd:'#E5E7EB',pri:'#0F6B6D',on:'#FFFFFF',sec:'rgba(15,107,109,.12)',sb:'#1F2937',st:'#F9FAFB',sa:'#7DD3D3',err:'#B91C1C',ph:'#E9ECEF',dlg:'#FFFFFF',tr:'#E5E7EB',th:'#5F6673'};}
const arN=n=>n==1?'صفحة واحدة':n==2?'صفحتان':n<=10?`${n} صفحات`:`${n} صفحة`;
const VW=()=>innerWidth,VH=()=>innerHeight;
matchMedia('(prefers-color-scheme: dark)').addEventListener('change',()=>{if(window.draw&&APP.cur==SCREEN)draw();});
// الكيبورد يغيّر طول الشاشة: لا إعادة رسم أثناء الكتابة، وشاشة التصدير تتمدد وحدها
addEventListener('resize',()=>{if(window.draw&&APP.cur==SCREEN&&SCREEN!='export'&&!(document.activeElement&&document.activeElement.tagName=='INPUT'))draw();});
document.addEventListener('pointerdown',()=>APP.arm(),true);
// أدوات أندرويد لاختيار صورة أو ملف PDF: نافذة اختيار المتصفح
function pick(accept,cb){const i=document.createElement('input');i.type='file';i.accept=accept;i.onchange=()=>{if(i.files[0])cb(i.files[0]);};i.click();}
// حالة التعطيل (M3): الأيقونة والاسم كما هما بشفافية 38٪. اسم قارئ الشاشة = الاسم + غير متاح + السبب إن وجد.
// dA(الاسم، السبب، tap): السمات؛ مع tap والسبب تظهر تلميحة عند اللمس.
const UNAV={ar:'غير متاح',en:'unavailable'};
const esc=x=>String(x).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;');
function dA(name,why,tap){const sp=S.lang=='ar'?'، ':', ';return `aria-disabled="true" aria-label="${esc(name+sp+UNAV[S.lang]+(why?sp+why:''))}"${why?` data-tip="${esc(why)}"`:''}${why&&tap?' onclick="tip(this)"':''}`;}
// تلميحة M3 البسيطة (plain tooltip): فوق الزر، وتحته إن لم يتسع المكان؛ واحدة فقط، وتختفي بعد 1.5 ثانية
let tipEl=null,tipT=null;
function tip(el,msg){msg=msg||(el&&el.dataset.tip);if(!msg)return;if(tipEl)tipEl.remove();clearTimeout(tipT);
const c=C(),ar=S.lang=='ar',d=document.createElement('div');d.setAttribute('role','tooltip');d.dir=ar?'rtl':'ltr';d.textContent=msg;
d.style.cssText=`position:fixed;left:0;top:0;z-index:2147483000;box-sizing:border-box;max-width:200px;min-height:24px;padding:4px 8px;border-radius:4px;background:${c.sb};color:${c.st};font:400 12px/16px ${ar?"'IBM Plex Sans Arabic'":'Inter'},system-ui;text-align:start;pointer-events:none;visibility:hidden`;
document.body.appendChild(d);tipEl=d;
const r=el.getBoundingClientRect(),w=d.offsetWidth,h=d.offsetHeight,g=4,m=8;
let x=Math.min(Math.max(r.left+r.width/2-w/2,m),VW()-w-m),y=r.top-g-h;if(y<m)y=r.bottom+g;
d.style.left=x+'px';d.style.top=y+'px';d.style.visibility='visible';
tipT=setTimeout(()=>{d.remove();if(tipEl===d)tipEl=null;},1500);}
