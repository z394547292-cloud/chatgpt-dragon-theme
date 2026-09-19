// ==UserScript==
// @name         ChatGPT 霜璃 · 完整冰晶龙娘主题 V5.1
// @namespace    https://chatgpt.com/
// @version      5.1.5
// @description  网页版霜璃完整主题 V5.1.5：右侧霜璃独立前景层改为垂直居中常驻，保持五状态高清换图与特效。
// @match        https://chatgpt.com/*
// @match        https://www.chatgpt.com/*
// @run-at       document-end
// @grant        none
// @updateURL    https://raw.githubusercontent.com/z394547292-cloud/chatgpt-dragon-theme/main/chatgpt_shuangli_theme_v5_1.user.js
// @downloadURL  https://raw.githubusercontent.com/z394547292-cloud/chatgpt-dragon-theme/main/chatgpt_shuangli_theme_v5_0.user.js
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
  const EMBLEM_ID = 'sl45-emblem';
  const CORNER_ID = 'sl45-corners';
  const SCENE_ID = 'sl46-scene';
  const SCENE_LABEL_ID = 'sl46-scene-label';
  const WELCOME_ID = 'sl47-welcome';
  const DEPTH_ID = 'sl47-depth';
  const TRANSITION_ID = 'sl47-transition';
  const STATE_PANEL_ID = 'sl48-state-panel';
  const REACTIVE_FX_ID = 'sl49-reactive-fx';

  // Reuse V4.1 keys so imported image / position / hidden state continue working.
  const KEY_IMG = 'sl41_image';
  const KEY_HIDE = 'sl41_hidden';
  const KEY_POS = 'sl41_pos';

  const KEY_FX = 'sl42_fx';
  const KEY_INTENSITY = 'sl42_intensity';
  const KEY_COMPACT = 'sl42_compact';
  const KEY_BG = 'sl43_bg';
  const KEY_STATUS = 'sl43_status';
  const KEY_SYMBOLS = 'sl45_symbols';
  const KEY_SCENE = 'sl46_scene';
  const KEY_CINEMATIC = 'sl47_cinematic';
  const KEY_STATE_HOME_IMG = 'sl50_home_img';
  const KEY_STATE_IDLE_IMG = 'sl48_idle_img';
  const KEY_STATE_THINK_IMG = 'sl48_think_img';
  const KEY_STATE_GEN_IMG = 'sl48_gen_img';
  const KEY_STATE_DONE_IMG = 'sl48_done_img';
  const KEY_STATE_IMAGES = 'sl48_state_images';

  const BUILTIN_STATE_IMAGES = {
    home: 'https://raw.githubusercontent.com/z394547292-cloud/chatgpt-dragon-theme/main/assets/shuangli-v5/home.webp',
    idle: 'https://raw.githubusercontent.com/z394547292-cloud/chatgpt-dragon-theme/main/assets/shuangli-v5/idle.webp',
    thinking: 'https://raw.githubusercontent.com/z394547292-cloud/chatgpt-dragon-theme/main/assets/shuangli-v5/thinking.webp',
    generating: 'https://raw.githubusercontent.com/z394547292-cloud/chatgpt-dragon-theme/main/assets/shuangli-v5/generating.webp',
    done: 'https://raw.githubusercontent.com/z394547292-cloud/chatgpt-dragon-theme/main/assets/shuangli-v5/done.webp'
  };

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
    right:1.2vw;
    top:50%;
    bottom:auto;
    z-index:2147480500;
    width:min(33vw,560px);
    height:min(82vh,860px);
    pointer-events:none;
    opacity:1;
    transform:translateY(-50%);
    transform-origin:center center;
    mix-blend-mode:normal!important;
    filter:
      saturate(1.04)
      contrast(1.06)
      brightness(1.01)
      drop-shadow(0 14px 30px rgba(82,69,112,.22))
      drop-shadow(0 0 16px rgba(201,231,248,.18));
    transition:filter .35s ease,transform .35s ease,right .25s ease,top .25s ease;
    -webkit-mask-image:none!important;
    mask-image:none!important;
    isolation:isolate;
  }
  #${HERO_ID} img{
    width:100%;height:100%;
    object-fit:contain;
    object-position:right bottom;
    display:block;
    opacity:1!important;
    mix-blend-mode:normal!important;
    image-rendering:auto;
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


  /* =========================
     V4.4 UI detail unification
     ========================= */

  /* Sidebar selected/current state */
  :is(nav,aside) :is(
    a[aria-current="page"],
    a[data-state="active"],
    button[aria-selected="true"],
    button[data-state="active"],
    [class*="bg-token-list-hover-background"]
  ){
    position:relative!important;
    background:
      linear-gradient(90deg,
        rgba(211,225,241,.76),
        rgba(228,220,245,.70) 72%,
        rgba(245,246,252,.36))!important;
    border:1px solid rgba(158,143,194,.18)!important;
    box-shadow:
      inset 3px 0 0 rgba(168,147,213,.56),
      inset 0 1px 0 rgba(255,255,255,.70),
      0 6px 16px rgba(73,65,96,.07)!important;
  }

  :is(nav,aside) :is(
    a[aria-current="page"],
    a[data-state="active"],
    button[aria-selected="true"],
    button[data-state="active"]
  )::after{
    content:"";
    position:absolute;
    right:10px;top:50%;
    width:5px;height:5px;
    border-radius:50%;
    transform:translateY(-50%);
    background:rgba(170,151,210,.72);
    box-shadow:0 0 10px rgba(194,226,246,.78);
    pointer-events:none;
  }

  /* Top bar controls */
  header button,
  header [role="button"]{
    border-radius:12px!important;
  }
  header :is(button,[role="button"]):hover{
    background:linear-gradient(145deg,rgba(229,235,247,.74),rgba(238,231,247,.72))!important;
    box-shadow:
      inset 0 0 0 1px rgba(159,146,193,.14),
      0 6px 18px rgba(69,62,90,.08)!important;
  }

  /* Generic icon containers */
  :is(button,[role="button"]) > svg{
    transition:filter .18s ease,transform .18s ease!important;
  }
  :is(button,[role="button"]):hover > svg{
    filter:drop-shadow(0 0 5px rgba(176,161,214,.35));
    transform:scale(1.035);
  }

  /* Composer toolbar/action buttons */
  :is(
    form > div:has(textarea),
    form > div:has([contenteditable="true"]),
    [data-composer-surface-variant],
    .composer-surface-chrome
  ) button{
    border-radius:999px!important;
  }

  :is(
    form > div:has(textarea),
    form > div:has([contenteditable="true"]),
    [data-composer-surface-variant],
    .composer-surface-chrome
  ) button:not([disabled]):hover{
    background:
      linear-gradient(145deg,rgba(224,235,247,.78),rgba(234,226,246,.76))!important;
    box-shadow:
      inset 0 0 0 1px rgba(160,146,195,.17),
      0 5px 16px rgba(72,65,94,.08)!important;
  }

  /* Primary send/voice buttons */
  :is(
    form > div:has(textarea),
    form > div:has([contenteditable="true"]),
    [data-composer-surface-variant],
    .composer-surface-chrome
  ) :is(
    button[data-testid*="send"],
    button[aria-label*="Send" i],
    button[aria-label*="发送"],
    button[class*="bg-token-foreground"]
  ){
    color:#fff!important;
    border:1px solid rgba(113,99,150,.24)!important;
    background:
      linear-gradient(145deg,#a999d1 0%,#94b9d8 48%,#beaee2 100%)!important;
    box-shadow:
      0 7px 18px rgba(107,91,147,.18),
      inset 0 1px 0 rgba(255,255,255,.38)!important;
  }

  :is(
    form > div:has(textarea),
    form > div:has([contenteditable="true"]),
    [data-composer-surface-variant],
    .composer-surface-chrome
  ) :is(
    button[data-testid*="send"],
    button[aria-label*="Send" i],
    button[aria-label*="发送"],
    button[class*="bg-token-foreground"]
  ):hover{
    filter:brightness(1.05) saturate(1.04)!important;
    box-shadow:
      0 9px 22px rgba(107,91,147,.24),
      0 0 18px rgba(194,226,246,.20),
      inset 0 1px 0 rgba(255,255,255,.42)!important;
  }

  /* Stop generating button */
  :is(
    button[data-testid*="stop"],
    button[aria-label*="Stop" i],
    button[aria-label*="停止"]
  ){
    border:1px solid rgba(151,132,186,.22)!important;
    background:linear-gradient(145deg,rgba(233,226,246,.92),rgba(218,233,246,.92))!important;
    color:#635a78!important;
    box-shadow:0 6px 18px rgba(79,68,103,.12)!important;
  }

  /* Menus / dialogs: items and footer buttons */
  :is([role="menu"],[role="dialog"]) :is(button,[role="menuitem"],[role="option"]){
    border-radius:11px!important;
  }
  :is([role="menu"],[role="dialog"]) :is(button,[role="menuitem"],[role="option"]):hover{
    background:linear-gradient(90deg,rgba(221,232,245,.64),rgba(236,228,247,.62))!important;
  }
  [role="dialog"] :is(
    button[data-state="checked"],
    button[aria-checked="true"],
    [role="option"][aria-selected="true"]
  ){
    background:linear-gradient(90deg,rgba(215,229,244,.78),rgba(232,222,246,.78))!important;
    box-shadow:inset 3px 0 0 rgba(168,148,213,.50)!important;
  }

  /* Inputs/selects inside dialogs/settings */
  :is([role="dialog"],[role="menu"]) :is(input,textarea,select){
    border:1px solid rgba(145,132,177,.18)!important;
    border-radius:11px!important;
    background:rgba(255,255,255,.68)!important;
    box-shadow:inset 0 1px 0 rgba(255,255,255,.64)!important;
  }
  :is([role="dialog"],[role="menu"]) :is(input,textarea,select):focus{
    outline:none!important;
    border-color:rgba(166,149,207,.42)!important;
    box-shadow:0 0 0 3px rgba(198,229,247,.13)!important;
  }

  /* Tooltips */
  :is([role="tooltip"],[data-radix-popper-content-wrapper] [role="tooltip"]){
    color:#5d566c!important;
    background:rgba(249,250,254,.94)!important;
    border:1px solid rgba(142,129,172,.15)!important;
    box-shadow:0 10px 30px rgba(63,56,84,.13)!important;
    backdrop-filter:blur(18px)!important;
  }

  /* Code block top bars and action buttons */
  pre + div,
  [data-testid*="code"] button,
  [class*="code"] button{
    border-radius:10px!important;
  }
  [data-testid*="code"] button:hover,
  [class*="code"] button:hover{
    background:rgba(210,206,228,.14)!important;
  }

  /* Tables */
  table{
    border-collapse:separate!important;
    border-spacing:0!important;
    border:1px solid rgba(139,127,170,.14)!important;
    border-radius:14px!important;
    overflow:hidden!important;
    background:rgba(255,255,255,.18)!important;
  }
  th{
    background:linear-gradient(90deg,rgba(224,232,244,.48),rgba(235,229,246,.48))!important;
  }
  th,td{
    border-color:rgba(139,127,170,.10)!important;
  }

  /* Links */
  a{
    text-decoration-color:rgba(151,133,190,.34)!important;
    text-underline-offset:3px!important;
  }
  a:hover{
    text-decoration-color:rgba(139,118,184,.70)!important;
  }

  /* Checkboxes/radios/sliders */
  input[type="checkbox"],
  input[type="radio"],
  input[type="range"]{
    accent-color:#a999d1!important;
  }

  /* Focus visibility */
  :is(button,a,input,textarea,select,[role="button"]):focus-visible{
    outline:2px solid rgba(184,215,238,.66)!important;
    outline-offset:2px!important;
  }

  /* Little ice accent on top-level dialogs */
  [role="dialog"]::before{
    content:"";
    position:absolute;
    top:0;left:22px;
    width:78px;height:3px;
    border-radius:0 0 999px 999px;
    background:linear-gradient(90deg,#c8eaf9,#ad9dd5,#d6cbed);
    opacity:.72;
    pointer-events:none;
  }


  /* =========================
     V4.5 Shuangli identity layer
     ========================= */

  @keyframes sl45CrystalBlink{
    0%,100%{opacity:.54;transform:rotate(0deg) scale(.96)}
    50%{opacity:.92;transform:rotate(8deg) scale(1.04)}
  }

  @keyframes sl45SigilGlow{
    0%,100%{filter:drop-shadow(0 0 4px rgba(196,224,243,.22))}
    50%{filter:drop-shadow(0 0 10px rgba(177,156,220,.34))}
  }

  #${EMBLEM_ID}{
    position:fixed;
    right:18px;
    top:76px;
    z-index:2147481800;
    pointer-events:none;
    display:flex;
    align-items:center;
    gap:8px;
    padding:7px 10px 7px 8px;
    border-radius:999px;
    border:1px solid rgba(145,131,179,.16);
    background:
      linear-gradient(135deg,rgba(252,253,255,.82),rgba(235,241,250,.72));
    box-shadow:
      0 8px 28px rgba(66,59,88,.09),
      inset 0 1px 0 rgba(255,255,255,.74);
    backdrop-filter:blur(16px) saturate(115%);
    font:700 11px/1 -apple-system,BlinkMacSystemFont,"Segoe UI","Microsoft YaHei",sans-serif;
    color:#6a607d;
    letter-spacing:.08em;
    opacity:.72;
  }

  #${EMBLEM_ID} .sigil{
    position:relative;
    width:22px;height:22px;
    display:grid;place-items:center;
    border-radius:50%;
    background:
      radial-gradient(circle at 35% 30%,#fff 0 12%,transparent 13%),
      linear-gradient(145deg,#c8eaf9,#b8a5dd 58%,#e6def3);
    box-shadow:0 0 0 1px rgba(143,128,178,.14);
    color:#fff;
    text-shadow:0 1px 4px rgba(83,69,117,.28);
    animation:sl45SigilGlow 4.6s ease-in-out infinite;
  }

  #${EMBLEM_ID} .sigil::before,
  #${EMBLEM_ID} .sigil::after{
    content:"";
    position:absolute;
    top:-4px;
    width:7px;height:10px;
    border:1px solid rgba(143,126,178,.35);
    border-bottom:0;
    background:linear-gradient(to bottom,rgba(255,255,255,.92),rgba(209,226,242,.42));
  }
  #${EMBLEM_ID} .sigil::before{
    left:1px;
    transform:rotate(-26deg);
    clip-path:polygon(50% 0,100% 100%,0 100%);
  }
  #${EMBLEM_ID} .sigil::after{
    right:1px;
    transform:rotate(26deg);
    clip-path:polygon(50% 0,100% 100%,0 100%);
  }

  #${CORNER_ID}{
    position:fixed;
    inset:0;
    z-index:2147478500;
    pointer-events:none;
    opacity:.48;
  }
  #${CORNER_ID}::before,
  #${CORNER_ID}::after{
    content:"✦";
    position:absolute;
    color:rgba(169,153,209,.38);
    text-shadow:0 0 12px rgba(197,229,247,.50);
    font-size:18px;
    animation:sl45CrystalBlink 6s ease-in-out infinite;
  }
  #${CORNER_ID}::before{left:268px;top:78px}
  #${CORNER_ID}::after{right:34px;bottom:94px;animation-delay:-3s}

  html.sl45-no-symbols #${EMBLEM_ID},
  html.sl45-no-symbols #${CORNER_ID}{
    display:none!important;
  }

  /* Scale divider under sidebar groups */
  :is(nav,aside) :is(
    [data-testid*="section"],
    [class*="sidebar"] [class*="group"],
    [class*="sidebar"] [class*="section"]
  ){
    position:relative;
  }

  :is(nav,aside) :is(
    [data-testid*="section"],
    [class*="sidebar"] [class*="group"],
    [class*="sidebar"] [class*="section"]
  )::after{
    content:"";
    display:block;
    height:1px;
    margin:7px 12px 4px;
    background:
      linear-gradient(90deg,
        transparent,
        rgba(151,137,184,.14) 18%,
        rgba(196,226,245,.28) 50%,
        rgba(151,137,184,.14) 82%,
        transparent);
    pointer-events:none;
  }

  /* Small crystal mark on current sidebar item */
  :is(nav,aside) :is(
    a[aria-current="page"],
    a[data-state="active"],
    button[aria-selected="true"],
    button[data-state="active"]
  )::before{
    content:"❄";
    position:absolute;
    left:8px;
    top:50%;
    transform:translateY(-50%) scale(.78);
    color:rgba(143,126,184,.52);
    text-shadow:0 0 8px rgba(198,230,247,.56);
    pointer-events:none;
  }

  :is(nav,aside) :is(
    a[aria-current="page"],
    a[data-state="active"],
    button[aria-selected="true"],
    button[data-state="active"]
  ){
    padding-left:28px!important;
  }

  /* Frost-scale pattern inside composer */
  :is(
    form > div:has(textarea),
    form > div:has([contenteditable="true"]),
    [data-composer-surface-variant],
    .composer-surface-chrome
  )::before{
    content:"";
    position:absolute;
    inset:0;
    border-radius:inherit;
    pointer-events:none;
    z-index:0;
    background:
      radial-gradient(circle at 94% 22%,rgba(197,229,247,.10),transparent 22%),
      repeating-radial-gradient(
        ellipse at 100% 100%,
        transparent 0 18px,
        rgba(156,141,192,.027) 19px 20px
      );
    opacity:.72;
  }

  :is(
    form > div:has(textarea),
    form > div:has([contenteditable="true"]),
    [data-composer-surface-variant],
    .composer-surface-chrome
  ) > *{
    position:relative;
    z-index:1;
  }

  /* Snow-crystal accents on composer edge */
  :is(
    form > div:has(textarea),
    form > div:has([contenteditable="true"]),
    [data-composer-surface-variant],
    .composer-surface-chrome
  ){
    background-image:
      radial-gradient(circle at 92% 0%,rgba(201,183,237,.14),transparent 34%),
      linear-gradient(135deg,rgba(253,253,255,.86),rgba(247,250,255,.76))!important;
  }

  /* Delicate dragon-scale corner for dialogs */
  [role="dialog"]{
    overflow:hidden;
  }
  [role="dialog"]::after{
    content:"";
    position:absolute;
    width:96px;height:96px;
    right:-28px;bottom:-32px;
    pointer-events:none;
    background:
      repeating-radial-gradient(
        ellipse at 50% 0,
        transparent 0 12px,
        rgba(153,139,189,.055) 13px 14px
      );
    transform:rotate(-18deg);
  }

  /* Frosted badge on menus */
  [role="menu"]::before{
    content:"";
    position:absolute;
    right:14px;top:10px;
    width:6px;height:6px;
    border-radius:50%;
    background:rgba(185,218,239,.55);
    box-shadow:
      0 0 0 3px rgba(192,177,223,.08),
      0 0 12px rgba(195,226,245,.48);
    pointer-events:none;
  }

  /* Shuangli identity for send button */
  :is(
    form > div:has(textarea),
    form > div:has([contenteditable="true"]),
    [data-composer-surface-variant],
    .composer-surface-chrome
  ) :is(
    button[data-testid*="send"],
    button[aria-label*="Send" i],
    button[aria-label*="发送"]
  )::after{
    content:"✦";
    position:absolute;
    right:-3px;top:-5px;
    font-size:8px;
    color:rgba(255,255,255,.88);
    text-shadow:0 0 7px rgba(220,242,252,.90);
    pointer-events:none;
  }

  /* Frost divider for message action rows */
  [data-message-author-role="assistant"] + div,
  [data-message-author-role="assistant"] ~ div:has(button){
    border-color:rgba(139,127,170,.08)!important;
  }


  /* =========================
     V4.6 scene system
     ========================= */

  @keyframes sl46Aurora {
    0%,100%{transform:translate3d(-1.5%,0,0) scale(1);opacity:.42}
    50%{transform:translate3d(1.5%,-1.5%,0) scale(1.025);opacity:.72}
  }
  @keyframes sl46SceneBreath {
    0%,100%{opacity:.34;filter:blur(18px)}
    50%{opacity:.62;filter:blur(24px)}
  }
  @keyframes sl46DoneGlow {
    0%{opacity:0;transform:scale(.92)}
    35%{opacity:.72}
    100%{opacity:0;transform:scale(1.12)}
  }

  #${SCENE_ID}{
    position:fixed;
    inset:0;
    z-index:-1;
    pointer-events:none;
    overflow:hidden;
    transition:opacity .35s ease;
  }
  #${SCENE_ID} .aurora{
    position:absolute;
    width:64vw;height:64vw;
    right:-18vw;top:-18vw;
    border-radius:50%;
    background:
      radial-gradient(circle at 42% 38%,rgba(215,203,239,.24),transparent 36%),
      radial-gradient(circle at 64% 62%,rgba(191,229,248,.20),transparent 42%);
    filter:blur(30px);
    animation:sl46Aurora 10s ease-in-out infinite;
  }
  #${SCENE_ID} .horizon{
    position:absolute;
    left:18%;right:7%;bottom:7vh;height:1px;
    background:linear-gradient(90deg,transparent,rgba(162,148,196,.22),rgba(198,229,247,.30),transparent);
    box-shadow:0 0 18px rgba(192,224,243,.18);
  }
  #${SCENE_ID} .frost-ring{
    position:absolute;
    right:8vw;top:18vh;
    width:240px;height:240px;border-radius:50%;
    border:1px solid rgba(182,164,219,.10);
    box-shadow:
      0 0 0 26px rgba(196,226,246,.025),
      0 0 0 54px rgba(182,164,219,.018),
      0 0 45px rgba(190,220,241,.10);
  }
  #${SCENE_ID} .done-glow{
    position:absolute;
    right:15vw;top:20vh;
    width:260px;height:260px;border-radius:50%;
    background:radial-gradient(circle,rgba(255,255,255,.40),rgba(204,230,247,.18) 32%,rgba(188,169,224,.10) 50%,transparent 72%);
    opacity:0;
  }

  #${SCENE_LABEL_ID}{
    position:fixed;
    left:50%;
    top:78px;
    z-index:2147481700;
    transform:translateX(-50%);
    pointer-events:none;
    padding:6px 10px;
    border-radius:999px;
    border:1px solid rgba(146,133,181,.13);
    background:rgba(250,251,255,.60);
    backdrop-filter:blur(12px);
    color:rgba(98,88,117,.70);
    font:700 10px/1 -apple-system,BlinkMacSystemFont,"Segoe UI","Microsoft YaHei",sans-serif;
    letter-spacing:.10em;
    opacity:.62;
    transition:opacity .25s ease,transform .25s ease;
  }

  html.sl46-no-scene #${SCENE_ID},
  html.sl46-no-scene #${SCENE_LABEL_ID}{
    display:none!important;
  }

  /* Home / empty state */
  html[data-sl-scene="home"] #${SCENE_ID} .aurora{
    width:76vw;height:76vw;
    right:-24vw;top:-20vw;
    opacity:.78;
  }
  html[data-sl-scene="home"] #${SCENE_ID} .frost-ring{
    width:320px;height:320px;
    right:11vw;top:16vh;
    opacity:.52;
  }
  html[data-sl-scene="home"] #${SCENE_LABEL_ID}::after{
    content:" · FROST SANCTUM";
  }
  html[data-sl-scene="home"] #${HERO_ID}{
    opacity:.26;
    width:min(42vw,700px);
    height:min(86vh,900px);
  }

  /* Normal conversation */
  html[data-sl-scene="chat"] #${SCENE_ID} .aurora{
    opacity:.48;
  }
  html[data-sl-scene="chat"] #${SCENE_LABEL_ID}::after{
    content:" · CONVERSATION";
  }
  html[data-sl-scene="chat"] #${HERO_ID}{
    opacity:.17;
  }

  /* Thinking */
  html[data-sl-scene="thinking"] #${SCENE_ID} .aurora{
    animation:sl46SceneBreath 3.2s ease-in-out infinite;
    background:
      radial-gradient(circle at 42% 38%,rgba(215,203,239,.30),transparent 36%),
      radial-gradient(circle at 64% 62%,rgba(191,229,248,.30),transparent 42%);
  }
  html[data-sl-scene="thinking"] #${SCENE_ID} .frost-ring{
    border-color:rgba(188,220,241,.24);
    box-shadow:
      0 0 0 26px rgba(196,226,246,.040),
      0 0 0 54px rgba(182,164,219,.024),
      0 0 55px rgba(190,220,241,.18);
  }
  html[data-sl-scene="thinking"] #${SCENE_LABEL_ID}::after{
    content:" · FROST MIND";
  }

  /* Generating */
  html[data-sl-scene="generating"] #${SCENE_ID} .horizon{
    height:2px;
    background:
      linear-gradient(90deg,
        transparent,
        rgba(176,160,218,.18) 20%,
        rgba(200,232,248,.40) 48%,
        rgba(176,160,218,.22) 76%,
        transparent);
    box-shadow:0 0 24px rgba(193,226,245,.28);
  }
  html[data-sl-scene="generating"] #${SCENE_ID} .aurora{
    animation-duration:5.5s;
    opacity:.66;
  }
  html[data-sl-scene="generating"] #${SCENE_LABEL_ID}::after{
    content:" · DRAGON BREATH";
  }

  /* Done */
  html[data-sl-scene="done"] #${SCENE_ID} .done-glow{
    animation:sl46DoneGlow 1.9s ease-out;
  }
  html[data-sl-scene="done"] #${SCENE_LABEL_ID}::after{
    content:" · CRYSTAL CLEAR";
  }

  /* Composer scene accent */
  html[data-sl-scene="home"] :is(
    form > div:has(textarea),
    form > div:has([contenteditable="true"]),
    [data-composer-surface-variant],
    .composer-surface-chrome
  ){
    box-shadow:
      0 20px 56px rgba(72,65,95,.13),
      0 0 34px rgba(197,228,247,.11),
      inset 0 0 0 1px rgba(255,255,255,.74)!important;
  }

  html[data-sl-scene="thinking"] :is(
    form > div:has(textarea),
    form > div:has([contenteditable="true"]),
    [data-composer-surface-variant],
    .composer-surface-chrome
  ){
    border-color:rgba(188,213,235,.36)!important;
  }

  html[data-sl-scene="generating"] :is(
    form > div:has(textarea),
    form > div:has([contenteditable="true"]),
    [data-composer-surface-variant],
    .composer-surface-chrome
  ){
    box-shadow:
      0 18px 52px rgba(73,65,96,.15),
      0 0 28px rgba(178,160,220,.13),
      inset 0 0 0 1px rgba(255,255,255,.75)!important;
  }


  /* =========================
     V4.7 cinematic composition
     ========================= */

  @keyframes sl47Float {
    0%,100%{transform:translate3d(0,0,0)}
    50%{transform:translate3d(0,-8px,0)}
  }
  @keyframes sl47DepthDrift {
    0%,100%{transform:translate3d(-1%,0,0) scale(1)}
    50%{transform:translate3d(1%,-1%,0) scale(1.025)}
  }
  @keyframes sl47TransitionFlash {
    0%{opacity:0}
    22%{opacity:.44}
    100%{opacity:0}
  }
  @keyframes sl47LineGlow {
    0%,100%{opacity:.24}
    50%{opacity:.62}
  }

  #${DEPTH_ID}{
    position:fixed;
    inset:0;
    z-index:-1;
    pointer-events:none;
    overflow:hidden;
  }
  #${DEPTH_ID} .veil{
    position:absolute;
    inset:-8%;
    background:
      radial-gradient(ellipse at 70% 28%,rgba(215,205,240,.13),transparent 34%),
      radial-gradient(ellipse at 36% 72%,rgba(192,226,246,.10),transparent 38%),
      linear-gradient(118deg,transparent 0 42%,rgba(255,255,255,.12) 50%,transparent 58% 100%);
    filter:blur(24px);
    animation:sl47DepthDrift 13s ease-in-out infinite;
  }
  #${DEPTH_ID} .scale-field{
    position:absolute;
    right:-8vw;
    bottom:-12vh;
    width:52vw;
    height:68vh;
    opacity:.24;
    background:
      repeating-radial-gradient(
        ellipse at 50% 100%,
        transparent 0 24px,
        rgba(152,137,188,.05) 25px 26px
      );
    transform:rotate(-6deg);
    -webkit-mask-image:linear-gradient(to left,black 36%,transparent 92%);
    mask-image:linear-gradient(to left,black 36%,transparent 92%);
  }
  #${DEPTH_ID} .ice-line{
    position:absolute;
    left:28%;right:14%;top:18%;
    height:1px;
    background:linear-gradient(90deg,transparent,rgba(198,229,247,.32),rgba(177,157,216,.25),transparent);
    box-shadow:0 0 15px rgba(198,229,247,.20);
    animation:sl47LineGlow 7s ease-in-out infinite;
  }

  #${WELCOME_ID}{
    position:fixed;
    left:calc(50% - 70px);
    top:26vh;
    z-index:5;
    width:min(560px,48vw);
    pointer-events:none;
    opacity:0;
    transform:translate(-50%,14px);
    transition:opacity .55s ease,transform .55s cubic-bezier(.2,.8,.2,1);
    font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","Microsoft YaHei",sans-serif;
  }
  #${WELCOME_ID} .eyebrow{
    display:inline-flex;
    align-items:center;
    gap:8px;
    padding:6px 10px;
    border-radius:999px;
    background:rgba(249,251,255,.56);
    border:1px solid rgba(148,134,181,.12);
    backdrop-filter:blur(12px);
    color:rgba(100,90,118,.68);
    font-size:10px;
    font-weight:800;
    letter-spacing:.14em;
  }
  #${WELCOME_ID} .eyebrow::before{
    content:"❄";
    color:rgba(160,139,201,.72);
    text-shadow:0 0 8px rgba(199,229,247,.64);
  }
  #${WELCOME_ID} h1{
    margin:16px 0 8px;
    font-size:clamp(28px,3.4vw,48px);
    line-height:1.08;
    font-weight:650;
    letter-spacing:-.035em;
    color:rgba(65,59,78,.86);
    text-shadow:0 10px 32px rgba(113,95,145,.08);
  }
  #${WELCOME_ID} p{
    margin:0;
    max-width:440px;
    color:rgba(102,95,116,.62);
    font-size:13px;
    line-height:1.8;
  }
  #${WELCOME_ID} .ornament{
    margin-top:18px;
    width:190px;height:1px;
    background:linear-gradient(90deg,rgba(170,151,210,.36),rgba(196,228,246,.46),transparent);
    box-shadow:0 0 12px rgba(196,228,246,.18);
  }

  html[data-sl-scene="home"] #${WELCOME_ID}{
    opacity:.88;
    transform:translate(-50%,0);
  }

  #${TRANSITION_ID}{
    position:fixed;
    inset:0;
    z-index:2147478300;
    pointer-events:none;
    opacity:0;
    background:
      radial-gradient(circle at 72% 34%,rgba(215,236,249,.20),transparent 25%),
      radial-gradient(circle at 62% 54%,rgba(191,174,225,.14),transparent 34%);
    mix-blend-mode:screen;
  }
  #${TRANSITION_ID}.run{
    animation:sl47TransitionFlash .85s ease-out both;
  }

  html.sl47-no-cinematic #${WELCOME_ID},
  html.sl47-no-cinematic #${DEPTH_ID},
  html.sl47-no-cinematic #${TRANSITION_ID}{
    display:none!important;
  }

  /* Home composition: make the page read like a designed cover */
  html[data-sl-scene="home"] #${HERO_ID}{
    right:-1vw;
    bottom:-1vh;
    width:min(46vw,760px);
    height:min(90vh,940px);
    opacity:.30;
    transform:translate3d(0,0,0) scale(1.015);
    animation:sl47Float 7.5s ease-in-out infinite;
    filter:saturate(.92) contrast(.99) drop-shadow(-18px 20px 42px rgba(120,103,153,.10));
  }
  html[data-sl-scene="home"] #${PANEL_ID}{
    box-shadow:
      0 28px 78px rgba(71,65,95,.20),
      0 0 70px rgba(194,224,243,.13);
  }

  /* Chat composition: push the character back so text becomes foreground */
  html[data-sl-scene="chat"] #${HERO_ID}{
    right:-5vw;
    bottom:-4vh;
    width:min(35vw,570px);
    height:min(78vh,800px);
    opacity:.135;
    transform:scale(.985);
    filter:saturate(.82) blur(.15px);
  }
  html[data-sl-scene="chat"] #${DEPTH_ID} .veil{
    opacity:.62;
  }

  /* Thinking pose: visually "lean in" */
  html[data-sl-scene="thinking"] #${HERO_ID}{
    right:-2vw;
    bottom:-1vh;
    width:min(39vw,640px);
    height:min(84vh,850px);
    opacity:.255;
    transform:translate3d(-7px,-5px,0) scale(1.02);
    filter:saturate(.94) drop-shadow(0 0 34px rgba(198,229,247,.18));
  }

  /* Generating pose: slightly forward with stronger violet energy */
  html[data-sl-scene="generating"] #${HERO_ID}{
    right:-1vw;
    bottom:-1vh;
    width:min(40vw,660px);
    height:min(85vh,870px);
    opacity:.29;
    transform:translate3d(-10px,-3px,0) scale(1.028);
    filter:saturate(1.02) contrast(1.01) drop-shadow(0 0 38px rgba(181,160,226,.20));
  }

  /* Done pose: settle back with a clean bright finish */
  html[data-sl-scene="done"] #${HERO_ID}{
    right:-2vw;
    bottom:-2vh;
    width:min(38vw,630px);
    height:min(82vh,840px);
    opacity:.235;
    transform:translate3d(0,0,0) scale(1);
    filter:saturate(.92) brightness(1.04) drop-shadow(0 0 24px rgba(203,230,246,.16));
  }

  /* Make conversation column feel more layered */
  html[data-sl-scene="chat"] main,
  html[data-sl-scene="thinking"] main,
  html[data-sl-scene="generating"] main,
  html[data-sl-scene="done"] main{
    position:relative;
  }
  html[data-sl-scene="chat"] main::before,
  html[data-sl-scene="thinking"] main::before,
  html[data-sl-scene="generating"] main::before,
  html[data-sl-scene="done"] main::before{
    content:"";
    position:fixed;
    left:calc(50% - 320px);
    top:92px;
    width:min(760px,62vw);
    height:calc(100vh - 170px);
    pointer-events:none;
    border-radius:36px;
    background:linear-gradient(180deg,rgba(255,255,255,.08),rgba(255,255,255,.025));
    box-shadow:inset 0 0 0 1px rgba(255,255,255,.16);
    opacity:.58;
    z-index:-1;
  }


  /* V4.7 sidebar contrast refinement */
  :is(nav,aside,[data-testid="app-shell-floating-left-panel"]){
    background:
      radial-gradient(circle at 84% 10%,rgba(190,174,220,.20),transparent 30%),
      repeating-radial-gradient(ellipse at 50% 0%,transparent 0 30px,rgba(128,116,154,.045) 31px 32px),
      linear-gradient(180deg,rgba(236,238,246,.94),rgba(229,232,242,.92))!important;
    border-right:1px solid rgba(121,112,145,.18)!important;
    box-shadow:
      inset -1px 0 0 rgba(255,255,255,.44),
      8px 0 28px rgba(70,64,88,.05)!important;
  }

  :is(nav,aside){
    color:#3f3a49!important;
  }

  :is(nav,aside) :is(a,button,[role="button"]){
    color:#46404f!important;
  }

  :is(nav,aside) :is(
    [class*="text-token-text-tertiary"],
    [class*="text-token-text-secondary"],
    [class*="text-gray"],
    [data-testid*="section"]
  ){
    color:rgba(74,67,87,.72)!important;
  }

  :is(nav,aside) :is(
    a[aria-current="page"],
    a[data-state="active"],
    button[aria-selected="true"],
    button[data-state="active"],
    [class*="bg-token-list-hover-background"]
  ){
    background:
      linear-gradient(90deg,
        rgba(202,211,230,.94),
        rgba(218,207,238,.92) 72%,
        rgba(228,231,242,.84))!important;
    border-color:rgba(133,116,171,.24)!important;
    box-shadow:
      inset 3px 0 0 rgba(146,123,197,.70),
      inset 0 1px 0 rgba(255,255,255,.74),
      0 7px 18px rgba(72,63,94,.10)!important;
  }

  :is(nav,aside) :is(a,button,[role="button"]):hover{
    background:
      linear-gradient(90deg,
        rgba(210,219,235,.88),
        rgba(224,214,241,.84))!important;
  }

  :is(nav,aside) ::-webkit-scrollbar-thumb{
    background:rgba(111,103,132,.42)!important;
  }


  /* =========================
     V4.8 multi-state character system
     ========================= */

  #${STATE_PANEL_ID}{
    position:fixed;
    right:18px;
    top:124px;
    z-index:2147481750;
    pointer-events:none;
    display:flex;
    gap:6px;
    padding:6px 8px;
    border-radius:999px;
    background:rgba(249,250,254,.52);
    border:1px solid rgba(146,132,181,.12);
    backdrop-filter:blur(12px);
    box-shadow:0 8px 24px rgba(61,55,80,.06);
    opacity:.60;
    font:700 10px/1 -apple-system,BlinkMacSystemFont,"Segoe UI","Microsoft YaHei",sans-serif;
    color:#6d647d;
  }
  #${STATE_PANEL_ID} .dot{
    width:6px;height:6px;border-radius:50%;
    background:rgba(160,148,185,.32);
    box-shadow:0 0 6px rgba(195,226,245,.22);
    transition:.2s ease;
  }
  html[data-sl-state="idle"] #${STATE_PANEL_ID} .idle,
  html[data-sl-state="thinking"] #${STATE_PANEL_ID} .thinking,
  html[data-sl-state="generating"] #${STATE_PANEL_ID} .generating,
  html[data-sl-state="done"] #${STATE_PANEL_ID} .done{
    background:rgba(172,151,216,.78);
    box-shadow:0 0 10px rgba(197,229,247,.62);
    transform:scale(1.25);
  }

  html.sl48-no-state-images #${STATE_PANEL_ID}{
    display:none!important;
  }

  /* Card image state filters */
  html[data-sl-state="idle"] #${PANEL_ID} .char-img{
    filter:saturate(.92) brightness(1.01);
  }
  html[data-sl-state="thinking"] #${PANEL_ID} .char-img{
    filter:saturate(.90) brightness(1.035) drop-shadow(0 0 14px rgba(195,228,247,.25));
    transform:scale(1.015) translateY(-2px);
  }
  html[data-sl-state="generating"] #${PANEL_ID} .char-img{
    filter:saturate(1.04) contrast(1.015) drop-shadow(0 0 16px rgba(181,160,226,.26));
    transform:scale(1.025) translateX(-2px);
  }
  html[data-sl-state="done"] #${PANEL_ID} .char-img{
    filter:saturate(.96) brightness(1.05);
    transform:scale(1.008);
  }

  #${PANEL_ID} .char-img{
    transition:filter .35s ease,transform .35s ease,opacity .25s ease;
  }

  /* State-colored title pill */
  html[data-sl-state="thinking"] #${PANEL_ID} .title{
    background:rgba(232,246,253,.88);
    color:#597385;
  }
  html[data-sl-state="generating"] #${PANEL_ID} .title{
    background:rgba(239,232,250,.90);
    color:#6a5c86;
  }
  html[data-sl-state="done"] #${PANEL_ID} .title{
    background:rgba(247,248,252,.90);
    color:#606777;
  }

  @media(max-width:900px){
    #${STATE_PANEL_ID}{right:10px;top:112px}
  }


  /* =========================
     V4.9 reactive state feedback
     ========================= */

  @keyframes sl49IdleBreath{
    0%,100%{transform:translateY(0) scale(1);filter:brightness(1)}
    50%{transform:translateY(-3px) scale(1.006);filter:brightness(1.025)}
  }
  @keyframes sl49ThinkRing{
    0%{transform:scale(.82) rotate(0deg);opacity:.10}
    45%{opacity:.56}
    100%{transform:scale(1.16) rotate(32deg);opacity:0}
  }
  @keyframes sl49ThinkParticle{
    0%{transform:translate3d(0,8px,0) scale(.7);opacity:0}
    22%{opacity:.82}
    100%{transform:translate3d(var(--px),var(--py),0) scale(1.08);opacity:0}
  }
  @keyframes sl49BreathTrack{
    0%{transform:translateX(-130%);opacity:0}
    12%{opacity:.25}
    48%{opacity:.62}
    100%{transform:translateX(130%);opacity:0}
  }
  @keyframes sl49AnswerGlow{
    0%,100%{box-shadow:inset 0 0 0 1px rgba(190,222,241,.04)}
    50%{box-shadow:inset 0 0 0 1px rgba(183,161,224,.14),0 0 24px rgba(195,226,246,.06)}
  }
  @keyframes sl49DoneHalo{
    0%{transform:scale(.72);opacity:0}
    26%{opacity:.72}
    100%{transform:scale(1.26);opacity:0}
  }
  @keyframes sl49ShardFall{
    0%{transform:translate3d(0,-8px,0) rotate(0deg);opacity:0}
    18%{opacity:.85}
    100%{transform:translate3d(var(--sx),var(--sy),0) rotate(140deg);opacity:0}
  }

  #${REACTIVE_FX_ID}{
    position:fixed;
    inset:0;
    z-index:2147481200;
    pointer-events:none;
    overflow:hidden;
  }
  #${REACTIVE_FX_ID} .think-ring{
    position:absolute;
    right:8vw;
    top:20vh;
    width:260px;height:260px;
    border-radius:50%;
    border:1px solid rgba(191,228,248,.30);
    box-shadow:
      0 0 0 18px rgba(194,229,248,.028),
      0 0 0 40px rgba(181,160,226,.022),
      0 0 32px rgba(194,229,248,.13);
    opacity:0;
  }
  html[data-sl-state="thinking"] #${REACTIVE_FX_ID} .think-ring{
    animation:sl49ThinkRing 2.8s ease-out infinite;
  }

  #${REACTIVE_FX_ID} .breath-track{
    position:absolute;
    left:18%;
    right:8%;
    bottom:12vh;
    height:58px;
    opacity:0;
    overflow:hidden;
    border-radius:999px;
    -webkit-mask-image:linear-gradient(90deg,transparent,#000 14%,#000 86%,transparent);
    mask-image:linear-gradient(90deg,transparent,#000 14%,#000 86%,transparent);
  }
  #${REACTIVE_FX_ID} .breath-track::before{
    content:"";
    position:absolute;
    inset:0;
    background:
      linear-gradient(96deg,
        transparent 0 30%,
        rgba(198,231,248,.08) 37%,
        rgba(178,158,222,.34) 48%,
        rgba(207,237,250,.42) 54%,
        rgba(178,158,222,.16) 66%,
        transparent 73% 100%);
    filter:blur(7px);
    transform:translateX(-130%);
  }
  html[data-sl-state="generating"] #${REACTIVE_FX_ID} .breath-track{
    opacity:1;
  }
  html[data-sl-state="generating"] #${REACTIVE_FX_ID} .breath-track::before{
    animation:sl49BreathTrack 1.85s linear infinite;
  }

  #${REACTIVE_FX_ID} .done-halo{
    position:absolute;
    right:11vw;
    top:19vh;
    width:300px;height:300px;
    border-radius:50%;
    opacity:0;
    background:
      radial-gradient(circle,rgba(255,255,255,.30),rgba(203,231,247,.14) 32%,rgba(183,163,223,.09) 54%,transparent 72%);
  }
  html[data-sl-state="done"] #${REACTIVE_FX_ID} .done-halo{
    animation:sl49DoneHalo 1.65s ease-out;
  }

  #${REACTIVE_FX_ID} .particle{
    position:absolute;
    width:5px;height:5px;
    border-radius:50%;
    background:rgba(239,249,255,.94);
    box-shadow:0 0 10px rgba(197,230,248,.95);
  }
  #${REACTIVE_FX_ID} .shard{
    position:absolute;
    width:4px;height:10px;
    border-radius:2px;
    background:linear-gradient(to bottom,rgba(255,255,255,.95),rgba(190,220,241,.36));
    box-shadow:0 0 8px rgba(194,226,245,.62);
  }

  /* Idle breathing on both foreground card and hero */
  html[data-sl-state="idle"] #${PANEL_ID}{
    animation:sl49IdleBreath 6.8s ease-in-out infinite;
  }
  html[data-sl-state="idle"] #${HERO_ID}{
    animation:sl49IdleBreath 8.5s ease-in-out infinite;
  }

  /* Thinking: stronger crystalline concentration */
  html[data-sl-state="thinking"] #${PANEL_ID}{
    box-shadow:
      0 28px 78px rgba(71,65,95,.19),
      0 0 38px rgba(195,228,247,.18),
      inset 0 0 0 1px rgba(217,239,251,.46)!important;
  }

  /* Generating: answer area gains a soft traveling energy */
  html[data-sl-state="generating"] [data-message-author-role="assistant"]:last-of-type > div{
    position:relative;
    animation:sl49AnswerGlow 2.2s ease-in-out infinite;
  }

  /* Done: card settles bright for a moment */
  html[data-sl-state="done"] #${PANEL_ID}{
    box-shadow:
      0 28px 78px rgba(71,65,95,.18),
      0 0 36px rgba(206,233,247,.18),
      inset 0 0 0 1px rgba(255,255,255,.76)!important;
  }

  @media(max-width:900px){
    #${REACTIVE_FX_ID} .think-ring{
      right:-70px;
      top:22vh;
      width:220px;height:220px;
    }
    #${REACTIVE_FX_ID} .breath-track{
      left:8%;right:4%;bottom:10vh;
    }
    #${REACTIVE_FX_ID} .done-halo{
      right:-40px;top:20vh;width:240px;height:240px;
    }
  }


  /* =========================
     V5.0 five-state character system
     ========================= */

  #${STATE_PANEL_ID}{
    gap:7px;
  }

  html[data-sl-scene="home"] #${STATE_PANEL_ID} .home{
    background:rgba(169,148,214,.86);
    box-shadow:0 0 12px rgba(200,231,248,.72);
    transform:scale(1.28);
  }

  html[data-sl-scene="home"] #${PANEL_ID} .state-badge{
    background:rgba(240,235,250,.92);
    color:#675c82;
  }

  html[data-sl-scene="home"] #${PANEL_ID} .title{
    background:rgba(244,241,252,.90);
    color:#665b80;
  }

  #sl48-image-manager .sl50-preview{
    width:34px;
    height:48px;
    border-radius:8px;
    object-fit:cover;
    object-position:center top;
    border:1px solid rgba(141,128,173,.16);
    background:rgba(238,240,246,.72);
    box-shadow:0 4px 12px rgba(72,64,92,.06);
  }

  #sl48-image-manager .sl50-preview.empty{
    display:grid;
    place-items:center;
    font-size:12px;
    color:#a19aa9;
  }


  /* =========================
     V5.1 task visibility
     ========================= */

  .sl51-task-entry{
    position:relative!important;
    background:
      linear-gradient(90deg,rgba(207,220,239,.96),rgba(224,214,243,.94))!important;
    border:1px solid rgba(132,115,169,.26)!important;
    border-radius:12px!important;
    box-shadow:
      inset 3px 0 0 rgba(146,123,197,.78),
      0 7px 18px rgba(71,63,92,.10)!important;
    color:#393344!important;
    font-weight:650!important;
  }

  .sl51-task-entry::after{
    content:"TASK";
    position:absolute;
    right:10px;
    top:50%;
    transform:translateY(-50%);
    padding:3px 6px;
    border-radius:999px;
    background:rgba(250,252,255,.72);
    border:1px solid rgba(146,130,181,.14);
    color:#6a5e80;
    font-size:9px;
    font-weight:800;
    letter-spacing:.08em;
    pointer-events:none;
  }

  .sl51-task-entry:hover{
    background:
      linear-gradient(90deg,rgba(199,216,238,.98),rgba(218,205,240,.96))!important;
    box-shadow:
      inset 3px 0 0 rgba(139,115,194,.84),
      0 9px 22px rgba(71,63,92,.13)!important;
  }

  html[data-sl-task-page="1"] .sl51-task-entry{
    background:
      linear-gradient(90deg,rgba(192,210,236,.98),rgba(211,197,238,.98))!important;
    box-shadow:
      inset 4px 0 0 rgba(130,105,190,.92),
      0 10px 26px rgba(73,61,98,.15)!important;
  }

  html[data-sl-task-page="1"] #${HERO_ID}{
    opacity:1!important;
    right:1.2vw!important;
    filter:
      saturate(1.05)
      contrast(1.07)
      brightness(1.01)
      drop-shadow(0 14px 30px rgba(82,69,112,.22))
      drop-shadow(0 0 16px rgba(201,231,248,.18))!important;
  }

  /* V5.1.4: independent foreground character layer */
  html #${HERO_ID}{
    display:block!important;
    visibility:visible!important;
    opacity:1!important;
    mix-blend-mode:normal!important;
    -webkit-mask-image:none!important;
    mask-image:none!important;
  }

  html[data-sl-task-page="0"][data-sl-scene="chat"] #${HERO_ID}{
    opacity:1!important;
    transform:translateY(-50%) scale(.98);
  }

  html[data-sl-task-page="0"][data-sl-scene="home"] #${HERO_ID}{
    opacity:1!important;
    transform:translateY(-50%) scale(1.04);
  }

  html[data-sl-task-page="0"][data-sl-scene="thinking"] #${HERO_ID}{
    opacity:1!important;
    transform:translate3d(-6px,calc(-50% - 4px),0) scale(1.02);
    filter:
      saturate(1.08)
      contrast(1.08)
      brightness(1.02)
      drop-shadow(0 0 26px rgba(190,225,246,.28))
      drop-shadow(0 14px 30px rgba(82,69,112,.22))!important;
  }

  html[data-sl-task-page="0"][data-sl-scene="generating"] #${HERO_ID}{
    opacity:1!important;
    transform:translate3d(-8px,calc(-50% - 2px),0) scale(1.03);
    filter:
      saturate(1.10)
      contrast(1.09)
      brightness(1.01)
      drop-shadow(0 0 30px rgba(177,156,221,.28))
      drop-shadow(0 14px 32px rgba(82,69,112,.23))!important;
  }

  html[data-sl-task-page="0"][data-sl-scene="done"] #${HERO_ID}{
    opacity:1!important;
    transform:translateY(-50%) scale(1.01);
    filter:
      saturate(1.06)
      contrast(1.07)
      brightness(1.03)
      drop-shadow(0 0 22px rgba(199,228,245,.22))
      drop-shadow(0 14px 30px rgba(82,69,112,.21))!important;
  }

  html[data-sl-task-page="1"] #${SCENE_ID},
  html[data-sl-task-page="1"] #${DEPTH_ID}{
    opacity:.48!important;
  }

  html[data-sl-task-page="1"] main{
    background:rgba(249,250,254,.28)!important;
  }

  html[data-sl-task-page="1"] #${WELCOME_ID}{
    display:none!important;
  }

  @media(max-width:1100px){
    #${WELCOME_ID}{
      left:46%;
      width:min(520px,55vw);
    }
    html[data-sl-scene="home"] #${HERO_ID}{
      width:52vw;
      opacity:.24;
    }
  }

  @media(max-width:900px){
    #${WELCOME_ID}{
      left:50%;
      top:22vh;
      width:calc(100vw - 56px);
      text-align:center;
    }
    #${WELCOME_ID} p{margin-inline:auto}
    #${WELCOME_ID} .ornament{margin-inline:auto}
    html[data-sl-scene="home"] #${HERO_ID}{
      width:66vw;
      opacity:.14;
    }
    html[data-sl-scene="chat"] main::before,
    html[data-sl-scene="thinking"] main::before,
    html[data-sl-scene="generating"] main::before,
    html[data-sl-scene="done"] main::before{
      display:none;
    }
  }

  @media(max-width:900px){
    #${SCENE_LABEL_ID}{top:68px}
    #${SCENE_ID} .frost-ring{right:-70px;top:18vh}
    html[data-sl-scene="home"] #${HERO_ID}{width:64vw;opacity:.18}
  }

  @media(max-width:900px){
    #${EMBLEM_ID}{right:10px;top:68px;padding:6px 8px}
    #${EMBLEM_ID} .word{display:none}
    #${CORNER_ID}::before{left:18px;top:74px}
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
    document.documentElement.classList.toggle('sl45-no-symbols',get(KEY_SYMBOLS,'1')==='0');
    document.documentElement.classList.toggle('sl46-no-scene',get(KEY_SCENE,'1')==='0');
    document.documentElement.classList.toggle('sl47-no-cinematic',get(KEY_CINEMATIC,'1')==='0');
    document.documentElement.classList.toggle('sl48-no-state-images',get(KEY_STATE_IMAGES,'1')==='0');
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
    syncStateImage();
    syncStateDialogue(state);
    const badge=document.querySelector('#'+PANEL_ID+' .state-badge');
    if(badge)badge.textContent=stateText(state);
    if(state==='thinking'){
      spawnThinkingParticles();
    }else{
      const rr=document.getElementById(REACTIVE_FX_ID);
      if(rr) rr.querySelectorAll('.particle').forEach(n=>n.remove());
    }

    if(state==='done'&&prev!=='done'){
      burstDone();
      spawnDoneShards();
    }
    clearTimeout(doneTimer);
    if(state==='done'){
      doneTimer=setTimeout(()=>{
        lastState='idle';
        document.documentElement.setAttribute('data-sl-state','idle');
        syncStateImage();
        syncStateDialogue('idle');
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


  function addEmblem(){
    if(document.getElementById(EMBLEM_ID)||!document.body)return;
    const e=document.createElement('div');
    e.id=EMBLEM_ID;
    e.innerHTML='<span class="sigil">❄</span><span class="word">SHUANGLI</span>';
    document.body.appendChild(e);
  }

  function addCornerMarks(){
    if(document.getElementById(CORNER_ID)||!document.body)return;
    const c=document.createElement('div');
    c.id=CORNER_ID;
    document.body.appendChild(c);
  }


  function addSceneLayer(){
    if(document.getElementById(SCENE_ID)||!document.body)return;
    const layer=document.createElement('div');
    layer.id=SCENE_ID;
    layer.innerHTML=
      '<div class="aurora"></div>'+
      '<div class="horizon"></div>'+
      '<div class="frost-ring"></div>'+
      '<div class="done-glow"></div>';
    document.body.appendChild(layer);
  }

  function addSceneLabel(){
    if(document.getElementById(SCENE_LABEL_ID)||!document.body)return;
    const label=document.createElement('div');
    label.id=SCENE_LABEL_ID;
    label.textContent='SHUANGLI';
    document.body.appendChild(label);
  }

  let lastScene='home';

  function hasConversation(){
    return !!document.querySelector('[data-message-author-role="user"],[data-message-author-role="assistant"]');
  }

  function detectScene(){
    if(get(KEY_SCENE,'1')==='0'){
      document.documentElement.setAttribute('data-sl-scene','chat');
      return;
    }

    const state=document.documentElement.getAttribute('data-sl-state')||'idle';
    let scene='chat';

    if(state==='thinking') scene='thinking';
    else if(state==='generating') scene='generating';
    else if(state==='done') scene='done';
    else scene=hasConversation()?'chat':'home';

    if(scene!==lastScene){
      const previous=lastScene;
      lastScene=scene;
      document.documentElement.setAttribute('data-sl-scene',scene);
      syncStateImage();
      syncStateDialogue(document.documentElement.getAttribute('data-sl-state')||'idle');
      const badge=document.querySelector('#'+PANEL_ID+' .state-badge');
      if(badge && scene==='home') badge.textContent='✦ 首页';
      else if(badge) badge.textContent=stateText(document.documentElement.getAttribute('data-sl-state')||'idle');
      if(previous!==scene) runSceneTransition();
    }
  }


  function addWelcome(){
    if(document.getElementById(WELCOME_ID)||!document.body)return;
    const w=document.createElement('div');
    w.id=WELCOME_ID;
    w.innerHTML=
      '<div class="eyebrow">SHUANGLI INTERFACE</div>'+
      '<h1>霜璃在这里。</h1>'+
      '<p>冰晶会安静下来，直到你开始新的对话。思考、输出与完成，都有属于霜璃自己的节奏。</p>'+
      '<div class="ornament"></div>';
    document.body.appendChild(w);
  }

  function addDepthLayer(){
    if(document.getElementById(DEPTH_ID)||!document.body)return;
    const d=document.createElement('div');
    d.id=DEPTH_ID;
    d.innerHTML=
      '<div class="veil"></div>'+
      '<div class="scale-field"></div>'+
      '<div class="ice-line"></div>';
    document.body.appendChild(d);
  }

  function addTransitionLayer(){
    if(document.getElementById(TRANSITION_ID)||!document.body)return;
    const t=document.createElement('div');
    t.id=TRANSITION_ID;
    document.body.appendChild(t);
  }

  function runSceneTransition(){
    if(get(KEY_CINEMATIC,'1')==='0'||get(KEY_FX,'1')==='0')return;
    const t=document.getElementById(TRANSITION_ID);
    if(!t)return;
    t.classList.remove('run');
    void t.offsetWidth;
    t.classList.add('run');
  }


  function stateImageKey(state){
    if(state==='home') return KEY_STATE_HOME_IMG;
    if(state==='thinking') return KEY_STATE_THINK_IMG;
    if(state==='generating') return KEY_STATE_GEN_IMG;
    if(state==='done') return KEY_STATE_DONE_IMG;
    return KEY_STATE_IDLE_IMG;
  }

  function getStateImage(state){
    if(get(KEY_STATE_IMAGES,'1')==='0'){
      return localStorage.getItem(KEY_IMG) || BUILTIN_STATE_IMAGES.idle;
    }
    return localStorage.getItem(stateImageKey(state))
      || BUILTIN_STATE_IMAGES[state]
      || localStorage.getItem(KEY_IMG)
      || BUILTIN_STATE_IMAGES.idle;
  }

  function preloadBuiltinStateImages(){
    Object.values(BUILTIN_STATE_IMAGES).forEach(src=>{
      const img=new Image();
      img.decoding='async';
      img.src=src;
    });
  }

  function syncStateImage(){
    const state=document.documentElement.getAttribute('data-sl-state')||'idle';
    const scene=document.documentElement.getAttribute('data-sl-scene')||'chat';
    const effectiveState=scene==='home'?'home':state;
    const imgData=getStateImage(effectiveState);

    const panel=document.getElementById(PANEL_ID);
    if(panel){
      const img=panel.querySelector('.char-img');
      const empty=panel.querySelector('.empty');
      if(imgData){
        img.src=imgData;
        img.style.display='block';
        if(empty) empty.style.display='none';
      }else{
        img.removeAttribute('src');
        img.style.display='none';
        if(empty) empty.style.display='flex';
      }
    }

    const hero=document.getElementById(HERO_ID);
    if(hero){
      const hi=hero.querySelector('img');
      if(imgData){
        hi.src=imgData;
        hero.style.display='block';
        hero.style.visibility='visible';
      }else{
        hi.removeAttribute('src');
        hero.style.display='none';
      }
    }
  }

  function chooseStateImage(state,label){
    const input=document.createElement('input');
    input.type='file';
    input.accept='image/png,image/jpeg,image/webp';
    input.style.display='none';
    input.onchange=()=>{
      const file=input.files&&input.files[0];
      if(!file){ input.remove(); return; }
      if(file.size>5*1024*1024){
        alert('图片请控制在 5MB 以内。');
        input.remove();
        return;
      }
      const r=new FileReader();
      r.onload=()=>{
        try{
          localStorage.setItem(stateImageKey(state),String(r.result));
          syncStateImage();
          refreshStateManagerBadges();
          const manager=document.getElementById('sl48-image-manager');
          if(manager){ manager.remove(); openStateImageManager(); }
          toast(label+'状态图片已更新');
        }catch(_){
          alert('图片保存失败，请换一张更小的图片。');
        }
        input.remove();
      };
      r.readAsDataURL(file);
    };
    document.body.appendChild(input);
    input.click();
  }

  function openStateImageManager(){
    const old=document.getElementById('sl48-image-manager');
    if(old){old.remove();}

    const m=document.createElement('div');
    m.id='sl48-image-manager';
    m.style.cssText=
      'position:fixed;left:50%;top:50%;z-index:2147483800;transform:translate(-50%,-50%);'+
      'width:min(420px,calc(100vw - 34px));padding:18px;border-radius:22px;'+
      'background:rgba(249,250,254,.97);border:1px solid rgba(139,127,170,.18);'+
      'box-shadow:0 28px 90px rgba(58,52,78,.24);backdrop-filter:blur(28px);'+
      'font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","Microsoft YaHei",sans-serif;color:#4e4858;';

    const row=(state,label)=>{
      const custom=localStorage.getItem(stateImageKey(state));
      const data=custom || BUILTIN_STATE_IMAGES[state] || BUILTIN_STATE_IMAGES.idle;
      const preview=data
        ? '<img class="sl50-preview" src="'+data+'" alt="">'
        : '<span class="sl50-preview empty">❄</span>';
      return '<div style="display:flex;align-items:center;justify-content:space-between;gap:10px;padding:10px 0;border-top:1px solid rgba(135,126,160,.10)">'+
        '<div style="display:flex;align-items:center;gap:8px">'+preview+'<div><div>'+label+'</div><span data-status-for="'+state+'" style="display:inline-block;margin-top:4px;padding:4px 7px;border-radius:999px;font-size:10px;background:rgba(238,240,246,.66);color:#8a8392">使用主图</span></div></div>'+
        '<div style="display:flex;gap:6px"><button class="sl42-btn" data-set="'+state+'">导入</button><button class="sl42-btn" data-clear="'+state+'">清除</button></div>'+
        '</div>';
    };

    m.innerHTML=
      '<h3 style="margin:0 0 5px">❄ 霜璃五状态图片</h3>'+
      '<p style="margin:0 0 14px;color:#777184;font-size:12px;line-height:1.6">已内置 5 张高清霜璃状态图；你仍然可以导入自己的图片覆盖任意状态，清除后自动恢复内置高清图。</p>'+
      row('home','首页')+
      row('idle','待机')+
      row('thinking','思考')+
      row('generating','输出')+
      row('done','完成')+
      '<div style="display:flex;justify-content:flex-end;margin-top:14px"><button class="sl42-btn" data-close="1">完成</button></div>';

    document.body.appendChild(m);

    const labels={home:'首页',idle:'待机',thinking:'思考',generating:'输出',done:'完成'};
    m.querySelectorAll('[data-set]').forEach(btn=>{
      btn.onclick=()=>chooseStateImage(btn.dataset.set,labels[btn.dataset.set]);
    });
    m.querySelectorAll('[data-clear]').forEach(btn=>{
      btn.onclick=()=>{
        localStorage.removeItem(stateImageKey(btn.dataset.clear));
        syncStateImage();
        refreshStateManagerBadges();
        const manager=document.getElementById('sl48-image-manager');
        if(manager){ manager.remove(); openStateImageManager(); }
        toast(labels[btn.dataset.clear]+'状态图片已清除');
      };
    });
    m.querySelector('[data-close]').onclick=()=>m.remove();
    refreshStateManagerBadges();
  }

  function addStatePanel(){
    if(document.getElementById(STATE_PANEL_ID)||!document.body)return;
    const p=document.createElement('div');
    p.id=STATE_PANEL_ID;
    p.innerHTML=
      '<span class="dot home"></span>'+
      '<span class="dot idle"></span>'+
      '<span class="dot thinking"></span>'+
      '<span class="dot generating"></span>'+
      '<span class="dot done"></span>'+
      '<span>STATE</span>';
    document.body.appendChild(p);
  }

  const stateDialogues={
    home:'欢迎回来。霜璃已经在这里等你了。',
    idle:'嗯，在这呢。',
    thinking:'让我把这个问题理清楚。',
    generating:'正在把答案整理给你。',
    done:'好了，这一轮完成了。'
  };

  function syncStateDialogue(state){
    const bubble=document.querySelector('#'+PANEL_ID+' .bubble');
    const scene=document.documentElement.getAttribute('data-sl-scene')||'chat';
    const effectiveState=scene==='home'?'home':state;
    if(bubble && stateDialogues[effectiveState]) bubble.textContent=stateDialogues[effectiveState];
  }


  function addReactiveFx(){
    if(document.getElementById(REACTIVE_FX_ID)||!document.body)return;
    const r=document.createElement('div');
    r.id=REACTIVE_FX_ID;
    r.innerHTML=
      '<div class="think-ring"></div>'+
      '<div class="breath-track"></div>'+
      '<div class="done-halo"></div>';
    document.body.appendChild(r);
  }

  function clearReactiveParticles(){
    const r=document.getElementById(REACTIVE_FX_ID);
    if(!r)return;
    r.querySelectorAll('.particle,.shard').forEach(n=>n.remove());
  }

  function spawnThinkingParticles(){
    if(get(KEY_FX,'1')==='0')return;
    const r=document.getElementById(REACTIVE_FX_ID);
    if(!r)return;
    r.querySelectorAll('.particle').forEach(n=>n.remove());
    const cx=innerWidth-220;
    const cy=Math.max(150,innerHeight*.34);
    for(let i=0;i<12;i++){
      const p=document.createElement('i');
      p.className='particle';
      const angle=(Math.PI*2*i/12)+(Math.random()*.25);
      const dist=55+Math.random()*85;
      p.style.left=(cx+Math.random()*10)+'px';
      p.style.top=(cy+Math.random()*10)+'px';
      p.style.setProperty('--px',(Math.cos(angle)*dist).toFixed(0)+'px');
      p.style.setProperty('--py',(Math.sin(angle)*dist).toFixed(0)+'px');
      p.style.animation='sl49ThinkParticle '+(1.8+Math.random()*.9).toFixed(2)+'s ease-out '+(Math.random()*.55).toFixed(2)+'s infinite';
      r.appendChild(p);
    }
  }

  function spawnDoneShards(){
    if(get(KEY_FX,'1')==='0')return;
    const r=document.getElementById(REACTIVE_FX_ID);
    if(!r)return;
    r.querySelectorAll('.shard').forEach(n=>n.remove());
    const cx=Math.max(innerWidth*.62,innerWidth-320);
    const cy=Math.max(130,innerHeight*.28);
    for(let i=0;i<16;i++){
      const p=document.createElement('i');
      p.className='shard';
      const angle=(Math.PI*2*i/16)+(Math.random()*.22);
      const dist=60+Math.random()*130;
      p.style.left=(cx+Math.random()*16)+'px';
      p.style.top=(cy+Math.random()*12)+'px';
      p.style.setProperty('--sx',(Math.cos(angle)*dist).toFixed(0)+'px');
      p.style.setProperty('--sy',(Math.sin(angle)*dist+54).toFixed(0)+'px');
      p.style.animation='sl49ShardFall '+(1.25+Math.random()*.45).toFixed(2)+'s ease-out '+(Math.random()*.16).toFixed(2)+'s forwards';
      r.appendChild(p);
    }
    setTimeout(()=>r.querySelectorAll('.shard').forEach(n=>n.remove()),1900);
  }

  function refreshStateManagerBadges(){
    const m=document.getElementById('sl48-image-manager');
    if(!m)return;
    m.querySelectorAll('[data-status-for]').forEach(el=>{
      const st=el.dataset.statusFor;
      const exists=!!localStorage.getItem(stateImageKey(st));
      el.textContent=exists?'自定义':'内置高清';
      el.style.color=exists?'#675b85':'#617185';
      el.style.background=exists?'rgba(234,226,247,.72)':'rgba(225,239,248,.72)';
    });
  }


  function markTaskEntry(){
    const candidates=[...document.querySelectorAll('nav a, nav button, aside a, aside button, [data-testid="app-shell-floating-left-panel"] a, [data-testid="app-shell-floating-left-panel"] button')];
    let found=false;
    for(const el of candidates){
      const t=(el.textContent||'').trim();
      if(/^(定时任务|任务|Tasks?)$/i.test(t) || /定时任务/i.test(t)){
        el.classList.add('sl51-task-entry');
        found=true;
      }else{
        el.classList.remove('sl51-task-entry');
      }
    }
    return found;
  }

  function detectTaskPage(){
    const path=(location.pathname||'').toLowerCase();
    const bodyText=(document.body?.innerText||'').slice(0,3500);
    const byPath=/task|tasks|scheduled/.test(path);
    const byHeading=/定时任务|Tasks|Scheduled tasks/i.test(bodyText);
    document.documentElement.setAttribute('data-sl-task-page',(byPath||byHeading)?'1':'0');
    markTaskEntry();
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
      <p>V5.1.5：右侧霜璃保持独立前景角色层，并改为屏幕垂直居中常驻。</p>

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

      <div class="row">
        <span>霜璃专属标识</span>
        <select data-k="symbols">
          <option value="1">开启</option>
          <option value="0">关闭</option>
        </select>
      </div>

      <div class="row">
        <span>场景系统</span>
        <select data-k="scene">
          <option value="1">开启</option>
          <option value="0">关闭</option>
        </select>
      </div>

      <div class="row">
        <span>电影感构图</span>
        <select data-k="cinematic">
          <option value="1">开启</option>
          <option value="0">关闭</option>
        </select>
      </div>

      <div class="row">
        <span>五状态角色图</span>
        <select data-k="stateimages">
          <option value="1">开启</option>
          <option value="0">关闭</option>
        </select>
      </div>

      <div class="row">
        <span>状态图片</span>
        <button class="sl42-btn" data-a="statepics">管理</button>
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
    box.querySelector('[data-k="symbols"]').value=get(KEY_SYMBOLS,'1');
    box.querySelector('[data-k="scene"]').value=get(KEY_SCENE,'1');
    box.querySelector('[data-k="cinematic"]').value=get(KEY_CINEMATIC,'1');
    box.querySelector('[data-k="stateimages"]').value=get(KEY_STATE_IMAGES,'1');

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
    box.querySelector('[data-k="symbols"]').onchange=e=>{
      localStorage.setItem(KEY_SYMBOLS,e.target.value);
      applyPrefs();
    };
    box.querySelector('[data-k="scene"]').onchange=e=>{
      localStorage.setItem(KEY_SCENE,e.target.value);
      applyPrefs();
      detectScene();
    };
    box.querySelector('[data-k="cinematic"]').onchange=e=>{
      localStorage.setItem(KEY_CINEMATIC,e.target.value);
      applyPrefs();
    };
    box.querySelector('[data-k="stateimages"]').onchange=e=>{
      localStorage.setItem(KEY_STATE_IMAGES,e.target.value);
      applyPrefs();
      syncStateImage();
    };
    box.querySelector('[data-a="statepics"]').onclick=openStateImageManager;

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
    addEmblem();
    addCornerMarks();
    addSceneLayer();
    addSceneLabel();
    addWelcome();
    addDepthLayer();
    addTransitionLayer();
    addStatePanel();
    addReactiveFx();
    applyPrefs();
    preloadBuiltinStateImages();
    syncHeroImage();
    syncStateImage();
    detectState();
    detectScene();
    detectTaskPage();

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
    addEmblem();
    addCornerMarks();
    addSceneLayer();
    addSceneLabel();
    addWelcome();
    addDepthLayer();
    addTransitionLayer();
    addStatePanel();
    addReactiveFx();
    applyPrefs();
    syncHeroImage();
    syncStateImage();
    detectTaskPage();
  },2500);

  setInterval(()=>{
    detectState();
    detectScene();
    detectTaskPage();
  },700);

  console.log('[霜璃主题] V5.1.5 loaded · vertically centered foreground hero');
})();