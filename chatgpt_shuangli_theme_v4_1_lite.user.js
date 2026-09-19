// ==UserScript==
// @name         ChatGPT 霜璃 · 完整冰晶龙娘主题 V4.1 Lite
// @namespace    https://chatgpt.com/
// @version      4.1.0
// @description  网页版霜璃完整主题稳定版：冰晶背景、龙鳞侧栏、玻璃输入框、按钮/弹窗换肤、雪粒/霜雾、可导入霜璃角色图。
// @match        https://chatgpt.com/*
// @match        https://www.chatgpt.com/*
// @run-at       document-end
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  const STYLE_ID = 'sl41-style';
  const FX_ID = 'sl41-fx';
  const PANEL_ID = 'sl41-panel';
  const TOGGLE_ID = 'sl41-toggle';
  const KEY_IMG = 'sl41_image';
  const KEY_HIDE = 'sl41_hidden';
  const KEY_POS = 'sl41_pos';

  const lines = [
    '嗯，在这呢。',
    '先把参数理干净，再往下做。',
    '慢一点没关系，稳一点更好。',
    '这个地方得改，不然容易翻车哦。',
    '今天也别把自己卷坏了。'
  ];

  const css = `
  :root{
    --sl-accent:#a999d1;
    --sl-ice:#c9e9f8;
    --sl-ink:#403b4b;
    --sl-line:rgba(135,124,166,.16);
    --sl-glass:rgba(251,252,255,.78);
  }

  html,body{
    background:
      radial-gradient(circle at 82% 10%,rgba(204,188,234,.34),transparent 28%),
      radial-gradient(circle at 14% 88%,rgba(187,215,237,.30),transparent 31%),
      linear-gradient(145deg,#fbfbfe 0%,#f3f5fa 50%,#ece8f4 100%) !important;
    color:var(--sl-ink)!important;
  }

  body::before{
    content:"";
    position:fixed;inset:0;z-index:-2;pointer-events:none;
    background:
      linear-gradient(30deg,rgba(140,128,171,.032) 12%,transparent 12.5%,transparent 87%,rgba(140,128,171,.032) 87.5%),
      linear-gradient(150deg,rgba(140,128,171,.032) 12%,transparent 12.5%,transparent 87%,rgba(140,128,171,.032) 87.5%);
    background-size:50px 86px;
  }

  body::after{
    content:"";
    position:fixed;right:-10vw;top:-14vw;width:42vw;height:42vw;
    border-radius:50%;z-index:-1;pointer-events:none;
    background:radial-gradient(circle,rgba(203,188,232,.32),rgba(203,188,232,.08) 48%,transparent 72%);
    filter:blur(18px);
    animation:slBreath 7s ease-in-out infinite;
  }

  @keyframes slBreath{
    0%,100%{transform:scale(.96);opacity:.62}
    50%{transform:scale(1.04);opacity:1}
  }
  @keyframes slSnow{
    from{transform:translate3d(0,-8vh,0) rotate(0);opacity:0}
    12%{opacity:.65}
    to{transform:translate3d(var(--drift),108vh,0) rotate(260deg);opacity:.04}
  }
  @keyframes slMist{
    0%,100%{transform:translateX(-1.2%);opacity:.20}
    50%{transform:translateX(1.2%);opacity:.36}
  }
  @keyframes slSweep{
    0%,68%,100%{transform:translateX(-145%);opacity:0}
    80%{opacity:.55}
    90%{transform:translateX(145%);opacity:0}
  }

  :is(nav,aside,[data-testid="app-shell-floating-left-panel"]){
    background:
      radial-gradient(circle at 85% 8%,rgba(202,188,234,.15),transparent 28%),
      repeating-radial-gradient(ellipse at 50% 0%,transparent 0 30px,rgba(145,132,177,.032) 31px 32px),
      rgba(247,249,253,.74)!important;
    border-right:1px solid var(--sl-line)!important;
    backdrop-filter:blur(24px) saturate(116%)!important;
    -webkit-backdrop-filter:blur(24px) saturate(116%)!important;
  }

  header{
    background:rgba(250,251,255,.55)!important;
    border-bottom:1px solid rgba(130,120,160,.08)!important;
    backdrop-filter:blur(20px) saturate(115%)!important;
  }

  main{background:transparent!important}

  :is(nav,aside) :is(a,button){
    border-radius:12px!important;
    transition:.18s ease!important;
  }
  :is(nav,aside) :is(a,button):hover{
    background:linear-gradient(90deg,rgba(219,226,241,.60),rgba(232,226,244,.52))!important;
    box-shadow:inset 2px 0 0 rgba(170,151,210,.42)!important;
    transform:translateX(1px);
  }

  [data-message-author-role="user"] > div{
    background:linear-gradient(145deg,rgba(225,221,239,.78),rgba(231,239,247,.70))!important;
    border:1px solid rgba(145,136,174,.15)!important;
    border-radius:21px 21px 8px 21px!important;
    box-shadow:0 8px 26px rgba(78,74,98,.07)!important;
    backdrop-filter:blur(12px)!important;
  }

  [data-message-author-role="assistant"] > div{
    background:rgba(255,255,255,.14)!important;
    border-radius:18px!important;
  }

  :is(
    form > div:has(textarea),
    form > div:has([contenteditable="true"]),
    [data-composer-surface-variant],
    .composer-surface-chrome
  ){
    position:relative!important;
    overflow:hidden!important;
    background:
      radial-gradient(circle at 92% 0%,rgba(201,183,237,.14),transparent 34%),
      rgba(253,253,255,.82)!important;
    border:1px solid rgba(145,134,177,.20)!important;
    border-radius:25px!important;
    box-shadow:0 16px 46px rgba(74,68,96,.12),inset 0 0 0 1px rgba(255,255,255,.72)!important;
    backdrop-filter:blur(28px) saturate(120%)!important;
  }

  :is(
    form > div:has(textarea),
    form > div:has([contenteditable="true"]),
    [data-composer-surface-variant],
    .composer-surface-chrome
  ):focus-within{
    border-color:rgba(167,150,207,.47)!important;
    box-shadow:0 18px 50px rgba(71,65,94,.14),0 0 0 3px rgba(195,226,247,.14)!important;
  }

  :is(
    form > div:has(textarea),
    form > div:has([contenteditable="true"]),
    [data-composer-surface-variant],
    .composer-surface-chrome
  )::after{
    content:"";
    position:absolute;inset:0;pointer-events:none;
    background:linear-gradient(108deg,transparent 30%,rgba(255,255,255,.44) 48%,transparent 64%);
    transform:translateX(-145%);
    animation:slSweep 10s ease-in-out infinite;
  }

  :is([role="menu"],[role="dialog"],[data-radix-popper-content-wrapper] > div){
    background:rgba(249,250,254,.93)!important;
    border:1px solid rgba(138,128,166,.16)!important;
    border-radius:18px!important;
    box-shadow:0 22px 64px rgba(68,61,91,.16)!important;
    backdrop-filter:blur(28px) saturate(118%)!important;
    -webkit-backdrop-filter:blur(28px) saturate(118%)!important;
  }

  button{transition:transform .15s ease,filter .15s ease!important}
  button:hover{transform:translateY(-1px);filter:brightness(1.015)}

  pre{
    background:linear-gradient(145deg,#2c2e36,#23252c)!important;
    color:#f3f2f7!important;
    border:1px solid rgba(219,213,237,.10)!important;
    border-radius:15px!important;
    box-shadow:0 11px 32px rgba(35,33,45,.13)!important;
  }
  :not(pre)>code{
    background:rgba(204,198,224,.30)!important;
    color:#665f78!important;
    border-radius:7px!important;
  }

  ::selection{background:rgba(183,171,215,.36)!important}
  ::-webkit-scrollbar{width:8px;height:8px}
  ::-webkit-scrollbar-track{background:transparent}
  ::-webkit-scrollbar-thumb{background:rgba(135,128,160,.28);border-radius:999px}

  #${FX_ID}{
    position:fixed;inset:0;z-index:2147480000;pointer-events:none;overflow:hidden;
  }
  #${FX_ID} .sl-snow{
    position:absolute;top:-20px;width:4px;height:4px;border-radius:50%;
    background:rgba(255,255,255,.82);
    box-shadow:0 0 10px rgba(206,228,247,.9);
    animation:slSnow linear infinite;
  }
  #${FX_ID} .sl-mist{
    position:absolute;left:-6%;right:-6%;bottom:-54px;height:160px;
    background:
      radial-gradient(ellipse at 24% 100%,rgba(255,255,255,.48),transparent 56%),
      radial-gradient(ellipse at 70% 100%,rgba(207,224,242,.38),transparent 58%);
    filter:blur(18px);
    animation:slMist 8s ease-in-out infinite;
  }

  #${PANEL_ID}{
    position:fixed;right:18px;bottom:18px;z-index:2147483000;
    width:278px;height:430px;overflow:hidden;
    border-radius:28px;
    border:1px solid rgba(138,129,166,.20);
    background:
      radial-gradient(circle at 50% 18%,rgba(242,239,250,.92),transparent 34%),
      linear-gradient(160deg,rgba(255,255,255,.93),rgba(229,236,247,.86));
    box-shadow:0 26px 72px rgba(71,65,95,.21),0 0 50px rgba(194,187,223,.16);
    backdrop-filter:blur(22px) saturate(118%);
    font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","Microsoft YaHei",sans-serif;
    user-select:none;
  }

  #${PANEL_ID} .char-img{
    position:absolute;inset:0;width:100%;height:100%;
    object-fit:cover;object-position:center top;
  }
  #${PANEL_ID} .empty{
    position:absolute;inset:58px 20px 90px;
    display:flex;align-items:center;justify-content:center;text-align:center;
    color:#716a80;font-size:13px;line-height:1.7;
    border:1px dashed rgba(140,130,170,.30);
    border-radius:18px;background:rgba(255,255,255,.36);
  }
  #${PANEL_ID} .fade{
    position:absolute;inset:0;pointer-events:none;
    background:linear-gradient(to bottom,transparent 46%,rgba(239,241,248,.10) 68%,rgba(233,237,247,.96) 100%);
  }
  #${PANEL_ID} .title{
    position:absolute;left:13px;top:13px;z-index:5;
    padding:7px 11px;border-radius:999px;cursor:grab;
    background:rgba(255,255,255,.82);
    border:1px solid rgba(137,128,166,.16);
    box-shadow:0 7px 20px rgba(76,70,96,.08);
    color:#635d72;font-size:12px;font-weight:700;
  }
  #${PANEL_ID} .actions{
    position:absolute;top:12px;right:12px;z-index:5;display:flex;gap:6px;
  }
  #${PANEL_ID} button,#${TOGGLE_ID}{
    border:1px solid rgba(138,129,166,.18);
    background:rgba(255,255,255,.84);
    color:#665f75;border-radius:999px;
    box-shadow:0 6px 16px rgba(75,70,95,.08);
    cursor:pointer;font:600 12px/1 -apple-system,BlinkMacSystemFont,"Segoe UI","Microsoft YaHei",sans-serif;
  }
  #${PANEL_ID} button{height:30px;padding:0 9px}
  #${PANEL_ID} .bubble{
    position:absolute;left:15px;right:15px;bottom:15px;z-index:5;
    min-height:46px;display:flex;align-items:center;
    padding:10px 13px;border-radius:15px;
    background:rgba(255,255,255,.84);
    border:1px solid rgba(137,128,166,.16);
    color:#5e5968;font-size:13px;line-height:1.45;
    box-shadow:0 8px 23px rgba(73,68,93,.09);
    cursor:pointer;
  }

  #${TOGGLE_ID}{
    position:fixed;right:18px;bottom:18px;z-index:2147483001;
    display:none;height:44px;padding:0 15px;
  }

  @media(max-width:900px){
    #${PANEL_ID}{width:216px;height:338px;right:10px;bottom:10px}
    #${TOGGLE_ID}{right:10px;bottom:10px}
  }
  `;

  function addStyle(){
    if(document.getElementById(STYLE_ID))return;
    const s=document.createElement('style');
    s.id=STYLE_ID;
    s.textContent=css;
    (document.head||document.documentElement).appendChild(s);
  }

  function addFx(){
    if(document.getElementById(FX_ID)||!document.body)return;
    const layer=document.createElement('div');
    layer.id=FX_ID;
    for(let i=0;i<26;i++){
      const p=document.createElement('i');
      p.className='sl-snow';
      const size=(2+Math.random()*4).toFixed(1);
      p.style.left=(Math.random()*100).toFixed(2)+'vw';
      p.style.width=size+'px';
      p.style.height=size+'px';
      p.style.animationDuration=(9+Math.random()*13).toFixed(1)+'s';
      p.style.animationDelay=(-Math.random()*20).toFixed(1)+'s';
      p.style.setProperty('--drift',((-55+Math.random()*110).toFixed(0))+'px');
      layer.appendChild(p);
    }
    const mist=document.createElement('div');
    mist.className='sl-mist';
    layer.appendChild(mist);
    document.body.appendChild(layer);
  }

  function renderImage(){
    const panel=document.getElementById(PANEL_ID);
    if(!panel)return;
    const img=panel.querySelector('.char-img');
    const empty=panel.querySelector('.empty');
    const saved=localStorage.getItem(KEY_IMG);
    if(saved){
      img.src=saved;
      img.style.display='block';
      empty.style.display='none';
    }else{
      img.removeAttribute('src');
      img.style.display='none';
      empty.style.display='flex';
    }
  }

  function chooseImage(){
    const input=document.createElement('input');
    input.type='file';
    input.accept='image/png,image/jpeg,image/webp';
    input.style.display='none';
    input.onchange=()=>{
      const file=input.files&&input.files[0];
      if(!file)return input.remove();
      if(file.size>5*1024*1024){
        alert('图片请控制在 5MB 以内。');
        input.remove();
        return;
      }
      const r=new FileReader();
      r.onload=()=>{
        try{
          localStorage.setItem(KEY_IMG,String(r.result));
          renderImage();
        }catch(e){
          alert('图片保存失败，请换一张更小的图片。');
        }
        input.remove();
      };
      r.readAsDataURL(file);
    };
    document.body.appendChild(input);
    input.click();
  }

  function addPanel(){
    if(document.getElementById(PANEL_ID)||!document.body)return;
    const p=document.createElement('div');
    p.id=PANEL_ID;
    p.innerHTML=`
      <img class="char-img" alt="霜璃">
      <div class="empty">点击右上角“导入”<br>选择你的霜璃图片。<br><br>图片只保存在当前浏览器本地。</div>
      <div class="fade"></div>
      <div class="title">❄ 霜璃</div>
      <div class="actions">
        <button class="import">导入</button>
        <button class="hide">隐藏</button>
      </div>
      <div class="bubble">${lines[0]}</div>
    `;
    document.body.appendChild(p);

    p.querySelector('.import').onclick=chooseImage;
    p.querySelector('.hide').onclick=()=>{
      p.style.display='none';
      localStorage.setItem(KEY_HIDE,'1');
      addToggle();
      document.getElementById(TOGGLE_ID).style.display='block';
    };

    let idx=0;
    p.querySelector('.bubble').onclick=e=>{
      idx=(idx+1)%lines.length;
      e.currentTarget.textContent=lines[idx];
    };

    const h=p.querySelector('.title');
    let active=false,sx=0,sy=0,sl=0,st=0;
    h.addEventListener('pointerdown',e=>{
      active=true;
      const r=p.getBoundingClientRect();
      sx=e.clientX;sy=e.clientY;sl=r.left;st=r.top;
      p.style.left=r.left+'px';p.style.top=r.top+'px';
      p.style.right='auto';p.style.bottom='auto';
      h.setPointerCapture(e.pointerId);
      e.preventDefault();
    });
    h.addEventListener('pointermove',e=>{
      if(!active)return;
      const l=Math.min(Math.max(0,sl+e.clientX-sx),Math.max(0,innerWidth-p.offsetWidth));
      const t=Math.min(Math.max(0,st+e.clientY-sy),Math.max(0,innerHeight-p.offsetHeight));
      p.style.left=l+'px';p.style.top=t+'px';
    });
    const end=()=>{
      if(!active)return;
      active=false;
      const r=p.getBoundingClientRect();
      localStorage.setItem(KEY_POS,JSON.stringify({left:Math.round(r.left),top:Math.round(r.top)}));
    };
    h.addEventListener('pointerup',end);
    h.addEventListener('pointercancel',end);

    try{
      const pos=JSON.parse(localStorage.getItem(KEY_POS)||'null');
      if(pos&&Number.isFinite(pos.left)&&Number.isFinite(pos.top)){
        p.style.left=pos.left+'px';
        p.style.top=pos.top+'px';
        p.style.right='auto';
        p.style.bottom='auto';
      }
    }catch(_){}

    if(localStorage.getItem(KEY_HIDE)==='1')p.style.display='none';
    renderImage();
  }

  function addToggle(){
    if(document.getElementById(TOGGLE_ID)||!document.body)return;
    const b=document.createElement('button');
    b.id=TOGGLE_ID;
    b.textContent='❄ 霜璃';
    b.onclick=()=>{
      localStorage.setItem(KEY_HIDE,'0');
      const p=document.getElementById(PANEL_ID);
      if(p)p.style.display='block';
      b.style.display='none';
    };
    document.body.appendChild(b);
    if(localStorage.getItem(KEY_HIDE)==='1')b.style.display='block';
  }

  function boot(){
    addStyle();
    addFx();
    addPanel();
    addToggle();
  }

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',boot,{once:true});
  }else{
    boot();
  }

  setInterval(()=>{
    addStyle();
    addFx();
    addPanel();
    addToggle();
  },2500);

  console.log('[霜璃主题] V4.1 Lite loaded');
})();