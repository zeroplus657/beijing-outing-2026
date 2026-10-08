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
const currentDay=()=>new URLSearchParams(location.search).get('day')==='18'?'18':'10';

function render(day,writeHistory=false) {
  const plan=PLANS[day];
  document.querySelectorAll('[data-day]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.day===day)));
  $('#plan-title').textContent=plan.title;
  $('#plan-area').textContent=plan.area;
  $('#plan-hours').textContent=plan.hours;
  const [low,high]=total(plan);
  $('#plan-budget').textContent=`预计 ¥${low}—${high} / 人`;
  $('#timeline').replaceChildren(...plan.stages.map(stage=>{
    const row=element('li',undefined,stage.finish?'finish':'');
    row.append(element('span',stage.time,'time'));
    const content=element('div',undefined,'stage');
    const heading=element('h3');
    heading.append(stage.map?link(stage.title,mapURL(stage.map)):element('span',stage.title));
    if(stage.optional)heading.append(element('span','可选','optional'));
    content.append(heading,element('p',stage.note));row.append(content);return row;
  }));
  $('#essential').textContent=plan.essential;
  $('#budget-note').textContent=plan.budgetNote;
  $('#costs').replaceChildren(...plan.costs.map(([name,low,high])=>{
    const row=element('li');row.append(element('span',name),element('span',low===high?`¥${low}`:`¥${low}—${high}`));return row;
  }));
  $('#source-links').replaceChildren(...plan.sources.map(([name,url])=>link(name,url)));
  $('#details').open=false;
  if(writeHistory){const url=new URL(location.href);url.search='?day='+day;url.hash='';history.pushState({},'',url);}
}

document.querySelectorAll('[data-day]').forEach(button=>button.addEventListener('click',()=>render(button.dataset.day,true)));
window.addEventListener('popstate',()=>render(currentDay()));
render(currentDay());
