(function(){var doc=document,root=doc.documentElement;root.classList.add("js");var reduce=false;try{var rmq=window.matchMedia("(prefers-reduced-motion: reduce)");reduce=rmq.matches;rmq.addEventListener("change",function(ev){reduce=ev.matches;});}catch(err){}
var BLOB={live:false,games:0,cards:{},tl:{}};try{BLOB=JSON.parse(doc.getElementById("tl-cards").textContent||"{}")||BLOB;}catch(err){}
function cdnOk(){return !(window.tlCdn&&window.tlCdn.off);}

var TODAY_TZ=(function(){try{var o={};new Intl.DateTimeFormat("en-US",{timeZone:BLOB.tz||"America/Chicago",year:"numeric",month:"2-digit",day:"2-digit"}).formatToParts(new Date()).forEach(function(x){o[x.type]=x.value;});return (o.year&&o.month&&o.day)?(o.year+"-"+o.month+"-"+o.day):"";}catch(err){return "";}
})();function bdOk(day){return !TODAY_TZ||day===TODAY_TZ;}
[].slice.call(doc.querySelectorAll(".tg[data-day]")).forEach(function(t){if(!bdOk(t.getAttribute("data-day"))){t.hidden=true;}});if(!cdnOk()){[].slice.call(doc.querySelectorAll("img[data-cdn]")).forEach(function(im){if(!im.complete){im.classList.add("err");im.removeAttribute("src");}});}
function rowName(row){var nm=row.querySelector(".nm"),f=nm?nm.querySelector(".fn"):null,l=nm?nm.querySelector(".ln"):null;if(f&&l){return (f.textContent+l.textContent).trim();}
return nm&&nm.firstChild?String(nm.firstChild.nodeValue||nm.firstChild.textContent||"").trim():"";}
function store(k,v){try{if(v===null){localStorage.removeItem(k);}else{localStorage.setItem(k,v);}}catch(err){}}
function load(k){try{return localStorage.getItem(k);}catch(err){return null;}}
var cfIO=null,cfOnce={},raAuto=null;   


var tbtn=doc.getElementById("theme-btn");function systemTheme(){try{return window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark";}catch(err){return "dark";}}
function currentTheme(){var a=root.getAttribute("data-theme");return (a==="light"||a==="dark")?a:systemTheme();}
function paintTheme(){if(!tbtn)return;var cur=currentTheme(),next=cur==="dark"?"light":"dark";tbtn.setAttribute("data-mode",cur);tbtn.setAttribute("aria-label","Switch to "+next+" theme");tbtn.title="Switch to "+next+" theme";}
if(tbtn){tbtn.addEventListener("click",function(){var next=currentTheme()==="dark"?"light":"dark";root.classList.add("no-fx");root.setAttribute("data-theme",next);store("titan.theme",next);paintTheme();if(window.requestAnimationFrame){requestAnimationFrame(function(){requestAnimationFrame(function(){root.classList.remove("no-fx");});});}
else{root.classList.remove("no-fx");}
});paintTheme();if(window.MutationObserver){new MutationObserver(paintTheme).observe(root,{attributes:true,attributeFilter:["data-theme"]});}
try{window.matchMedia("(prefers-color-scheme: light)").addEventListener("change",paintTheme);}catch(err){}
}


var nbtn=doc.getElementById("nfl-btn"),npop=doc.getElementById("nfl-pop"),ncur=nbtn?nbtn.querySelector(".nfl-cur"):null;var nopts=npop?[].slice.call(npop.querySelectorAll("[data-nfl]")):[];function nflKnown(c){var i;if(!c)return false;for(i=0;i<nopts.length;i++){if(nopts[i].getAttribute("data-nfl")===c)return true;}return false;}
function nflGet(){var a=root.getAttribute("data-nfl")||"";return nflKnown(a)?a:"";}
function hashNfl(){var m=/(?:^#|[#&])nfl=([A-Za-z]{2,3})(?:&|$)/.exec(location.hash||"");return m?m[1].toUpperCase():"";}
function paintNfl(){var c=nflGet(),i,o,on,name="",im;for(i=0;i<nopts.length;i++){o=nopts[i];on=(o.getAttribute("data-nfl")||"")===c;o.setAttribute("aria-pressed",on?"true":"false");if(on&&c){name=o.getAttribute("aria-label")||c;im=o.querySelector("img");if(ncur&&im){ncur.src=im.getAttribute("src");}}
}
if(nbtn){if(c){nbtn.classList.add("set");}else{nbtn.classList.remove("set");}
nbtn.setAttribute("aria-label","My team: "+(name||"none"));nbtn.title="My team: "+(name||"none");}
}
function setNfl(c,write){c=nflKnown(c)?c:"";root.classList.add("no-fx");if(c){root.setAttribute("data-nfl",c);}else{root.removeAttribute("data-nfl");}
store("titan.nfl",c||null);paintNfl();if(write){writeHash(sel?sel.value:"");}
if(window.requestAnimationFrame){requestAnimationFrame(function(){requestAnimationFrame(function(){root.classList.remove("no-fx");});});}
else{root.classList.remove("no-fx");}
}
function nflOpen(){var on=null,i;if(!npop||!nbtn)return;npop.hidden=false;nbtn.setAttribute("aria-expanded","true");for(i=0;i<nopts.length;i++){if(nopts[i].getAttribute("aria-pressed")==="true"){on=nopts[i];break;}}
if(on&&!on.getAttribute("data-nfl")){on=null;}   
try{(on||nopts[0]).focus({preventScroll:true});}catch(err){}
}
function nflClose(back){if(!npop||npop.hidden)return;npop.hidden=true;if(nbtn){nbtn.setAttribute("aria-expanded","false");if(back){try{nbtn.focus({preventScroll:true});}catch(err){}}}
}
if(nbtn&&npop){nbtn.addEventListener("click",function(){if(npop.hidden){nflOpen();}else{nflClose(true);}});npop.addEventListener("click",function(ev){var b=ev.target;while(b&&b!==npop&&!(b.getAttribute&&b.hasAttribute("data-nfl"))){b=b.parentNode;}
if(!b||b===npop)return;setNfl(b.getAttribute("data-nfl")||"",true);nflClose(true);});npop.addEventListener("keydown",function(ev){var k=ev.key,i=nopts.indexOf(doc.activeElement),cols,n;if(k==="Escape"){ev.preventDefault();ev.stopPropagation();nflClose(true);return;}
if(i<0||(k!=="ArrowLeft"&&k!=="ArrowRight"&&k!=="ArrowUp"&&k!=="ArrowDown"&&k!=="Home"&&k!=="End"))return;cols=4;try{cols=getComputedStyle(npop.querySelector(".nfl-grid")).gridTemplateColumns.split(" ").length||4;}catch(err){}
n=i;if(k==="ArrowLeft"){n=i-1;}else if(k==="ArrowRight"){n=i+1;}else if(k==="ArrowUp"){n=i-cols;}else if(k==="ArrowDown"){n=i+cols;}
else if(k==="Home"){n=0;}else if(k==="End"){n=nopts.length-1;}
if(n<0||n>=nopts.length)return;ev.preventDefault();try{nopts[n].focus({preventScroll:true});}catch(err){}
});function nflOutside(ev){var t=ev.target;if(npop.hidden||!t||npop.contains(t)||nbtn.contains(t))return;nflClose(false);}
doc.addEventListener("click",nflOutside);doc.addEventListener("touchstart",nflOutside,{passive:true});window.addEventListener("hashchange",function(){var n=hashNfl();if(nflKnown(n)&&n!==nflGet()){setNfl(n,false);}});}
setNfl(nflGet(),false);   


var sel=doc.getElementById("team-select"),pick=sel?sel.parentNode:null,clr=doc.getElementById("team-clear");var list=doc.getElementById("matchups-list");var mus=list?[].slice.call(list.querySelectorAll(".mu")):[];function byN(a,b){return (+a.getAttribute("data-n"))-(+b.getAttribute("data-n"));}
function muFor(rid){for(var i=0;i<mus.length;i++){var r=(mus[i].getAttribute("data-rids")||"").split(",");if(r.indexOf(rid)>=0)return mus[i];}
return null;}
function mark(rid){var i,el;var was=doc.querySelectorAll(".mine,.you");for(i=0;i<was.length;i++){was[i].classList.remove("mine");was[i].classList.remove("you");}

was=doc.querySelectorAll("details.tlc-d[data-auto]");for(i=0;i<was.length;i++){was[i].open=false;was[i].removeAttribute("data-auto");}
if(!rid)return;el=doc.querySelector('.standings tr[data-rid="'+rid+'"]');if(el)el.classList.add("mine");el=doc.getElementById("r"+rid);if(el)el.classList.add("mine");el=muFor(rid);if(el){el.classList.add("mine");var s=el.querySelector('.side[data-rid="'+rid+'"]');if(s)s.classList.add("you");s=el.querySelector('.sbs-t[data-rid="'+rid+'"]');if(s)s.classList.add("you");var cd=el.querySelector("details.tlc-d");if(cd&&!cd.open){cd.open=true;cd.setAttribute("data-auto","1");}}
}

function slateMark(rid){var chips=[].slice.call(doc.querySelectorAll(".g[data-teams]")),counts={},i,rows,t;if(rid){rows=doc.querySelectorAll('.sbs .row[data-rid="'+rid+'"][data-team]');for(i=0;i<rows.length;i++){t=rows[i].getAttribute("data-team");counts[t]=(counts[t]||0)+1;}
}
chips.forEach(function(ch){var ts=ch.getAttribute("data-teams").split(","),n=(counts[ts[0]]||0)+(counts[ts[1]]||0),b=ch.querySelector(".g-mine");if(b){b.textContent=n?String(n):"";b.hidden=!n;b.setAttribute("aria-label",n+" of your starters");}
if(n){ch.classList.add("has-mine");}else{ch.classList.remove("has-mine");}
});}
function reorder(rid){if(!list)return;var order=mus.slice().sort(byN),top=rid?muFor(rid):null,i;if(top){order.splice(order.indexOf(top),1);order.unshift(top);}
for(i=0;i<order.length;i++){list.appendChild(order[i]);}
tlPlace(top);if(swipeOn()){list.scrollLeft=0;}
if(typeof sbugTick==="function"){sbKey="";setTimeout(sbugTick,0);}
}

function tlPlace(top){if(!top||!tlBar)return;var sbs=top.querySelector(".sbs"),body=top.querySelector(".mu-body");if(isPhone()&&sbs){if(tlBar.previousElementSibling!==sbs){sbs.parentNode.insertBefore(tlBar,sbs.nextSibling);}}
else if(body&&tlBar.nextElementSibling!==body){top.insertBefore(tlBar,body);}
}
window.addEventListener("resize",function(){var rid=sel?sel.value:"";if(rid){tlPlace(muFor(rid));}});
var userScrolled=false;["touchstart","wheel","keydown"].forEach(function(ev){window.addEventListener(ev,function(){userScrolled=true;},{passive:true});});function jumpTo(el){var prevB=root.style.scrollBehavior;root.style.scrollBehavior="auto";try{el.scrollIntoView({block:"start",behavior:"instant"});}catch(err){el.scrollIntoView(true);}
root.style.scrollBehavior=prevB;}
function settle(rid){if(!rid||!list)return;var el=muFor(rid);if(!el||list.getBoundingClientRect().top>=0)return;jumpTo(el);var want=el.getBoundingClientRect().top;userScrolled=false;function recheck(){if(!userScrolled&&Math.abs(el.getBoundingClientRect().top-want)>2){jumpTo(el);}}
if(window.requestAnimationFrame){requestAnimationFrame(recheck);}
setTimeout(recheck,250);}
function clearNames(){for(var i=0;i<mus.length;i++){mus[i].style.viewTransitionName="";}}

var sweepRid=null,sweepIO=null;function stripSweeps(){var live=doc.querySelectorAll(".mu-head.sweep"),i;for(i=0;i<live.length;i++){live[i].classList.remove("sweep");}
if(sweepIO){sweepIO.disconnect();sweepIO=null;}
}
function fireSweep(h){h.classList.remove("sweep");void h.offsetWidth;h.classList.add("sweep");}
function sweep(){cfArm();   
var rid=sweepRid,el,h,r,vis;sweepRid=null;if(!rid||reduce)return;el=muFor(rid);if(!el)return;h=el.querySelector(".mu-head");if(!h)return;if(h.querySelector(".mu-tot.cu-wait,.mu-tot.cu-roll")){return;}   
r=h.getBoundingClientRect();vis=Math.max(0,Math.min(r.bottom,window.innerHeight)-Math.max(r.top,0))/Math.max(1,r.height);if(vis>=.6||!("IntersectionObserver" in window)){fireSweep(h);return;}

if(sweepIO){sweepIO.disconnect();}
sweepIO=new IntersectionObserver(function(entries){entries.forEach(function(en){if(en.isIntersecting){sweepIO.disconnect();sweepIO=null;fireSweep(en.target);}});},{threshold:.6});sweepIO.observe(h);}
if(list){list.addEventListener("animationend",function(ev){if(ev.animationName==="tl-sweep"&&ev.target.classList){ev.target.classList.remove("sweep");}});}

var busy=false,pending=null,fxHeld=[];function done(){busy=false;if(pending!==null){var p=pending.rid;pending=null;apply(p,true);return;}

if(fxHeld.length){var held=fxHeld;fxHeld=[];setTimeout(function(){held.forEach(fxLand);},700);}
sweep();}
function apply(rid,animate){var i,before={},after,d,t;stripSweeps();if(busy){pending={rid:rid};return;}
if(animate&&!reduce&&doc.startViewTransition){try{for(i=0;i<mus.length;i++){mus[i].style.viewTransitionName="mu-"+mus[i].getAttribute("data-n");}
t=doc.startViewTransition(function(){mark(rid);reorder(rid);settle(rid);slateMark(rid);});busy=true;t.finished.then(function(){clearNames();done();},function(){clearNames();done();});return;}catch(err){clearNames();busy=false;}
}
if(animate&&!reduce&&window.requestAnimationFrame){busy=true;for(i=0;i<mus.length;i++){before[mus[i].getAttribute("data-n")]=mus[i].getBoundingClientRect().top;}
mark(rid);reorder(rid);settle(rid);slateMark(rid);for(i=0;i<mus.length;i++){after=mus[i].getBoundingClientRect().top;d=before[mus[i].getAttribute("data-n")]-after;if(Math.abs(d)>1){mus[i].style.transform="translateY("+d+"px)";}
}
requestAnimationFrame(function(){requestAnimationFrame(function(){for(var j=0;j<mus.length;j++){if(mus[j].style.transform){mus[j].classList.add("flip");mus[j].style.transform="";}
}
setTimeout(function(){for(var k=0;k<mus.length;k++){mus[k].classList.remove("flip");mus[k].style.transform="";}done();},400);});});return;}
mark(rid);reorder(rid);settle(rid);slateMark(rid);sweep();}
function paintPick(rid){if(!sel)return;sel.value=rid||"";if(pick){if(rid){pick.classList.add("set");}else{pick.classList.remove("set");}}
if(rid){sel.classList.remove("none");}else{sel.classList.add("none");}
if(clr){clr.hidden=!rid;}
var pav=pick?pick.querySelector(".pick-av"):null,src=rid?doc.querySelector('.standings tr[data-rid="'+rid+'"] .av'):null;if(pav){pav.innerHTML="";if(src){pav.appendChild(src.cloneNode(true));pick.classList.add("has-av");}else{pick.classList.remove("has-av");}}
paintSub(rid);raPick(rid);}

var subEl=doc.getElementById("ctl-sub"),tlBar=doc.getElementById("tl-bar"),tlTrack=doc.getElementById("tl-track"),TLD=BLOB.tl||{};var cbtn=doc.getElementById("team-copy"),cfb=doc.getElementById("copy-fb"),copyBox=doc.getElementById("copy"),clive=doc.getElementById("copy-live"),copyT=null;function clearHi(){var l=doc.querySelectorAll(".row.tl-hi"),i;for(i=0;i<l.length;i++){l[i].classList.remove("tl-hi");}
if(tlTrack){l=tlTrack.querySelectorAll('[aria-pressed="true"]');for(i=0;i<l.length;i++){l[i].setAttribute("aria-pressed","false");}}
}
function copyLabel(t,ok){if(!cbtn)return;var lb=cbtn.querySelector(".copy-lbl");if(lb){lb.textContent=t;}
if(ok){cbtn.classList.add("ok");}else{cbtn.classList.remove("ok");}
}
function fbOn(on){if(copyBox){if(on){copyBox.classList.add("fb-on");}else{copyBox.classList.remove("fb-on");}}
if(subEl){if(on){subEl.classList.add("fb-on");}else{subEl.classList.remove("fb-on");}}
}
function resetCopy(){clearTimeout(copyT);copyLabel("Copy my link",false);if(cfb){cfb.hidden=true;cfb.value="";}
fbOn(false);if(clive){clive.textContent="";}
}
function paintSub(rid){clearHi();resetCopy();var w=TLD[rid]||[],h="",i,x,st;if(subEl){subEl.hidden=!rid;}

if(tlBar){tlBar.hidden=!rid||(w.length>0&&w.every(function(y){return y.s==="post";}));}
if(!tlTrack)return;if(!rid){tlTrack.innerHTML="";return;}
for(i=0;i<w.length;i++){x=w[i];st=x.s==="post"?"final":(x.s==="in"?"live":"");h+='<button type="button" class="btn tlw '+esc(x.s)+'" aria-pressed="false" data-i="'+i+'"><span class="tlw-k">'+esc(x.k)+'</span> <span class="tlw-v"><b>'+x.p.length+'</b>'
+'<span class="sr"> '+(x.p.length===1?"starter":"starters")+'</span>'+(st?' <span class="tlw-s">'+st+'</span>':'')+'</span></button>';}
tlTrack.innerHTML=h||'<span class="tl-none">No starters with a game this week</span>';}
if(tlTrack){tlTrack.addEventListener("click",function(ev){var b=ev.target,rid=sel?sel.value:"",x,first=null,on,r,gap;while(b&&b!==tlTrack&&!(b.classList&&b.classList.contains("tlw"))){b=b.parentNode;}
if(!b||b===tlTrack||!rid)return;on=b.getAttribute("aria-pressed")==="true";clearHi();if(on)return;x=(TLD[rid]||[])[+b.getAttribute("data-i")];if(!x)return;b.setAttribute("aria-pressed","true");x.p.forEach(function(pid){var row=doc.querySelector('.sbs .row[data-rid="'+rid+'"][data-pid="'+pid+'"]');if(row){row.classList.add("tl-hi");if(!first){first=row;}}
});if(first){r=first.getBoundingClientRect();gap=isPhone()?68:16;if(r.top<gap||r.bottom>window.innerHeight){try{first.scrollIntoView({block:"center",behavior:reduce?"auto":"smooth"});}catch(err){first.scrollIntoView(false);}}
}
});}
if(cbtn){cbtn.addEventListener("click",function(){var rid=sel?sel.value:"",url;if(!rid)return;url=location.href.split("#")[0]+hashFor(rid);   
function ok(){if(cfb){cfb.hidden=true;}fbOn(false);copyLabel("Link copied",true);if(clive){clive.textContent="Link copied";}clearTimeout(copyT);copyT=setTimeout(function(){copyLabel("Copy my link",false);if(clive){clive.textContent="";}},2000);}
function fallback(){if(!cfb)return;cfb.value=url;cfb.hidden=false;fbOn(true);copyLabel("Copy from the box",false);try{cfb.focus({preventScroll:true});}catch(err){cfb.focus();}
cfb.select();try{cfb.setSelectionRange(0,url.length);}catch(err){}
if(clive){clive.textContent="Link selected. Copy it from the box.";}
}
try{if(navigator.clipboard&&typeof navigator.clipboard.writeText==="function"){navigator.clipboard.writeText(url).then(ok,fallback);}
else{fallback();}
}catch(err){fallback();}
});}

function hashTeam(){var m=/(?:^#|[#&])team=(\d+)(?:&|$)/.exec(location.hash||"");return m?m[1]:"";}
function ourHash(){return !!(hashTeam()||hashNfl());}
function hashFor(rid){var n=nflGet(),p=[];if(rid){p.push("team="+rid);}if(n){p.push("nfl="+n);}return p.length?"#"+p.join("&"):"";}   
function writeHash(rid){var h=location.hash||"",want=hashFor(rid);if(h&&h!=="#"&&!ourHash())return;   
try{if(want){if(h!==want){history.replaceState(null,"",want);}}
else if(ourHash()){history.replaceState(null,"",location.pathname+location.search);}
}catch(err){}
}
function setTeam(rid,animate){if(rid&&!muFor(rid)&&!doc.getElementById("r"+rid)){rid="";}

try{doc.documentElement.classList[rid?"add":"remove"]("has-team");}catch(err){}
store("titan.team",rid||null);paintPick(rid);writeHash(rid);if(animate&&rid){sweepRid=rid;}
apply(rid,animate);fxWatch(rid);}
if(sel){sel.addEventListener("change",function(){setTeam(sel.value,true);});if(clr){clr.addEventListener("click",function(){setTeam("",true);sel.focus();});}
function known(rid){return !!(rid&&(muFor(rid)||doc.getElementById("r"+rid)));}
var h0=hashTeam();setTeam((known(h0)?h0:"")||load("titan.team")||"",false);   
window.addEventListener("hashchange",function(){var h=hashTeam();if(known(h)&&h!==sel.value){setTeam(h,true);}});}


var links=[].slice.call(doc.querySelectorAll(".ctl-nav a[href^='#']"));if(links.length&&"IntersectionObserver" in window){var targets=[],seen={},lockUntil=0;links.forEach(function(a){var t=doc.getElementById(a.getAttribute("href").slice(1));if(t){targets.push(t);}});var io=new IntersectionObserver(function(entries){entries.forEach(function(en){seen[en.target.id]=en.isIntersecting;});if(Date.now()<lockUntil)return;var cur=null,best=null,t,top;for(var i=0;i<targets.length;i++){if(!seen[targets[i].id])continue;top=targets[i].getBoundingClientRect().top;if(best===null||top<best-4||(Math.abs(top-best)<=4&&location.hash==="#"+targets[i].id)){best=top;cur=targets[i].id;}
}
setCurrent(cur);},{rootMargin:"-30% 0px -55% 0px",threshold:0});targets.forEach(function(t){io.observe(t);});function setCurrent(id){links.forEach(function(a){if(a.getAttribute("href")==="#"+id){a.setAttribute("aria-current","location");}else{a.removeAttribute("aria-current");}});}
links.forEach(function(a){a.addEventListener("click",function(){setCurrent(a.getAttribute("href").slice(1));lockUntil=Date.now()+900;});});window.addEventListener("hashchange",function(){setCurrent(location.hash.slice(1));});if("onscrollend" in window){window.addEventListener("scrollend",function(){lockUntil=0;});}
}


function rollNum(el,from,to,dec,dur,mirror,done){var final=Number(to).toFixed(dec),start=null,cw=0,d,wide=[],i0,gw={},m=doc.createElement("span"),ch,k;m.style.cssText="position:absolute;visibility:hidden;white-space:pre;font:inherit";el.appendChild(m);for(k=0;k<("0123456789"+final).length;k++){ch=("0123456789"+final).charAt(k);if(!(ch in gw)){m.textContent=ch;gw[ch]=Math.ceil(m.getBoundingClientRect().width*100)/100;}}
el.removeChild(m);for(d=0;d<10;d++){cw=Math.max(cw,gw[String(d)]);}
for(i0=0;i0<final.length;i0++){d=final.charAt(i0);wide.push(d==="."?0:((d==="1"&&i0>0)?cw:gw[d]));}
function put(h){el.innerHTML=h;if(mirror){mirror.innerHTML=h;}}
function paint(str){var t=str,h="",i;while(t.length<final.length){t=" "+t;}
for(i=0;i<t.length;i++){ch=t.charAt(i);h+=ch==="."?'<span class="cu-p">.</span>':'<span class="cu-d" style="width:'+wide[i]+'px">'+(ch===" "?"":ch)+'</span>';}
put(h);}
function settle(){[el,mirror].forEach(function(x){if(!x)return;var cells=x.querySelectorAll(".cu-d,.cu-p"),i;for(i=0;i<cells.length&&i<final.length;i++){if(cells[i].className==="cu-d"){cells[i].style.width=gw[final.charAt(i)]+"px";}}
});setTimeout(function(){el.textContent=final;if(mirror){mirror.textContent=final;}if(done){done();}},200);}
function step(ts){if(start===null)start=ts;var p=Math.min((ts-start)/dur,1),ez=1-Math.pow(1-p,3),str=p<1?Math.min(to,Math.max(from,from+(to-from)*ez)).toFixed(dec):final;if(str===final){paint(final);void el.offsetWidth;settle();return;}
paint(str);requestAnimationFrame(step);}
paint(Number(from).toFixed(dec));requestAnimationFrame(step);}


var cu=list?[].slice.call(list.querySelectorAll(".mu-tot[data-b]")):[];var canRoll=!!(cu.length&&!reduce&&("IntersectionObserver" in window)&&window.requestAnimationFrame);var cuWait=[];
function cuHold(el){var s=doc.createElement("span");s.className="sr cu-sr";s.textContent=el.getAttribute("data-v");el.setAttribute("aria-hidden","true");if(el.parentNode){el.parentNode.insertBefore(s,el.nextSibling);}
el.textContent=el.getAttribute("data-b");el.classList.add("cu-wait");}
function cuShow(el){var s=el.parentNode?el.parentNode.querySelector(".cu-sr"):null;if(s&&s.parentNode){s.parentNode.removeChild(s);}
el.removeAttribute("aria-hidden");el.classList.remove("cu-wait");el.textContent=el.getAttribute("data-v");}
function cuRoll(el){var b=parseFloat(el.getAttribute("data-b")),v=parseFloat(el.getAttribute("data-v")),dec=((el.getAttribute("data-v").split(".")[1])||"").length;el.classList.remove("cu-wait");el.classList.add("cu-roll");rollNum(el,b,v,dec,600,null,function(){el.classList.remove("cu-roll");cuShow(el);});}
function cuInView(el){   
var r=el.getBoundingClientRect(),h=window.innerHeight||doc.documentElement.clientHeight,w=window.innerWidth||doc.documentElement.clientWidth;return r.height>0&&r.width>0&&(Math.min(r.bottom,h)-Math.max(r.top,0))>=r.height*.5&&(Math.min(r.right,w)-Math.max(r.left,0))>=r.width*.5;}

cu.forEach(function(el){var b=parseFloat(el.getAttribute("data-b")),v=parseFloat(el.getAttribute("data-v"));
if(canRoll&&!isNaN(b)&&!isNaN(v)&&b<v&&!cuInView(el)){cuHold(el);cuWait.push(el);}
el.classList.add("cu-on");});if(cuWait.length){
var cio=new IntersectionObserver(function(entries){entries.forEach(function(en){var el=en.target;if(en.isIntersecting){cio.unobserve(el);cuRoll(el);}
else if(en.boundingClientRect.bottom<0){cio.unobserve(el);cuShow(el);}   
});},{rootMargin:"300px 0px",threshold:0});cuWait.forEach(function(el){cio.observe(el);});}


function rowRid(r){var det=r.closest("details");return r.getAttribute("data-rid")||(det?det.getAttribute("data-rid"):"")||"";}
function afterRoll(hd,fn,t0){t0=t0||Date.now();if(hd&&hd.querySelector(".mu-tot.cu-wait,.mu-tot.cu-roll")&&Date.now()-t0<2500){setTimeout(function(){afterRoll(hd,fn,t0);},80);return;}
fn();}
function fxLand(el){if(el.classList.contains("stamp-final")){afterRoll(el.closest(".mu-head"),function(){el.classList.add("fl");});return;}
if(el.classList.contains("stc")){el.classList.add("fl");}
if(el.classList.contains("mv")&&rowRid(el)===(sel?sel.value:"")){el.classList.add("mvf");}
}
var fio=null,fxMv=[];function fxWatch(rid){   
if(!fio)return;fxMv.forEach(function(el){if(!el.classList.contains("stc")){fio.unobserve(el);}});fxMv=rid?[].slice.call(doc.querySelectorAll(".row.mv:not(.mvf)")).filter(function(r){return rowRid(r)===rid;}):[];fxMv.forEach(function(el){fio.observe(el);});}
var fxFixed=[].slice.call(doc.querySelectorAll(".row.stc,.stamp-final"));var fxSeen=!!(BLOB.pull&&load("titan.fx")===BLOB.pull);   
if((fxFixed.length||doc.querySelector(".row.mv"))&&!reduce&&!fxSeen&&"IntersectionObserver" in window){root.classList.add("fx");if(BLOB.pull){store("titan.fx",BLOB.pull);}
fio=new IntersectionObserver(function(entries){entries.forEach(function(en){if(!en.isIntersecting)return;fio.unobserve(en.target);if(busy){fxHeld.push(en.target);return;}
fxLand(en.target);});},{threshold:.6,rootMargin:(isPhone()?"-64px":"0px")+" 0px 0px 0px"});fxFixed.forEach(function(el){fio.observe(el);});fxWatch(sel?sel.value:"");}


var cardEl=doc.getElementById("pcard"),blob=BLOB,cards={},LIVE=false,GAMES_N=0;cards=blob.cards||{};LIVE=!!blob.live;GAMES_N=blob.games||0;
var cardsReady=!!blob.cards,cardsBusy=false,cardsWait=[];
var CARDS_MS=8000;function cardsFail(gone){cardsBusy=false;var ld=cardEl?cardEl.querySelector(".pc-load"):null;if(!ld)return;ld.innerHTML=gone?'This board is out of date. <a href="" class="pc-reload">Reload the board</a> to see player details.'
:'Player details did not load. <button type="button" class="pc-retry">Try again</button> or <a href="" class="pc-reload">reload the board</a>.';}
function loadCards(){if(cardsReady||cardsBusy||!blob.src||!window.fetch)return;cardsBusy=true;var ac=window.AbortController?new AbortController():null,gone=false;var to=setTimeout(function(){if(ac){ac.abort();}},CARDS_MS);fetch(blob.src,ac?{signal:ac.signal}:undefined).then(function(r){clearTimeout(to);if(!r.ok){gone=r.status===404||r.status===410;throw new Error("status "+r.status);}return r.json();}).then(function(j){cards=j.cards||{};blob.wx=j.wx||{};cardsReady=true;cardsBusy=false;var w=cardsWait;cardsWait=[];w.forEach(function(f){f();});},function(){clearTimeout(to);cardsFail(gone);});}
if(cardEl){cardEl.addEventListener("click",function(ev){var rl=ev.target&&ev.target.closest?ev.target.closest(".pc-reload"):null;if(rl){   
ev.preventDefault();location.reload();return;}
var t=ev.target&&ev.target.closest?ev.target.closest(".pc-retry"):null;if(!t)return;ev.preventDefault();var ld=cardEl.querySelector(".pc-load");if(ld){ld.textContent="Loading player details";}
loadCards();});}
if(!cardsReady&&blob.src){var kickCards=function(){loadCards();};window.addEventListener("load",function(){if(window.requestIdleCallback){requestIdleCallback(kickCards,{timeout:2500});}else{setTimeout(kickCards,400);}});doc.addEventListener("pointerdown",kickCards,{capture:true,passive:true});doc.addEventListener("keydown",kickCards,{capture:true});}
var hasPop=!!(cardEl&&("popover" in HTMLElement.prototype)&&typeof cardEl.showPopover==="function");if(cardEl&&hasPop){cardEl.removeAttribute("hidden");}
if(cardEl&&!hasPop){cardEl.classList.add("fb");}
var openRow=null,pinned=false,hoverT=null,leaveT=null,openY=0,lastPT="mouse",closeT=null,scrollTick=false,hold=null,ptXY=null;function isPhone(){return window.innerWidth<720;}
function holdHover(){hold=ptXY?{x:ptXY.x,y:ptXY.y}:null;}
function ini(n){var w=String(n||"").split(" ");return ((w[0]||"").charAt(0)+(w.length>1?w[1].charAt(0):"")).toUpperCase()||"?";}
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c];});}
function fmtN(n){try{return Number(n).toLocaleString("en-US");}catch(err){return String(n);}}
function build(row,c){if(c.loading){return '<div class="pc-head"><button type="button" class="pc-close" aria-label="Close">&times;</button><div class="pc-top"><div class="pc-id"><span class="pc-n" id="pcard-name">'
+esc(c.n)+'</span><span class="pc-m">'+esc(c.pos)+' <span>'+esc(c.tm)+'</span></span></div></div></div><div class="pc-body"><p class="pc-load" role="status">Loading player details</p></div>';}
var img=row.querySelector("img.hs"),ph=row.querySelector(".hs.ph"),hc=row.querySelector(".hsc"),h,g=c.g,gl,pts,bio=[];var ci=hc?hc.querySelector("img"):null,csrc=(ci&&cdnOk()&&!ci.classList.contains("err"))?ci.getAttribute("src"):"";if(!img&&csrc){img={getAttribute:function(){return csrc;}};}
if(!img&&hc){ph=hc.querySelector(".df-i");}
var av=img?'<img class="pc-hs'+(c.pos==="DEF"?" logo":"")+'" src="'+img.getAttribute("src")+'" alt="" width="60" height="60"'+(csrc?' data-cdn':'')+'>'
:'<span class="pc-hs ph" aria-hidden="true">'+(ph?esc(ph.textContent):"")+'</span>';h='<div class="pc-head"><button type="button" class="pc-close" aria-label="Close">&times;</button>';h+='<div class="pc-top">'+av+'<div class="pc-id"><span class="pc-n" id="pcard-name">'+esc(c.n)+(c.num!=null?' <span class="pc-num">#'+esc(c.num)+'</span>':'')
+(c.rk?'<span class="tg tg-r" aria-hidden="true">R</span><span class="sr">, rookie</span>':'')+'</span>';h+='<span class="pc-m">'+esc(c.pos)+' <span>'+esc(c.tm)+'</span>'+(c.dc?' <span class="pc-dc">Depth '+esc(c.dc)+'</span>':'')
+((c.bd&&bdOk(c.bd))?' <span class="tg tg-bd">Birthday today</span>':'')+'</span></div></div></div><div class="pc-body">';var wxl=(g&&g.st!=="post"&&blob.wx)?blob.wx[c.tm]:"";if(!g){gl=c.tm==="?"?"Not in Sleeper's player file":(c.tm==="FA"?"Free agent, no NFL team":(GAMES_N?"No game this week (bye)":"Schedule unavailable"));}
else{gl=((g.nt||g.ha)?"vs ":"at ")+g.opp+((g.nt&&g.vc)?" ("+g.vc+")":"")+", ";   
if(g.sw){gl+=g.sw;}
else if(g.st==="pre"){gl+=g.when;}
else if(g.st==="in"){gl+=(g.q?g.q+" at the "+(blob.pt||"latest")+" update":"In progress")+", "+g.sc;}
else{gl+=(g.det||"Final")+", "+g.sc;}
if(g.tv&&g.st!=="post"&&!g.sw)gl+=", "+g.tv;}
h+='<div class="pc-row"><span class="pc-k">Game</span><span>'+esc(gl)+(g&&g.lk?'<small>Locked, game started</small>':'')+(g&&g.ven?'<small>'+esc(g.ven)+(g.dome?", indoor":"")+'</small>':'')+(wxl?'<small>'+esc(wxl)+'</small>':'')+'</span></div>';var pw_=esc(blob.pw||"Sleeper proj"),pn_=esc(blob.pn||"");   
if(LIVE&&g&&g.st!=="pre"){pts='<b>'+Number(c.act).toFixed(2)+'</b> '+(g.st==="in"?"so far":(g.sw?"game "+g.sw.toLowerCase():"final"))+', '+pw_+' '+Number(c.pr).toFixed(1)+pn_;}
else if(LIVE&&g){pts='<b>'+Number(c.pr).toFixed(1)+'</b> '+pw_+pn_+', not started';}
else{pts='<b>'+Number(c.pr).toFixed(1)+'</b> '+pw_+pn_;}

if(c.mv){pts+='<small class="mv-c">+'+Number(c.mv).toFixed(2)+' since previous update'+(blob.prevs||blob.prev?' ('+esc(blob.prevs||blob.prev)+')':'')+'</small>';}
h+='<div class="pc-row"><span class="pc-k">Points</span><span>'+pts+'</span></div>';if(c.stc){h+='<div class="pc-row stc"><span class="pc-k">Status</span><span>Status changed: '+esc(c.stc)+'<small>Seen in the update from '+esc(blob.pull||"")+'</small></span></div>';}
if(c.ln)h+='<div class="pc-row"><span class="pc-k">Proj line</span><span>'+esc(c.ln)+'</span></div>';if(c.inj){h+='<div class="pc-row inj"><span class="pc-k">Injury</span><span>'+esc(c.inj)+(c.body?", "+esc(c.body):"")+(c.prac?", practice: "+esc(c.prac):"")
+(c.note?'<small>'+esc(c.note)+'</small>':'')+(c.nu?'<small>Sleeper news updated '+esc(c.nu)+'</small>':'')+'</span></div>';}
if(c.dst&&c.dst.length){
h+='<div class="pc-row pc-dst"><span class="pc-k">Depth chart</span><span>'+c.dst.length+' listed first on defense'+(c.dout?', <b class="pc-out">'+c.dout+' defender'+(c.dout===1?'':'s')+' out</b>':'')
+'<small>Sleeper&#39;s depth chart, which can lag behind injuries</small><ul class="pc-dl">';c.dst.forEach(function(x){var crit=/^(out|ir|pup|sus|not active)$/i.test(x[4]);h+='<li><span class="df pc-df"><i class="df-i">'+esc(ini(x[1]))+'</i>'
+(cdnOk()?'<img src="https://sleepercdn.com/content/nfl/players/thumb/'+esc(x[0])+'.jpg" loading="lazy" decoding="async" width="26" height="26" alt="" data-cdn>':'')
+'</span><span class="pc-dn">'+(x[2]?'<span class="pc-num">#'+esc(x[2])+'</span> ':'')+esc(x[1])
+(x[4]?'<span class="pill '+(crit?"crit":"warn")+'">'+esc(x[4])+'</span>':'')+'</span><span class="pc-sp">'+esc(x[3])+'</span></li>';});h+='</ul></span></div>';}
if(c.tr)h+='<div class="pc-row tr"><span class="pc-k">Trending</span><span>'+fmtN(c.tr)+' adds on Sleeper in the last 24 hours</span></div>';if(c.age)bio.push("Age "+c.age);if(c.exp!=null)bio.push((c.exp===0&&c.rk)?"Rookie":c.exp+" yr"+(c.exp===1?"":"s")+" exp");if(c.col)bio.push(c.col);if(bio.length)h+='<div class="pc-row"><span class="pc-k">Bio</span><span>'+esc(bio.join(", "))+'</span></div>';if(c.dr)h+='<div class="pc-row pc-dr"><span class="pc-k">Draft</span><span>'+esc(c.dr)+'</span></div>';   
return h+'</div>';}
function place(row){if(!cardEl)return;if(isPhone()){cardEl.style.left="";cardEl.style.top="";return;}
var r=row.getBoundingClientRect(),w=cardEl.offsetWidth,hh=cardEl.offsetHeight,vw=window.innerWidth,vh=window.innerHeight;var left=r.left+48,top=r.bottom+6;if(left+w>vw-8)left=vw-8-w;if(left<8)left=8;if(top+hh>vh-8)top=r.top-6-hh;if(top<8)top=8;cardEl.style.left=Math.round(left)+"px";cardEl.style.top=Math.round(top)+"px";}
function show(row,pin,focusIn){if(!cardEl||!row)return;var pid=row.getAttribute("data-pid"),c=cards[pid],cb,nm,mt;if(!c){if(cardsReady||!blob.src)return;loadCards();mt=row.querySelector(".meta .pos");c={loading:1,n:rowName(row),pos:mt?mt.textContent:"",tm:row.getAttribute("data-team")||""};cardsWait.push(function(){if(openRow!==row)return;var keepPin=pinned,hadF=!!(doc.activeElement&&cardEl.contains(doc.activeElement));openRow=null;show(row,keepPin,hadF);});}
if(closeT!==null){clearTimeout(closeT);closeT=null;cardEl.removeEventListener("transitionend",onCloseEnd);}
if(openRow===row){pinned=pinned||!!pin;if(pinned){cardEl.classList.add("pin");}
if(focusIn){cb=cardEl.querySelector(".pc-close");if(cb){try{cb.focus({preventScroll:true});}catch(err){cb.focus();}}}
return;}
if(openRow){openRow.setAttribute("aria-expanded","false");}
openRow=row;pinned=!!pin;openY=window.pageYOffset||0;if(pinned){cardEl.classList.add("pin");}else{cardEl.classList.remove("pin");}
cardEl.setAttribute("data-team",c.tm||"");cardEl.innerHTML=build(row,c);row.setAttribute("aria-expanded","true");if(hasPop){try{if(!cardEl.matches(":popover-open")){cardEl.showPopover();}}catch(err){cardEl.hidden=false;}}
else{cardEl.hidden=false;}
var body=cardEl.querySelector(".pc-body");if(body)body.scrollTop=0;place(row);cardEl.classList.remove("in");if(!reduce&&window.requestAnimationFrame){requestAnimationFrame(function(){cardEl.classList.add("in");});}
else{cardEl.classList.add("in");}
if(focusIn){cb=cardEl.querySelector(".pc-close");if(cb){try{cb.focus({preventScroll:true});}catch(err){cb.focus();}}}
}
function finishHide(){closeT=null;cardEl.removeEventListener("transitionend",onCloseEnd);if(hasPop){try{cardEl.hidePopover();}catch(err){}}
cardEl.hidden=!hasPop;}
function onCloseEnd(ev){if(ev.target===cardEl&&closeT!==null){clearTimeout(closeT);finishHide();}}
function hide(){if(!openRow||!cardEl)return;var r=openRow,hadFocus=doc.activeElement&&cardEl.contains(doc.activeElement),phone=isPhone();openRow=null;pinned=false;r.setAttribute("aria-expanded","false");cardEl.classList.remove("in");cardEl.classList.remove("pin");if(hadFocus){try{r.focus({preventScroll:true});}catch(err){try{r.focus();}catch(err2){}}}
if(phone&&!reduce){
cardEl.addEventListener("transitionend",onCloseEnd);closeT=setTimeout(finishHide,200);}else{finishHide();}
}
if(cardEl){[].slice.call(doc.querySelectorAll(".row[data-pid]")).forEach(function(row){row.setAttribute("tabindex","0");row.setAttribute("role","button");row.setAttribute("aria-haspopup","dialog");row.setAttribute("aria-expanded","false");row.setAttribute("aria-controls","pcard");row.addEventListener("pointerenter",function(ev){if(ev.pointerType!=="mouse"||isPhone()||pinned)return;if(hold&&Math.abs(ev.clientX-hold.x)<=3&&Math.abs(ev.clientY-hold.y)<=3)return;hold=null;clearTimeout(leaveT);clearTimeout(hoverT);hoverT=setTimeout(function(){show(row,false,false);},140);});row.addEventListener("pointerleave",function(ev){if(ev.pointerType!=="mouse")return;clearTimeout(hoverT);if(pinned)return;leaveT=setTimeout(function(){if(openRow===row&&!pinned){try{if(cardEl.matches(":hover"))return;}catch(err){}hide();}},220);});row.addEventListener("click",function(){clearTimeout(hoverT);if(openRow===row&&pinned){hide();}else{show(row,true,lastPT!=="mouse");}
});row.addEventListener("keydown",function(ev){if(ev.key==="Enter"||ev.key===" "||ev.key==="Spacebar"){ev.preventDefault();if(openRow===row&&pinned){hide();}else{show(row,true,true);}
}
});});cardEl.addEventListener("pointerenter",function(){if(pinned)clearTimeout(leaveT);});cardEl.addEventListener("pointerleave",function(ev){if(ev.pointerType!=="mouse"||pinned)return;leaveT=setTimeout(function(){if(!pinned)hide();},220);});cardEl.addEventListener("click",function(ev){var t=ev.target;while(t&&t!==cardEl){if(t.classList&&t.classList.contains("pc-close")){holdHover();hide();return;}t=t.parentNode;}
});doc.addEventListener("pointerup",function(ev){lastPT=ev.pointerType||"mouse";},true);
doc.addEventListener("pointermove",function(ev){if(ev.pointerType==="mouse"){ptXY={x:ev.clientX,y:ev.clientY};}},true);doc.addEventListener("keydown",function(ev){if(ev.key==="Escape"&&openRow){ev.preventDefault();holdHover();hide();}});cardEl.addEventListener("keydown",function(ev){
if(ev.key==="Tab"&&openRow){ev.preventDefault();hide();}
});doc.addEventListener("pointerdown",function(ev){if(!openRow)return;if(cardEl.contains(ev.target)||openRow.contains(ev.target))return;hide();},true);window.addEventListener("scroll",function(){if(!openRow)return;if(isPhone()){if(Math.abs((window.pageYOffset||0)-openY)>24)hide();return;}
if(scrollTick||!window.requestAnimationFrame)return;scrollTick=true;requestAnimationFrame(function(){scrollTick=false;if(!openRow)return;var r=openRow.getBoundingClientRect();if(r.bottom<0||r.top>window.innerHeight){hide();return;}   
place(openRow);});},{passive:true});var lastW=window.innerWidth;window.addEventListener("resize",function(){var w=window.innerWidth;if(w!==lastW){lastW=w;if(openRow)hide();}});}

var gcs=[].slice.call(doc.querySelectorAll(".gcard")),popOK=("popover" in HTMLElement.prototype);function gInvoker(gc){return doc.querySelector('button.g[popovertarget="'+gc.id+'"]');}
function gPlace(gc){var inv=gInvoker(gc),r,w,hh,left,top;if(!inv||isPhone()){gc.classList.remove("pos");gc.style.left="";gc.style.top="";return;}
r=inv.getBoundingClientRect();w=Math.min(340,window.innerWidth-16);hh=gc.offsetHeight||260;left=Math.max(8,Math.min(r.left,window.innerWidth-8-w));top=r.bottom+6;if(top+hh>window.innerHeight-8){top=Math.max(8,window.innerHeight-8-hh);}
gc.classList.add("pos");gc.style.left=Math.round(left)+"px";gc.style.top=Math.round(top)+"px";}

if(popOK&&gcs.length){gcs.forEach(function(gc){gc.addEventListener("beforetoggle",function(ev){if(ev.newState==="open"){gPlace(gc);}});gc.addEventListener("toggle",function(ev){if(ev.newState!=="open")return;gPlace(gc);var cb=gc.querySelector(".pc-close");if(cb){try{cb.focus({preventScroll:true});}catch(err){cb.focus();}}
});});window.addEventListener("scroll",function(){gcs.forEach(function(gc){if(gc.classList.contains("pos")&&gc.matches(":popover-open")){try{gc.hidePopover();}catch(err){}}});},{passive:true});}


var clk=doc.getElementById("clk");if(clk){var KO=[],clkV=clk.querySelector(".clk-v");(clk.getAttribute("data-ko")||"").split(" ").forEach(function(x){var p=x.split("|"),t=Date.parse(p[0]);if(p[0]&&!isNaN(t)){KO.push({t:t,s:p[1]});}});var tick=function(){var now=Date.now(),next=null,i,g;for(i=0;i<KO.length;i++){g=KO[i];if(g.t>now&&g.s==="pre"&&(next===null||g.t<next)){next=g.t;}}
if(next===null){clk.hidden=true;return;}
var m=Math.ceil((next-now)/60000),d=Math.floor(m/1440),h=Math.floor((m%1440)/60),mm=m%60;clkV.textContent=d?(d+"d "+h+"h"):(h?(h+"h "+(mm<10?"0":"")+mm+"m"):(mm+"m"));clk.hidden=false;};tick();setInterval(tick,30000);}





var mnav=doc.getElementById("mnav"),dotsEl=doc.getElementById("mnav-dots"),capEl=doc.getElementById("mnav-cap"),sbug=doc.getElementById("sbug"),sbugIn=doc.getElementById("sbug-in");var navHold=0;function muOrder(){return list?[].slice.call(list.children).filter(function(x){return x.classList&&x.classList.contains("mu");}):[];}
function swipeOn(){try{return !!list&&window.getComputedStyle(list).display==="flex";}catch(err){return false;}}
function barTop(){return isPhone()?56:0;}
function panelTarget(m){var x=m.getBoundingClientRect().left-list.getBoundingClientRect().left+list.scrollLeft;return Math.max(0,Math.min(list.scrollWidth-list.clientWidth,Math.round(x)));}
function curIdx(){var o=muOrder(),i,r,probe,best=0,bd=1e9,d;if(!o.length)return 0;if(swipeOn()){for(i=0;i<o.length;i++){d=Math.abs(panelTarget(o[i])-list.scrollLeft);if(d<bd){bd=d;best=i;}}return best;}
probe=barTop()+56+24;for(i=0;i<o.length;i++){r=o[i].getBoundingClientRect();if(r.bottom>probe){return i;}}
return o.length-1;}

function setInert(i){var o=muOrder(),k,on=swipeOn();for(k=0;k<o.length;k++){if(on&&k!==i){o[k].setAttribute("inert","");}else{o[k].removeAttribute("inert");}}
}
function fitMus(){if(!list)return;if(!swipeOn()){if(list.style.height){list.style.height="";}return;}
var o=muOrder(),m=o[curIdx()],h;if(!m)return;h=m.getBoundingClientRect().height;if(Math.abs((parseFloat(list.style.height)||0)-h)>0.5){list.style.height=h+"px";}
}
function settleMus(){setInert(curIdx());fitMus();}
function goMu(i,smooth){var o=muOrder(),beh=(smooth&&!reduce)?"smooth":"instant";if(!o.length)return;i=Math.max(0,Math.min(o.length-1,i));if(swipeOn()){setInert(i);try{list.scrollTo({left:panelTarget(o[i]),behavior:beh});}catch(err){list.scrollLeft=panelTarget(o[i]);}}
else{try{o[i].scrollIntoView({block:"start",behavior:beh});}catch(err){o[i].scrollIntoView(true);}}
}

function muTitle(m){var s=[].slice.call(m.querySelectorAll(".mu-head .side")),you=m.querySelector(".mu-head .side.you");if(you&&s[0]!==you){s.reverse();}
return s.map(function(x){var t=x.querySelector(".mu-nt");return t?t.textContent:"";}).join(" vs ")||"Matchup";}

function muName(m){var n=m.getAttribute("data-n");return (n?("Matchup "+n+": "):"")+muTitle(m);}
var sbKey="",orderKey="";function sbSide(side,cls){if(!side)return "";var tot=side.querySelector(".mu-tot"),av=side.querySelector(".av"),nt=side.querySelector(".mu-nt");var ink=side.classList.contains("ink-t")?" ink-t":(side.classList.contains("ink-l")?" ink-l":"");return '<span class="sb-s '+cls+ink+'">'+(av?av.outerHTML.replace(" av-mu",""):"")+'<span class="sb-tx"><span class="sb-nt">'+esc(nt?nt.textContent:"")+'</span>'
+'<b class="sb-v">'+esc(tot?(tot.getAttribute("data-v")||tot.textContent):"")+'</b></span></span>';}
function paintNav(){var o=muOrder(),i=curIdx(),k,h="",b,m,key,n=o.length,ok;if(!n)return;ok=o.map(function(x){return x.getAttribute("data-n")+(x.classList.contains("mine")?"m":"");}).join(",");if(ok!==orderKey){orderKey=ok;for(k=0;k<n;k++){o[k].setAttribute("role","group");o[k].setAttribute("aria-label",muName(o[k]));}
}
if(dotsEl){if(dotsEl.children.length!==n){   
for(k=0;k<n;k++){h+='<button type="button" class="mnav-d" data-i="'+k+'"><i></i></button>';}
dotsEl.innerHTML=h;}
for(k=0;k<n;k++){b=dotsEl.children[k];b.setAttribute("aria-label",muName(o[k]));if(k===i){b.setAttribute("aria-current","true");}else{b.removeAttribute("aria-current");}
}
}
[].slice.call(doc.querySelectorAll(".mnav-b,.sbug-b")).forEach(function(bt){var d=+bt.getAttribute("data-d");bt.disabled=(d<0&&i===0)||(d>0&&i===n-1);});m=o[i];key=i+"|"+ok;if(capEl){var ct=muName(m);if(capEl.textContent!==ct){capEl.textContent=ct;}}
if(sbugIn&&key!==sbKey){sbKey=key;sbugIn.className="sbug-in"+(m.classList.contains("inkp")?" inkp":"");sbugIn.innerHTML=sbSide(m.querySelector(".side.a"),"a")+'<span class="sb-pos">'+(i+1)+' of '+n+'</span>'+sbSide(m.querySelector(".side.b"),"b");if(sbug){sbug.setAttribute("aria-label",muName(m)+", "+(i+1)+" of "+n);}   
}
}
function sbugTick(){var o=muOrder(),i,head,hr,lr,show;if(!sbug||!o.length)return;i=curIdx();head=o[i].querySelector(".mu-head");hr=head.getBoundingClientRect();lr=list.getBoundingClientRect();show=hr.bottom<barTop()+2&&lr.bottom>barTop()+56+60;paintNav();if(show!==sbug.classList.contains("on")){if(show){sbug.classList.add("on");sbug.removeAttribute("inert");}else{sbug.classList.remove("on");sbug.setAttribute("inert","");}
}
}
if(list&&muOrder().length>1){if(mnav){mnav.hidden=false;}
if(sbug){sbug.hidden=false;sbug.setAttribute("role","group");sbug.setAttribute("inert","");}
var navTick=false;var onNavScroll=function(){if(navTick)return;navTick=true;requestAnimationFrame(function(){navTick=false;sbugTick();});};window.addEventListener("scroll",onNavScroll,{passive:true});
list.addEventListener("scroll",function(){onNavScroll();if(typeof openRow!=="undefined"&&openRow&&isPhone()&&Date.now()>navHold){hide();}},{passive:true});
var onSettle=function(){if(!swipeOn()){settleMus();return;}
var o=muOrder(),to=panelTarget(o[curIdx()]);if(Math.abs(list.scrollLeft-to)>2){try{list.scrollTo({left:to,behavior:reduce?"instant":"smooth"});}catch(err){list.scrollLeft=to;}}
settleMus();};if("onscrollend" in window){list.addEventListener("scrollend",onSettle);}
else{var muST;list.addEventListener("scroll",function(){clearTimeout(muST);muST=setTimeout(onSettle,120);},{passive:true});}
window.addEventListener("resize",function(){sbKey="";onNavScroll();settleMus();});
list.addEventListener("focusin",function(ev){if(!swipeOn())return;var m=ev.target&&ev.target.closest?ev.target.closest(".mu"):null,o,i;if(!m)return;o=muOrder();i=o.indexOf(m);if(i>=0&&Math.abs(list.scrollLeft-panelTarget(m))>2){goMu(i,false);}
});
if(window.ResizeObserver){var ro=new ResizeObserver(function(){fitMus();});muOrder().forEach(function(m){ro.observe(m);});}else{list.addEventListener("toggle",function(){fitMus();},true);}
settleMus();doc.addEventListener("click",function(ev){var t=ev.target,bt=t&&t.closest?t.closest(".mnav-b,.sbug-b,.mnav-d"):null;if(!bt||bt.disabled)return;if(bt.classList.contains("mnav-d")){goMu(+bt.getAttribute("data-i"),true);return;}
goMu(curIdx()+(+bt.getAttribute("data-d")),true);});sbugTick();}


var slateEl=doc.querySelector(".slate");if(slateEl){slateEl.addEventListener("focusin",function(ev){var s=slateEl,t=ev.target,r,b;if(!t||!t.getBoundingClientRect)return;r=t.getBoundingClientRect();b=s.getBoundingClientRect();if(r.right>b.right-16||r.left<b.left+16){s.style.scrollSnapType="none";try{t.scrollIntoView({inline:"center",block:"nearest",behavior:"instant"});}catch(err){}
requestAnimationFrame(function(){s.style.scrollSnapType="";});}
});}


var ageEl=doc.getElementById("age");if(ageEl){var ageT=Date.parse(ageEl.getAttribute("data-t")||"");if(!isNaN(ageT)){var ageTick=function(){var m=Math.max(0,Math.floor((Date.now()-ageT)/60000)),d=Math.floor(m/1440),h=Math.floor((m%1440)/60),mm=m%60,t,due=m>270;t=d?(d+"d "+h+"h"):(h?(h+"h "+(mm<10?"0":"")+mm+"m"):(mm+"m"));ageEl.textContent=t+" ago"+(due?", next update is late":"");if(due){ageEl.classList.add("due");}else{ageEl.classList.remove("due");}
ageEl.hidden=false;};ageTick();setInterval(ageTick,60000);}
}


var rvBtn=doc.getElementById("rv-btn"),rvBan=doc.getElementById("rv-ban"),rvDlg=doc.getElementById("rv"),RV=BLOB.rv,wkFacts=doc.getElementById("wk-facts");if(RV&&RV.mus&&rvDlg&&typeof rvDlg.showModal==="function"){var rvKey="titan.reveal."+RV.s+".w"+RV.w,rvSteps=[],rvI=0,rvGuess=null,rvFrom=null,rvTimers=[],rvDone=true;var rvStage=doc.getElementById("rv-stage"),rvProg=doc.getElementById("rv-prog"),rvC=doc.getElementById("rv-c"),rvLive=doc.getElementById("rv-live"),rvHint=doc.getElementById("rv-hint");var rvNext=rvDlg.querySelector(".rv-next"),rvBack=rvDlg.querySelector(".rv-back");var tname=function(rid){var el=doc.querySelector('.side[data-rid="'+rid+'"] .mu-nt');return el?el.textContent:"";};var tav=function(rid){var el=doc.querySelector('.standings tr[data-rid="'+rid+'"] .av');return el?el.outerHTML.replace(" av-st",""):"";};var f2=function(v){return Number(v).toFixed(2);};var andList=function(a){return a.length<2?(a[0]||""):(a.slice(0,-1).join(", ")+" and "+a[a.length-1]);};var rvSeen=function(on){if(on){store(rvKey,"1");}
var seen=on||!!load(rvKey);if(rvBtn){rvBtn.textContent=(seen?"Replay ":"")+"Week "+RV.w+" results";rvBtn.hidden=!seen&&!!rvBan;}   
if(rvBan){rvBan.hidden=seen;}
if(wkFacts&&seen){wkFacts.classList.add("seen");}
};rvSeen(false);var rvClear=function(){rvTimers.forEach(clearTimeout);rvTimers=[];};var rvEnd=function(){var card=rvStage.querySelector(".rv-card"),st=rvSteps[rvI];rvClear();rvDone=true;if(!card||st.k!=="mu")return;[].slice.call(card.querySelectorAll(".rv-row")).forEach(function(r){var v=f2(r.getAttribute("data-v"));r.querySelector(".rv-g").textContent=v;r.querySelector(".rv-m").textContent=v;if(r.getAttribute("data-trail")==="1"){r.classList.add("trail");}
});card.classList.add("in");card.classList.add("rv-in");rvCf(card,st.m);};var rvRender=function(){var st=rvSteps[rvI],h="",o,i,x,rows,live="",tie,last=rvI===rvSteps.length-1;rvClear();rvDone=true;h="";for(i=0;i<rvSteps.length;i++){h+='<i'+(i<=rvI?' class="on"':'')+'></i>';}
rvProg.innerHTML=h;rvC.textContent="Step "+(rvI+1)+" of "+rvSteps.length;if(st.k==="q"){h='<p class="rv-q">Guess the week&#39;s top team score</p><div class="rv-opts">';for(i=0;i<RV.opts.length;i++){o=RV.opts[i];h+='<button type="button" class="btn rv-o'+(rvGuess!==null?(o[1]==="real"?" right":(rvGuess===i?" miss":"")):"")+'" data-i="'+i+'"'+(rvGuess!==null?" disabled":"")+'>'
+'<span>'+o[0]+'</span>'+(rvGuess===i?'<small>Your pick</small>':'')+'</button>';}
h+='</div><p class="rv-note">One of these is the real number. The others are made up.</p>';live="Guess the week's top team score. Options: "+RV.opts.map(function(y){return y[0];}).join(", ")+".";if(rvGuess!==null){x=RV.opts[rvGuess];var who=RV.topr.map(function(r){return '<b>'+esc(tname(r))+'</b>';});var line=(x[1]==="real"?"You got it. ":"Not this time. ")+andList(who)+" had the top score, "+f2(RV.top)+".";h+='<p class="rv-res">'+line+'</p>';live=line.replace(/<[^>]+>/g,"");}
}else if(st.k==="mu"){x=st.m;tie=x[2]===x[4];rows=[[x[1],x[2],!tie&&x[2]<x[4]],[x[3],x[4],!tie&&x[4]<x[2]]];h='<p class="rv-k">'+esc(st.t)+'</p>';rows.forEach(function(r){var start=reduce?f2(r[1]):"0.00";h+='<div class="rv-row" data-rid="'+r[0]+'" data-v="'+r[1]+'" data-trail="'+(r[2]?1:0)+'">'+tav(r[0])+'<span class="rv-nm">'+esc(tname(r[0]))+'</span>'
+'<span class="rv-sc"><span class="rv-g">'+start+'</span><span class="rv-m" aria-hidden="true">'+start+'</span></span></div>';});h+='<p class="rv-f"><span class="stamp-final'+(tie?" tie":"")+'">Final'+(tie?", tie":"")+'</span>'
+(x[5]!=null?'<span class="rv-pf">Photo finish, '+f2(x[5])+'<span class="sr"> point margin</span></span>':'')+'</p>';live=tname(x[1])+" "+f2(x[2])+", "+tname(x[3])+" "+f2(x[4])+", final"+(tie?", tie":"")+(x[5]!=null?", photo finish, "+f2(x[5])+" point margin":"")+".";}else{h='<p class="rv-k">Week '+RV.w+'</p><p class="rv-fact">Highest team score<b>'+f2(RV.top)+'</b>'+esc(andList(RV.topr.map(tname)))+'</p>'
+'<p class="rv-fact">Highest starter score<b>'+f2(RV.hp)+'</b>'+esc((RV.hpn||[]).join(", "))+'</p>';live="Highest team score "+f2(RV.top)+", "+andList(RV.topr.map(tname))+". Highest starter score "+f2(RV.hp)+", "+(RV.hpn||[]).join(", ")+".";}
rvStage.innerHTML='<div class="rv-card">'+h+'</div>';var waiting=st.k==="q"&&rvGuess===null;rvNext.disabled=waiting;rvNext.textContent=last?"Done":"Next";rvBack.disabled=rvI===0;rvHint.textContent=waiting?"Pick one to see the answer.":"";var card=rvStage.querySelector(".rv-card");setTimeout(function(){rvLive.textContent=live;},60);if(reduce||!window.requestAnimationFrame){card.classList.add("in");if(st.k==="mu"){rvEnd();}return;}
requestAnimationFrame(function(){requestAnimationFrame(function(){card.classList.add("in");});});if(st.k==="mu"){
rvDone=false;var rr=[].slice.call(card.querySelectorAll(".rv-row"));rvTimers.push(setTimeout(function(){rr.forEach(function(r){rollNum(r.querySelector(".rv-g"),0,parseFloat(r.getAttribute("data-v")),2,600,r.querySelector(".rv-m"));});},450));rvTimers.push(setTimeout(function(){rr.forEach(function(r){if(r.getAttribute("data-trail")==="1"){r.classList.add("trail");}});},1050));rvTimers.push(setTimeout(function(){card.classList.add("rv-in");rvCf(card,st.m);},1290));rvTimers.push(setTimeout(function(){rvDone=true;},1440));}
};var rvGo=function(d){var st=rvSteps[rvI];if(d>0&&!rvDone){rvEnd();return;}   
if(d>0&&st.k==="q"&&rvGuess===null)return;if(d>0&&rvI===rvSteps.length-1){rvDlg.close();return;}
rvI=Math.max(0,Math.min(rvSteps.length-1,rvI+d));rvRender();var nb=d>0?rvNext:rvBack;if(nb&&!nb.disabled){try{nb.focus({preventScroll:true});}catch(err){nb.focus();}}
};var rvOpen=function(from){var byN={},i;for(i=0;i<RV.mus.length;i++){byN[RV.mus[i][0]]=RV.mus[i];}
rvSteps=[{k:"q"}];muOrder().forEach(function(m){var x=byN[m.getAttribute("data-n")];if(x){rvSteps.push({k:"mu",m:x,t:muTitle(m)});}});rvSteps.push({k:"facts"});rvI=0;rvGuess=null;rvFrom=from;store(rvKey,"1");rvRender();rvDlg.classList.remove("in");rvDlg.showModal();if(reduce||!window.requestAnimationFrame){rvDlg.classList.add("in");}else{requestAnimationFrame(function(){rvDlg.classList.add("in");});}
var f=rvStage.querySelector(".rv-o");if(f){try{f.focus({preventScroll:true});}catch(err){f.focus();}}
};if(rvBtn){rvBtn.addEventListener("click",function(){rvOpen(rvBtn);});}
if(rvBan){rvBan.addEventListener("click",function(){rvOpen(rvBtn||rvBan);});}
rvDlg.addEventListener("click",function(ev){var t=ev.target;if(t.closest(".rv-x")){rvDlg.close();return;}
if(t.closest(".rv-back")){rvGo(-1);return;}
if(t.closest(".rv-next")){rvGo(1);return;}
var ob=t.closest(".rv-o");if(ob&&rvGuess===null){rvGuess=+ob.getAttribute("data-i");rvRender();try{rvNext.focus({preventScroll:true});}catch(err){rvNext.focus();}return;}
if(t.closest(".rv-card")&&!t.closest("button")&&rvSteps[rvI].k!=="q"){rvGo(1);}
});rvDlg.addEventListener("keydown",function(ev){if(ev.key==="ArrowRight"){ev.preventDefault();rvGo(1);}
else if(ev.key==="ArrowLeft"){ev.preventDefault();rvGo(-1);}
});rvDlg.addEventListener("close",function(){rvClear();rvDlg.classList.remove("in");rvStage.innerHTML="";rvLive.textContent="";rvSeen(true);if(rvFrom){try{rvFrom.focus({preventScroll:true});}catch(err){}}});}


var srch=doc.getElementById("srch"),sIn=doc.getElementById("srch-in"),sPop=doc.getElementById("srch-pop"),sList=doc.getElementById("srch-list");var sBtn=doc.getElementById("srch-btn"),sX=doc.getElementById("srch-x"),sEmpty=doc.getElementById("srch-empty"),sMore=doc.getElementById("srch-more"),sLive=doc.getElementById("srch-live");if(srch&&sIn&&sPop&&sList){var ctlTeam=srch.parentNode,sIdx=null,sRes=[],sAct=-1,arrRow=null,arrT=null,SMAX=8;srch.hidden=false;var norm=function(t){t=String(t||"");try{t=t.normalize("NFD");}catch(err){}
return t.replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/['.]/g,"").replace(/[^a-z0-9]+/g," ").trim();};var buildIdx=function(){var seen={};sIdx=[];[].slice.call(doc.querySelectorAll(".mu .row[data-pid]")).forEach(function(row){var pid=row.getAttribute("data-pid"),det=row.closest("details"),nm=row.querySelector(".nm"),mt=row.querySelector(".meta .pos"),rid,ne,tn="",slot,where,n;if(!nm||seen[pid])return;seen[pid]=1;n=rowName(row);rid=row.getAttribute("data-rid")||(det?det.getAttribute("data-rid"):"");ne=doc.querySelector('.side[data-rid="'+rid+'"] .mu-nt');if(ne){tn=ne.textContent.trim();}
slot=((row.querySelector(".slot")||{}).textContent||"").trim();where=slot==="IR"?"On IR for "+tn:(det?"On "+tn+(/s$/i.test(tn)?"'":"'s")+" bench":"Starting for "+tn);sIdx.push({row:row,n:n,k:norm(n),pos:mt?mt.textContent:"",tm:row.getAttribute("data-team")||"",w:where});});};var paintAct=function(){var opts=sList.querySelectorAll(".so"),i;for(i=0;i<opts.length;i++){opts[i].setAttribute("aria-selected",i===sAct?"true":"false");}
if(sAct>=0&&opts[sAct]){sIn.setAttribute("aria-activedescendant",opts[sAct].id);try{opts[sAct].scrollIntoView({block:"nearest"});}catch(err){}}
else{sIn.removeAttribute("aria-activedescendant");}
};var closeList=function(){sPop.hidden=true;sIn.setAttribute("aria-expanded","false");sIn.removeAttribute("aria-activedescendant");sAct=-1;};var render=function(){var q=norm(sIn.value),h="",i,x,sc,all=[];if(!sIdx){buildIdx();}
sAct=-1;if(!q){sRes=[];sList.innerHTML="";closeList();if(sLive){sLive.textContent="";}return;}
for(i=0;i<sIdx.length;i++){x=sIdx[i];sc=x.k.indexOf(q)===0?0:((" "+x.k).indexOf(" "+q)>=0?1:(x.k.indexOf(q)>=0?2:-1));if(sc>=0){all.push({x:x,s:sc});}
}
all.sort(function(a,b){return (a.s-b.s)||(a.x.k<b.x.k?-1:(a.x.k>b.x.k?1:0));});sRes=all.slice(0,SMAX);for(i=0;i<sRes.length;i++){x=sRes[i].x;h+='<li role="option" id="so-'+i+'" class="so" aria-selected="false" data-i="'+i+'"><span class="so-n">'+esc(x.n)+'</span>'
+'<span class="so-m">'+esc(x.pos)+', '+esc(x.tm)+'. '+esc(x.w)+'</span></li>';}
sList.innerHTML=h;if(sEmpty){sEmpty.hidden=!!sRes.length;}
if(sMore){sMore.hidden=all.length<=SMAX;sMore.textContent="Showing "+SMAX+" of "+all.length+". Keep typing to narrow it down.";}
sPop.hidden=false;sIn.setAttribute("aria-expanded",sRes.length?"true":"false");if(sLive){sLive.textContent=all.length?(all.length+(all.length===1?" player":" players")+" found"):"Not on any Titan roster. Free agents are not listed.";}
paintAct();};var clearArr=function(now){clearTimeout(arrT);if(!arrRow)return;var r=arrRow;arrRow=null;if(now===true||reduce){r.classList.remove("tl-hi","tl-out");return;}
r.classList.add("tl-out");setTimeout(function(){r.classList.remove("tl-hi","tl-out");},200);};var expand=function(){ctlTeam.classList.add("s-open");if(sBtn){sBtn.setAttribute("aria-expanded","true");}try{sIn.focus({preventScroll:true});}catch(err){sIn.focus();}};var collapse=function(focusBtn){if(!ctlTeam.classList.contains("s-open"))return;ctlTeam.classList.remove("s-open");if(sBtn){sBtn.setAttribute("aria-expanded","false");}
if(focusBtn&&sBtn&&isPhone()){sBtn.focus();}
};var choose=function(x){var row=x.row,det=row.closest("details"),prevB;sIn.value="";sList.innerHTML="";closeList();collapse(false);if(det&&!det.open){det.open=true;}
clearHi();clearArr(true);row.classList.add("tl-hi");arrRow=row;arrT=setTimeout(clearArr,2600);var mu=row.closest(".mu"),swiped=false,rr;prevB=root.style.scrollBehavior;root.style.scrollBehavior="auto";if(mu&&list&&swipeOn()){
navHold=Date.now()+900;swiped=Math.abs(list.scrollLeft-panelTarget(mu))>2;list.scrollLeft=panelTarget(mu);rr=row.getBoundingClientRect();try{window.scrollTo({top:(window.pageYOffset||0)+rr.top-Math.max(0,(window.innerHeight-rr.height)/2),behavior:"instant"});}catch(err){window.scrollTo(0,(window.pageYOffset||0)+rr.top-200);}
}else{try{row.scrollIntoView({block:"center",behavior:"instant"});}catch(err){row.scrollIntoView(false);}
}
root.style.scrollBehavior=prevB;if(cardEl){if(swiped){setTimeout(function(){show(row,true,true);},80);}else{show(row,true,true);}}else{try{row.focus();}catch(err){}}
};sIn.addEventListener("input",render);sIn.addEventListener("focus",function(){loadCards();if(sIn.value){render();}});sIn.addEventListener("keydown",function(ev){var n=sRes.length;if(ev.key==="ArrowDown"||ev.key==="ArrowUp"){if(sPop.hidden&&sIn.value){render();n=sRes.length;}
if(!n)return;ev.preventDefault();sAct=ev.key==="ArrowDown"?(sAct+1)%n:(sAct<=0?n-1:sAct-1);paintAct();}else if(ev.key==="Enter"){if(n&&!sPop.hidden){ev.preventDefault();choose(sRes[sAct>=0?sAct:0].x);}
}else if(ev.key==="Escape"){ev.preventDefault();ev.stopPropagation();if(!sPop.hidden){closeList();}else if(sIn.value){sIn.value="";render();}else{collapse(true);}
}
});sList.addEventListener("mousedown",function(ev){ev.preventDefault();});sList.addEventListener("click",function(ev){var li=ev.target;while(li&&li!==sList&&!(li.classList&&li.classList.contains("so"))){li=li.parentNode;}
if(li&&li!==sList){var r=sRes[+li.getAttribute("data-i")];if(r){choose(r.x);}}
});if(sBtn){sBtn.addEventListener("click",expand);}
if(sX){sX.addEventListener("click",function(){sIn.value="";render();collapse(true);});}
srch.addEventListener("focusout",function(){setTimeout(function(){if(!srch.contains(doc.activeElement)){closeList();if(isPhone()&&!sIn.value){collapse(false);}}},0);});doc.addEventListener("pointerdown",function(ev){if(!srch.contains(ev.target)){closeList();}},true);}



var kb=doc.getElementById("kb"),kbFoot=doc.getElementById("kb-foot"),kbOnEl=doc.getElementById("kb-on"),kbHelp=doc.getElementById("kb-help"),kbBack=null;if(kb&&("popover" in HTMLElement.prototype)&&typeof kb.showPopover==="function"){kb.hidden=false;if(kbFoot){kbFoot.hidden=false;}
var kbOn=load("titan.keys")!=="off";
var kbSee=function(){try{return window.matchMedia("(hover: hover) and (min-width: 720px)").matches;}catch(err){return true;}};var kbPaint=function(){var si=doc.getElementById("srch-in"),say=kbOn&&kbSee();if(kbOnEl){kbOnEl.checked=kbOn;}
if(kbOn){root.classList.remove("kb-off");}else{root.classList.add("kb-off");}
if(si){if(say){si.setAttribute("aria-keyshortcuts","/");si.setAttribute("aria-describedby","kb-help");}else{si.removeAttribute("aria-keyshortcuts");si.removeAttribute("aria-describedby");}}
if(sel){if(say){sel.setAttribute("aria-keyshortcuts","t");}else{sel.removeAttribute("aria-keyshortcuts");}}
if(kbHelp){kbHelp.textContent=say?"Shortcut: slash. Question mark lists every shortcut.":"";}
};kbPaint();try{window.matchMedia("(hover: hover) and (min-width: 720px)").addEventListener("change",kbPaint);}catch(err){}
if(kbOnEl){kbOnEl.addEventListener("change",function(){kbOn=kbOnEl.checked;store("titan.keys",kbOn?null:"off");kbPaint();});}
kb.addEventListener("toggle",function(ev){if(ev.newState!=="closed"||!kbBack)return;var b=kbBack,a=doc.activeElement;kbBack=null;if(!a||a===doc.body||kb.contains(a)){try{b.focus({preventScroll:true});}catch(err){}}
});var kbTyping=function(t){var n=t&&t.tagName;return n==="INPUT"||n==="TEXTAREA"||n==="SELECT"||!!(t&&t.isContentEditable);};doc.addEventListener("keydown",function(ev){var k=ev.key,arrow=(k==="ArrowLeft"||k==="ArrowRight"),i,o,inList,a;if(!kbOn||ev.defaultPrevented||ev.isComposing||ev.ctrlKey||ev.metaKey||ev.altKey||ev.repeat)return;if(k!=="?"&&k!=="/"&&k!=="t"&&!arrow)return;if((ev.shiftKey&&(k==="t"||arrow))||kbTyping(ev.target)||doc.querySelector("dialog[open]"))return;if(arrow&&!(list&&swipeOn()&&muOrder().length>1))return;ev.preventDefault();if(k==="?"){if(kb.matches(":popover-open")){kb.hidePopover();return;}
a=doc.activeElement;kbBack=(a&&a!==doc.body&&!kb.contains(a))?a:null;if(openRow){hide();}
kb.showPopover();return;}
if(kb.matches(":popover-open")){kb.hidePopover();}
if(openRow){hide();}
if(k==="/"){if(!srch||srch.hidden||!sIn)return;if(isPhone()&&typeof expand==="function"){expand();}else{try{sIn.focus();}catch(err){}}
}else if(k==="t"){if(!sel)return;if(typeof collapse==="function"){collapse(false);}
try{sel.focus();}catch(err){}
}else{o=muOrder();i=curIdx()+(k==="ArrowRight"?1:-1);if(i<0||i>=o.length)return;inList=list.contains(doc.activeElement);goMu(i,true);if(inList){o[i].setAttribute("tabindex","-1");try{o[i].focus({preventScroll:true});}catch(err){}}
}
});}



function cfBurst(host,from){if(reduce||!host||!from||typeof host.animate!=="function")return false;var hr=host.getBoundingClientRect(),fr=from.getBoundingClientRect(),x0=Math.round(fr.left-hr.left+fr.width/2),y0=Math.round(fr.top-hr.top+fr.height*.5);var box=doc.createElement("span"),i,p,a,sp,dx,up,dn,rot,dur,kinds=["cf-a","cf-b","cf-c"];box.className="cf";box.setAttribute("aria-hidden","true");for(i=0;i<40;i++){p=doc.createElement("i");p.className=kinds[i%3]+(i%5===0?" cf-r":"");p.style.left=x0+"px";p.style.top=y0+"px";box.appendChild(p);}
host.appendChild(box);
for(i=0;i<40;i++){p=box.children[i];a=(Math.random()*2-1)*1.35;sp=60+Math.random()*170;dx=Math.sin(a)*sp*1.5;up=-(18+Math.random()*48);dn=90+Math.random()*150;rot=(Math.random()*2-1)*540;dur=950+Math.random()*190;p.animate([
{transform:"translate(0px,0px) rotate(0deg)",opacity:1,easing:"cubic-bezier(.12,.62,.35,1)"},
{transform:"translate("+(dx*.55).toFixed(1)+"px,"+up.toFixed(1)+"px) rotate("+(rot*.4).toFixed(0)+"deg)",opacity:1,offset:.3,easing:"cubic-bezier(.45,0,.85,.6)"},
{transform:"translate("+dx.toFixed(1)+"px,"+dn.toFixed(1)+"px) rotate("+rot.toFixed(0)+"deg)",opacity:0}
],{duration:dur,delay:Math.random()*60,fill:"both"});}
setTimeout(function(){if(box.parentNode){box.parentNode.removeChild(box);}},1300);return true;}
function cfKey(sfx){return "titan.cf."+(BLOB.ssn||"")+".w"+(BLOB.wk||"")+(sfx||"");}
function cfSeen(sfx){return !!(cfOnce[sfx||"h"]||load(cfKey(sfx)));}
function cfMark(sfx){cfOnce[sfx||"h"]=1;store(cfKey(sfx),"1");}

function cfArm(){if(cfIO){cfIO.disconnect();cfIO=null;}
var rid=sel?sel.value:"",m=rid?muFor(rid):null,h=m?m.querySelector(".mu-head"):null;if(reduce||!BLOB.wk||!h||cfSeen()||!h.querySelector(".side.you .mu-tot.won")||!("IntersectionObserver" in window))return;cfIO=new IntersectionObserver(function(en){if(!en.some(function(x){return x.isIntersecting;}))return;if(cfIO){cfIO.disconnect();cfIO=null;}
var go=function(){var t=h.querySelector(".side.you .mu-tot.won");if(reduce||cfSeen()||!t||!sel||muFor(sel.value)!==m)return;if(cfBurst(h,h.querySelector(".side.you .mu-name")||t)){cfMark();}   
};setTimeout(function(){if(h.classList.contains("sweep")){setTimeout(go,900);}else{go();}},60);},{threshold:.6});cfIO.observe(h);}

function rvCf(card,x){var rid=sel?sel.value:"",row;if(reduce||!card||!rid||!x||x[2]===x[4]||cfSeen())return;if(String(x[2]>x[4]?x[1]:x[3])!==rid)return;row=card.querySelector('.rv-row[data-rid="'+rid+'"] .rv-nm');if(cfBurst(card,row||card)){cfMark();}
}

function raPick(rid){if(raAuto&&raAuto.parentNode){raAuto.parentNode.removeChild(raAuto);}
raAuto=null;var src=rid?doc.querySelector('.ra-t[data-rid="'+rid+'"]'):null,row=rid?doc.querySelector('.standings tr.st[data-rid="'+rid+'"]'):null,tr,d,nm,pref=load("titan.ra");if(!src||!row||!row.parentNode)return;nm=src.querySelector(".ra-tn");tr=doc.createElement("tr");tr.className="ra-tr";tr.setAttribute("data-rid",rid);tr.innerHTML='<td colspan="4"><details class="ra"'+(pref==="open"?" open":"")+'><summary>Road ahead<span class="sr"> for '+esc(nm?nm.textContent:"")+'</span></summary></details></td>';d=tr.querySelector("details");d.appendChild(src.querySelector(".ra-l").cloneNode(true));d.addEventListener("click",function(ev){if(ev.target.closest&&ev.target.closest("summary")){setTimeout(function(){store("titan.ra",d.open?"open":"closed");},0);}});row.parentNode.insertBefore(tr,row.nextSibling);raAuto=tr;}

var LV=BLOB.lv||null;if(LV&&LV.on&&window.fetch){(function(){var band=doc.getElementById("lv"),bandT=doc.getElementById("lv-t"),stQ=doc.getElementById("st-q"),sayEl=doc.getElementById("lv-say");var tickEl=doc.getElementById("tick"),tickL=doc.getElementById("tick-l"),tickN=doc.getElementById("tick-n"),tickC=doc.getElementById("tick-mine");var stlEl=doc.getElementById("stl"),stlOn=doc.getElementById("stl-on"),stlOff=doc.getElementById("stl-off"),stlN=doc.getElementById("stl-n");var SL=LV.sl||[],TK=LV.tk||{},STD=LV.st||{},POLL=LV.ms||45000,TAIL=LV.tail||14400000,MAXW=300000,FLOOR=0.1,CAP=30;var prev=null,cur=null,at=0,fails=0,on=false,inFlight=false,timer=null,wait=POLL,why="",fresh=false;var moments=[],mineOnly=load("titan.tick")==="mine",stFlag=false,stSnap=null,stIp=0,vting=false,lastScroll=0;var TZT=(LV.stamp||"").split(" ").pop();   
function has(o,k){return !!o&&Object.prototype.hasOwnProperty.call(o,k);}
function ms(s){var t=Date.parse(s);return isNaN(t)?0:t;}
function n2(v){return (Math.round(v*100)/100).toFixed(2);}
function n1(v){return (Math.round(v*10)/10).toFixed(1);}
function ord(n){var s=(n%100>=10&&n%100<=13)?"th":({1:"st",2:"nd",3:"rd"}[n%10]||"th");return n+s;}


var WINS=[],i0,g0,t0;for(i0=0;i0<SL.length;i0++){g0=SL[i0];if(g0.d)continue;t0=ms(g0.t);if(!t0)continue;WINS.push([t0,t0+TAIL]);}
if(!WINS.length)return;WINS.sort(function(a,b){return a[0]-b[0];});
if(location.protocol!=="http:"&&location.protocol!=="https:")return;function windowOpen(){var n=Date.now(),i;for(i=0;i<WINS.length;i++){if(n>=WINS[i][0]&&n<=WINS[i][1])return true;}
return false;}

function nextOpen(){var n=Date.now(),i;for(i=0;i<WINS.length;i++){if(WINS[i][0]>n)return WINS[i][0];}
return 0;}

function started(team){var g=TK[team],t;if(!g||g.x)return false;if(g.s==="in"||g.d)return true;t=ms(g.t);return !!(t&&Date.now()>=t);}
function gdone(team){var g=TK[team];return !!(g&&g.d);}
var PT={},BST={},rs0,i1,rid0;rs0=doc.querySelectorAll(".row[data-pid][data-team]");for(i1=0;i1<rs0.length;i1++){PT[rs0[i1].getAttribute("data-pid")]=rs0[i1].getAttribute("data-team");}
rs0=doc.querySelectorAll("#matchups-list .sbs .row[data-rid][data-pid]");for(i1=0;i1<rs0.length;i1++){rid0=rs0[i1].getAttribute("data-rid");if(!BST[rid0]){BST[rid0]=[];}
BST[rid0].push(rs0[i1].getAttribute("data-pid"));}

var BBN={},ds0,sl0;ds0=doc.querySelectorAll("#matchups-list .bench[data-rid]");for(i1=0;i1<ds0.length;i1++){rid0=ds0[i1].getAttribute("data-rid");BBN[rid0]=[];rs0=ds0[i1].querySelectorAll(".row[data-pid]");for(var j1=0;j1<rs0.length;j1++){sl0=rs0[j1].querySelector(".slot");if(sl0&&sl0.textContent.trim()==="IR")continue;BBN[rid0].push(rs0[j1].getAttribute("data-pid"));}
}
function startedPid(pid){return !!PT[pid]&&started(PT[pid]);}

function ago(t){var s=Math.max(0,Math.round((Date.now()-t)/1000)),m,h;if(s<60)return s+"s ago";m=Math.floor(s/60);if(m<60)return m+"m "+(s%60)+"s ago";h=Math.floor(m/60);return h+"h "+(m%60)+"m ago";}
function clock(t){try{return new Intl.DateTimeFormat("en-US",{timeZone:BLOB.tz||"America/Chicago",hour:"numeric",minute:"2-digit"}).format(new Date(t));}
catch(err){return "";}
}

var saidLast="";function say(msg){if(!sayEl||!msg||msg===saidLast)return;saidLast=msg;sayEl.textContent=msg;}

function paintBand(){var t;if(!band)return;
if(!on&&at){band.hidden=false;band.className="lv lv-off";if(stQ){stQ.hidden=false;}

if(bandT){bandT.textContent=(nextOpen()?"No game is in progress, so nothing is being fetched. Every number marked Live is the one from "
:"Live updates have stopped, the last game can no longer be running. Every number marked Live is the one from ")
+clock(at)+" "+TZT+".";}
return;}
if(!on){band.hidden=true;if(stQ){stQ.hidden=true;}return;}
band.hidden=false;if(stQ){stQ.hidden=false;}
if(fails>=3&&at){t="Live updates paused, "+why+". Every number marked Live is still the one from "+ago(at)+".";}
else if(fails>=3){t="Live updates paused, "+why+". Nothing has been fetched yet, so every number here is from the build.";}
else if(at&&fresh){t="Live, updated "+ago(at)+".";}
else {t="Live, waiting for the first answer from Sleeper.";}
band.className="lv"+(fails>=3?" lv-off":"");if(bandT&&bandT.textContent!==t){bandT.textContent=t;}
}
function paintAges(){var els,i,t;
if(at&&fresh){t="Live, "+ago(at);els=doc.querySelectorAll(".mu-lbl .lv-s");for(i=0;i<els.length;i++){if(els[i].textContent!==t){els[i].textContent=t;}}
}
paintBand();paintStNote();}

function fade(el){
if(vting||reduce||!el||!el.animate)return;try{el.animate([{opacity:.3},{opacity:1}],{duration:280,easing:"cubic-bezier(.22,.61,.36,1)"});}catch(err){}
}
function put(el,txt){if(!el||el.textContent===txt)return false;el.textContent=txt;fade(el);return true;}
function isFin(mu){var l=mu.querySelector(".mu-lbl");return !!(l&&l.classList.contains("fin"));}
function ptsVal(row){var p=row.querySelector(".pts"),b,v;if(!p||!p.classList.contains("on"))return 0;b=p.querySelector("b");v=parseFloat((b||p).textContent);return isNaN(v)?0:v;}
function liveSr(el){var s=el.parentNode?el.parentNode.querySelector(".lv-sr"):null;if(s||!el.parentNode)return;s=doc.createElement("span");s.className="sr lv-sr";s.textContent=", live from Sleeper";el.parentNode.insertBefore(s,el.nextSibling);}


function scores(snap){var mus=doc.querySelectorAll("#matchups-list .mu"),i;for(i=0;i<mus.length;i++){scoreMu(mus[i],snap);}
rowsOf(snap);leads(snap);benches(snap);chartNote();if(typeof paintNav==="function"){sbKey="";paintNav();}
}

function sideStarted(rid){var st=BST[rid]||[],j;for(j=0;j<st.length;j++){if(startedPid(st[j]))return true;}
return false;}
function muStarted(mu){var sides=mu.querySelectorAll(".side[data-rid]"),i;for(i=0;i<sides.length;i++){if(sideStarted(sides[i].getAttribute("data-rid")))return true;}
return false;}
function scoreMu(mu,snap){var sides=mu.querySelectorAll(".side[data-rid]"),vals=[],any=false,all=true,i,side,rid,r,tot,sub,mv,bp,d,lbl,bar,sp,a,b,s;if(!muStarted(mu))return;for(i=0;i<sides.length;i++){side=sides[i];rid=side.getAttribute("data-rid");r=snap[rid];tot=side.querySelector(".mu-tot");if(!r||r.pts===null||!tot||!sideStarted(rid)){vals.push(null);all=false;continue;}
any=true;put(tot,n2(r.pts));tot.setAttribute("data-v",n2(r.pts));tot.setAttribute("data-k","live");tot.classList.add("lv-on");liveSr(tot);sub=side.querySelector(".mu-sub");if(sub){sub.hidden=false;}
mv=side.querySelector(".mu-mv");bp=parseFloat(tot.getAttribute("data-bp"));if(mv){d=isNaN(bp)?0:Math.round((r.pts-bp)*100)/100;if(d>0&&!isFin(mu)&&n2(d)!==n2(r.pts)){mv.textContent="+"+n2(d)+" since previous update";mv.hidden=false;}
else{mv.textContent="";mv.hidden=true;}
}
vals.push(Math.round(r.pts*100)/100);}
if(vals.length===2&&vals[0]!==null&&vals[1]!==null){a=vals[0];b=vals[1];if(!isFin(mu)&&(a!==0||b!==0)){mu.classList.remove("inkp");for(i=0;i<2;i++){sides[i].classList.remove("ink-l");sides[i].classList.remove("ink-t");}
if(a===b){sides[0].classList.add("ink-l");sides[1].classList.add("ink-l");}
else{sides[a>b?0:1].classList.add("ink-l");sides[a>b?1:0].classList.add("ink-t");}
}
bar=mu.querySelector(".mu-bar");if(bar&&(a+b)>0){sp=bar.querySelector("span");if(sp){sp.style.width=(a/(a+b)*100).toFixed(1)+"%";}
bar.setAttribute("title",n2(a)+" to "+n2(b));bar.hidden=false;}
}
lbl=mu.querySelector(".mu-lbl");if(lbl&&any&&!lbl.querySelector(".lv-s")){
if(!isFin(mu)&&all){lbl.innerHTML="";}
s=doc.createElement("span");s.className="lv-s";s.textContent=at?("Live, "+ago(at)):"Live";lbl.appendChild(s);}
}
function rowsOf(snap){var rows=doc.querySelectorAll("#matchups-list .row[data-pid]"),i,row,pid,rid,r,p;for(i=0;i<rows.length;i++){row=rows[i];pid=row.getAttribute("data-pid");rid=rowRid(row);r=snap[rid];if(!r||!has(r.pp,pid))continue;                                  
if(!started(row.getAttribute("data-team")))continue;             
p=row.querySelector(".pts");if(p){setPts(row,p,Math.round(r.pp[pid]*100)/100);}
}
}
function setPts(row,p,v){var pr=p.getAttribute("data-pr")||"",b=p.querySelector("b"),sm=p.querySelector("small"),sr=p.querySelector(".sr"),pb,d,mvn,meta,gl;if(!b){p.textContent="";b=doc.createElement("b");p.appendChild(b);sr=null;sm=null;}
if(!sr){sr=doc.createElement("span");sr.className="sr";p.appendChild(sr);}
if(!sm){sm=doc.createElement("small");sm.setAttribute("aria-hidden","true");p.appendChild(sm);}
put(b,n2(v));sr.textContent=" points, live from Sleeper, proj "+pr;sm.textContent="proj "+pr;p.classList.add("on");p.classList.add("lv-on");pb=parseFloat(p.getAttribute("data-pb"));mvn=row.querySelector(".mv-n");d=isNaN(pb)?0:Math.round((v-pb)*100)/100;if(d>0&&n2(d)!==n2(v)){if(!mvn){meta=row.querySelector(".meta");if(meta){mvn=doc.createElement("span");mvn.className="mv-n";gl=meta.querySelector(".gl");if(gl){meta.insertBefore(mvn,gl);}else{meta.appendChild(mvn);}
}
}
if(mvn){mvn.innerHTML="+"+n2(d)+'<span class="sr"> points</span>';row.classList.add("mv");}
}else if(mvn&&mvn.parentNode){mvn.parentNode.removeChild(mvn);row.classList.remove("mv");}
}

function leads(snap){var lis=doc.querySelectorAll("#matchups-list .sbs > li.sl"),i,li,ra,rb,ea,eb,va,vb;for(i=0;i<lis.length;i++){li=lis[i];ra=li.querySelector(".row.a");rb=li.querySelector(".row.b");if(!ra||!rb)continue;ea=ra.classList.contains("empty");eb=rb.classList.contains("empty");if(ea&&eb)continue;if(!(ea||started(ra.getAttribute("data-team"))))continue;if(!(eb||started(rb.getAttribute("data-team"))))continue;va=ea?0:ptsVal(ra);vb=eb?0:ptsVal(rb);setLead(ra,va>vb);setLead(rb,vb>va);}
}
function setLead(row,yes){var s=row.querySelector(".lead-sr"),p;if(yes){row.classList.add("lead");if(!s){s=doc.createElement("span");s.className="sr lead-sr";s.textContent=", ahead in this slot";p=row.querySelector(".pts");if(p&&p.parentNode){p.parentNode.insertBefore(s,p.nextSibling);}else{row.appendChild(s);}
}
}else{row.classList.remove("lead");if(s&&s.parentNode){s.parentNode.removeChild(s);}
}
}

function benches(snap){var ds=doc.querySelectorAll("#matchups-list .bench[data-rid]"),i,d,rid,r,el,sum,j,pid,any,open,html,bn;for(i=0;i<ds.length;i++){d=ds[i];rid=d.getAttribute("data-rid");r=snap[rid];el=d.querySelector(".bn-pts");if(!r||!el||!r.all||!r.st)continue;swapNote(d,rid,r);bn=BBN[rid]||[];sum=0;any=false;open=false;for(j=0;j<bn.length;j++){pid=bn[j];if(!has(r.pp,pid))continue;sum+=r.pp[pid];if(startedPid(pid)){any=true;if(!gdone(PT[pid])){open=true;}}
else if(!PT[pid]){open=true;}
}
if(!any)continue;html=n2(sum)+(open?" so far":"")+'<span class="sr"> bench points, live from Sleeper</span>';if(el.innerHTML!==html){el.innerHTML=html;fade(el);}
el.classList.add("lv-on");el.hidden=false;}
}
function swapNote(d,rid,r){var mine=(BST[rid]||[]).slice().sort().join(","),now=[],i,body,note,nm;for(i=0;i<r.st.length;i++){if(r.st[i]&&r.st[i]!=="0"){now.push(r.st[i]);}}
now=now.sort().join(",");body=d.closest?d.closest(".mu-body"):null;if(!body)return;note=body.querySelector('.lv-sw[data-rid="'+rid+'"]');if(!mine||!now||mine===now){if(note&&note.parentNode){note.parentNode.removeChild(note);}
return;}
if(note)return;nm=doc.querySelector('.side[data-rid="'+rid+'"] .mu-nt');note=doc.createElement("div");note.className="swaps lv-sw";note.setAttribute("data-rid",rid);note.innerHTML='<span class="lbl">Lineup change, '+esc(nm?nm.textContent:"")+'</span><span>The lineup in Sleeper is no longer the one drawn here. The rows below are from the build; the total and the bench points are from the live answer</span>';body.insertBefore(note,body.firstChild);}

function chartNote(){var fs=doc.querySelectorAll("#matchups-list .tlc"),i,p;for(i=0;i<fs.length;i++){if(fs[i].querySelector(".lv-cn"))continue;p=doc.createElement("p");p.className="lv-cn";p.textContent="This chart is from the saved updates through "+(LV.stamp||"the last build")+". It does not include the live numbers above it.";fs[i].appendChild(p);}
}


function feed(snap,pv){var rid,pid,now=Date.now(),a,b,d,batch=[],i;if(!pv)return 0;for(rid in snap){if(!has(snap,rid)||!pv[rid])continue;a=pv[rid].pp;b=snap[rid].pp;for(pid in b){if(!has(b,pid)||!has(a,pid))continue;d=Math.round((b[pid]-a[pid])*100)/100;if(d<FLOOR&&d>-FLOOR)continue;batch.push({t:now,pid:pid,rid:rid,d:d,v:Math.round(b[pid]*100)/100,st:snap[rid].st.indexOf(pid)>=0});}
}
batch.sort(function(x,y){return Math.abs(x.d)-Math.abs(y.d);});for(i=0;i<batch.length;i++){moments.unshift(batch[i]);}
if(moments.length>CAP){moments.length=CAP;}
tickAdd(batch);   
return batch.length;}
function pname(pid){var row=doc.querySelector('.row[data-pid="'+pid+'"]');if(row)return rowName(row);return (cards[pid]&&cards[pid].n)?cards[pid].n:"A player";}
function oname(rid){var el=doc.querySelector('.side[data-rid="'+rid+'"] .mu-nt');return el?el.textContent:"";}
function mineRids(){var el=(sel&&sel.value)?muFor(sel.value):null,s=el?(el.getAttribute("data-rids")||""):"";return s?s.split(","):null;}
function tickLine(m){var d=(m.d>0)?('<span class="tick-d">+'+n1(m.d)+'</span>')
:('<span class="tick-d dn">corrected to '+n1(m.v)+'</span>');return '<li class="tick-i" data-rid="'+esc(m.rid)+'"><button type="button" class="tick-b" data-pid="'+esc(m.pid)+'" data-rid="'+esc(m.rid)+'">'
+'<span class="tick-t">'+esc(clock(m.t))+'</span><span class="tick-p">'+esc(pname(m.pid))+'</span>'+d
+'<span class="tick-w">'+(m.st?"starting for ":"on the bench for ")+esc(oname(m.rid))+(m.d>0?(", now "+n1(m.v)):"")+'</span></button></li>';}

function tickShown(){var i,n=0,kids=tickL?tickL.children:[];for(i=0;i<kids.length;i++){if(!kids[i].hidden)n++;}
return n;}
function tickFilter(){var keep=mineOnly?mineRids():null,i,kids=tickL?tickL.children:[];for(i=0;i<kids.length;i++){kids[i].hidden=!!(keep&&keep.indexOf(String(kids[i].getAttribute("data-rid")))<0);}
}
function tickAdd(list){var i,keep=mineOnly?mineRids():null,d,li;if(!tickL)return;for(i=0;i<list.length;i++){d=doc.createElement("div");d.innerHTML=tickLine(list[i]);li=d.firstChild;if(!li)continue;if(keep&&keep.indexOf(String(list[i].rid))<0){li.hidden=true;}
tickL.insertBefore(li,tickL.firstChild);}
while(tickL.children.length>CAP){tickL.removeChild(tickL.lastChild);}
}
function paintTick(){if(!tickEl||!tickL||!tickN)return;if(!on&&!moments.length){tickEl.hidden=true;return;}
tickEl.hidden=false;if(tickC){tickC.hidden=!on||!(sel&&sel.value);tickC.setAttribute("aria-pressed",mineOnly?"true":"false");}
if(!on){
if(tickL.children.length){tickL.innerHTML="";}
tickN.textContent=moments.length+" scoring moment"+(moments.length===1?"":"s")+" while this page was open. No game is live now, so nothing is being fetched.";return;}
tickN.textContent=tickShown()?"":(at?"Nothing has moved by a tenth of a point yet. Every line here is the change between two live answers."
:"Waiting for the first answer from Sleeper.");}
if(tickL){tickL.addEventListener("click",function(ev){var b=(ev.target&&ev.target.closest)?ev.target.closest(".tick-b"):null,pid,rid,row;if(!b)return;pid=b.getAttribute("data-pid");rid=b.getAttribute("data-rid");row=doc.querySelector('.row[data-pid="'+pid+'"][data-rid="'+rid+'"]')||doc.querySelector('.row[data-pid="'+pid+'"]');if(!row)return;try{row.scrollIntoView({block:"center"});}catch(err){row.scrollIntoView();}
show(row,true,false);});}
if(tickC){tickC.addEventListener("click",function(){mineOnly=!mineOnly;store("titan.tick",mineOnly?"mine":"all");tickFilter();paintTick();});}


function allStarted(r){var i,pid,real=0;if(!r.st)return false;for(i=0;i<r.st.length;i++){pid=r.st[i];if(!pid||pid==="0")continue;real++;if(!PT[pid])return false;              
if(!started(PT[pid]))return false;}
return real>0;}
function stResults(snap){var pairs={},out={},ip={},rid,r,mid,g,a,b;for(rid in snap){if(!has(snap,rid))continue;r=snap[rid];if(r.mid===null||r.mid===undefined)continue;if(!pairs[r.mid]){pairs[r.mid]=[];}
pairs[r.mid].push(rid);}
for(mid in pairs){if(!has(pairs,mid))continue;g=pairs[mid];if(g.length!==2)continue;a=snap[g[0]];b=snap[g[1]];if(a.pts===null||b.pts===null)continue;if(!allStarted(a)||!allStarted(b)){ip[g[0]]=1;ip[g[1]]=1;continue;}
out[g[0]]={pts:a.pts,opp:b.pts,res:(a.pts>b.pts)?"w":((a.pts<b.pts)?"l":"t")};out[g[1]]={pts:b.pts,opp:a.pts,res:(b.pts>a.pts)?"w":((b.pts<a.pts)?"l":"t")};}
return {res:out,ip:ip};}
function stList(snap){var R=STD.r||{},z=stResults(snap),rid,base,e,out=[],q;stIp=0;for(rid in z.ip){if(has(z.ip,rid)){stIp++;}}
stIp=Math.round(stIp/2);for(rid in R){if(!has(R,rid))continue;base=R[rid];e={rid:rid,w:base[0],l:base[1],t:base[2],kpf:base[3],kpa:base[4],dpa:base[5],live:false,ip:!!z.ip[rid]};if(z.res[rid]){q=z.res[rid];e.live=true;if(q.res==="w"){e.w+=1;}else if(q.res==="l"){e.l+=1;}else{e.t+=1;}
e.kpf=Math.round((e.kpf+q.pts)*100)/100;e.kpa=Math.round((e.kpa+q.opp)*100)/100;if(e.dpa!==null&&e.dpa!==undefined){e.dpa=Math.round((e.dpa+q.opp)*100)/100;}
}
out.push(e);}
out.sort(function(x,y){return (y.w-x.w)||(y.t-x.t)||(y.kpf-x.kpf)||(y.kpa-x.kpa);});return out;}
function stGt(a,b){return (a.w!==b.w)?(a.w>b.w):((a.t!==b.t)?(a.t>b.t):((a.kpf!==b.kpf)?(a.kpf>b.kpf):(a.kpa>b.kpa)));}
function stEq(a,b){return a.w===b.w&&a.t===b.t&&a.kpf===b.kpf&&a.kpa===b.kpa;}
function stCells(tr){return {rk:tr.querySelector(".rk"),rec:tr.querySelector("td.num:not(.pf)"),pf:tr.querySelector("td.pf")};}
function stGrab(){var tb=doc.querySelector(".standings tbody"),trs,i,tr,rid,c,o,n=0;if(!tb)return null;trs=[].slice.call(tb.children);o={tb:tb,order:trs,cells:{},rank:{},cut:null};for(i=0;i<trs.length;i++){tr=trs[i];if(tr.classList.contains("cut")){o.cut=tr;continue;}
if(!tr.classList.contains("st"))continue;rid=tr.getAttribute("data-rid");if(!rid)continue;c=stCells(tr);n++;o.rank[rid]=n;o.cells[rid]={rk:c.rk?c.rk.innerHTML:"",rec:c.rec?c.rec.innerHTML:"",pf:c.pf?c.pf.innerHTML:"",
pfc:c.pf?c.pf.className:"",cls:tr.className};}
return o;}
function stGlue(tb,rid){var ra=tb.querySelector('tr.ra-tr[data-rid="'+rid+'"]');if(ra){tb.appendChild(ra);}
}
function stPaint(snap){var list=stList(snap),tb,i,j,e,tr,c,rank,ties,po=STD.po||0,placed=false,sk,pa,ar;if(!stSnap){stSnap=stGrab();}
if(!stSnap)return;tb=stSnap.tb;for(i=0;i<list.length;i++){e=list[i];tr=tb.querySelector('tr.st[data-rid="'+e.rid+'"]');if(!tr)continue;tb.appendChild(tr);stGlue(tb,e.rid);if(po&&i===po-1&&stSnap.cut){tb.appendChild(stSnap.cut);placed=true;}
rank=1;ties=0;for(j=0;j<list.length;j++){if(stGt(list[j],e)){rank++;}
if(stEq(list[j],e)){ties++;}
}
c=stCells(tr);ar=(rank<stSnap.rank[e.rid])?('<span class="st-ar up" aria-hidden="true">&#9650;</span><span class="sr">, up '+(stSnap.rank[e.rid]-rank)+' from the last build</span>')
:((rank>stSnap.rank[e.rid])?('<span class="st-ar dn" aria-hidden="true">&#9660;</span><span class="sr">, down '+(rank-stSnap.rank[e.rid])+' from the last build</span>'):"");if(c.rk){c.rk.innerHTML=((ties>1)?"T":"")+rank+((ties>1)?('<span class="sr">, tied for '+ord(rank)+'</span>'):"")+ar;}
if(c.rec){sk=c.rec.querySelector(".st-sk");c.rec.innerHTML=e.w+"-"+e.l+(e.t?("-"+e.t):"");if(sk){c.rec.appendChild(sk);}
}
if(c.pf){pa=c.pf.querySelector(".st-pa");c.pf.innerHTML=n2(e.kpf);if(pa){if(e.dpa!==null&&e.dpa!==undefined){pa.innerHTML='<span class="st-pal" aria-hidden="true">PA</span><span class="sr">points against</span> '+n2(e.dpa);}
c.pf.appendChild(pa);}
if(e.live){c.pf.classList.add("lv-on");}else{c.pf.classList.remove("lv-on");}
}
if(e.ip){tr.classList.add("st-ip");}else{tr.classList.remove("st-ip");}
if(STD.top3){if(rank<=3){tr.classList.add("st-top");}else{tr.classList.remove("st-top");}}
}
if(!placed&&stSnap.cut){tb.appendChild(stSnap.cut);}
}
function stRestore(){var o=stSnap,i,rid,tr,c,ras,own;if(!o)return;for(i=0;i<o.order.length;i++){o.tb.appendChild(o.order[i]);}

ras=o.tb.querySelectorAll("tr.ra-tr[data-rid]");for(i=0;i<ras.length;i++){if(o.order.indexOf(ras[i])>=0)continue;own=o.tb.querySelector('tr.st[data-rid="'+ras[i].getAttribute("data-rid")+'"]');if(own&&own.nextSibling!==ras[i]){o.tb.insertBefore(ras[i],own.nextSibling);}
}
for(rid in o.cells){if(!has(o.cells,rid))continue;tr=o.tb.querySelector('tr.st[data-rid="'+rid+'"]');if(!tr)continue;c=stCells(tr);if(c.rk){c.rk.innerHTML=o.cells[rid].rk;}
if(c.rec){c.rec.innerHTML=o.cells[rid].rec;}

if(c.pf){c.pf.innerHTML=o.cells[rid].pf;c.pf.className=o.cells[rid].pfc;}
tr.className=o.cells[rid].cls;}
stIp=0;}
function paintStNote(){if(!stlN)return;if(!stFlag){stlN.textContent="";return;}
stlN.textContent="Live, "+(at?ago(at):"no answer yet")+". Nothing is official until every game is final."
+(stIp?(" "+stIp+((stIp===1)?" matchup still has a starter who has not kicked off, so it counts as in progress and is not counted as a result."
:" matchups still have a starter who has not kicked off, so they count as in progress and are not counted as results."))
:"")
+" The streak beside each record is still from the last build.";}
function stSet(flag){if(!stlOn||!stlOff)return;vt(function(){keep(function(){stFlag=flag;stlOn.setAttribute("aria-pressed",flag?"true":"false");stlOff.setAttribute("aria-pressed",flag?"false":"true");if(flag){stlOn.classList.add("on");stlOff.classList.remove("on");}else{stlOff.classList.add("on");stlOn.classList.remove("on");}
if(flag){stSnap=stGrab();if(cur){stPaint(cur);}}
else{stRestore();stSnap=null;}
paintStNote();},"standings");});}
if(stlOn){stlOn.addEventListener("click",function(){if(!stFlag){stSet(true);}});}
if(stlOff){stlOff.addEventListener("click",function(){if(stFlag){stSet(false);}});}


function keep(fn,which){var el=doc.getElementById(which==="standings"?"standings":"matchups-list"),a,b;if(!el){fn();return;}
a=el.getBoundingClientRect().top;fn();b=el.getBoundingClientRect().top;if(a<0&&Math.abs(b-a)>0.5){window.scrollBy(0,b-a);}   
}
function stNames(set){var trs=doc.querySelectorAll(".standings tbody tr.st"),i;for(i=0;i<trs.length;i++){trs[i].style.viewTransitionName=set?("stl-"+trs[i].getAttribute("data-rid")):"";}
}
function vt(fn){var t,end;if(reduce||!doc.startViewTransition||busy||vting||(Date.now()-lastScroll<500)){fn();return;}
stNames(stFlag);   
vting=true;try{t=doc.startViewTransition(fn);}
catch(err){vting=false;stNames(false);fn();return;}
end=function(){vting=false;stNames(false);};if(t&&t.finished&&t.finished.then){t.finished.then(end,end);}else{setTimeout(end,700);}

if(t&&t.updateCallbackDone&&t.updateCallbackDone.then){t.updateCallbackDone.then(null,function(){});}
if(t&&t.ready&&t.ready.then){t.ready.then(null,function(){});}
}
function apply(snap,pv){vt(function(){keep(function(){scores(snap);feed(snap,pv);if(stFlag){stPaint(snap);}
paintBand();paintTick();paintStNote();});});}
function norm(rows){var out={},i,m,rid,pp,k,v,st,all,got=false;if(!rows||!rows.length)return null;for(i=0;i<rows.length;i++){m=rows[i];if(!m||typeof m!=="object")continue;rid=m.roster_id;if(rid===undefined||rid===null)continue;pp={};if(m.players_points&&typeof m.players_points==="object"){for(k in m.players_points){if(!has(m.players_points,k))continue;v=Number(m.players_points[k]);if(!isNaN(v)&&isFinite(v)){pp[String(k)]=v;}
}
}
st=[];all=null;if(m.starters&&m.starters.length){for(k=0;k<m.starters.length;k++){st.push(String(m.starters[k]));}}
if(m.players&&m.players.length){all=[];for(k=0;k<m.players.length;k++){all.push(String(m.players[k]));}}
out[String(rid)]={pts:(typeof m.points==="number"&&isFinite(m.points))?m.points:null,pp:pp,st:st,all:all,
mid:(m.matchup_id===undefined?null:m.matchup_id)};got=true;}
return got?out:null;}
function miss(word){fails++;why=word;wait=Math.min(POLL*Math.pow(2,fails-1),MAXW);   
if(fails===3){say("Live updates paused");}     
paintBand();}
function arm(){if(timer){clearTimeout(timer);timer=null;}
if(!on||doc.hidden)return;timer=setTimeout(function(){timer=null;poll();},wait);}
function poll(){var url,ac,to;if(!windowOpen()){stop();return;}
if(doc.hidden)return;            
if(inFlight){timer=setTimeout(function(){timer=null;poll();},1000);return;}   
inFlight=true;url=LV.api+"/league/"+LV.lg+"/matchups/"+LV.wk;ac=window.AbortController?new AbortController():null;to=setTimeout(function(){if(ac){ac.abort();}},20000);fetch(url,ac?{signal:ac.signal,cache:"no-store"}:{cache:"no-store"}).then(function(r){clearTimeout(to);if(!r.ok)throw new Error("status "+r.status);return r.json();}).then(function(j){var snap=norm(j),was;inFlight=false;if(!snap){miss("the last answer carried no rows");arm();return;}
if(fails>=3){say("Live updates resumed");}   
fails=0;wait=POLL;why="";at=Date.now();fresh=true;was=cur;cur=snap;prev=was;apply(snap,prev);arm();},function(){clearTimeout(to);inFlight=false;miss("Sleeper did not answer");arm();});}
function start(){if(on)return;on=true;moments.length=0;   
fresh=false;fails=0;why="";   
say("Live scores on");paintBand();keep(function(){paintTick();});if(stlEl&&STD.ok){stlEl.hidden=false;}
wait=0;arm();}
function stop(){var els,i,t;if(timer){clearTimeout(timer);timer=null;}
if(!on)return;on=false;say(nextOpen()?"No game is in progress":"Live updates have stopped");if(stFlag){stSet(false);}
if(stlEl){stlEl.hidden=true;}

prev=null;cur=null;
if(at){t="Live at "+clock(at);els=doc.querySelectorAll(".mu-lbl .lv-s");for(i=0;i<els.length;i++){els[i].textContent=t;}
}
paintBand();paintTick();}

function beat(){var nx;if(windowOpen()){if(!on&&!doc.hidden){start();}

if(on&&!doc.hidden){paintAges();}
}else if(on){stop();}
nx=nextOpen();if(!on&&!nx)return;   

setTimeout(beat,on?2000:Math.max(1000,Math.min(15000,nx-Date.now())));}
doc.addEventListener("visibilitychange",function(){if(doc.hidden){if(timer){clearTimeout(timer);timer=null;}return;}
if(windowOpen()){if(!on){start();return;}

wait=Math.max(0,POLL-(Date.now()-at));arm();}else if(on){stop();}
});window.addEventListener("scroll",function(){lastScroll=Date.now();});beat();})();}


var pwEl=doc.getElementById("pw");if(pwEl){doc.addEventListener("pointerdown",function(ev){if(pwEl.open&&!pwEl.contains(ev.target)){pwEl.open=false;}},true);pwEl.addEventListener("keydown",function(ev){if(ev.key==="Escape"&&pwEl.open){ev.preventDefault();pwEl.open=false;var s=pwEl.querySelector("summary");if(s){s.focus();}}});}
})();