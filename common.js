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
