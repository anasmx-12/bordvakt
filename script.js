(function(){
var feed=[{bord:3,text:'Bord 3 behöver dukas av',typ:'Avdukning',prio:'hög',level:'high'},{bord:7,text:'Bord 7 – tomma glas',typ:'Påfyllning',prio:'medel',level:'mid'},{bord:12,text:'Bord 12 söker kontakt',typ:'Service',prio:'hög',level:'high'},{bord:5,text:'Bord 5 redo för nästa sällskap',typ:'Ledigt',prio:'info',level:'info'},{bord:9,text:'Bord 9 – läge för dessert',typ:'Mersälj',prio:'medel',level:'mid'},{bord:1,text:'Bord 1 behöver dukas av',typ:'Avdukning',prio:'hög',level:'high'}];
function chip(l){return l==='high'?['#C2410C','#FFFFFF']:l==='mid'?['#FED7AA','#7C2D12']:['#DBEAFE','#1E3A8A'];}
var idx=0,flip=false,ago=['nu','1 min','2 min','4 min'];
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
function render(){
 var n=feed.length,vis=[0,1,2,3].map(function(k){return feed[(idx-k+n*4)%n];});
 var t=vis[0],c=chip(t.level),tc=document.getElementById('topChip');
 tc.style.background=c[0];tc.style.color=c[1];tc.textContent=t.bord;
 document.getElementById('topText').textContent=t.text;
 document.getElementById('topMeta').textContent=t.typ+' · Prio '+t.prio+' · nu';
 var tn=document.getElementById('topNotif');tn.className=flip?'nin-a':'nin-b';
 document.getElementById('rest').innerHTML=vis.slice(1).map(function(v,i){var c=chip(v.level);return '<div style="display:flex;gap:12px;align-items:flex-start;padding:10px 12px;border-radius:12px;border:1px solid #EEECE6;background:#FFFFFF"><div style="flex:none;width:32px;height:32px;border-radius:9px;background:'+c[0]+';color:'+c[1]+';display:flex;align-items:center;justify-content:center;font-family:\'Space Grotesk\',sans-serif;font-weight:700;font-size:14px">'+v.bord+'</div><div style="display:flex;flex-direction:column;gap:1px;min-width:0"><div style="font-weight:600;font-size:13px">'+esc(v.text)+'</div><div style="font-size:11.5px;color:#4B5563">'+esc(v.typ)+' · Prio '+v.prio+' · '+ago[i+1]+'</div></div></div>';}).join('');
 var by={};vis.forEach(function(v){if(!by[v.bord])by[v.bord]=v;});
 var base='aspect-ratio:1/1;border-radius:10px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1px;transition:background .4s,color .4s;',h='';
 for(var i=1;i<=12;i++){var v=by[i],st=base+'background:#FFFFFF;color:#4B5563;border:1px solid #E4E2DB;',lb='OK';if(v){var cc=chip(v.level);st=base+'background:'+cc[0]+';color:'+cc[1]+';border:1px solid '+cc[0]+';';lb=v.typ;}
 h+='<div style="'+st+'"><span style="font-size:15px;font-weight:700;font-family:\'Space Grotesk\',sans-serif">'+i+'</span><span style="font-size:9.5px;font-weight:600">'+lb+'</span></div>';}
 document.getElementById('tables').innerHTML=h;
}
render();setInterval(function(){idx=(idx+1)%feed.length;flip=!flip;render();},2800);
var s={bord:24,sitt:2,spar:5,nota:900};
function fmt(x){return Math.round(x).toLocaleString('sv-SE');}
function calc(){var e=s.bord*s.sitt*(s.spar/90),m=e*s.nota*26;
 document.getElementById('v-bord').textContent=s.bord;document.getElementById('v-sitt').textContent=s.sitt;document.getElementById('v-spar').textContent=s.spar;document.getElementById('v-nota').textContent=fmt(s.nota);
 document.getElementById('v-extra').textContent=e.toLocaleString('sv-SE',{maximumFractionDigits:1});document.getElementById('v-month').textContent=fmt(m);document.getElementById('v-year').textContent=fmt(m*12);}
document.querySelectorAll('input[type=range][data-k]').forEach(function(el){el.addEventListener('input',function(){s[el.dataset.k]=Number(el.value);calc();});});
calc();
var f=document.getElementById('demoForm');
f.addEventListener('submit',function(e){e.preventDefault();
 /* TODO: skicka formuläret till er backend, t.ex. Formspree eller e-post */
 document.getElementById('formBox').hidden=true;document.getElementById('sentBox').hidden=false;});
document.getElementById('resetBtn').addEventListener('click',function(){f.reset();document.getElementById('formBox').hidden=false;document.getElementById('sentBox').hidden=true;});
})();
