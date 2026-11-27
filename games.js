function mcq(p,sp){const [q,o,c]=pick('q',QS),op=o.map((x,i)=>[x,i==c]).sort(rnd),T0=sp?Math.min(15,D.s.t):D.s.t;
stage(`<h2>${q}</h2><div class="opts">${op.map(x=>`<button class="btn v opt">${x[0]}</button>`).join('')}</div>${tb()}`);
const bs=[...document.querySelectorAll('.opt')];let d=0;
const f=ok=>{if(d)return;d=1;clr();bs.forEach((b,i)=>{b.disabled=1;if(op[i][1])b.classList.add('ok')});const bn=ok?Math.round(left/T0*(sp?10:5)):0;setTimeout(()=>res(p,ok?10+bn:0,ok?(bn?`إجابة صحيحة + مكافأة سرعة ${bn}`:'إجابة صحيحة'):'الإجابة الصحيحة: '+o[c]),1000)};
bs.forEach((b,i)=>b.onclick=()=>{if(!op[i][1])b.classList.add('no');f(op[i][1])});timer(T0,()=>f(false))}
function tfq(p){const [q,a,e]=pick('t',TF);stage(`<h2>${q}</h2><div class="opts"><button class="btn c" id="y">✔ صح</button><button class="btn r" id="n">✖ خطأ</button></div>${tb()}`);let d=0;const f=v=>{if(d)return;d=1;clr();const ok=v===a;res(p,ok?10+Math.round(left/D.s.t*5):0,(ok?'صحيح! ':'للأسف، الإجابة: '+(a?'صح':'خطأ')+'. ')+e)};$('#y').onclick=()=>f(true);$('#n').onclick=()=>f(false);timer(D.s.t,()=>f(null))}
let pc='#fff',pw=5;
const cvh=()=>`<canvas id="cv" width="600" height="400"></canvas><div class="tools">${CL.map(c=>`<i class="sw" style="background:${c}" onclick="pc='${c}';pw=pw>12?5:pw"></i>`).join('')}<i class="sw" style="background:#fff" onclick="pc='#fff'"></i><button onclick="pw=4">رفيع</button><button onclick="pw=12">سميك</button><button onclick="pc='#12082a';pw=26">ممحاة</button><button onclick="clc()">مسح</button></div>`;
const clc=()=>{const x=$('#cv').getContext('2d');x.fillStyle='#12082a';x.fillRect(0,0,600,400)};
function initCv(){pc='#fff';pw=5;const c=$('#cv'),x=c.getContext('2d');clc();x.lineCap='round';x.lineJoin='round';let d=0;const pt=e=>{const r=c.getBoundingClientRect();return[(e.clientX-r.left)*600/r.width,(e.clientY-r.top)*400/r.height]};
c.onpointerdown=e=>{d=1;c.setPointerCapture(e.pointerId);const[a,b]=pt(e);x.beginPath();x.moveTo(a,b);x.strokeStyle=pc;x.lineWidth=pw;x.lineTo(a+.1,b);x.stroke()};
c.onpointermove=e=>{if(!d)return;const[a,b]=pt(e);x.strokeStyle=pc;x.lineWidth=pw;x.lineTo(a,b);x.stroke()};c.onpointerup=c.onpointercancel=()=>d=0}
function char(p,dr){const w=pick(dr?'dw':'cw',dr?DW:CW);stage(`<p>ستظهر الكلمة لك وحدك. لا تُرِها للآخرين.</p><button class="btn big" id="rv">👀 اكشف الكلمة</button>`);
$('#rv').onclick=()=>{stage(`<div class="word">${w}</div><p>${dr?'ارسم دون كلام أو كتابة':'مثّلها دون نطق'}</p>${dr?cvh():''}${tb()}<div class="g2"><button class="btn ok" id="ok">✅ خمّنوها</button><button class="btn no" id="no">⏹ انتهى</button></div>`);if(dr)initCv();
$('#ok').onclick=()=>{clr();res(p,10+Math.round(left/D.s.t*10),'الكلمة: '+w)};$('#no').onclick=()=>{clr();res(p,0,'الكلمة كانت: '+w)};timer(D.s.t,()=>res(p,0,'انتهى الوقت. الكلمة: '+w))}}
function who(p){const q=pick('w',WH);stage(`<h2>${q}</h2><p>اتفقوا واضغطوا على اسم الشخص الأنسب:</p><div class="opts">${D.pl.map((o,i)=>`<button class="btn" style="background:${CL[o.c]}" onclick="res(D.pl[${i}],10,'اختارته المجموعة 😄')">${AV[o.a]} ${esc(o.n)}</button>`).join('')}</div>`)}
function wheel(p){stage(`<div class="wh"><i class="ptr">▼</i><canvas id="wc" width="320" height="320"></canvas></div><button class="btn big" id="sp">🎡 لفّ العجلة</button><div id="wr"></div>`);
const c=$('#wc'),x=c.getContext('2d'),n=WL.length,sg=2*Math.PI/n;
WL.forEach((w,i)=>{x.beginPath();x.moveTo(160,160);x.arc(160,160,158,i*sg-Math.PI/2,(i+1)*sg-Math.PI/2);x.closePath();x.fillStyle=['#7a3cff','#ffb81f','#1fb8ff','#ff4d8d','#38d97a'][i%5];x.fill();x.save();x.translate(160,160);x.rotate((i+.5)*sg-Math.PI/2);x.font='28px sans-serif';x.textAlign='center';x.fillText(w[2],105,10);x.restore()});
$('#sp').onclick=()=>{$('#sp').remove();const R=360*5+Math.random()*360;c.style.transition='transform 4s cubic-bezier(.12,.7,.1,1)';c.style.transform=`rotate(${R}deg)`;beep(500,.3);
setTimeout(()=>{const w=WL[Math.floor(((360-R%360)%360)/(360/n))];beep(900,.3);if(w[3])return res(p,w[1],w[2]+' '+w[0]);
$('#wr').innerHTML=`<h2>${w[2]} ${w[0]}</h2>${tb()}<div class="g2"><button class="btn ok" id="ok">✅ نفّذت</button><button class="btn no" id="no">⏭ تخطي</button></div>`;
$('#ok').onclick=()=>{clr();res(p,w[1],'أحسنت!')};$('#no').onclick=()=>{clr();res(p,0,'تخطيت التحدي')};timer(D.s.t,()=>res(p,0,'انتهى الوقت'))},4200)}}
function sec(p){const [w,h]=pick('s',SW);let k=1;const dr=()=>{stage(`<h2>🔐 اكتشف الكلمة</h2><ol class="hints">${h.slice(0,k).map(x=>`<li>${x}</li>`).join('')}</ol>${tb()}<div class="opts">${k<4?'<button class="btn v" id="hn">💡 تلميح جديد</button>':''}<button class="btn c" id="rv">👁 كشف الإجابة</button></div>`);
const hn=$('#hn');if(hn)hn.onclick=()=>{k++;dr()};
$('#rv').onclick=()=>{clr();stage(`<h2>الكلمة: ${w}</h2><p>هل عرفتها قبل الكشف؟</p><div class="g2"><button class="btn ok" id="ok">نعم ✅</button><button class="btn no" id="no">لا</button></div>`);$('#ok').onclick=()=>res(p,12-2*k,`استخدمت ${k} من 4 تلميحات. الكلمة: ${w}`);$('#no').onclick=()=>res(p,0,'الكلمة كانت: '+w)}};
dr();timer(D.s.t,()=>res(p,0,'انتهى الوقت. الكلمة: '+w))}
function mem(p){const n=5+D.s.d,sq=[...EM].sort(rnd).slice(0,n);stage(`<h2>🧩 احفظ الترتيب</h2><div class="seq">${sq.map(e=>`<span>${e}</span>`).join('')}</div>${tb()}`);
timer(n*1.2,()=>{const pool=[...sq,...EM.filter(e=>!sq.includes(e)).sort(rnd).slice(0,4)].sort(rnd),pk=[];const dr=()=>{stage(`<h2>أعد الترتيب</h2><div class="seq">${sq.map((_,i)=>`<span>${pk[i]||'؟'}</span>`).join('')}</div><div class="seq">${pool.map(e=>`<button class="btn v" style="width:auto;font-size:30px" ${pk.includes(e)?'disabled':''} onclick="mp('${e}')">${e}</button>`).join('')}</div>`)};
window.mp=e=>{pk.push(e);if(pk.length<n)return dr();const ok=pk.filter((x,i)=>x==sq[i]).length;res(p,Math.round(10*ok/n)+(ok==n?5:0),`${ok} من ${n} في مكانها الصحيح`)};dr()})}
function chal(p){const c=pick('c',CZ);stage(`<div class="big">🔥</div><h2>${c[0]}</h2>${tb()}<div class="g2"><button class="btn ok" id="ok">✅ نفّذت</button><button class="btn no" id="no">⏭ تخطي</button></div>`);$('#ok').onclick=()=>{clr();res(p,c[1],'تحدٍّ ممتع!')};$('#no').onclick=()=>{clr();res(p,0,'تخطيت التحدي')};timer(D.s.t,()=>res(p,0,'انتهى الوقت'))}
const RUN=[p=>mcq(p,0),p=>char(p,0),p=>char(p,1),who,wheel,p=>mcq(p,1),sec,mem,tfq,chal];
function fin(){clr();M={t:[],i:0};const l=[...D.pl].sort((a,b)=>b.sc-a.sc),top=l[0];l.forEach(p=>p.tot+=p.sc);if(top.sc>0)top.w++;
D.h.unshift({d:new Date().toLocaleDateString('ar-EG'),w:top.n,s:top.sc,n:D.pl.length});D.h=D.h.slice(0,20);save();
let tms='';if(D.s.tm){const t=TM.slice(0,D.s.tm).map((n,k)=>[n,D.pl.filter(p=>p.tm==k).reduce((a,p)=>a+p.sc,0)]).sort((a,b)=>b[1]-a[1]);tms=`<div class="card"><h3>🛡 أفضل فريق: ${t[0][0]} (${t[0][1]})</h3>${t.map(x=>`<div class="rk"><b>${x[0]}</b><span>${x[1]}</span></div>`).join('')}</div>`}
show(`<div class="cf">${Array.from({length:30},()=>`<s style="left:${Math.random()*100}%;animation-delay:${Math.random()*3}s">${['🎉','⭐','✨','🎊'][Math.random()*4|0]}</s>`).join('')}</div><div class="card"><div class="big">👑</div><h2>الفائز: ${AV[top.a]} ${esc(top.n)}</h2><div class="pts">${top.sc}</div><p>أفضل لاعب في هذه المباراة</p></div>${tms}${l.map((p,i)=>`<div class="rk"><span>${i+1}</span><span style="font-size:24px">${AV[p.a]}</span><b>${esc(p.n)}</b><span>${p.sc}</span></div>`).join('')}<button class="btn big" onclick="start()">🔄 إعادة اللعب</button><button class="btn v" onclick="home()">⌂ الرئيسية</button>`);beep(660,.15);setTimeout(()=>beep(990,.3),180)}
let QV=null;
function qinit(){if(QV)return;QV=[];const cnt={},pre={};QR.forEach((s,si)=>s[1].forEach((t,i)=>{const n=NORM(t);QV.push({s:si,i,t,n,w:t.split(' ')});cnt[n]=(cnt[n]||0)+1}));QV.forEach(v=>{v.u=cnt[v.n]==1&&!(v.s==0&&v.i==0);if(v.w.length>=5){const k=v.n.split(' ').slice(0,4).join(' ');(pre[k]=pre[k]||[]).push(v)}});QV.pre=Object.values(pre).filter(g=>g.length>1&&g.length<=4&&new Set(g.map(x=>x.n)).size==g.length&&new Set(g.map(x=>x.s)).size==g.length)}
const qsc=()=>D.s.k==1&&D.s.qs=='all'?'amma':D.s.qs;
const inSc=v=>{const q=qsc();return q=='all'||(q=='amma'&&v.s>=77)||(q=='muf'&&v.s>=49)||(q=='one'&&v.s==D.s.qu)};
function qq(){qinit();const P=f=>QV.filter(v=>inSc(v)&&f(v)),R=a=>a[Math.random()*a.length|0],sn=v=>'سورة '+QR[v.s][0],nx=(v,k=1)=>QV.find(x=>x.s==v.s&&x.i==v.i+k),ad=D.s.k!=1,half=(v,n)=>v.w.slice(0,n).join(' ')+' …';
const T={name:()=>{const a=P(v=>v.u&&v.w.length>=4&&v.w.length<=14);if(!a.length)return;const v=R(a),o=[QR[v.s][0]];while(o.length<4){const n=QR[Math.random()*114|0][0];if(!o.includes(n))o.push(n)}return{k:'في أي سورة وردت هذه الآية؟',t:v.t,o:o.sort(rnd),a:sn(v),pts:5}},
short:()=>{const a=P(v=>v.u&&v.w.length>=4&&v.w.length<=9);if(!a.length)return;const v=R(a),n=Math.ceil(v.w.length/2);return{k:'أكمل الآية',t:half(v,n),a:v.w.slice(n).join(' '),loc:sn(v)+' · آية '+(v.i+1),pts:10}},
next:()=>{const a=P(v=>v.u&&v.w.length>=4&&nx(v));if(!a.length)return;const v=R(a);return{k:'ما الآية التالية؟',t:v.t,a:nx(v).t,loc:sn(v)+' · آية '+(v.i+1)+' ← التالية '+(v.i+2),pts:10}},
long:()=>{const a=P(v=>v.u&&v.w.length>=10);if(!a.length)return;const v=R(a),n=Math.ceil(v.w.length/2);return{k:'أكمل الآية الطويلة',t:half(v,n),a:v.w.slice(n).join(' '),loc:sn(v)+' · آية '+(v.i+1),pts:20}},
loc:()=>{const a=P(v=>v.u&&v.w.length>=5);if(!a.length)return;const v=R(a);return{k:'حدد السورة ورقم الآية',t:v.t,a:sn(v)+' – الآية '+(v.i+1),pts:20}},
mut:()=>{const g=QV.pre.filter(g=>g.every(inSc));if(!g.length)return;const x=R(g),v=R(x);return{k:'من المتشابهات: ابدأ بهذه العبارة وأكمل الآية الواردة في '+sn(v),t:v.w.slice(0,4).join(' ')+' …',a:v.t,loc:sn(v)+' · آية '+(v.i+1)+' | المواضع المتشابهة: '+x.map(y=>QR[y.s][0]+' '+(y.i+1)).join('، '),pts:30}},
taj:()=>{const t=R(TJ);return{k:'سؤال تجويد',t:t[0],o:[...t[1]].sort(rnd),a:t[2],loc:'الحكم البشري هو المرجع النهائي',pts:20,plain:1}},
haf:()=>{const a=P(v=>v.u&&v.w.length>=4&&nx(v,2));if(!a.length)return;const v=R(a);return{k:'تحدي الحافظ: أكمل الآيتين التاليتين',t:v.t,a:nx(v).t+' ﴿ '+nx(v,2).t,loc:sn(v)+' · من آية '+(v.i+2),pts:50}}};
const ty=(ad?['name','short','next','long','loc','mut','taj','haf']:['name','short','next']).sort(rnd);for(const k of ty){const q=T[k]();if(q)return q}return T.name()||{k:'لا توجد أسئلة في هذا النطاق',t:'غيّر النطاق من الإعدادات',a:'-',pts:0,plain:1}}
function gq(){const sb=D.s.sub.flatMap(i=>SUBJ[i][2]),df=D.s.df,lv=D.s.k==1?1:3,ok=x=>(!sb.length||sb.includes(x[0]))&&(!df||(df==1?x[2]<=5:df==2?x[2]==10:df==3?x[2]==20:x[2]>=30));let a=GB.filter(x=>x[1]<=lv&&ok(x));if(!a.length)a=GB.filter(x=>x[1]<=lv);const b=pick('gb',a);return{k:b[0]+' · '+LV[b[1]]+' · '+b[2]+' نقاط',t:b[3],o:b[5]?[b[4],...b[5]].sort(rnd):null,a:b[4],pts:b[2],plain:1}}
function ref(p,kind){const qr=kind=='q';QM=qr;const rf=D.pl[D.s.fx]||p,cs=D.pl.filter(x=>x!==rf),q=qr?qq():gq();let rvd=0;
if(qr)$('#st').classList.add('qr');
stage(`<div class="meta"><span class="pill">${qr?'📖 القرآن':'🧠 العباقرة'}</span><span class="pill">⚖ الحَكَم: ${esc(rf.n)}</span><span class="pill">⭐ ${q.pts} نقاط</span></div><div class="lbl">${q.k}</div>${q.plain?`<h2>${q.t}</h2>`:`<div class="ay">${q.t}</div>`}${q.o?`<div>${q.o.map((x,i)=>`<div class="oc c${i%4}"><i>${'أبجد'[i]}</i>${x}</div>`).join('')}</div>`:''}${tb()}<p class="mt">الحَكَم لا ينال نقاطًا في جولته</p><button class="btn c" id="rv">👁 الحَكَم: اكشف الإجابة</button>`);
const rv=()=>{if(rvd)return;rvd=1;clr();const b=$('#rv');if(b)b.remove();$('#st').insertAdjacentHTML('beforeend',`<div class="ans ${q.plain?'':'ay'}">الإجابة: ${q.a}</div>${q.loc?`<small>${q.loc}</small>`:''}${qr?'<p>راجع المصحف قبل الحكم</p>':''}<label><input type="checkbox" id="bn"> ⚡ إجابة دقيقة وسريعة (+5)</label><div class="lbl">من أجاب إجابة صحيحة؟</div><div class="opts">${cs.map((o,i)=>`<button class="btn" style="background:${CL[o.c]}" onclick="jg(${i})">${AV[o.a]} ${esc(o.n)}</button>`).join('')}<button class="btn no" onclick="jg(-1)">لا أحد</button></div>`)};
window.jg=i=>{if(i<0)return res({sc:0,n:'لا أحد'},0,'لم يجب أحد إجابة صحيحة',1);const b=$('#bn');res(cs[i],q.pts+(b&&b.checked?5:0),'أجاب إجابة صحيحة',1)};
$('#rv').onclick=rv;if(D.s.to!==0)timer(Math.max(D.s.t,45),rv)}
RUN.push(p=>ref(p,'g'),p=>ref(p,'q'));
// ---- V5: question engine + solo mode ----
D.s.ref=D.s.ref||0;
const rr=n=>Math.random()*n|0,R=a=>a[rr(a.length)],sh=a=>[...a].sort(rnd);
const SEEN=(()=>{try{return JSON.parse(localStorage.getItem('lamma_seen')||'{}')}catch(e){return{}}})();
function seen(id){if(SEEN[id])return 1;SEEN[id]=1;const k=Object.keys(SEEN);if(k.length>5000)delete SEEN[k[0]];try{localStorage.setItem('lamma_seen',JSON.stringify(SEEN))}catch(e){}return 0}
const mo=(a,pool)=>{const o=[a];for(const x of sh(pool)){if(o.length>=4)break;if(!o.includes(x))o.push(x)}return sh(o)};
const mq=(q,a,pts,sub,id,f=x=>''+x)=>{const c=[];for(const d of sh([-10,-5,-2,-1,1,2,5,10,3,-3])){const v=a+d;if(v>0&&v!=a&&!c.includes(v))c.push(v);if(c.length>=3)break}return{id,sub,pts,t:q,a:f(a),o:sh([a,...c]).map(f)}};
const GMq=kid=>{const L=[()=>{const a=2+rr(kid?8:11),b=2+rr(kid?8:13);return mq('كم ناتج '+a+' × '+b+'؟',a*b,5,'الحساب','x'+a+'_'+b)},()=>{const a=10+rr(kid?40:190),b=10+rr(kid?40:190);return mq(a+' + '+b+' = ؟',a+b,5,'الحساب','p'+a+'_'+b)},()=>{const a=30+rr(kid?70:300),b=10+rr(a-10);return mq(a+' − '+b+' = ؟',a-b,5,'الحساب','s'+a+'_'+b)},()=>{const w=2+rr(12),h=2+rr(12);return mq('ما مساحة مستطيل طوله '+h+' وعرضه '+w+'؟',w*h,10,'الهندسة','a'+w+'_'+h)}];
if(!kid)L.push(()=>{const p=R([10,20,25,50]),n=20*(1+rr(20));return mq(p+'% من '+n+' = ؟',n*p/100,10,'الحساب','c'+p+'_'+n)},()=>{const x=1+rr(12),a=2+rr(8),b=1+rr(20);return mq('حل المعادلة: '+a+'س + '+b+' = '+(a*x+b),x,20,'الجبر','e'+a+'_'+x+'_'+b,v=>'س = '+v)},()=>{const r=3+rr(18);return mq('ما الجذر التربيعي للعدد '+r*r+'؟',r,10,'الحساب','r'+r)},()=>{const n=4+rr(9);return mq('ما قيمة 2 أس '+n+'؟',2**n,20,'الجبر','w'+n)},()=>{const s=3+rr(20);return mq('ما محيط مربع طول ضلعه '+s+'؟',4*s,10,'الهندسة','m'+s)});return R(L)()};
const PR=(L,sub,id,ta,tb,pa,pb,kid)=>{const i=rr(L.length),[x,y]=L[i],f=Math.random()<.65;return f?{id:id+i,sub,pts:pa,t:ta(x),a:y,o:mo(y,L.map(z=>z[1]))}:{id:id+'r'+i,sub,pts:pb,t:tb(y),a:x,o:mo(x,L.map(z=>z[0]))}};
const GC=()=>PR(CAPS,'الجغرافيا','c',x=>'ما عاصمة '+x+'؟',y=>y+' هي عاصمة أي دولة؟',5,10);
const GEl=()=>PR(ELE,'الكيمياء','e',x=>'ما الرمز الكيميائي لعنصر '+x+'؟',y=>'الرمز '+y+' يمثل أي عنصر؟',10,20);
const GA=()=>PR(ANT,'اللغة العربية','a',x=>'ما ضد كلمة «'+x+'»؟',y=>'ما ضد كلمة «'+y+'»؟',5,5);
const GP1=()=>PR(ENP,'اللغة الإنجليزية','n',x=>'What is the plural of "'+x+'"?',y=>'What is the singular of "'+y+'"?',5,10);
const GV=()=>PR(ENV,'اللغة الإنجليزية','v',x=>'What is the past tense of "'+x+'"?',y=>'What is the base form of "'+y+'"?',10,20);
let GPL=null;
const GN_=kid=>{if(!GPL)GPL=[...GN.map(s=>{const a=s.split('|');return{id:a[3],sub:a[0],lv:+a[1],pts:+a[2],t:a[3],a:a[4],o:a.slice(4)}}),...GB.filter(x=>x[5]).map(x=>({id:x[3],sub:x[0],lv:x[1],pts:x[2],t:x[3],a:x[4],o:[x[4],...x[5]]}))];const a=GPL.filter(x=>x.lv<=(kid?1:3)),q=R(a);return{...q,o:sh(q.o)}};
function rq(kid){const g=kid?[GMq,GC,GA,GP1,GN_,GN_]:[GMq,GC,GEl,GV,GA,GN_,GN_,GN_];return R(g)(kid)}
function gq(){const kid=D.s.k==1,sb=D.s.sub.flatMap(i=>SUBJ[i][2]),df=D.s.df,dok=p=>!df||(df==1?p<=5:df==2?p==10:df==3?p==20:p>=30);let q;for(let n=0;n<70;n++){q=rq(kid);if(n<45&&((sb.length&&!sb.includes(q.sub))||!dok(q.pts)))continue;const sn=seen(q.id);if(sn&&n<8)continue;break}return{...q,k:q.sub+' · '+q.pts+' نقاط',plain:1}}
function burst(){const c=document.createElement('div');c.className='cf';c.innerHTML=Array.from({length:18},()=>`<s style="left:${rr(100)}%;animation-duration:${1.5+Math.random()*1.5}s;animation-iteration-count:1">${R(['🎉','⭐','✨','🎊'])}</s>`).join('');document.body.appendChild(c);setTimeout(()=>c.remove(),3200)}
function gm(p){p.ll=p.ll||{f:1,d:1};p.st=p.st||0;const q=gq(),T0=D.s.to===0?0:Math.max(15,Math.min(D.s.t,45));let dbl=0,dn=0;
stage(`<div class="meta"><span class="pill">${q.k}</span>${p.st>1?`<span class="pill w">🔥 سلسلة ${p.st}</span>`:''}</div><h2>${q.t}</h2><div class="opts">${q.o.map((x,i)=>`<button class="btn opt"><i class="oi">${'أبجد'[i]}</i>${x}</button>`).join('')}</div>${T0?tb():''}<div class="g2"><button class="btn c" id="l5" ${p.ll.f?'':'disabled'}>✂ حذف إجابتين</button><button class="btn v" id="l2" ${p.ll.d?'':'disabled'}>✖2 ضعف النقاط</button></div>`);
const bs=[...document.querySelectorAll('.opt')];
const f=ci=>{if(dn)return;dn=1;clr();const ok=ci>=0&&q.o[ci]==q.a;bs.forEach((b,i)=>{b.disabled=1;if(q.o[i]==q.a)b.classList.add('ok')});if(ci>=0&&!ok)bs[ci].classList.add('no');
const bn=ok&&T0?Math.round(left/T0*5):0,sk=ok?Math.min(10,p.st*2):0;let pts=ok?q.pts+bn+sk:0;if(ok&&dbl)pts*=2;p.st=ok?p.st+1:0;
if(ok){burst();beep(660,.1);setTimeout(()=>beep(880,.15),110)}else beep(200,.3);
setTimeout(()=>res(p,pts,ok?'✔ صحيح'+(bn?' · سرعة +'+bn:'')+(sk?' · سلسلة 🔥 +'+sk:'')+(dbl?' · ×2':''):'✖ الإجابة الصحيحة: '+q.a,1),1100)};
bs.forEach((b,i)=>b.onclick=()=>f(i));
$('#l5').onclick=()=>{p.ll.f=0;$('#l5').disabled=1;let k=0;sh(bs.map((b,i)=>i)).forEach(i=>{if(q.o[i]!=q.a&&k<2){bs[i].disabled=1;bs[i].style.opacity=.25;k++}})};
$('#l2').onclick=()=>{p.ll.d=0;dbl=1;$('#l2').disabled=1;$('#l2').textContent='×2 مفعّل'};
if(T0)timer(T0,()=>f(-1))}
INS[10]='السؤال لك: اختر الإجابة الصحيحة قبل انتهاء الوقت. معك مساعدتان مرة واحدة لكل منهما: ✂ حذف إجابتين، و✖2 ضعف النقاط. كل إجابة صحيحة متتالية تعطيك مكافأة سلسلة 🔥.';
RUN[10]=p=>D.s.ref?ref(p,'g'):gm(p);
const GCOL={0:'#7657F6',1:'#FF9F43',2:'#22C58B',3:'#f59e0b',4:'#E056C1',5:'#E5484D',6:'#2799E8',7:'#8b5cf6',8:'#14b8a6',9:'#ff6b35',10:'#7657F6',11:'#168B65'};
function theme(c){try{document.documentElement.style.setProperty('--th',c)}catch(e){}}
