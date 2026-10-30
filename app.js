const $=s=>document.querySelector(s),app=$('#app');
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const uid=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,6);
const ch=g=>`<svg viewBox="0 0 130 130" width="${g=='boy'||g=='girl'?'':''}" style="width:100%;max-width:150px"><use href="#${g}"/></svg>`;
let db=null,isOwner=false,unsubs=[];
const S={g:'boy',tid:'',tname:'',name:'',grade:'',school:'',sid:'',st:0,qi:0,qs:[],ans:[],score:0,teacher:null};
const ST=[
{n:'قلعة البحرين',e:'🏰',f:'موقع مدرج في قائمة التراث العالمي لليونسكو، وكانت عاصمة حضارة دلمون.'},
{n:'باب البحرين',e:'🚪',f:'بوابة تاريخية في قلب المنامة، وهو مدخل سوق المنامة القديم.'},
{n:'مسار اللؤلؤ – المحرق',e:'🦪',f:'مسار تراثي يحكي قصة الغوص وتجارة اللؤلؤ، وهو من مواقع التراث العالمي.'},
{n:'شجرة الحياة',e:'🌳',f:'شجرة تقف وحدها وسط الصحراء منذ مئات السنين، وهي من أشهر معالم البحرين.'},
{n:'قلعة عراد',e:'🏯',f:'قلعة من القرن السادس عشر في المحرق، وتُقام فيها فعاليات تراثية.'}];
const B=(s,t,q,o,a)=>({s,t,q,o,a,b:1});
const BASE=[
B(0,'رياضيات','اشترط جاسم أن لا يتجاوز مجموع سعر الألعاب 25 BD. الأسعار: مسدس مائي 3، مسدس كهربائي 4، شاحنات 7، سيارة كهربائية 12، هاتف 5.5، مكعبات بناء 10، حذاء تزلج 8.5، كتب تلوين 6.5. أي مجموعة لن يشتريها؟',['مسدس مائي – سيارة كهربائية – مكعبات بناء','سيارة كهربائية – حذاء تزلج – كتب تلوين','مسدس مائي – شاحنات – هاتف – حذاء تزلج','مسدس كهربائي – هاتف – حذاء تزلج – كتب تلوين'],1),
B(0,'رياضيات','مطعم شاورما يخصم 10% على أصناف الدجاج. اشترت ليلى: شاورما دجاج صغير (1.000 BD)، وصحني شاورما تكة لحم متوسط (2.400 BD للصحن)، وشاورما تكة دجاج متوسط (1.800 BD). كم دفعت؟',['BD 5.080','BD 6.840','BD 7.320','BD 7.600'],2),
B(0,'رياضيات','إيرادات شركة عام 2020 كانت 605 مليون دينار، ونسبة النمو السنوي 10% ثابتة. ما إيرادات عام 2022 المتوقعة (مليون)؟',['66.56','127.05','665.50','732.05'],3),
B(1,'رياضيات','أراد فيصل شراء تلفاز و4 مكيفات. السعر شامل ضريبة 10%: التلفاز 143 BD والمكيف 275 BD. لا تُحتسب الضريبة على المكيفات فقط عند شراء 3 مكيفات أو أكثر. كم دفع فيصل؟',['BD 1130','BD 1143','BD 1230','BD 1243'],1),
B(1,'رياضيات','لدى إبراهيم أربعة أولاد: أنور، أسامة، معين، علاء، أعمارهم 28، 47، 50، 55 دون ترتيب. أنور أصغر من أسامة، وأسامة أصغر من معين، ومعين ليس أكبرهم. ما عمر علاء؟',['28','47','50','55'],3),
B(1,'رياضيات','تبيع محمصة نوعين من القهوة: الأول 6 BD للكيس والثاني 4 BD للكيس. كان إيراد يوم 46 BD من بيع كيسين على الأقل من كل نوع. ما أكبر عدد أكياس باعتها؟',['8','9','10','11'],2),
B(2,'رياضيات','تحتاج عائلة لقطع 450 km كحد أدنى، وسيارتها تستهلك من 12 إلى 15 لتراً لكل 100 km، وسعر اللتر بين 0.150 و0.200 BD. ما أقل تكلفة وقود؟',['BD 8.100','BD 10.125','BD 11.220','BD 15.000'],0),
B(2,'رياضيات','رقم سري من 4 أرقام مختلفة: مجموع الرقمين الأول والثاني 6، وحاصل ضرب الثالث والرابع 6. كم رقماً سرياً ممكناً؟',['3','6','12','28'],2),
B(2,'رياضيات','3 عمال يصنعون كرسيين في 3 ساعات. كم عاملاً يلزم لصناعة 12 كرسياً في 6 ساعات (بالسرعة نفسها)؟',['6','9','12','18'],1),
B(3,'رياضيات','في كيس كرات صفراء وحمراء وزرقاء: 8 كرات ليست صفراء، و12 كرة ليست حمراء، و10 كرات ليست زرقاء. كم عدد الكرات الزرقاء؟',['5','10','15','20'],0),
B(3,'English','Foxes: Which statement is true? (Foxes reach speeds up to 48 km/h; they weigh 5–10 kg; fur changes with the season; eyes switch to night vision.)',['Their fur remains the same throughout the year.','Their size is similar to their domestic relatives.','They are fast runners and good hunters.','They can’t see well in the dark.'],2),
B(3,'English','What makes foxes highly adaptable to various environments? (Text: “Their flexible diet, enabling them to survive on whatever food is available, means they can live almost anywhere.”)',['They feed on a variety of food from different sources.','They dig homes with multiple ways out for quick escape.','They live in both natural and human-made environments.','They are known to be exceptionally intelligent.'],0),
B(4,'English','Foxes mark their hunting area to…  (Text: the territory of 4–8 km² “satisfies the feeding needs of the fox and his family”.)',['store food underground.','protect their homes.','hide from their enemies.','establish a broad feeding area.'],3),
B(4,'English','When did fox hunting become a leisure activity in the UK? (16th c.: farmers used dogs; 17th c.: replaced deer hunting as a fashionable hobby; 19th c.: trains made it accessible.)',['in the 16th century','in the 17th century','in the 19th century','in the 20th century'],1),
B(0,'رياضيات','صمم حسن شفرة: كل حرف إنجليزي يُستبدل بعدد من رقمين حسب ترتيبه (A=01, B=02, … Z=26). ما الشفرة الصحيحة لكلمة (BAHRAIN)؟',['02010818010914','218181914','2010818010914','02010814010918'],0),
B(0,'رياضيات','رقم أيمن الأكاديمي من 8 أرقام: أول 4 أرقام سنة دخوله الثانوية، وآخر 4 أرقام تسلسله، وتسلسله يساوي نصف السنة. التحق في التسعينات (1990–1999). كم رقماً أكاديمياً ممكناً؟',['1','4','5','10'],2),
B(0,'عربي','ما علة نصب كلمة (متخصصين) في جملة: يجعلنا نظام التعليم متخصصين؟',['تمييز ملحوظ','حال مفردة','مفعول به أول','مفعول به ثانٍ'],3),
B(0,'عربي','أسند الفعل (ارتقى) إلى المثنى المذكر الغائب في الماضي، فيصبح:',['ارتقى','ارتقيا','ارتقوا','ارتقتا'],1),
B(0,'عربي','ما معنى كلمة (يعسر) في عبارة: يعسر على المثقف أن يتمالك نفسه؟',['يجب على','يشق على','ينبغي على','يشد على'],1),
B(0,'رياضيات','قميص سعره 20 BD وعليه خصم 25%. كم سعره بعد الخصم؟',['BD 5','BD 15','BD 17.5','BD 25'],1),
B(0,'English','If I ___ more time, I would read more books.',['have','had','will have','having'],1),
B(1,'رياضيات','يعد حامد نوعين من الوجبات: الأول نصف ساعة وسعره 6 BD، والثاني ربع ساعة وسعره 4 BD. عمل 5 ساعات متواصلة وباع كل الوجبات بـ 66 BD. كم وجبة باع من النوع الأول؟',['1','6','7','13'],2),
B(1,'رياضيات','وزعت مدرسة 200 بطاقة مرقمة من 100 إلى 300؛ البطاقات التي يحتوي عددها على الرقمين 7 و2 زرقاء والباقي أحمر (137 حمراء، 127 زرقاء). كم بطاقة زرقاء؟',['21','22','23','24'],0),
B(1,'عربي','ما إعراب كلمة (الثقافة) في جملة: إن الثقافة تنمي العقل؟',['مبتدأ مرفوع','اسم إن منصوب وعلامة نصبه الفتحة','فاعل مرفوع','خبر إن مرفوع'],1),
B(1,'عربي','أي الجمل الآتية فيها أسلوب نفي؟',['ما أروع قلعة البحرين!','ما زرتُ القلعة هذا العام','ما زيارتك للقلعة؟','ما شاء الله'],1),
B(1,'رياضيات','ما متوسط الأعداد 12 و18 و30؟',['15','18','20','22'],2),
B(1,'English','What is the best synonym for the word “adaptable”?',['rigid','flexible','dangerous','noisy'],1),
B(1,'عربي','ما ضد كلمة (الإقصاء)؟',['الاستبعاد','الاحتواء','الإبعاد','الطرد'],1),
B(2,'رياضيات','للجد فيصل 21 حفيداً: 10 أعمارهم دون 5 سنوات (يعطيهم 1 أو 2 BD)، و3 بعمر 8 سنوات (3 أو 5 BD)، و5 فوق 20 سنة (سلام فقط)، والبقية بين 10 و20 سنة (10 أو 20 BD). ما أقل مبلغ يضمن به إعطاء الجميع في كل الحالات؟',['BD 35','BD 49','BD 72','BD 95'],3),
B(2,'رياضيات','كون خالد رمز دخول من 4 أرقام مختلفة: عدد فردي يقبل القسمة على 7 ومجموع أرقامه 30. كم خياراً لديه؟',['1','2','3','12'],0),
B(2,'عربي','اسم الفاعل من الفعل (اجتهد) هو:',['مُجتهِد','مُجتهَد','اجتهاد','يجتهد'],0),
B(2,'عربي','أي أسلوب في قولنا: ليت الشباب يعود يوماً؟',['تمنٍّ','نداء','استفهام','نهي'],0),
B(2,'رياضيات','قطعت سيارة 90 km بسرعة ثابتة 60 km/h. كم ساعة استغرقت؟',['1 ساعة','1.5 ساعة','2 ساعة','3 ساعات'],1),
B(2,'English','Which sentence is correct?',['She live in Bahrain since 2015.','She has lived in Bahrain since 2015.','She living in Bahrain since 2015.','She have lived in Bahrain since 2015.'],1),
B(2,'رياضيات','اشترت دلال أربعة منتجات أسعارها 1.100 و1.200 و1.400 و1.300 BD، ومنتجان فقط عليهما ضريبة 5%. ما المبلغ الذي دفعته بحيث لا تستطيع تحديد المنتجين الخاضعين للضريبة؟',['BD 5.115','BD 5.120','BD 5.125','BD 5.130'],2),
B(3,'رياضيات','تكتب خديجة بحثاً بسيطاً في 8–9 ساعات (30 BD) ومعقداً في 10–11 ساعة (45 BD). عملت 208 ساعات وأنجزت 10 بحوث على الأقل من كل نوع. ما أكبر مبلغ يمكنها الحصول عليه؟',['BD 750','BD 795','BD 840','BD 870'],3),
B(3,'رياضيات','ربح وائل من سيارة بمواصفات عالية 2500 BD، ومتوسطة 1600 BD، وأساسية 900 BD. ربح 10700 BD من بيع 5 سيارات. كم سيارة متوسطة باع؟',['2','3','4','5'],0),
B(3,'عربي','ما الصورة البيانية في قولنا: الثقافة نور يضيء العقل؟',['استعارة مكنية','تشبيه بليغ','كناية','مجاز مرسل'],1),
B(3,'عربي','ما معنى العبارة الكنائية: فلان كثير الرماد؟',['بخيل','كريم','فقير','مهمل'],1),
B(3,'رياضيات','ما العدد التالي في المتتالية: 2، 6، 18، 54، ؟',['108','144','162','216'],2),
B(3,'English','What is the opposite of “beneficial”?',['helpful','useful','harmful','valuable'],2),
B(3,'English','Baby foxes are born blind and deaf, without teeth and unable to walk. They remain that way for about nine days. During that time, they stay with their mother while the father brings them food. What does “that time” refer to?',['The period when parents teach survival skills.','The days when the baby foxes cannot see, hear or walk.','The time when babies begin to come out of their homes.','The period when the father brings food.'],1),
B(4,'رياضيات','أسعار سيارات (دينار): النوع X: 13500 متدنية، 15500 متوسطة، 18500 عالية. النوع Y: 14000 متدنية، 16000 متوسطة، 23000 عالية. النوع Z: 17000 و20000 و24000. أنفق مهند 50000 BD كاملة على 3 سيارات، واحدة فقط من النوع Y، ولا تتكرر السيارة نفسها بنوعها ومميزاتها. كم سعر سيارة Y؟',['14000','16000','18500','23000'],1),
B(4,'رياضيات','حجز عدنان غرفة X لـ 3 ليال (55 BD) ثم غيّرها إلى غرفة Z لـ 5 ليال (161 BD) وعليها خصم 30% لمن يستأجر أكثر من 4 ليال. كم المبلغ الإضافي؟',['BD 36.700','BD 57.700','BD 74.200','BD 106.000'],1),
B(4,'رياضيات','مسابقة: المرحلة 1 (6 أسئلة): +8 لكل صحيحة. المرحلة 2 (4 أسئلة): +12 لكل صحيحة و−4 لكل خاطئة. المرحلة 3 (2 سؤال): الصحيحة تضاعف مجموع النقاط والخاطئة تنقصه للنصف. أجاب فريق 4 صحيحة في الأولى، و3 في الثانية، ولا صحيحة في الثالثة. ما نتيجته؟',['16','17','32','64'],0),
B(4,'رياضيات','يخرج محمود الساعة 3:30 لمقابلة الساعة 4:00. الطرق (المسافة km، السرعة km/h، زمن التأخر min): الأول 27، 80، 8 — الثاني 30، 100، 4 — الثالث 40، 120، 7 — الرابع 25، 100، 9. أي طريق أسرع؟',['الأول','الثاني','الثالث','الرابع'],1),
B(4,'رياضيات','بدأت زينب العمل في يناير 2006. الشركة 1: 935 BD وزيادة 2.25% كل يناير. الشركة 2: 940 BD وزيادة 3% من سبتمبر بعد مرور سنة. الشركة 3: 963 BD وزيادة 1.25% في شهر بدء العمل بعد سنة. الشركة 4: 1000 BD دون زيادة. في مارس 2009 كان راتب زينب أكبر من رواتب صديقاتها الثلاث. في أي شركة تعمل؟',['الأولى','الثانية','الثالثة','الرابعة'],3),
B(4,'رياضيات','كم يساوي 15% من 240؟',['24','30','36','48'],2),
B(4,'English','He ___ the exam yesterday and got full marks.',['pass','passes','passed','has pass'],2),
B(4,'English','Which word best describes the common behaviour of foxes?',['lonely','playful','social','individual'],3)];
const GOOD=['ممتاز! عقلك يلمع مثل لؤلؤ البحرين 🦪','أحسنت! أنت نجم من نجوم البحرين ⭐','رائع! واصل التميّز 🌟','إجابة صحيحة! نفتخر فيك 🇧🇭','يا سلام عليك! مبدع ومبدعة 👏','هكذا يكون التميّز! كمّل بنفس الحماس 🔥'];
const BAD=['لا بأس، التعلّم يبدأ بالمحاولة 💪','قريب! راجع الحل وكمّل بثقة','كل خطأ خطوة نحو التميّز 🌱','لا تستسلم، الدرب يحتاج صبراً مثل الغوص على اللؤلؤ 🌊'];
const pick=a=>a[Math.random()*a.length|0];
/* audio */
let ac,mt,mus=false;
const ctx=()=>{ac=ac||new(window.AudioContext||window.webkitAudioContext)();if(ac.state=='suspended')ac.resume();return ac};
function tone(f,t,d,v=.05,ty='sine'){try{const c=ctx(),o=c.createOscillator(),g=c.createGain();o.type=ty;o.frequency.value=f;g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(v,t+.05);g.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(g);g.connect(c.destination);o.start(t);o.stop(t+d+.1)}catch(e){}}
function sfx(ok){try{const t=ctx().currentTime;if(ok){tone(660,t,.3,.12,'triangle');tone(880,t+.13,.4,.12,'triangle');tone(1175,t+.26,.5,.1,'triangle')}else{tone(200,t,.35,.12,'sawtooth');tone(150,t+.18,.45,.12,'sawtooth')}}catch(e){}}
function music(on){mus=on;clearInterval(mt);const b=$('#mb');if(b)b.textContent=on?'🔊 موسيقى':'🔇 موسيقى';if(!on)return;const sc=[261.6,293.7,329.6,392,440,523.3];const p=()=>{const t=ctx().currentTime;tone(sc[Math.random()*6|0]/2,t,4.5,.04);if(Math.random()<.7)tone(sc[Math.random()*6|0],t+1,3.5,.03)};p();mt=setInterval(p,2300)}
/* shell */
function shell(h){app.innerHTML=`<div class="top"><div class="brand">🇧🇭 درب التميّز</div><div class="row" style="flex:none"><button class="ghost sm" id="mb">${mus?'🔊':'🔇'} موسيقى</button><button class="ghost sm" id="hm">الرئيسية</button></div></div>${h}`;$('#mb').onclick=()=>music(!mus);$('#hm').onclick=home}
function clean(){unsubs.forEach(u=>u());unsubs=[]}
function home(){clean();shell(`<div class="card stage"><div class="row" style="justify-content:center"><div style="max-width:130px">${ch('boy')}</div><div style="max-width:130px">${ch('girl')}</div></div><h2>مرحباً بك في درب التميّز</h2><p>رحلة ممتعة بين معالم البحرين التراثية، تتدرّب فيها على أسئلة الاختبارات الوطنية للصف الثاني عشر.</p><div class="row"><button id="s">🎒 أنا طالب/ـة</button><button class="alt" id="t">👩‍🏫 أنا معلم/ـة</button></div>${db?'':'<p class="mut">تنبيه: حفظ النتائج غير متاح في هذا المتصفح.</p>'}</div>`);$('#s').onclick=studentForm;$('#t').onclick=teacherLogin;music&&0}
/* student */
async function studentForm(){let T=(window.TEACHERS||[]).map(x=>({id:x.id,name:x.name}));if(db){try{const sn=await db.collection('teachers').get();sn.docs.forEach(d=>{if(!T.find(y=>y.id==d.id))T.push({id:d.id,name:d.data().name})})}catch(e){}}
shell(`<div class="card"><h2>بيانات الطالب/ـة</h2><label>الاسم</label><input id="n" value="${esc(S.name)}"><label>الصف / الشعبة</label><input id="g" value="${esc(S.grade)}" placeholder="مثال: 12 علمي – شعبة 3"><label>المدرسة</label><input id="sc" value="${esc(S.school)}"><label>المعلم/ـة</label><select id="tt"><option value="">— بدون معلم/ـة —</option>${T.map(t=>`<option value="${t.id}" data-n="${esc(t.name)}" ${t.id==S.tid?'selected':''}>${esc(t.name)}</option>`).join('')}</select><label>اختر شخصيتك</label><div class="chars"><label><input type="radio" name="c" value="boy" ${S.g=='boy'?'checked':''}><div>${ch('boy')}<b>بطل البحرين</b></div></label><label><input type="radio" name="c" value="girl" ${S.g=='girl'?'checked':''}><div>${ch('girl')}<b>بطلة البحرين</b></div></label></div><p id="er" class="msg no hid">أكمل الاسم والصف والمدرسة</p><button id="go">ابدأ الرحلة 🚀</button></div>`);
$('#go').onclick=()=>{S.name=$('#n').value.trim();S.grade=$('#g').value.trim();S.school=$('#sc').value.trim();const o=$('#tt').selectedOptions[0];S.tid=o.value;S.tname=o.dataset.n||'';S.g=document.querySelector('input[name=c]:checked').value;if(!S.name||!S.grade||!S.school){$('#er').classList.remove('hid');return}music(true);start()}}
async function start(){S.sid=uid();S.st=0;S.qi=0;S.ans=[];S.score=0;let X=[];if(db&&S.tid){try{const sn=await db.collection('questions').where('teacher','==',S.tid).get();X=sn.docs.map(d=>({...d.data(),id:d.id}))}catch(e){}}
S.qs=ST.map((_,i)=>[...BASE.filter(q=>q.s==i),...X.filter(q=>q.stage==i).map(q=>({s:i,t:q.subject||'المعلمة',q:q.q,o:q.o,a:q.a}))]);S.qs=S.qs.map(a=>a.sort(()=>Math.random()-.5));S.qs.forEach((a,i)=>{if(!a.length)a.push(null)});S.qs=S.qs.map(a=>a.filter(Boolean));S.tot=S.qs.reduce((n,a)=>n+a.length,0);save(false);intro()}
let chain=Promise.resolve();
function save(done){if(!db)return;const d={teacher:S.tid,tname:S.tname,name:S.name,grade:S.grade,school:S.school,g:S.g,score:S.score,total:S.tot,answered:S.ans.length,done:!!done,ts:Date.now(),ans:S.ans};chain=chain.then(()=>db.doc('results/'+S.sid).set(d)).catch(e=>{console.error('save',e);const b=document.getElementById('sv');if(b){b.textContent='⚠️ تعذّر حفظ الحل عند المعلمة: '+(e.code||e.message);b.classList.remove('hid')}})}
function intro(){while(S.st<ST.length&&!S.qs[S.st].length)S.st++;if(S.st>=ST.length)return finish();const p=ST[S.st];S.qi=0;
shell(`<div class="card stage"><div class="mut">المرحلة ${S.st+1} من ${ST.length}</div><div class="big">${p.e}</div><h2>${p.n}</h2><p>${p.f}</p><div style="max-width:120px;margin:auto">${ch(S.g)}</div><p>${S.g=='boy'?'يا بطل':'يا بطلة'} ${esc(S.name)}، أمامك ${S.qs[S.st].length} أسئلة. بالتوفيق!</p><button id="nx">ندخل المكان ➜</button></div>`);$('#nx').onclick=ask}
function ask(){const q=S.qs[S.st][S.qi],p=ST[S.st],pc=(S.ans.length/S.tot*100)|0,en=q.t=='English';
shell(`<div class="card"><div class="mini">${ch(S.g)}<div><b>${p.e} ${p.n}</b><div class="mut">سؤال ${S.qi+1} من ${S.qs[S.st].length} · ${esc(q.t)} · نقاطك: ${S.score}</div></div></div><div id="sv" class="msg no hid"></div><div class="bar"><i style="width:${pc}%"></i></div><h3 ${en?'dir="ltr" style="text-align:left"':''}>${esc(q.q)}</h3><div id="os">${q.o.map((o,i)=>`<button class="opt" data-i="${i}" ${en?'dir="ltr" style="text-align:left"':''}>${'أبجد'[i]}) ${esc(o)}</button>`).join('')}</div><div id="fb"></div></div>`);
document.querySelectorAll('.opt').forEach(b=>b.onclick=()=>{const i=+b.dataset.i,ok=i==q.a;document.querySelectorAll('.opt').forEach(x=>{x.disabled=true;if(+x.dataset.i==q.a)x.classList.add('ok')});if(!ok)b.classList.add('no');if(ok)S.score++;sfx(ok);
S.ans.push({st:p.n,q:q.q,sub:q.t,pick:q.o[i],right:q.o[q.a],ok});save(false);
const last=S.qi+1>=S.qs[S.st].length;$('#fb').innerHTML=`<div class="msg ${ok?'ok':'no'}">${ok?pick(GOOD):pick(BAD)}</div>${ok?'':`<div class="mut">الإجابة الصحيحة: ${esc(q.o[q.a])}</div>`}<br><button id="n2">${last?'إنهاء المكان ✔':'السؤال التالي ➜'}</button>`;
$('#n2').onclick=()=>{if(last){S.st++;intro()}else{S.qi++;ask()}}})}
function finish(){save(true);const pc=Math.round(S.score/S.tot*100);const m=pc>=80?'أداء مذهل! أنت من المتميّزين 🏆':pc>=50?'أداء جميل، قليل من المراجعة ويصير ممتاز 🌟':'بداية طيبة! أعد الرحلة وستتحسّن بإذن الله 💪';
shell(`<div class="card stage"><div style="max-width:150px;margin:auto">${ch(S.g)}</div><h2>أكملت درب التميّز 🎉</h2><div class="big">${S.score} / ${S.tot}</div><p>${m}</p><p class="mut">${db&&S.tid?'تم حفظ حلّك عند المعلم/ـة '+esc(S.tname):db?'تم حفظ حلّك':'لم يُحفظ الحل (الحفظ غير متاح)'}</p><div id="sv" class="msg no hid"></div><div class="row"><button id="re">🔁 إعادة البرنامج</button><button class="ghost" id="hh">الرئيسية</button></div></div>`);$('#re').onclick=start;$('#hh').onclick=home}
/* teacher */
const sha=async s=>[...new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode('darb|'+s)))].map(b=>b.toString(16).padStart(2,'0')).join('');
async function teacherLogin(msg){let T=[...(window.TEACHERS||[])];if(db){try{T=[...T,...(await db.collection('teachers').get()).docs.map(d=>({id:d.id,...d.data()}))].filter((x,i,a)=>a.findIndex(y=>y.id==x.id)==i)}catch(e){}}
shell(`<div class="card"><h2>دخول المعلم/ـة</h2>${!db?'<p class="msg no">التخزين غير متاح في هذا المتصفح.</p>':''}<label>الاسم</label><select id="tn">${T.map(t=>`<option value="${t.id}">${esc(t.name)}</option>`).join('')}</select><label>كلمة المرور</label><input id="pw" type="password">${msg?`<p class="msg no">${msg}</p>`:''}<button id="lg">دخول</button></div>${!isOwner?'<button class="ghost sm" id="adm">🔑 إدارة المعلمين</button>':''}${isOwner?`<div class="card"><h3>إضافة معلم/ـة (لمالك الصفحة فقط)</h3><input id="an" placeholder="اسم المعلم/ـة"><input id="ap" placeholder="كلمة المرور"><button class="alt" id="ad">إضافة</button><div class="mut">${T.map(t=>esc(t.name)+' <a href="#" data-d="'+t.id+'">حذف</a>').join(' · ')}</div></div>`:''}`);
$('#lg').onclick=async()=>{const t=T.find(x=>x.id==$('#tn').value);if(!t)return teacherLogin('لا يوجد معلم مسجّل');if(await sha(t.id+$('#pw').value)==t.hash){S.teacher=t;dash()}else teacherLogin('كلمة المرور غير صحيحة')};
const am=$('#adm');if(am)am.onclick=()=>{if(prompt('رمز الإدارة')===CONFIG.ADMIN_CODE){isOwner=true;teacherLogin()}else alert('رمز غير صحيح')};
if(isOwner){$('#ad').onclick=async()=>{const n=$('#an').value.trim(),p=$('#ap').value;if(!n||!p)return;const r=db.collection('teachers').doc();const hs=await sha(r.id+p);await r.set({name:n,hash:hs});if(!window.FIREBASE_ON)prompt('انسخي هذا السطر وضعيه داخل ملف teachers.js ثم ارفعيه على GitHub لتدخل المعلمة من أي جهاز:','{id:"'+r.id+'",name:"'+n.replace(/"/g,'')+'",hash:"'+hs+'"},');teacherLogin()};document.querySelectorAll('[data-d]').forEach(a=>a.onclick=async e=>{e.preventDefault();await db.doc('teachers/'+a.dataset.d).delete();teacherLogin()})}}
function dash(){const t=S.teacher;let R=[],Q=[];
shell(`<div class="card"><h2>أهلاً ${esc(t.name)} 👩‍🏫</h2><div class="row"><button id="t1">نتائج الطلبة</button><button class="alt" id="t2">أسئلتي الإضافية</button></div></div><div id="pn"></div>`);
const rr=()=>{R=R.sort((a,b)=>b.ts-a.ts);$('#pn').innerHTML=`<div class="card"><h3>نتائج الطلبة (${R.length})</h3><div class="scroll"><table><tr><th>الاسم</th><th>الصف</th><th>المدرسة</th><th>الدرجة</th><th>الحالة</th><th></th></tr>${R.map(r=>`<tr><td>${esc(r.name)}</td><td>${esc(r.grade)}</td><td>${esc(r.school)}</td><td>${r.score}/${r.total}</td><td>${r.done?'مكتمل':'جارٍ '+r.answered}</td><td><button class="sm ghost" data-v="${r.id}">التفاصيل</button> <button class="sm ghost" data-x="${r.id}">🗑</button></td></tr><tr class="hid" id="d${r.id}"><td colspan="6">${(r.ans||[]).map((a,i)=>`<div>${a.ok?'✅':'❌'} ${i+1}) ${esc(a.q).slice(0,90)}… <span class="mut">اختار: ${esc(a.pick)}${a.ok?'':' | الصحيح: '+esc(a.right)}</span></div>`).join('')}</td></tr>`).join('')}</table></div></div>`;
document.querySelectorAll('[data-v]').forEach(b=>b.onclick=()=>$('#d'+b.dataset.v).classList.toggle('hid'));document.querySelectorAll('[data-x]').forEach(b=>b.onclick=()=>confirm('حذف هذه النتيجة؟')&&db.doc('results/'+b.dataset.x).delete())};
const qq=()=>{$('#pn').innerHTML=`<div class="card"><h3>إضافة سؤال جديد</h3><label>المرحلة (المكان)</label><select id="qs">${ST.map((s,i)=>`<option value="${i}">${s.e} ${s.n}</option>`).join('')}</select><label>المادة</label><input id="qj" placeholder="رياضيات / عربي / English"><label>نص السؤال</label><textarea id="qt" rows="3"></textarea>${[0,1,2,3].map(i=>`<input class="qo" placeholder="الخيار ${i+1}">`).join('')}<label>الإجابة الصحيحة</label><select id="qa">${[1,2,3,4].map((n,i)=>`<option value="${i}">الخيار ${n}</option>`).join('')}</select><p id="qe" class="msg no hid">أكمل السؤال والخيارات</p><button id="qb">حفظ السؤال</button></div><div class="card"><h3>أسئلتي (${Q.length})</h3>${Q.map(q=>`<div class="mini"><span>${ST[q.stage]?.e} ${esc(q.q).slice(0,80)}</span><button class="sm ghost" data-q="${q.id}">🗑</button></div>`).join('')||'<p class="mut">لم تضف أسئلة بعد.</p>'}</div>`;
$('#qb').onclick=async()=>{const o=[...document.querySelectorAll('.qo')].map(x=>x.value.trim()),q=$('#qt').value.trim();if(!q||o.some(x=>!x))return $('#qe').classList.remove('hid');await db.collection('questions').add({teacher:t.id,stage:+$('#qs').value,subject:$('#qj').value.trim()||'المعلمة',q,o,a:+$('#qa').value,ts:Date.now()});qq()};
document.querySelectorAll('[data-q]').forEach(b=>b.onclick=()=>db.doc('questions/'+b.dataset.q).delete())};
let mode='r';$('#t1').onclick=()=>{mode='r';rr()};$('#t2').onclick=()=>{mode='q';qq()};
unsubs.push(db.collection('results').where('teacher','==',t.id).onSnapshot(s=>{R=s.docs.map(d=>({...d.data(),id:d.id}));if(mode=='r')rr()}));
unsubs.push(db.collection('questions').where('teacher','==',t.id).onSnapshot(s=>{Q=s.docs.map(d=>({...d.data(),id:d.id}));if(mode=='q')qq()}));
rr()}
home();
db=window.localDB;home();
