import { PLANS, total, mapURL } from './data.js?v=display-2';

const $ = selector=>document.querySelector(selector);
const element = (tag,text,className='')=>{
  const node=document.createElement(tag);
  if(text!==undefined)node.textContent=text;
  if(className)node.className=className;
  return node;
};
const link=(text,url)=>{
  const a=element('a',text);a.href=url;a.target='_blank';a.rel='noopener noreferrer';return a;
};
function render() {
  const plan=PLANS['10'];
  $('#plan-title').textContent=plan.title;
  $('#plan-area').textContent=plan.area;
  $('#plan-hours').textContent=plan.hours;
  const [low,high]=total(plan);
  $('#plan-budget').textContent=`预计 ¥${low}—${high} / 人`;
  $('#timeline').replaceChildren(...plan.stages.map((stage,index)=>{
    const row=element('li',undefined,stage.finish?'finish':'');
    row.style.setProperty('--entry-delay',`${index%3*65}ms`);
    const card=element('div',undefined,'stop-card');
    card.append(element('span',stage.time,'time'));
    const content=element('div',undefined,'stage');
    const heading=element('h3');
    heading.append(stage.map?link(stage.title,mapURL(stage.map)):element('span',stage.title));
    if(stage.optional)heading.append(element('span','可选','optional'));
    content.append(heading,element('p',stage.note));card.append(content);row.append(card);return row;
  }));
  $('#essential').textContent=plan.essential;
  $('#budget-note').textContent=plan.budgetNote;
  $('#costs').replaceChildren(...plan.costs.map(([name,low,high])=>{
    const row=element('li');row.append(element('span',name),element('span',low===high?`¥${low}`:`¥${low}—${high}`));return row;
  }));
  $('#source-links').replaceChildren(...plan.sources.map(([name,url])=>link(name,url)));
  $('#details').open=false;
}

render();

// The current study is for October 10 only. Keep old shared URLs consistent.
const url=new URL(location.href);
if(url.searchParams.has('day')||url.searchParams.has('route')){
  url.searchParams.set('day','10');url.searchParams.delete('route');history.replaceState({},'',url);
}

const root=document.documentElement;
const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
const motionButton=$('#motion-toggle');
const dateButton=$('#date-sticker');
let userPaused=false;
let replayFrame=0;
let observer;

function revealStops(){
  observer?.disconnect();
  if(root.dataset.motion!=='on'||!('IntersectionObserver' in window))return;
  observer=new IntersectionObserver(entries=>{
    for(const entry of entries){
      if(!entry.isIntersecting)continue;
      entry.target.classList.add('is-seen');observer.unobserve(entry.target);
    }
  },{threshold:.12});
  document.querySelectorAll('#timeline li:not(.is-seen)').forEach(row=>observer.observe(row));
}

function replayIntro(){
  if(root.dataset.motion!=='on')return;
  cancelAnimationFrame(replayFrame);
  root.classList.remove('intro-play');
  replayFrame=requestAnimationFrame(()=>{
    replayFrame=requestAnimationFrame(()=>root.classList.add('intro-play'));
  });
}

function syncMotion(){
  const enabled=!reducedMotion.matches&&!userPaused;
  root.dataset.motion=enabled?'on':'off';
  motionButton.setAttribute('aria-pressed',String(enabled));
  motionButton.disabled=reducedMotion.matches;
  motionButton.title=reducedMotion.matches?'已跟随系统关闭动态效果':enabled?'关闭动态效果':'开启动态效果';
  $('#motion-label').textContent=enabled?'动态：开':'动态：关';
  dateButton.disabled=!enabled;
  dateButton.title=enabled?'重播入场动效':'2026年10月10日，周六';
  dateButton.setAttribute('aria-label',enabled?'10月10日，周六。重播入场动效':'10月10日，周六');
  if(!enabled){cancelAnimationFrame(replayFrame);root.classList.remove('intro-play');}
  revealStops();
  if(enabled)replayIntro();
}

motionButton.hidden=false;
motionButton.addEventListener('click',()=>{userPaused=!userPaused;syncMotion();});
dateButton.addEventListener('click',replayIntro);
reducedMotion.addEventListener('change',syncMotion);
document.addEventListener('visibilitychange',()=>root.classList.toggle('page-hidden',document.hidden));
syncMotion();
