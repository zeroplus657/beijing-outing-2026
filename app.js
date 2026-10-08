import { DAYS, ROUTES, SOURCES, REPO, estimate, mapURL, suggestionBody, issueURL } from './data.js';
const $ = selector => document.querySelector(selector);
const params = new URLSearchParams(location.search);
let day = params.get('day') === '18' ? '18' : '10';
let routeId = DAYS[day].routes.includes(params.get('route')) ? params.get('route') : DAYS[day].routes[0];
let issues = [], boardFilter = 'all', boardLoaded = false, boardError = '', fetching = false;
const sources = Object.fromEntries(SOURCES.map(s=>[s.id,s]));
function element(tag, className, text) { const e=document.createElement(tag); if(className)e.className=className; if(text!==undefined)e.textContent=text; return e; }
function external(label, url, className) { const a=element('a',className,label); a.href=url; a.target='_blank'; a.rel='noopener noreferrer'; return a; }
function renderRoute() {
  const r=ROUTES[routeId];
  document.documentElement.dataset.day=day;
  document.querySelectorAll('[data-day]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.day===day)));
  $('#day-note').textContent=DAYS[day].note;
  $('#route-switch').replaceChildren(...(DAYS[day].routes.length>1?DAYS[day].routes.map(id=>{const b=element('button','',ROUTES[id].name);b.type='button';b.setAttribute('aria-pressed',String(id===routeId));b.addEventListener('click',()=>selectRoute(day,id));return b;}):[]));
  $('#route-date').textContent=DAYS[day].full;
  $('#route-title').textContent=r.name;
  $('#route-effort').textContent=r.effort;
  $('#route-intro').textContent=r.intro;
  $('#route-duration').textContent=r.duration;
  $('#route-area').textContent=r.area;
  $('#route-meet').textContent=r.meet;
  $('#timeline').replaceChildren(...r.stages.map(s=>{
    const li=element('li');const top=element('div','stage-top');top.append(element('span','',s.time));if(s.kind==='optional')top.append(element('span','optional-tag','自选收尾'));li.append(top,element('h3','',s.title),element('p','stage-place',s.place),element('p','stage-description',s.description),element('p','transfer',s.transfer));
    const links=element('div','stage-links');links.append(external('高德找地点',mapURL(s.place)));s.refs.forEach(id=>{const a=external(sources[id].publisher,sources[id].url);a.title=sources[id].name;links.append(a)});li.append(links);return li;
  }));
  $('#transport').textContent=r.transport;$('#fallback').textContent=r.fallback;
  $('#checklist').replaceChildren(...r.checks.map(x=>element('li','',x)));
  $('#evening-control').hidden=day!=='10';if(day!=='10')$('#evening').checked=false;
  $('#extras-label').textContent=day==='10'?'预算含可选KTV晚间场':'预算含可选晚间饮品';
  $('#form-day').value=day;renderFormRoutes(routeId);
  $('#plan-status').textContent='';renderBudget();
}
function selectRoute(newDay,id,replace=false){day=newDay;routeId=id;const u=new URL(location.href);u.searchParams.set('day',day);u.searchParams.set('route',routeId);history[replace?'replaceState':'pushState']({},'',u);renderRoute()}
function renderBudget(){const r=ROUTES[routeId];const b=estimate(r,$('#people').value,$('#extras').checked,day==='10'&&$('#evening').checked);$('#budget-total').textContent=`¥${b.low}—${b.high}`;$('#cost-list').replaceChildren(...b.rows.map(c=>{const li=element('li');li.append(element('span','',c.name),element('strong','',c.perLow===c.perHigh?`¥${c.perLow}`:`¥${c.perLow}—${c.perHigh}`));return li}));$('#budget-note').textContent=day==='10'?`按${b.people}人估算。KTV暂按每15人一间、每间450—900元计算，不代表商家报价或核定容量。人数增加会触发分包估算；同包需求必须先问门店。${$('#evening').checked?'当前仅计晚餐、交通及所选晚间费用；完整时间轴供参考。':''}`:`按${b.people}人、个人消费估算，无包车费用。只有标“官方”的入园价格为核对值，其他均为预算预留，不是商户实时报价。`}
function renderFormRoutes(chosen){const formDay=$('#form-day').value;$('#form-route').replaceChildren(...DAYS[formDay].routes.map(id=>{const o=element('option','',ROUTES[id].name);o.value=id;return o}));if(DAYS[formDay].routes.includes(chosen))$('#form-route').value=chosen}
function readForm(requireConsent=true){const form=$('#suggestion-form');const consent=form.elements.consent;if(!requireConsent)consent.required=false;const valid=form.reportValidity();consent.required=true;if(!valid)return null;const d=Object.fromEntries(new FormData(form));['nickname','message','link','budget'].forEach(k=>d[k]=(d[k]||'').trim());if(!d.nickname||d.message.length<4){$('#form-status').textContent='请写一个称呼和至少4个字的具体建议。';return null}if(d.link){try{const u=new URL(d.link);if(u.protocol!=='https:'&&u.protocol!=='http:')throw Error()}catch{$('#form-status').textContent='参考链接请使用 http:// 或 https:// 网页地址。';return null}}d.route=ROUTES[d.route].name;return d}
async function copyText(text,status){try{await navigator.clipboard.writeText(text);$(status).textContent='已复制，可以粘贴到微信群。复制不会自动发布。'}catch{const area=element('textarea');area.value=text;area.style.cssText='position:fixed;left:0;top:0;opacity:0';document.body.append(area);area.select();const ok=document.execCommand('copy');area.remove();$(status).textContent=ok?'已复制，可以粘贴到微信群。':'此浏览器不允许自动复制。请长按选中预览文字后复制。';if(!ok){$('#suggestion-preview').textContent=text;$('#submit-link').hidden=true;$('#submit-dialog').showModal()}}}
function planText(){const r=ROUTES[routeId],b=estimate(r,$('#people').value,$('#extras').checked,day==='10'&&$('#evening').checked);return [`北京出行提案｜${DAYS[day].full}｜${r.name}`,DAYS[day].note,`完整行程：${r.duration}`,r.meet,...r.stages.map(s=>`${s.time} ${s.place}：${s.title}${s.kind==='optional'?'（可选）':''}`),`每人预算估算 ¥${b.low}—${b.high}（${$('#evening').checked?'仅晚餐及晚间；':'全天；'}${$('#extras').checked?'含':'不含'}可选晚间消费），不是商家报价。`,'具体场地与名额尚未预订。',location.href.split('#')[0]].join('\n')}
function sourceCards(){$('#source-list').replaceChildren(...SOURCES.map(s=>{const c=element('article','source-card');c.id=`source-${s.id}`;c.append(element('span','publisher',s.publisher),external(s.name,s.url),element('p','',s.fact));return c}))}
function validIssue(i){return !i.pull_request&&/^【10月(10|18)日】/.test(i.title||'')&&(i.body||'').startsWith('北京出行建议')&&i.html_url?.startsWith(`https://github.com/${REPO}/issues/`)&&!i.labels?.some(l=>l.name==='qa-test')}
function boardRender(){const selected=issues.filter(i=>boardFilter==='all'||i.title.startsWith(`【10月${boardFilter}日】`));$('#board-list').replaceChildren(...selected.map(i=>{const card=element('article','suggestion-card');card.append(element('h4','',i.title.slice(0,160)));const date=new Date(i.created_at).toLocaleDateString('zh-CN',{timeZone:'Asia/Shanghai'});card.append(element('p','suggestion-meta',`${date} · ${i.state==='closed'?'已关闭 / 已处理':'讨论中'}`));const body=i.body||'';const cut=body.split('具体建议：\n')[1]?.split('\n\n说明：')[0]||body;card.append(element('p','',cut.slice(0,1500)),external('查看与回复',i.html_url));return card}));$('#board-status').textContent=boardError||(boardLoaded?(selected.length?`显示${selected.length}条${boardFilter==='all'?'':` · ${boardFilter}号`}建议（最近100条中筛选）。`:'暂时还没有这个日期的公开建议。你可以先发起一条。'):'正在读取共享建议…')}
async function fetchBoard(){if(fetching)return;fetching=true;$('#refresh-board').disabled=true;boardError='';$('#board-status').textContent='正在读取共享建议…';try{const res=await fetch(`https://api.github.com/repos/${REPO}/issues?state=all&sort=created&direction=desc&per_page=100`,{headers:{Accept:'application/vnd.github+json'},credentials:'omit',signal:AbortSignal.timeout(12000)});if(!res.ok)throw new Error(`HTTP ${res.status}`);const data=await res.json();if(!Array.isArray(data))throw Error('invalid');issues=data.filter(validIssue);boardLoaded=true}catch{boardError='暂时无法读取共享建议（可能是网络或 GitHub 限流）。已有提交不会因此丢失，可点下方链接直接查看。'}finally{fetching=false;$('#refresh-board').disabled=false;boardRender()}}
document.querySelectorAll('[data-day]').forEach(b=>b.addEventListener('click',()=>selectRoute(b.dataset.day,DAYS[b.dataset.day].routes[0])));
['people','extras','evening'].forEach(id=>$('#'+id).addEventListener('input',renderBudget));
$('#people').addEventListener('change',()=>{$('#people').value=estimate(ROUTES[routeId],$('#people').value).people;renderBudget()});
$('#form-day').addEventListener('change',()=>renderFormRoutes());
$('#suggestion-form').addEventListener('submit',e=>{e.preventDefault();const d=readForm();if(!d)return;$('#form-status').textContent='';$('#suggestion-preview').textContent=suggestionBody(d);$('#submit-link').href=issueURL(d);$('#submit-link').hidden=false;$('#submit-dialog').showModal()});
$('#submit-link').addEventListener('click',()=>{$('#form-status').textContent='请在 GitHub 页面完成确认提交；本页暂未收到提交成功证明。完成后点“刷新”。';$('#submit-dialog').close()});
$('#close-dialog').addEventListener('click',()=>$('#submit-dialog').close());
$('#copy-suggestion').addEventListener('click',()=>{const d=readForm(false);if(d)copyText(suggestionBody(d),'#form-status')});
$('#copy-plan').addEventListener('click',()=>copyText(planText(),'#plan-status'));
$('#suggest-current').addEventListener('click',()=>{$('#form-day').value=day;renderFormRoutes(routeId)});
$('#refresh-board').addEventListener('click',fetchBoard);
document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{boardFilter=b.dataset.filter;document.querySelectorAll('[data-filter]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));boardRender()}));
window.addEventListener('popstate',()=>{const p=new URLSearchParams(location.search);day=p.get('day')==='18'?'18':'10';routeId=DAYS[day].routes.includes(p.get('route'))?p.get('route'):DAYS[day].routes[0];renderRoute()});
$('#all-issues').href=`https://github.com/${REPO}/issues`;
sourceCards();selectRoute(day,routeId,true);fetchBoard();
