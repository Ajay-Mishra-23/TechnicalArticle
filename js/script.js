(function(){
var secs=[].slice.call(document.querySelectorAll("section.s")),dots=document.getElementById("dots");
secs.forEach(function(s,i){var a=document.createElement("a");a.href="#"+s.id;a.setAttribute("aria-label","Section "+(i+1));dots.appendChild(a)});
var reduce=window.matchMedia("(prefers-reduced-motion:reduce)").matches;
function count(el){var to=+el.dataset.to,dec=+el.dataset.dec||0,pre=el.dataset.pre||"",suf=el.dataset.suf||"",t0=null;
function f(t){if(!t0)t0=t;var p=Math.min((t-t0)/1600,1),e=1-Math.pow(1-p,3);el.textContent=pre+(to*e).toFixed(dec)+suf;if(p<1)requestAnimationFrame(f)}
reduce?(el.textContent=pre+to.toFixed(dec)+suf):requestAnimationFrame(f)}
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;var el=e.target;el.classList.add("in");
[].forEach.call(el.querySelectorAll("[data-to]"),count);
if(el.dataset&&el.dataset.p){el.querySelector(".fg").style.strokeDashoffset=326.7*(1-el.dataset.p/100)}
io.unobserve(el)})},{threshold:.25});
[].forEach.call(document.querySelectorAll(".r,.ring"),function(el){io.observe(el)});
var so=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){var i=secs.indexOf(e.target);[].forEach.call(dots.children,function(d,j){d.classList.toggle("on",i===j)})}})},{threshold:.5});
secs.forEach(function(s){so.observe(s)});
var bar=document.getElementById("bar");
addEventListener("scroll",function(){var h=document.documentElement;bar.style.width=(100*h.scrollTop/(h.scrollHeight-h.clientHeight||1))+"%"},{passive:true});
// loop
var steps=[["🎯","Goal","You give the agent an objective, such as “resolve this refund dispute.”"],["🧠","Plan","It breaks the goal into steps and decides which tools it needs."],["⚙️","Act","It looks up the order, checks policy, issues the refund and updates the CRM."],["🔍","Check","It verifies the result against the goal and the rules it was given."],["🙋","Escalate","If it hits something it can’t handle, it hands over to a person with context."]];
var box=document.getElementById("loopSteps"),desc=document.getElementById("loopDesc"),cur=0,timer;
steps.forEach(function(s,i){var d=document.createElement("div");d.className="step";d.innerHTML="<em>"+s[0]+"</em>"+s[1];d.onclick=function(){show(i);clearInterval(timer)};box.appendChild(d)});
function show(i){cur=i;[].forEach.call(box.children,function(c,j){c.classList.toggle("on",i===j)});desc.textContent=steps[i][2]}
show(0);if(!reduce)timer=setInterval(function(){show((cur+1)%steps.length)},2600);
// tabs
[].forEach.call(document.querySelectorAll(".tabs button"),function(b){b.onclick=function(){
[].forEach.call(document.querySelectorAll(".tabs button"),function(x){x.classList.toggle("on",x===b)});
[].forEach.call(document.querySelectorAll(".pane"),function(p){p.classList.toggle("on",p.id===b.dataset.t)})}});
// checklist
var cb=[].slice.call(document.querySelectorAll("#chk input")),sc=document.getElementById("sc"),vd=document.getElementById("verdict");
var msgs=["Tick a box to start.","Early days. Pick one workflow and define success before anything else.","A start, but most pilots stall here. Add KPIs and an escalation owner.","Getting there. Close the gaps in governance and data.","Solid. You’re ahead of most pilots.","Strong foundation. Time to prove one use case.","Ready. Launch narrow, measure trust and expand."];
cb.forEach(function(c){c.onchange=function(){var n=cb.filter(function(x){return x.checked}).length;sc.style.setProperty("--p",(n/6*100)+"%");vd.textContent=n+" of 6. "+msgs[n]}});
})();
