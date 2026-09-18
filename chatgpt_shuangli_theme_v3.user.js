// ==UserScript==
// @name         ChatGPT 霜璃 · 冰晶龙娘主题 V3
// @namespace    https://chatgpt.com/
// @version      3.0.0
// @description  霜璃主题：整窗冰晶玻璃、龙鳞微纹、雪粒辉光、可导入角色图、可拖动陪伴卡、可关闭特效
// @author       z394547292-cloud
// @match        https://chatgpt.com/*
// @run-at       document-end
// @grant        none
// @updateURL    https://raw.githubusercontent.com/z394547292-cloud/chatgpt-dragon-theme/main/chatgpt_shuangli_theme_v3.user.js
// @downloadURL  https://raw.githubusercontent.com/z394547292-cloud/chatgpt-dragon-theme/main/chatgpt_shuangli_theme_v3.user.js
// ==/UserScript==

(function () {
  'use strict';

  const VERSION = '3.0.0';
  const ID = {
    style: 'shuangli-v3-style',
    fx: 'shuangli-v3-fx',
    panel: 'shuangli-v3-panel',
    toggle: 'shuangli-v3-toggle',
    menu: 'shuangli-v3-menu'
  };
  const KEY = {
    image: 'shuangli_v3_image',
    hidden: 'shuangli_v3_hidden',
    pos: 'shuangli_v3_pos',
    fx: 'shuangli_v3_fx'
  };

  const LINES = [
    '嗯，在这呢。',
    '先把参数理干净，再往下做。',
    '别急，慢一点反而更稳。',
    '这个地方得改，不然容易翻车哦。',
    '今天也别把自己卷坏了。',
    '嗯，这样就顺眼多了。'
  ];

  const css = `
  :root{
    --sl-bg0:#f8f8fc;
    --sl-bg1:#eef1f7;
    --sl-bg2:#e8e0f4;
    --sl-panel:rgba(255,255,255,.66);
    --sl-panel-strong:rgba(250,250,255,.82);
    --sl-line:rgba(126,118,158,.16);
    --sl-text:#33333c;
    --sl-soft:#6e6b78;
    --sl-accent:#a89bc8;
    --sl-accent2:#c8d4e6;
    --sl-shadow:rgba(73,69,93,.12);
  }

  html,body{
    background:
      radial-gradient(circle at 84% 12%, rgba(209,198,232,.34), transparent 27%),
      radial-gradient(circle at 13% 88%, rgba(194,212,230,.30), transparent 30%),
      radial-gradient(circle at 50% 42%, rgba(255,255,255,.72), transparent 52%),
      linear-gradient(145deg,var(--sl-bg0),var(--sl-bg1) 48%,var(--sl-bg2)) !important;
    background-attachment:fixed !important;
    color:var(--sl-text)!important;
  }

  body::before{
    content:"";
    position:fixed; inset:0; z-index:-2; pointer-events:none;
    background-image:
      linear-gradient(30deg, rgba(153,145,184,.030) 12%, transparent 12.5%, transparent 87%, rgba(153,145,184,.030) 87.5%),
      linear-gradient(150deg, rgba(153,145,184,.030) 12%, transparent 12.5%, transparent 87%, rgba(153,145,184,.030) 87.5%);
    background-size:46px 80px;
    opacity:.85;
  }

  body::after{
    content:"";
    position:fixed;
    width:42vw;height:42vw;
    right:-13vw;top:-17vw;
    border-radius:50%;
    z-index:-1;pointer-events:none;
    background:radial-gradient(circle,rgba(210,198,235,.32),rgba(210,198,235,.06) 48%,transparent 70%);
    filter:blur(16px);
    animation:slBreath 7s ease-in-out infinite;
  }

  @keyframes slBreath{
    0%,100%{transform:scale(.96);opacity:.62}
    50%{transform:scale(1.04);opacity:1}
  }

  nav,aside{
    background:rgba(246,247,251,.66)!important;
    backdrop-filter:blur(24px) saturate(118%)!important;
    -webkit-backdrop-filter:blur(24px) saturate(118%)!important;
    border-right:1px solid var(--sl-line)!important;
  }

  header{
    background:rgba(250,250,253,.50)!important;
    backdrop-filter:blur(18px) saturate(116%)!important;
    -webkit-backdrop-filter:blur(18px) saturate(116%)!important;
    border-bottom:1px solid rgba(128,120,156,.08)!important;
  }

  main{background:transparent!important}

  [data-message-author-role="user"] > div{
    background:linear-gradient(145deg,rgba(221,217,236,.72),rgba(232,237,246,.64))!important;
    border:1px solid rgba(145,136,174,.15)!important;
    border-radius:19px 19px 7px 19px!important;
    box-shadow:0 7px 24px rgba(78,74,98,.06)!important;
    backdrop-filter:blur(10px)!important;
  }

  [data-message-author-role="assistant"] > div{
    background:rgba(255,255,255,.20)!important;
    border-radius:18px!important;
  }

  form > div:has(textarea),
  form > div:has([contenteditable="true"]){
    background:rgba(255,255,255,.78)!important;
    backdrop-filter:blur(26px) saturate(122%)!important;
    -webkit-backdrop-filter:blur(26px) saturate(122%)!important;
    border:1px solid rgba(139,130,168,.17)!important;
    border-radius:24px!important;
    box-shadow:0 14px 44px rgba(75,70,96,.11),inset 0 0 0 1px rgba(255,255,255,.55)!important;
  }

  [role="menu"],[role="dialog"]{
    background:rgba(249,249,253,.92)!important;
    backdrop-filter:blur(26px) saturate(118%)!important;
    -webkit-backdrop-filter:blur(26px) saturate(118%)!important;
    border:1px solid var(--sl-line)!important;
    box-shadow:0 18px 55px rgba(70,65,92,.13)!important;
    border-radius:17px!important;
  }

  button:hover{filter:brightness(1.01)}

  pre{
    background:linear-gradient(145deg,#2f303a,#25262f)!important;
    color:#f2f1f6!important;
    border:1px solid rgba(215,210,235,.08)!important;
    box-shadow:0 10px 30px rgba(36,35,45,.12)!important;
    border-radius:14px!important;
  }

  :not(pre)>code{
    background:rgba(200,196,221,.28)!important;
    color:#665f78!important;
    border-radius:6px!important;
  }

  a{ text-decoration-color:rgba(130,117,168,.38)!important }
  ::selection{background:rgba(181,169,211,.35)!important}
  ::-webkit-scrollbar{width:8px;height:8px}
  ::-webkit-scrollbar-track{background:transparent}
  ::-webkit-scrollbar-thumb{background:rgba(137,131,158,.27);border-radius:999px}

  #${ID.fx}{
    position:fixed;inset:0;z-index:2147481000;pointer-events:none;overflow:hidden;
  }
  #${ID.fx} .sl-snow{
    position:absolute;top:-12px;
    width:4px;height:4px;border-radius:50%;
    background:rgba(255,255,255,.72);
    box-shadow:0 0 8px rgba(218,226,244,.9);
    animation:slSnow linear infinite;
  }
  @keyframes slSnow{
    to{transform:translate3d(var(--drift),105vh,0) rotate(240deg);opacity:.08}
  }

  #${ID.panel}{
    position:fixed;right:18px;bottom:18px;
    width:286px;height:452px;
    z-index:2147483000;overflow:hidden;
    border-radius:29px;
    border:1px solid rgba(138,129,166,.20);
    background:
      radial-gradient(circle at 52% 24%,rgba(240,237,248,.90),transparent 34%),
      linear-gradient(160deg,rgba(255,255,255,.91),rgba(232,237,246,.81));
    box-shadow:0 25px 70px rgba(74,69,96,.20),0 0 48px rgba(195,188,222,.16);
    backdrop-filter:blur(22px) saturate(120%);
    -webkit-backdrop-filter:blur(22px) saturate(120%);
    font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","Microsoft YaHei",sans-serif;
    user-select:none;
  }

  #${ID.panel}::before{
    content:"";
    position:absolute;inset:0;pointer-events:none;z-index:2;
    background:
      linear-gradient(115deg,transparent 32%,rgba(255,255,255,.32) 47%,transparent 61%);
    transform:translateX(-130%);
    animation:slShine 9s ease-in-out infinite;
  }
  @keyframes slShine{
    0%,68%,100%{transform:translateX(-135%)}
    80%{transform:translateX(135%)}
  }

  #${ID.panel} .sl-image{
    position:absolute;inset:0;width:100%;height:100%;
    object-fit:cover;object-position:center top;
    filter:saturate(.94) contrast(1.01);
    transition:transform .28s ease,filter .28s ease;
  }
  #${ID.panel}:hover .sl-image{transform:scale(1.015);filter:saturate(.99) contrast(1.02)}

  #${ID.panel} .sl-empty{
    position:absolute;inset:58px 20px 90px;
    display:flex;align-items:center;justify-content:center;text-align:center;
    padding:18px;color:#706a7e;font-size:13px;line-height:1.72;
    border:1px dashed rgba(140,130,170,.30);
    border-radius:18px;background:rgba(255,255,255,.36);
  }

  #${ID.panel} .sl-fade{
    position:absolute;inset:0;pointer-events:none;
    background:linear-gradient(to bottom,transparent 47%,rgba(238,240,248,.10) 68%,rgba(234,237,247,.93) 100%);
  }

  #${ID.panel} .sl-title{
    position:absolute;left:14px;top:13px;z-index:4;
    padding:7px 11px;border-radius:999px;
    background:rgba(255,255,255,.78);
    border:1px solid rgba(137,128,166,.17);
    color:#625c70;font-size:12px;font-weight:650;
    box-shadow:0 7px 20px rgba(76,70,96,.08);
    backdrop-filter:blur(12px);cursor:grab;
  }

  #${ID.panel} .sl-actions{position:absolute;right:12px;top:12px;z-index:4;display:flex;gap:6px}

  #${ID.panel} button,#${ID.toggle}{
    border:1px solid rgba(138,129,166,.18);
    background:rgba(255,255,255,.80);
    color:#6a6477;border-radius:999px;
    box-shadow:0 6px 16px rgba(75,70,95,.08);
    cursor:pointer;font:600 12px/1 -apple-system,BlinkMacSystemFont,"Segoe UI","Microsoft YaHei",sans-serif;
    backdrop-filter:blur(12px);
  }
  #${ID.panel} button{height:30px;padding:0 9px}

  #${ID.panel} .sl-bubble{
    position:absolute;left:16px;right:16px;bottom:16px;z-index:4;
    min-height:46px;display:flex;align-items:center;
    padding:10px 13px;border-radius:14px;
    background:rgba(255,255,255,.79);
    border:1px solid rgba(137,128,166,.16);
    color:#5d5968;font-size:13px;line-height:1.45;
    box-shadow:0 8px 23px rgba(73,68,93,.09);
    backdrop-filter:blur(14px);cursor:pointer;
  }

  #${ID.toggle}{
    position:fixed;right:18px;bottom:18px;z-index:2147483001;
    display:none;height:46px;padding:0 15px;
  }

  #${ID.menu}{
    position:fixed;right:18px;bottom:76px;z-index:2147483002;
    display:none;width:180px;padding:8px;
    border:1px solid rgba(138,129,166,.18);
    border-radius:15px;background:rgba(250,250,253,.90);
    box-shadow:0 18px 50px rgba(71,66,92,.16);
    backdrop-filter:blur(20px);
    font:500 12px/1.35 -apple-system,BlinkMacSystemFont,"Segoe UI","Microsoft YaHei",sans-serif;
  }
  #${ID.menu} button{
    width:100%;padding:9px 10px;margin:2px 0;border:0;border-radius:10px;
    background:transparent;color:#5e596a;text-align:left;cursor:pointer;
  }
  #${ID.menu} button:hover{background:rgba(214,211,229,.42)}

  html.sl-no-fx body::after,
  html.sl-no-fx #${ID.fx},
  html.sl-no-fx #${ID.panel}::before{display:none!important}

  @media(max-width:900px){
    #${ID.panel}{width:222px;height:354px;right:10px;bottom:10px}
    #${ID.toggle}{right:10px;bottom:10px}
  }

  @media(prefers-color-scheme:dark){
    :root{
      --sl-text:#e8e7ee;
      --sl-soft:#bcb7c9;
      --sl-line:rgba(210,204,229,.12);
    }
    html,body{
      background:
        radial-gradient(circle at 82% 11%,rgba(104,91,133,.27),transparent 28%),
        radial-gradient(circle at 12% 88%,rgba(79,98,124,.22),transparent 30%),
        linear-gradient(145deg,#17181d,#1c1d24 52%,#23202a)!important;
    }
    nav,aside{background:rgba(24,25,31,.68)!important}
    header{background:rgba(25,26,32,.54)!important}
    [data-message-author-role="user"] > div{background:rgba(94,86,113,.48)!important}
    [data-message-author-role="assistant"] > div{background:rgba(255,255,255,.025)!important}
    form > div:has(textarea),form > div:has([contenteditable="true"]){
      background:rgba(31,32,39,.78)!important;
      border-color:rgba(210,204,229,.12)!important;
    }
    [role="menu"],[role="dialog"]{background:rgba(30,31,38,.94)!important}
  }`;

  function injectStyle(){
    if(document.getElementById(ID.style)) return;
    const s=document.createElement('style');
    s.id=ID.style;s.textContent=css;
    (document.head||document.documentElement).appendChild(s);
  }

  function setFx(on){
    localStorage.setItem(KEY.fx,on?'1':'0');
    document.documentElement.classList.toggle('sl-no-fx',!on);
    const b=document.querySelector('#'+ID.menu+' [data-act="fx"]');
    if(b)b.textContent='动态特效：'+(on?'开':'关');
  }

  function createFx(){
    if(document.getElementById(ID.fx)) return;
    const layer=document.createElement('div');layer.id=ID.fx;
    for(let i=0;i<22;i++){
      const p=document.createElement('i');p.className='sl-snow';
      const size=(2+Math.random()*4).toFixed(1);
      p.style.left=(Math.random()*100).toFixed(2)+'vw';
      p.style.width=size+'px';p.style.height=size+'px';
      p.style.opacity=(.18+Math.random()*.55).toFixed(2);
      p.style.animationDuration=(8+Math.random()*12).toFixed(1)+'s';
      p.style.animationDelay=(-Math.random()*18).toFixed(1)+'s';
      p.style.setProperty('--drift',((-45+Math.random()*90).toFixed(0))+'px');
      layer.appendChild(p);
    }
    document.body.appendChild(layer);
  }

  function renderImage(panel){
    const img=panel.querySelector('.sl-image');
    const empty=panel.querySelector('.sl-empty');
    const saved=localStorage.getItem(KEY.image);
    if(saved){img.src=saved;img.style.display='block';empty.style.display='none'}
    else{img.removeAttribute('src');img.style.display='none';empty.style.display='flex'}
  }

  function chooseImage(panel){
    const input=document.createElement('input');
    input.type='file';input.accept='image/png,image/jpeg,image/webp';input.style.display='none';
    input.addEventListener('change',()=>{
      const file=input.files&&input.files[0];if(!file)return;
      if(file.size>4.5*1024*1024){alert('图片有点大，建议压到 4.5MB 以内。');input.remove();return}
      const r=new FileReader();
      r.onload=()=>{
        try{localStorage.setItem(KEY.image,String(r.result));renderImage(panel)}
        catch(e){alert('图片保存失败，请换一张体积更小的图片。')}
        input.remove();
      };
      r.readAsDataURL(file);
    });
    document.body.appendChild(input);input.click();
  }

  function createPanel(){
    if(document.getElementById(ID.panel)) return;
    const panel=document.createElement('div');panel.id=ID.panel;
    panel.innerHTML=
      '<img class="sl-image" alt="">'+
      '<div class="sl-empty">点击右上角“导入”<br>选择你的霜璃图片。<br><br>图片只保存在当前浏览器本地。</div>'+
      '<div class="sl-fade"></div>'+
      '<div class="sl-title" title="按住这里拖动">❄ 霜璃</div>'+
      '<div class="sl-actions"><button class="sl-import">导入</button><button class="sl-more">⋯</button><button class="sl-hide">隐藏</button></div>'+
      '<div class="sl-bubble">'+LINES[0]+'</div>';
    document.body.appendChild(panel);

    panel.querySelector('.sl-import').onclick=()=>chooseImage(panel);
    panel.querySelector('.sl-hide').onclick=()=>{
      panel.style.display='none';
      const t=document.getElementById(ID.toggle);if(t)t.style.display='block';
      localStorage.setItem(KEY.hidden,'1');
    };
    panel.querySelector('.sl-more').onclick=()=>{
      const m=document.getElementById(ID.menu);
      if(m)m.style.display=m.style.display==='block'?'none':'block';
    };

    let idx=0;
    panel.querySelector('.sl-bubble').onclick=e=>{
      idx=(idx+1)%LINES.length;e.currentTarget.textContent=LINES[idx];
    };

    const h=panel.querySelector('.sl-title');
    let active=false,sx=0,sy=0,sl=0,st=0;
    h.addEventListener('pointerdown',e=>{
      active=true;const r=panel.getBoundingClientRect();
      sx=e.clientX;sy=e.clientY;sl=r.left;st=r.top;
      panel.style.left=r.left+'px';panel.style.top=r.top+'px';
      panel.style.right='auto';panel.style.bottom='auto';
      h.setPointerCapture(e.pointerId);e.preventDefault();
    });
    h.addEventListener('pointermove',e=>{
      if(!active)return;
      const l=Math.min(Math.max(0,sl+e.clientX-sx),Math.max(0,innerWidth-panel.offsetWidth));
      const t=Math.min(Math.max(0,st+e.clientY-sy),Math.max(0,innerHeight-panel.offsetHeight));
      panel.style.left=l+'px';panel.style.top=t+'px';
    });
    const end=()=>{
      if(!active)return;active=false;
      const r=panel.getBoundingClientRect();
      localStorage.setItem(KEY.pos,JSON.stringify({left:Math.round(r.left),top:Math.round(r.top)}));
    };
    h.addEventListener('pointerup',end);h.addEventListener('pointercancel',end);

    try{
      const p=JSON.parse(localStorage.getItem(KEY.pos)||'null');
      if(p&&Number.isFinite(p.left)&&Number.isFinite(p.top)){
        panel.style.left=Math.min(p.left,Math.max(0,innerWidth-panel.offsetWidth))+'px';
        panel.style.top=Math.min(p.top,Math.max(0,innerHeight-panel.offsetHeight))+'px';
        panel.style.right='auto';panel.style.bottom='auto';
      }
    }catch(_){}

    if(localStorage.getItem(KEY.hidden)==='1')panel.style.display='none';
    renderImage(panel);
  }

  function createToggle(){
    if(document.getElementById(ID.toggle))return;
    const b=document.createElement('button');b.id=ID.toggle;b.textContent='❄ 霜璃';
    b.onclick=()=>{
      const p=document.getElementById(ID.panel);if(p)p.style.display='block';
      b.style.display='none';localStorage.setItem(KEY.hidden,'0');
    };
    document.body.appendChild(b);
    if(localStorage.getItem(KEY.hidden)==='1')b.style.display='block';
  }

  function createMenu(){
    if(document.getElementById(ID.menu))return;
    const m=document.createElement('div');m.id=ID.menu;
    m.innerHTML=
      '<button data-act="fx">动态特效：开</button>'+
      '<button data-act="reset">重置卡片位置</button>'+
      '<button data-act="clear">清除角色图片</button>'+
      '<button data-act="close">关闭菜单</button>';
    document.body.appendChild(m);
    m.querySelector('[data-act="fx"]').onclick=()=>setFx(localStorage.getItem(KEY.fx)==='0');
    m.querySelector('[data-act="reset"]').onclick=()=>{
      localStorage.removeItem(KEY.pos);
      const p=document.getElementById(ID.panel);
      if(p){p.style.left='auto';p.style.top='auto';p.style.right='18px';p.style.bottom='18px'}
    };
    m.querySelector('[data-act="clear"]').onclick=()=>{
      localStorage.removeItem(KEY.image);
      const p=document.getElementById(ID.panel);if(p)renderImage(p);
    };
    m.querySelector('[data-act="close"]').onclick=()=>m.style.display='none';
  }

  function boot(){
    injectStyle();createFx();createMenu();createToggle();createPanel();
    setFx(localStorage.getItem(KEY.fx)!=='0');
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});
  else boot();

  setInterval(()=>{
    injectStyle();
    if(!document.getElementById(ID.fx))createFx();
    if(!document.getElementById(ID.menu))createMenu();
    if(!document.getElementById(ID.toggle))createToggle();
    if(!document.getElementById(ID.panel))createPanel();
  },2500);

  console.info('[霜璃主题] V'+VERSION+' 已加载');
})();