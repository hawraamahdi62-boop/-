/* تخزين محلي (localStorage) يحاكي واجهة قاعدة البيانات التي يستعملها app.js.
   البيانات تبقى في المتصفح/الجهاز نفسه فقط. لربط الأجهزة ببعضها استبدلي هذا الملف بمحوّل Firebase أو Supabase. */
(function(){
const K='darb:';const L=[];
const rd=c=>{try{return JSON.parse(localStorage.getItem(K+c))||{}}catch(e){return{}}};
const wr=(c,o)=>{localStorage.setItem(K+c,JSON.stringify(o));L.forEach(f=>f())};
const rid=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,7);
const snap=(c,f)=>{const o=rd(c);const docs=Object.keys(o).map(id=>({id,exists:true,data:()=>o[id]})).filter(d=>f.every(([k,op,v])=>d.data()[k]===v));return{docs,size:docs.length,empty:!docs.length}};
function q(c,f){return{where:(k,op,v)=>q(c,[...f,[k,op,v]]),get:async()=>snap(c,f),onSnapshot(next){const run=()=>next(snap(c,f));L.push(run);run();return()=>{const i=L.indexOf(run);if(i>-1)L.splice(i,1)}}}}
function dref(c,id){return{id,path:c+'/'+id,set:async d=>{const o=rd(c);o[id]=d;wr(c,o)},update:async d=>{const o=rd(c);o[id]={...o[id],...d};wr(c,o)},delete:async()=>{const o=rd(c);delete o[id];wr(c,o)},get:async()=>{const o=rd(c);return{id,exists:id in o,data:()=>o[id]}}}}
window.localDB={
 collection:c=>({...q(c,[]),doc:id=>dref(c,id||rid()),add:async d=>{const r=dref(c,rid());await r.set(d);return r}}),
 doc:p=>{const[c,id]=p.split('/');return dref(c,id)}
};
window.addEventListener('storage',()=>L.forEach(f=>f()));
})();
