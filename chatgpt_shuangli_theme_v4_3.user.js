// ==UserScript==
// @name         ChatGPT 霜璃 · 完整冰晶龙娘主题 V4.2
// @namespace    https://chatgpt.com/
// @version      4.3.0
// @description  网页版霜璃完整主题：角色融入页面背景 + 思考/输出/完成状态联动 + 冰晶呼吸、龙息流光、雪花收束。
// @match        https://chatgpt.com/*
// @match        https://www.chatgpt.com/*
// @run-at       document-end
// @grant        none
// @updateURL    https://raw.githubusercontent.com/z394547292-cloud/chatgpt-dragon-theme/main/chatgpt_shuangli_theme_v4_3.user.js
// @downloadURL  https://raw.githubusercontent.com/z394547292-cloud/chatgpt-dragon-theme/main/chatgpt_shuangli_theme_v4_2.user.js
// ==/UserScript==

(function () {
  'use strict';

  const STYLE_ID = 'sl42-style';
  const FX_ID = 'sl42-fx';
  const PANEL_ID = 'sl42-panel';
  const TOGGLE_ID = 'sl42-toggle';
  const SETTINGS_ID = 'sl42-settings';
  const BACKDROP_ID = 'sl42-backdrop';
  const TOAST_ID = 'sl42-toast';
  const HERO_ID = 'sl43-hero';
  const STATE_FX_ID = 'sl43-state-fx';
  const BURST_ID = 'sl43-burst';

  // Reuse V4.1 keys so imported image / position / hidden state continue working.
  const KEY_IMG = 'sl41_image';
  const KEY_HIDE = 'sl41_hidden';
  const KEY_POS = 'sl41_pos';

  const KEY_FX = 'sl42_fx';
  const KEY_INTENSITY = 'sl42_intensity';
  const KEY_COMPACT = 'sl42_compact';
  const KEY_BG = 'sl43_bg';
  const KEY_STATUS = 'sl43_status';

  const lines = [
    '嗯，在这呢。',
    '先把参数理干净，再往下做。',
    '慢一点没关系，稳一点更好。',
    '这个地方得改，不然容易翻车哦。',
    '今天也别把自己卷坏了。',
    '这样看起来就舒服多了。'
  ];

  const get = (key, fallback) => {
    const v = localStorage.getItem(key);
    return v === null ? fallback : v;
  };

  const css = `
  :root{
    --sl-accent:#a999d1;
    --sl-ice:#c9e9f8;
    --sl-ink:#403b4b;
    --sl-line:rgba(135,124,166,.16);
    --sl-glass:rgba(251,252,255,.78);
    --sl-intensity:1;
    --sl-state-glow:rgba(191,230,250,.22);
    --sl-state-violet:rgba(181,160,226,.22);
  }

  html,body{
    background:
      radial-gradient(circle at 82% 10%,rgba(204,188,234,calc(.34 * var(--sl-intensity))),transparent 28%),
      radial-gradient(circle at 14% 88%,rgba(187,215,237,calc(.30 * var(--sl-intensity))),transparent 31%),
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
    opacity:calc(.75 * var(--sl-intensity));
  }

  body::after{
    content:"";
    position:fixed;right:-10vw;top:-14vw;width:42vw;height:42vw;
    border-radius:50%;z-index:-1;pointer-events:none;
    background:radial-gradient(circle,rgba(203,188,232,.32),rgba(203,188,232,.08) 48%,transparent 72%);
    filter:blur(18px);
    animation:slBreath 7s ease-in-out infinite;
    opacity:var(--sl-intensity);
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
  @keyframes slPulse{
    0%,100%{box-shadow:0 0 0 0 rgba(193,224,245,0)}
    50%{box-shadow:0 0 0 5px rgba(193,224,245,.12)}
  }
  @keyframes slThinkingAura{
    0%,100%{opacity:.36;transform:scale(.97)}
    50%{opacity:.88;transform:scale(1.035)}
  }
  @keyframes slDragonFlow{
    0%{transform:translateX(-36%) skewX(-9deg);opacity:0}
    16%{opacity:.34}
    58%{opacity:.52}
    100%{transform:translateX(42%) skewX(-9deg);opacity:0}
  }
  @keyframes slDoneBurst{
    0%{transform:translate3d(0,0,0) scale(.65);opacity:0}
    18%{opacity:.95}
    100%{transform:translate3d(var(--dx),var(--dy),0) scale(1.1);opacity:0}
  }
  @keyframes slStateBadgePulse{
    0%,100%{filter:brightness(.98)}
    50%{filter:brightness(1.12)}
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

  html.sl-no-fx body::after,
  html.sl-no-fx #${FX_ID},
  html.sl-no-fx :is(
    form > div:has(textarea),
    form > div:has([contenteditable="true"]),
    [data-composer-surface-variant],
    .composer-surface-chrome
  )::after{
    display:none!important;
  }

  :is([role="menu"],[role="dialog"],[data-radix-popper-content-wrapper] > div){
    background:rgba(249,250,254,.93)!important;
    border:1px solid rgba(138,128,166,.16)!important;
    border-radius:18px!important;
    box-shadow:0 22px 64px rgba(68,61,91,.16)!important;
    backdrop-filter:blur(28px) saturate(118%)!important;
    -webkit-backdrop-filter:blur(28px) saturate(118%)!important;
  }

  :is([role="progressbar"],[aria-busy="true"],[data-state="loading"]){
    animation:slPulse 2.4s ease-in-out infinite!important;
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
    opacity:var(--sl-intensity);
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
    transition:width .2s ease,height .2s ease;
  }

  #${PANEL_ID}.compact{
    width:218px;height:338px;
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
  #${PANEL_ID} button,#${TOGGLE_ID},.sl42-btn{
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

  #${BACKDROP_ID}{
    position:fixed;inset:0;z-index:2147483600;
    background:rgba(45,41,58,.16);
    backdrop-filter:blur(6px);
    display:none;
  }

  #${SETTINGS_ID}{
    position:fixed;left:50%;top:50%;z-index:2147483700;
    transform:translate(-50%,-50%);
    width:min(430px,calc(100vw - 32px));
    padding:20px;border-radius:24px;
    background:rgba(250,251,255,.95);
    border:1px solid rgba(139,129,168,.18);
    box-shadow:0 28px 90px rgba(58,52,78,.24);
    backdrop-filter:blur(30px) saturate(118%);
    display:none;
    font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","Microsoft YaHei",sans-serif;
    color:#4a4555;
  }

  #${SETTINGS_ID} h3{margin:0 0 4px;font-size:18px}
  #${SETTINGS_ID} p{margin:0 0 16px;color:#777184;font-size:12px;line-height:1.6}
  #${SETTINGS_ID} .row{
    display:flex;align-items:center;justify-content:space-between;
    gap:12px;padding:11px 0;border-top:1px solid rgba(135,126,160,.10);
  }
  #${SETTINGS_ID} select{
    padding:7px 10px;border-radius:10px;
    border:1px solid rgba(135,126,160,.18);
    background:rgba(255,255,255,.74);color:#514b60;
  }
  #${SETTINGS_ID} input[type="range"]{accent-color:#a999d1}
  #${SETTINGS_ID} .buttons{
    display:flex;justify-content:flex-end;gap:8px;margin-top:16px;
  }
  .sl42-btn{height:34px;padding:0 13px}

  #${TOAST_ID}{
    position:fixed;left:50%;bottom:24px;z-index:2147483900;
    transform:translateX(-50%);
    padding:9px 14px;border-radius:999px;
    background:rgba(54,50,67,.86);color:white;
    font:500 12px/1.3 -apple-system,BlinkMacSystemFont,"Segoe UI","Microsoft YaHei",sans-serif;
    box-shadow:0 10px 30px rgba(45,40,62,.18);
    opacity:0;pointer-events:none;transition:.2s ease;
  }
  #${TOAST_ID}.show{opacity:1;transform:translateX(-50%) translateY(-3px)}


  /* V4.3 page-integrated Shuangli portrait */
  #${HERO_ID}{
    position:fixed;
    right:-2vw;
    bottom:-3vh;
    z-index:0;
    width:min(38vw,620px);
    height:min(82vh,860px);
    pointer-events:none;
    opacity:.18;
    filter:saturate(.88) contrast(.98);
    transition:opacity .35s ease,filter .35s ease,transform .35s ease;
    -webkit-mask-image:linear-gradient(to left,black 46%,rgba(0,0,0,.74) 68%,transparent 100%),
                       linear-gradient(to top,black 62%,transparent 100%);
    mask-image:linear-gradient(to left,black 46%,rgba(0,0,0,.74) 68%,transparent 100%);
  }
  #${HERO_ID} img{
    width:100%;height:100%;
    object-fit:contain;
    object-position:right bottom;
    display:block;
  }
  html.sl43-no-bg #${HERO_ID}{display:none!important}
  html[data-sl-state="thinking"] #${HERO_ID}{
    opacity:.24;
    filter:saturate(.92) drop-shadow(0 0 28px rgba(201,228,246,.18));
    animation:slThinkingAura 3.6s ease-in-out infinite;
  }
  html[data-sl-state="generating"] #${HERO_ID}{
    opacity:.27;
    filter:saturate(.98) drop-shadow(0 0 34px rgba(181,160,226,.22));
    transform:translateY(-2px) scale(1.008);
  }
  html[data-sl-state="done"] #${HERO_ID}{
    opacity:.23;
    filter:saturate(.94) brightness(1.035);
  }

  #${STATE_FX_ID}{
    position:fixed;inset:0;z-index:2147479000;pointer-events:none;overflow:hidden;
  }
  #${STATE_FX_ID} .thinking-aura,
  #${STATE_FX_ID} .dragon-flow{
    position:absolute;pointer-events:none;
  }
  #${STATE_FX_ID} .thinking-aura{
    width:46vw;height:46vw;right:-13vw;top:10vh;border-radius:50%;
    background:radial-gradient(circle,rgba(191,230,250,.22),rgba(181,160,226,.10) 42%,transparent 70%);
    filter:blur(24px);
    opacity:0;
  }
  html[data-sl-state="thinking"] #${STATE_FX_ID} .thinking-aura{
    animation:slThinkingAura 3.2s ease-in-out infinite;
  }
  #${STATE_FX_ID} .dragon-flow{
    left:-22vw;right:-22vw;bottom:7vh;height:96px;
    background:
      linear-gradient(100deg,
        transparent 0 24%,
        rgba(198,232,249,.08) 32%,
        rgba(184,166,226,.26) 46%,
        rgba(206,237,249,.28) 54%,
        rgba(184,166,226,.10) 66%,
        transparent 76% 100%);
    filter:blur(8px);
    opacity:0;
  }
  html[data-sl-state="generating"] #${STATE_FX_ID} .dragon-flow{
    animation:slDragonFlow 2.2s linear infinite;
  }

  #${BURST_ID}{
    position:fixed;inset:0;z-index:2147482500;pointer-events:none;overflow:hidden;
  }
  #${BURST_ID} i{
    position:absolute;
    width:6px;height:6px;border-radius:50%;
    background:rgba(255,255,255,.94);
    box-shadow:0 0 12px rgba(205,232,250,.95);
    animation:slDoneBurst 1.35s ease-out forwards;
  }

  #${PANEL_ID} .state-badge{
    position:absolute;
    left:15px;
    bottom:78px;
    z-index:6;
    padding:6px 9px;
    border-radius:999px;
    background:rgba(250,251,255,.82);
    border:1px solid rgba(150,137,181,.16);
    color:#665f75;
    font-size:11px;
    font-weight:700;
    letter-spacing:.02em;
    box-shadow:0 6px 18px rgba(69,62,90,.08);
    backdrop-filter:blur(12px);
  }
  html[data-sl-state="thinking"] #${PANEL_ID} .state-badge{
    background:rgba(231,246,253,.90);
    color:#587183;
    animation:slStateBadgePulse 2.6s ease-in-out infinite;
  }
  html[data-sl-state="generating"] #${PANEL_ID} .state-badge{
    background:rgba(238,232,251,.92);
    color:#675b85;
    animation:slStateBadgePulse 1.7s ease-in-out infinite;
  }
  html[data-sl-state="done"] #${PANEL_ID} .state-badge{
    background:rgba(246,247,252,.92);
    color:#5e6578;
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

  function toast(msg){
    let el=document.getElementById(TOAST_ID);
    if(!el){
      el=document.createElement('div');
      el.id=TOAST_ID;
      document.body.appendChild(el);
    }
    el.textContent=msg;
    el.classList.add('show');
    clearTimeout(el._t);
    el._t=setTimeout(()=>el.classList.remove('show'),1600);
  }

  function applyPrefs(){
    const fx=get(KEY_FX,'1')!=='0';
    const intensity=Math.min(1.5,Math.max(.45,Number(get(KEY_INTENSITY,'1'))||1));
    document.documentElement.classList.toggle('sl-no-fx',!fx);
    document.documentElement.style.setProperty('--sl-intensity',String(intensity));
    const p=document.getElementById(PANEL_ID);
    if(p)p.classList.toggle('compact',get(KEY_COMPACT,'0')==='1');
    document.documentElement.classList.toggle('sl43-no-bg',get(KEY_BG,'1')==='0');
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
          syncHeroImage();
          toast('霜璃图片已更新');
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
        <button class="settings">设置</button>
        <button class="hide">隐藏</button>
      </div>
      <div class="state-badge">❄ 待命</div>
      <div class="bubble">${lines[0]}</div>
    `;
    document.body.appendChild(p);

    p.querySelector('.import').onclick=chooseImage;
    p.querySelector('.settings').onclick=openSettings;
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
    applyPrefs();
  }


  function addHero(){
    if(document.getElementById(HERO_ID)||!document.body)return;
    const hero=document.createElement('div');
    hero.id=HERO_ID;
    hero.innerHTML='<img alt="">';
    document.body.appendChild(hero);
    syncHeroImage();
  }

  function syncHeroImage(){
    const hero=document.getElementById(HERO_ID);
    if(!hero)return;
    const img=hero.querySelector('img');
    const saved=localStorage.getItem(KEY_IMG);
    if(saved){
      img.src=saved;
      hero.style.display=get(KEY_BG,'1')==='0'?'none':'block';
    }else{
      img.removeAttribute('src');
      hero.style.display='none';
    }
  }

  function addStateFx(){
    if(document.getElementById(STATE_FX_ID)||!document.body)return;
    const fx=document.createElement('div');
    fx.id=STATE_FX_ID;
    fx.innerHTML='<div class="thinking-aura"></div><div class="dragon-flow"></div>';
    document.body.appendChild(fx);
  }

  function addBurstLayer(){
    if(document.getElementById(BURST_ID)||!document.body)return;
    const b=document.createElement('div');
    b.id=BURST_ID;
    document.body.appendChild(b);
  }

  function burstDone(){
    if(get(KEY_FX,'1')==='0'||get(KEY_STATUS,'1')==='0')return;
    const layer=document.getElementById(BURST_ID);
    if(!layer)return;
    layer.innerHTML='';
    const originX=Math.max(innerWidth*.58,innerWidth-320);
    const originY=Math.max(120,innerHeight*.28);
    for(let i=0;i<18;i++){
      const p=document.createElement('i');
      const angle=(Math.PI*2*i/18)+(Math.random()*.18);
      const dist=55+Math.random()*120;
      p.style.left=(originX+Math.random()*18)+'px';
      p.style.top=(originY+Math.random()*20)+'px';
      p.style.setProperty('--dx',(Math.cos(angle)*dist).toFixed(0)+'px');
      p.style.setProperty('--dy',(Math.sin(angle)*dist+38).toFixed(0)+'px');
      layer.appendChild(p);
    }
    setTimeout(()=>{ if(layer) layer.innerHTML=''; },1500);
  }

  let lastState='idle';
  let doneTimer=null;

  function stateText(state){
    return state==='thinking'?'❄ 思考中':
      state==='generating'?'🐉 龙息输出':
      state==='done'?'✦ 完成':'❄ 待命';
  }

  function setState(state){
    if(!['idle','thinking','generating','done'].includes(state))state='idle';
    if(state===lastState)return;
    const prev=lastState;
    lastState=state;
    document.documentElement.setAttribute('data-sl-state',state);
    const badge=document.querySelector('#'+PANEL_ID+' .state-badge');
    if(badge)badge.textContent=stateText(state);
    if(state==='done'&&prev!=='done')burstDone();
    clearTimeout(doneTimer);
    if(state==='done'){
      doneTimer=setTimeout(()=>{
        lastState='idle';
        document.documentElement.setAttribute('data-sl-state','idle');
        const b=document.querySelector('#'+PANEL_ID+' .state-badge');
        if(b)b.textContent=stateText('idle');
      },2200);
    }
  }

  function detectState(){
    if(get(KEY_STATUS,'1')==='0'){
      setState('idle');
      return;
    }

    const stopSelectors=[
      'button[data-testid*="stop"]',
      'button[aria-label*="Stop" i]',
      'button[aria-label*="停止"]',
      'button[title*="Stop" i]',
      'button[title*="停止"]'
    ];
    const stopButton=stopSelectors.some(sel=>{
      try{return !!document.querySelector(sel)}catch(_){return false}
    });

    const busy=!!document.querySelector('[aria-busy="true"],[data-state="loading"]');
    const text=(document.body?.innerText||'').slice(-5000);
    const thinking=/思考中|正在思考|Thinking\.?\.?\.?|Reasoning/i.test(text);

    if(stopButton){
      setState(thinking?'thinking':'generating');
      return;
    }
    if(busy&&thinking){
      setState('thinking');
      return;
    }

    if((lastState==='thinking'||lastState==='generating')&&!stopButton){
      setState('done');
      return;
    }

    if(lastState!=='done')setState('idle');
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

  function addSettings(){
    if(document.getElementById(SETTINGS_ID)||!document.body)return;

    const back=document.createElement('div');
    back.id=BACKDROP_ID;
    back.onclick=closeSettings;

    const box=document.createElement('div');
    box.id=SETTINGS_ID;
    box.innerHTML=`
      <h3>❄ 霜璃主题设置</h3>
      <p>V4.2：设置会保存在浏览器本地，刷新页面后继续生效。</p>

      <div class="row">
        <span>动态特效</span>
        <select data-k="fx">
          <option value="1">开启</option>
          <option value="0">关闭</option>
        </select>
      </div>

      <div class="row">
        <span>特效强度</span>
        <input data-k="intensity" type="range" min="0.45" max="1.5" step="0.05">
      </div>

      <div class="row">
        <span>角色卡大小</span>
        <select data-k="compact">
          <option value="0">标准</option>
          <option value="1">紧凑</option>
        </select>
      </div>

      <div class="row">
        <span>角色融入背景</span>
        <select data-k="bg">
          <option value="1">开启</option>
          <option value="0">关闭</option>
        </select>
      </div>

      <div class="row">
        <span>状态联动</span>
        <select data-k="status">
          <option value="1">开启</option>
          <option value="0">关闭</option>
        </select>
      </div>

      <div class="buttons">
        <button class="sl42-btn" data-a="reset">重置位置</button>
        <button class="sl42-btn" data-a="close">完成</button>
      </div>
    `;

    document.body.append(back,box);

    box.querySelector('[data-k="fx"]').value=get(KEY_FX,'1');
    box.querySelector('[data-k="intensity"]').value=get(KEY_INTENSITY,'1');
    box.querySelector('[data-k="compact"]').value=get(KEY_COMPACT,'0');
    box.querySelector('[data-k="bg"]').value=get(KEY_BG,'1');
    box.querySelector('[data-k="status"]').value=get(KEY_STATUS,'1');

    box.querySelector('[data-k="fx"]').onchange=e=>{
      localStorage.setItem(KEY_FX,e.target.value);
      applyPrefs();
    };
    box.querySelector('[data-k="intensity"]').oninput=e=>{
      localStorage.setItem(KEY_INTENSITY,e.target.value);
      applyPrefs();
    };
    box.querySelector('[data-k="compact"]').onchange=e=>{
      localStorage.setItem(KEY_COMPACT,e.target.value);
      applyPrefs();
    };
    box.querySelector('[data-k="bg"]').onchange=e=>{
      localStorage.setItem(KEY_BG,e.target.value);
      applyPrefs();
      syncHeroImage();
    };
    box.querySelector('[data-k="status"]').onchange=e=>{
      localStorage.setItem(KEY_STATUS,e.target.value);
      applyPrefs();
      if(e.target.value==='0') setState('idle');
    };
    box.querySelector('[data-a="reset"]').onclick=()=>{
      localStorage.removeItem(KEY_POS);
      const p=document.getElementById(PANEL_ID);
      if(p){
        p.style.left='auto';p.style.top='auto';
        p.style.right='18px';p.style.bottom='18px';
      }
      toast('角色位置已重置');
    };
    box.querySelector('[data-a="close"]').onclick=closeSettings;
  }

  function openSettings(){
    addSettings();
    document.getElementById(BACKDROP_ID).style.display='block';
    document.getElementById(SETTINGS_ID).style.display='block';
  }

  function closeSettings(){
    const b=document.getElementById(BACKDROP_ID);
    const s=document.getElementById(SETTINGS_ID);
    if(b)b.style.display='none';
    if(s)s.style.display='none';
  }

  function boot(){
    addStyle();
    addFx();
    addPanel();
    addToggle();
    addSettings();
    addHero();
    addStateFx();
    addBurstLayer();
    applyPrefs();
    syncHeroImage();
    detectState();

    if(!window.__SHUANGLI_V42_KEYS__){
      window.__SHUANGLI_V42_KEYS__=true;
      window.addEventListener('keydown',e=>{
        if(e.altKey&&e.shiftKey&&e.code==='KeyS'){
          e.preventDefault();
          openSettings();
        }
      });
    }
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
    addSettings();
    addHero();
    addStateFx();
    addBurstLayer();
    applyPrefs();
    syncHeroImage();
  },2500);

  setInterval(detectState,700);

  console.log('[霜璃主题] V4.3 loaded');
})();