// ==UserScript==
// @name         ChatGPT 霜璃 · 冰晶龙娘主题
// @namespace    https://chatgpt.com/
// @version      5.7.4
// @description  网页版霜璃主题 V5.7.4：修复侧栏条目错位与新版回复气泡透明的问题。
// @match        https://chatgpt.com/*
// @match        https://www.chatgpt.com/*
// @run-at       document-end
// @grant        none
// @updateURL    https://raw.githubusercontent.com/z394547292-cloud/chatgpt-dragon-theme/main/chatgpt_shuangli_theme_v5_6_3.user.js
// @downloadURL  https://raw.githubusercontent.com/z394547292-cloud/chatgpt-dragon-theme/main/chatgpt_shuangli_theme_v5_6_3.user.js
// ==/UserScript==

(function () {
  'use strict';

  const STYLE_ID = 'sl52-style';
  const FX_ID = 'sl42-fx';
  const PANEL_ID = 'sl42-panel';
  const TOGGLE_ID = 'sl42-toggle';
  const SETTINGS_ID = 'sl42-settings';
  const BACKDROP_ID = 'sl42-backdrop';
  const TOAST_ID = 'sl42-toast';
  const HERO_ID = 'sl52-hero';
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
  const INTERACT_STYLE_ID = 'sl53-interact-style';
  const HITBOX_ID = 'sl53-hitbox';
  const SPEECH_ID = 'sl53-speech';
  const CELEBRATE_ID = 'sl54-celebrate';
  const POLISH_STYLE_ID = 'sl551-polish-style';
  const DETAIL_STYLE_ID = 'sl56-detail-style';
  const LEFT_STAGE_STYLE_ID = 'sl563-left-stage-style';

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
  const KEY_INTERACTION = 'sl53_interaction';
  const KEY_PARALLAX = 'sl54_parallax';
  const KEY_CELEBRATE = 'sl54_celebrate';
  const KEY_QUIET = 'sl55_quiet';
  const KEY_IDLE_CHATTER = 'sl55_idle_chatter';

  const BUILTIN_STATE_IMAGES = {
    home: 'https://raw.githubusercontent.com/z394547292-cloud/chatgpt-dragon-theme/main/assets/shuangli-v5/home.webp',
    idle: 'https://raw.githubusercontent.com/z394547292-cloud/chatgpt-dragon-theme/main/assets/shuangli-v5/idle.webp',
    thinking: 'https://raw.githubusercontent.com/z394547292-cloud/chatgpt-dragon-theme/main/assets/shuangli-v5/thinking.webp',
    generating: 'https://raw.githubusercontent.com/z394547292-cloud/chatgpt-dragon-theme/main/assets/shuangli-v5/output-done-v2.webp',
    done: 'https://raw.githubusercontent.com/z394547292-cloud/chatgpt-dragon-theme/main/assets/shuangli-v5/output-done-v2.webp'
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
    background-image:url("https://raw.githubusercontent.com/z394547292-cloud/chatgpt-dragon-theme/main/assets/bg-dragon.png")!important;
    background-size:cover!important;
    background-position:center center!important;
    background-repeat:no-repeat!important;
    background-attachment:fixed!important;
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
    background:rgba(244,248,253,.84)!important;
    border:1px solid rgba(145,136,174,.12)!important;
    border-radius:24px 24px 10px 24px!important;
    box-shadow:
      0 8px 22px rgba(78,74,98,.06),
      inset 0 0 0 1px rgba(255,255,255,.28)!important;
    backdrop-filter:blur(16px)!important;
    -webkit-backdrop-filter:blur(16px)!important;
  }

  [data-message-author-role="assistant"] > div{
    background:rgba(250,252,255,.74)!important;
    border:1px solid rgba(145,136,174,.16)!important;
    border-radius:22px!important;
    box-shadow:
      0 10px 28px rgba(78,74,98,.08),
      inset 0 0 0 1px rgba(255,255,255,.38)!important;
    backdrop-filter:blur(16px)!important;
    -webkit-backdrop-filter:blur(16px)!important;
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
    position:fixed!important;
    right:-38px!important;
    top:50vh!important;
    bottom:auto!important;
    left:auto!important;
    z-index:2147482500!important;
    width:min(29.5vw,500px)!important;
    height:min(70vh,720px)!important;
    pointer-events:none!important;
    opacity:1!important;
    transform:translate3d(0,-50%,0)!important;
    transform-origin:center center!important;
    animation:none!important;
    mix-blend-mode:normal!important;
    filter:
      saturate(1.08)
      contrast(1.12)
      brightness(1.01)
      drop-shadow(0 10px 18px rgba(82,69,112,.20))!important;
    -webkit-mask-image:none!important;
    mask-image:none!important;
    isolation:isolate!important;
    contain:layout style paint;
  }
  #${HERO_ID} img{
    width:100%!important;
    height:100%!important;
    object-fit:contain!important;
    object-position:center center!important;
    display:block!important;
    opacity:1!important;
    mix-blend-mode:normal!important;
    image-rendering:auto!important;
    transform:none!important;
    filter:none!important;
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

  /* Sidebar groups must not acquire generated block content: it moves native rows. */

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
      saturate(1.10)
      contrast(1.14)
      brightness(1.005)
      drop-shadow(0 10px 18px rgba(82,69,112,.20))
      drop-shadow(0 0 7px rgba(201,231,248,.12))!important;
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
    transform:translateY(-50%) scale(1);
  }

  html[data-sl-task-page="0"][data-sl-scene="home"] #${HERO_ID}{
    opacity:1!important;
    transform:translateY(-50%) scale(1);
  }

  html[data-sl-task-page="0"][data-sl-scene="thinking"] #${HERO_ID}{
    opacity:1!important;
    transform:translate3d(-4px,calc(-50% - 3px),0) scale(1.008);
    filter:
      saturate(1.12)
      contrast(1.15)
      brightness(1.01)
      drop-shadow(0 0 10px rgba(190,225,246,.18))
      drop-shadow(0 10px 18px rgba(82,69,112,.20))!important;
  }

  html[data-sl-task-page="0"][data-sl-scene="generating"] #${HERO_ID}{
    opacity:1!important;
    transform:translate3d(-5px,calc(-50% - 2px),0) scale(1.01);
    filter:
      saturate(1.14)
      contrast(1.16)
      brightness(1.005)
      drop-shadow(0 0 11px rgba(177,156,221,.18))
      drop-shadow(0 10px 19px rgba(82,69,112,.21))!important;
  }

  html[data-sl-task-page="0"][data-sl-scene="done"] #${HERO_ID}{
    opacity:1!important;
    transform:translateY(-50%) scale(1);
    filter:
      saturate(1.10)
      contrast(1.14)
      brightness(1.015)
      drop-shadow(0 0 9px rgba(199,228,245,.16))
      drop-shadow(0 10px 18px rgba(82,69,112,.19))!important;
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


  /* V5.1.8 FINAL HERO POSITION LOCK
     Old float/breath animations changed transform and pushed the character downward.
     Keep state visuals, but lock the foreground portrait position here. */
  html #${HERO_ID}{
    top:50%!important;
    bottom:auto!important;
    right:1.2vw!important;
    animation:none!important;
    transform:translate3d(0,-50%,0)!important;
    transform-origin:center center!important;
  }

  html[data-sl-scene="home"] #${HERO_ID}{
    top:50%!important;
    bottom:auto!important;
    right:1.2vw!important;
    animation:none!important;
    transform:translate3d(0,-50%,0) scale(1)!important;
  }

  html[data-sl-scene="chat"] #${HERO_ID}{
    top:50%!important;
    bottom:auto!important;
    right:1.2vw!important;
    animation:none!important;
    transform:translate3d(0,-50%,0) scale(1)!important;
  }

  html[data-sl-scene="thinking"] #${HERO_ID}{
    top:50%!important;
    bottom:auto!important;
    right:1.2vw!important;
    animation:none!important;
    transform:translate3d(-4px,calc(-50% - 3px),0) scale(1.008)!important;
  }

  html[data-sl-scene="generating"] #${HERO_ID}{
    top:50%!important;
    bottom:auto!important;
    right:1.2vw!important;
    animation:none!important;
    transform:translate3d(-5px,calc(-50% - 2px),0) scale(1.01)!important;
  }

  html[data-sl-scene="done"] #${HERO_ID}{
    top:50%!important;
    bottom:auto!important;
    right:1.2vw!important;
    animation:none!important;
    transform:translate3d(0,-50%,0) scale(1)!important;
  }

  @media(max-width:900px){
    html #${HERO_ID},
    html[data-sl-scene="home"] #${HERO_ID},
    html[data-sl-scene="chat"] #${HERO_ID},
    html[data-sl-scene="thinking"] #${HERO_ID},
    html[data-sl-scene="generating"] #${HERO_ID},
    html[data-sl-scene="done"] #${HERO_ID}{
      top:48%!important;
      bottom:auto!important;
    }
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
      (state==='generating'||state==='done')?'✦ 输出／完成':'❄ 待命';
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
    if(state==='generating'||state==='done') return KEY_STATE_DONE_IMG;
    return KEY_STATE_IDLE_IMG;
  }

  function getStateImage(state){
    const visualState=(state==='generating'||state==='done')?'done':state;
    if(get(KEY_STATE_IMAGES,'1')==='0'){
      return localStorage.getItem(KEY_IMG) || BUILTIN_STATE_IMAGES.idle;
    }
    return localStorage.getItem(stateImageKey(visualState))
      || BUILTIN_STATE_IMAGES[visualState]
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
        const oldSrc=hi.getAttribute('src')||'';
        if(oldSrc!==imgData){
          hi.classList.remove('sl56-swap');
          void hi.offsetWidth;
          hi.src=imgData;
          hi.classList.add('sl56-swap');
          setTimeout(()=>hi.classList.remove('sl56-swap'),420);
        }
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
      '<h3 style="margin:0 0 5px">❄ 霜璃四阶段图片</h3>'+
      '<p style="margin:0 0 14px;color:#777184;font-size:12px;line-height:1.6">输出与完成已合并为同一阶段；你仍然可以导入自己的图片覆盖任意阶段，清除后自动恢复内置高清图。</p>'+
      row('home','首页')+
      row('idle','待机')+
      row('thinking','思考')+
      row('done','输出／完成')+
      '<div style="display:flex;justify-content:flex-end;margin-top:14px"><button class="sl42-btn" data-close="1">完成</button></div>';

    document.body.appendChild(m);

    const labels={home:'首页',idle:'待机',thinking:'思考',done:'输出／完成'};
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
      '<span class="dot generating done"></span>'+
      '<span>STATE</span>';
    document.body.appendChild(p);
  }

  const stateDialogues={
    home:'欢迎回来。霜璃已经在这里等你了。',
    idle:'嗯，在这呢。',
    thinking:'让我把这个问题理清楚。',
    generating:'正在输出／完成这一轮。',
    done:'输出／完成阶段结束。'
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




  function addPolishStyle(){
    if(document.getElementById(POLISH_STYLE_ID))return;
    const st=document.createElement('style');
    st.id=POLISH_STYLE_ID;
    st.textContent=`
      :root{
        --sl551-surface:rgba(247,249,253,.78);
        --sl551-surface-strong:rgba(250,251,255,.90);
        --sl551-edge:rgba(132,121,164,.18);
        --sl551-shadow:0 12px 34px rgba(68,62,88,.10);
        --sl551-text:#3f3a4a;
      }

      html,body{
        background-image:url("https://raw.githubusercontent.com/z394547292-cloud/chatgpt-dragon-theme/main/assets/bg-dragon.png")!important;
        background-size:cover!important;
        background-position:center center!important;
        background-repeat:no-repeat!important;
        background-attachment:fixed!important;
        color:var(--sl551-text)!important;
      }

      body::before{
        opacity:calc(.46 * var(--sl-intensity))!important;
      }

      body::after{
        opacity:calc(.52 * var(--sl-intensity))!important;
        filter:blur(24px)!important;
      }

      main{
        background-image:
          linear-gradient(rgba(248,250,255,.72),rgba(248,250,255,.72)),
          url("https://raw.githubusercontent.com/z394547292-cloud/chatgpt-dragon-theme/main/assets/bg-dragon.png")!important;
        background-size:auto,cover!important;
        background-position:center center,center center!important;
        background-repeat:no-repeat,no-repeat!important;
        background-attachment:scroll,fixed!important;
      }

      main::after{
        content:"";
        position:fixed;
        top:0;
        right:0;
        width:min(31vw,520px);
        height:100vh;
        pointer-events:none;
        z-index:2;
        background:
          linear-gradient(90deg,
            rgba(247,249,253,0) 0%,
            rgba(240,237,248,.05) 30%,
            rgba(226,219,241,.13) 68%,
            rgba(218,210,236,.18) 100%);
        mix-blend-mode:normal;
      }

      :is(nav,aside,[data-testid="app-shell-floating-left-panel"]){
        background:
          radial-gradient(circle at 88% 8%,rgba(199,187,229,.10),transparent 30%),
          linear-gradient(180deg,rgba(244,247,252,.90),rgba(237,241,248,.84))!important;
        border-right:1px solid rgba(128,119,157,.14)!important;
        box-shadow:8px 0 28px rgba(74,68,92,.045)!important;
        backdrop-filter:blur(22px) saturate(116%)!important;
      }

      :is(nav,aside,[data-testid="app-shell-floating-left-panel"]) :is(a,button){
        background:transparent!important;
        border:1px solid transparent!important;
        border-radius:13px!important;
      }

      :is(nav,aside,[data-testid="app-shell-floating-left-panel"]) :is(a,button):hover{
        background:linear-gradient(90deg,rgba(222,230,242,.62),rgba(232,226,244,.54))!important;
        border-color:rgba(145,133,175,.10)!important;
        box-shadow:inset 2px 0 0 rgba(164,146,204,.38)!important;
      }

      :is(nav,aside,[data-testid="app-shell-floating-left-panel"]) :is(a,button)[aria-current="page"],
      .sl51-task-entry{
        background:linear-gradient(90deg,rgba(215,222,240,.88),rgba(226,215,245,.82))!important;
        border-color:rgba(150,132,188,.22)!important;
        box-shadow:
          inset 3px 0 0 rgba(141,118,192,.72),
          0 6px 18px rgba(75,66,103,.08)!important;
      }

      /* Chat / Work switcher: safe visual fix without changing layout */
      .sl56-mode-tabs,
      .sl56-mode-wrap{
        background:transparent!important;
        background-image:none!important;
        border:none!important;
        box-shadow:none!important;
        outline:none!important;
        filter:none!important;
        backdrop-filter:none!important;
        -webkit-backdrop-filter:none!important;
      }

      .sl56-mode-tabs::before,
      .sl56-mode-tabs::after,
      .sl56-mode-wrap::before,
      .sl56-mode-wrap::after{
        content:none!important;
        display:none!important;
        background:none!important;
        border:none!important;
        box-shadow:none!important;
      }

      .sl56-mode-tab{
        white-space:nowrap!important;
        min-width:112px!important;
        width:auto!important;
        max-width:none!important;
        margin:0!important;
        padding-left:22px!important;
        padding-right:22px!important;
        border-radius:14px!important;
        background:rgba(250,251,255,.92)!important;
        background-image:none!important;
        border:1px solid rgba(135,124,165,.12)!important;
        box-shadow:none!important;
        overflow:visible!important;
      }

      header{
        background:rgba(247,249,253,.72)!important;
        border-bottom:1px solid rgba(129,119,158,.10)!important;
        backdrop-filter:blur(18px) saturate(118%)!important;
      }

      header button,
      header [role="button"]{
        background:rgba(250,251,255,.82)!important;
        border:1px solid rgba(135,124,165,.13)!important;
        border-radius:12px!important;
        box-shadow:0 7px 20px rgba(70,64,90,.07)!important;
      }

      header button:hover,
      header [role="button"]:hover{
        background:linear-gradient(145deg,rgba(246,248,253,.96),rgba(235,231,245,.90))!important;
        border-color:rgba(150,136,182,.20)!important;
      }

      /* Final chat bubble override */
      [data-message-author-role="assistant"]{
        width:fit-content!important;
        max-width:min(92%,820px)!important;
        margin-right:auto!important;
        padding:14px 18px!important;
        background:rgba(250,252,255,.66)!important;
        border:1px solid rgba(145,136,174,.18)!important;
        border-radius:22px!important;
        box-shadow:
          0 10px 28px rgba(78,74,98,.10),
          inset 0 0 0 1px rgba(255,255,255,.42)!important;
        backdrop-filter:blur(16px)!important;
        -webkit-backdrop-filter:blur(16px)!important;
      }

      [data-message-author-role="user"]{
        width:fit-content!important;
        max-width:min(86%,760px)!important;
        margin-left:auto!important;
        padding:10px 16px!important;
        background:rgba(244,248,253,.92)!important;
        border:1px solid rgba(145,136,174,.18)!important;
        border-radius:24px 24px 10px 24px!important;
        box-shadow:
          0 10px 28px rgba(78,74,98,.10),
          inset 0 0 0 1px rgba(255,255,255,.42)!important;
        backdrop-filter:blur(16px)!important;
        -webkit-backdrop-filter:blur(16px)!important;
      }

      [data-message-author-role="assistant"] > div{
        color:#403b4a!important;
      }

      /* Newer ChatGPT layouts place the visible reply in .markdown/.prose.
         Put the frost card on the text itself, not on an outer display:contents row. */
      [data-message-author-role="assistant"]:has(:is(.markdown,.prose)){
        width:auto!important;
        max-width:none!important;
        padding:0!important;
        background:transparent!important;
        border:0!important;
        box-shadow:none!important;
        backdrop-filter:none!important;
        -webkit-backdrop-filter:none!important;
      }
      [data-message-author-role="assistant"] :is(.markdown,.prose):not(:has(:is(.markdown,.prose))){
        display:flow-root!important;
        width:fit-content!important;
        max-width:min(100%,820px)!important;
        padding:14px 18px!important;
        background:rgba(250,252,255,.84)!important;
        border:1px solid rgba(145,136,174,.20)!important;
        border-radius:22px!important;
        box-shadow:0 10px 28px rgba(78,74,98,.10),inset 0 0 0 1px rgba(255,255,255,.42)!important;
        backdrop-filter:blur(16px)!important;
        -webkit-backdrop-filter:blur(16px)!important;
      }

      [data-message-author-role="user"] > div{
        background:transparent!important;
        border:none!important;
        box-shadow:none!important;
      }

      [data-message-author-role="assistant"] :is(p,li,span,strong,em){
        text-shadow:none!important;
      }

      :is(
        form > div:has(textarea),
        form > div:has([contenteditable="true"]),
        [data-composer-surface-variant],
        .composer-surface-chrome
      ){
        background:
          radial-gradient(circle at 88% 0%,rgba(198,182,233,.11),transparent 34%),
          linear-gradient(145deg,rgba(252,253,255,.94),rgba(243,246,251,.90))!important;
        border:1px solid rgba(137,126,169,.20)!important;
        box-shadow:
          0 14px 36px rgba(66,60,86,.11),
          inset 0 0 0 1px rgba(255,255,255,.72)!important;
        backdrop-filter:blur(22px) saturate(116%)!important;
      }

      :is(
        form > div:has(textarea),
        form > div:has([contenteditable="true"]),
        [data-composer-surface-variant],
        .composer-surface-chrome
      ):focus-within{
        border-color:rgba(157,141,198,.44)!important;
        box-shadow:
          0 16px 40px rgba(66,60,86,.12),
          0 0 0 3px rgba(193,222,243,.12)!important;
      }

      :is(
        form > div:has(textarea),
        form > div:has([contenteditable="true"]),
        [data-composer-surface-variant],
        .composer-surface-chrome
      ) button{
        background:rgba(247,249,253,.82)!important;
        border:1px solid rgba(134,124,164,.12)!important;
        box-shadow:0 5px 14px rgba(69,63,88,.06)!important;
      }

      #${EMBLEM_ID}{
        background:rgba(248,250,254,.86)!important;
        border-color:rgba(137,124,169,.18)!important;
        box-shadow:0 8px 22px rgba(70,64,90,.09)!important;
        color:#71678a!important;
        opacity:.96!important;
      }

      #${STATE_PANEL_ID}{
        background:rgba(248,250,254,.74)!important;
        border-color:rgba(137,124,169,.14)!important;
        box-shadow:0 7px 19px rgba(70,64,90,.065)!important;
        color:#81778f!important;
        opacity:.92!important;
      }

      #${STATE_PANEL_ID} .dot{
        opacity:.56!important;
        box-shadow:0 0 0 1px rgba(125,115,153,.08)!important;
      }

      #${STATE_PANEL_ID} .dot.active{
        opacity:1!important;
        box-shadow:
          0 0 0 1px rgba(132,115,173,.18),
          0 0 10px rgba(193,222,242,.32)!important;
      }

      #${SPEECH_ID}{
        background:rgba(248,250,254,.95)!important;
        border-color:rgba(137,124,169,.18)!important;
        box-shadow:
          0 12px 30px rgba(69,63,90,.13),
          0 0 18px rgba(196,225,244,.08)!important;
      }

      :is([role="menu"],[role="dialog"],[data-radix-popper-content-wrapper] > div){
        background:rgba(247,249,253,.95)!important;
        border-color:rgba(137,125,168,.16)!important;
        box-shadow:0 20px 58px rgba(66,60,88,.14)!important;
      }

      pre{
        background:linear-gradient(145deg,#292b33,#23252c)!important;
        border-color:rgba(220,214,238,.10)!important;
      }

      @media(max-width:1100px){
        main::after{width:min(36vw,420px)}
      }

      @media(max-width:900px){
        main::after{width:min(42vw,320px);opacity:.75}
      }
    `;
    (document.head||document.documentElement).appendChild(st);
  }


  function addDetailStyle(){
    if(document.getElementById(DETAIL_STYLE_ID))return;
    const st=document.createElement('style');
    st.id=DETAIL_STYLE_ID;
    st.textContent=`
      :root{
        --sl56-hover-bg:linear-gradient(145deg,rgba(245,248,253,.94),rgba(233,228,244,.88));
        --sl56-soft-border:rgba(137,124,169,.16);
        --sl56-soft-shadow:0 8px 22px rgba(69,63,90,.08);
        --sl56-scroll:0;
      }

      :where(button,a,[role="button"]){
        transition:
          background-color .16s ease,
          border-color .16s ease,
          box-shadow .16s ease,
          filter .16s ease,
          transform .16s ease!important;
      }

      :where(button,[role="button"]):hover{
        filter:brightness(1.018) saturate(1.02)!important;
      }

      :where(button,[role="button"]):active{
        transform:translateY(0) scale(.985)!important;
      }

      pre{
        position:relative!important;
        overflow:auto!important;
        border-radius:16px!important;
        box-shadow:0 12px 30px rgba(35,33,45,.14)!important;
      }

      pre code{
        font-feature-settings:"liga" 0;
        line-height:1.62!important;
      }

      table{
        border-collapse:separate!important;
        border-spacing:0!important;
        overflow:hidden!important;
        border:1px solid rgba(137,125,168,.15)!important;
        border-radius:14px!important;
        background:rgba(249,250,253,.66)!important;
        box-shadow:0 8px 22px rgba(69,63,90,.055)!important;
      }

      table th{
        background:linear-gradient(180deg,rgba(232,231,244,.82),rgba(239,243,249,.72))!important;
        color:#4b4557!important;
        font-weight:700!important;
      }

      table :is(th,td){
        border-color:rgba(136,124,166,.11)!important;
      }

      table tr:hover td{
        background:rgba(227,232,243,.34)!important;
      }

      blockquote{
        margin-left:0!important;
        padding:12px 16px!important;
        border-left:3px solid rgba(153,135,195,.58)!important;
        border-radius:0 12px 12px 0!important;
        background:linear-gradient(90deg,rgba(228,225,241,.48),rgba(241,245,250,.22))!important;
        color:#514b5d!important;
      }

      hr{
        border:0!important;
        height:1px!important;
        background:linear-gradient(90deg,transparent,rgba(136,124,166,.22),transparent)!important;
      }

      kbd{
        border:1px solid rgba(126,116,153,.20)!important;
        border-bottom-width:2px!important;
        border-radius:7px!important;
        background:rgba(245,247,251,.90)!important;
        color:#574f64!important;
        box-shadow:0 2px 6px rgba(70,64,89,.06)!important;
      }

      #${SETTINGS_ID}{
        background:
          radial-gradient(circle at 88% 8%,rgba(204,188,235,.18),transparent 28%),
          linear-gradient(160deg,rgba(250,251,255,.97),rgba(238,242,249,.95))!important;
        border:1px solid rgba(137,124,170,.20)!important;
        box-shadow:
          0 30px 90px rgba(57,51,77,.24),
          inset 0 0 0 1px rgba(255,255,255,.68)!important;
      }

      #${SETTINGS_ID} h3{
        color:#4f475d!important;
        letter-spacing:.01em;
      }

      #${SETTINGS_ID} p{
        color:#766e82!important;
      }

      #${SETTINGS_ID} .row{
        border-top-color:rgba(133,122,162,.10)!important;
        transition:background .16s ease,padding .16s ease!important;
      }

      #${SETTINGS_ID} .row:hover{
        margin-inline:-8px;
        padding-inline:8px;
        border-radius:11px;
        background:rgba(229,232,242,.34)!important;
      }

      #${SETTINGS_ID} select,
      #${SETTINGS_ID} input[type="range"]{
        accent-color:#9c89c8!important;
      }

      #${SETTINGS_ID} select{
        background:rgba(250,251,254,.86)!important;
        border:1px solid rgba(135,123,166,.16)!important;
        box-shadow:0 4px 12px rgba(70,64,89,.045)!important;
      }

      #${SETTINGS_ID} .sl42-btn{
        background:rgba(249,250,254,.88)!important;
        border-color:rgba(136,124,166,.16)!important;
      }

      #${SETTINGS_ID} .sl42-btn:hover{
        background:var(--sl56-hover-bg)!important;
        box-shadow:var(--sl56-soft-shadow)!important;
      }

      #${HERO_ID} img{
        will-change:transform,opacity,filter;
      }

      #${HERO_ID} img.sl56-swap{
        animation:sl56HeroSwap .34s cubic-bezier(.2,.72,.2,1) both!important;
      }

      @keyframes sl56HeroSwap{
        0%{opacity:.82;filter:brightness(1.045) saturate(.98)}
        45%{opacity:.96}
        100%{opacity:1;filter:none}
      }

      #${STATE_PANEL_ID} .dot,
      #${EMBLEM_ID},
      #${STATE_PANEL_ID}{
        transition:
          opacity .22s ease,
          filter .22s ease,
          box-shadow .22s ease,
          background .22s ease!important;
      }

      html.sl56-scrolling #${EMBLEM_ID},
      html.sl56-scrolling #${STATE_PANEL_ID}{
        filter:brightness(1.035) saturate(1.03)!important;
      }

      html.sl56-scrolling body::after{
        opacity:calc(.44 * var(--sl-intensity))!important;
      }

      html.sl56-scrolling main::after{
        opacity:.86!important;
      }

      ::-webkit-scrollbar-thumb:hover{
        background:rgba(124,115,151,.40)!important;
      }

      @media(prefers-reduced-motion:reduce){
        #${HERO_ID} img.sl56-swap{
          animation:none!important;
        }
        :where(button,a,[role="button"]){
          transition:none!important;
        }
      }
    `;
    (document.head||document.documentElement).appendChild(st);
  }

  let sl56ScrollTimer=null;
  function bindV56ScrollPolish(){
    if(window.__SHUANGLI_V56_SCROLL__)return;
    window.__SHUANGLI_V56_SCROLL__=true;
    window.addEventListener('scroll',()=>{
      const root=document.documentElement;
      root.classList.add('sl56-scrolling');
      const max=Math.max(1,document.documentElement.scrollHeight-innerHeight);
      root.style.setProperty('--sl56-scroll',Math.min(1,scrollY/max).toFixed(3));
      clearTimeout(sl56ScrollTimer);
      sl56ScrollTimer=setTimeout(()=>root.classList.remove('sl56-scrolling'),180);
    },{passive:true});
  }

  function addInteractionStyle(){
    if(document.getElementById(INTERACT_STYLE_ID)) return;
    const st=document.createElement('style');
    st.id=INTERACT_STYLE_ID;
    st.textContent=`
      #${HITBOX_ID}{
        position:fixed;
        right:-10px;
        top:50vh;
        width:min(18vw,280px);
        height:min(58vh,560px);
        transform:translateY(-50%);
        z-index:2147482600;
        background:transparent;
        pointer-events:auto;
        cursor:pointer;
      }

      #${SPEECH_ID}{
        position:fixed;
        right:230px;
        top:31vh;
        z-index:2147482700;
        max-width:250px;
        padding:10px 13px;
        border-radius:16px 16px 4px 16px;
        background:rgba(250,251,255,.94);
        border:1px solid rgba(144,130,178,.18);
        box-shadow:0 12px 34px rgba(69,61,91,.15),0 0 22px rgba(198,228,246,.10);
        backdrop-filter:blur(18px);
        color:#5f586d;
        font:600 12px/1.55 -apple-system,BlinkMacSystemFont,"Segoe UI","Microsoft YaHei",sans-serif;
        opacity:0;
        transform:translate3d(8px,5px,0) scale(.97);
        transition:opacity .2s ease,transform .2s ease;
        pointer-events:none;
      }
      #${SPEECH_ID}.show{
        opacity:1;
        transform:translate3d(0,0,0) scale(1);
      }
      #${SPEECH_ID}::after{
        content:"";
        position:absolute;
        right:-7px;
        bottom:11px;
        width:13px;height:13px;
        background:rgba(250,251,255,.94);
        border-right:1px solid rgba(144,130,178,.14);
        border-bottom:1px solid rgba(144,130,178,.14);
        transform:rotate(-45deg);
      }

      html.sl53-hover #${HERO_ID}{
        filter:
          saturate(1.10)
          contrast(1.13)
          brightness(1.025)
          drop-shadow(0 11px 19px rgba(82,69,112,.21))
          drop-shadow(0 0 12px rgba(199,229,247,.16))!important;
      }

      html.sl53-click #${HERO_ID}{
        transform:translate3d(-4px,-50%,0) scale(1.008)!important;
      }

      #${HERO_ID} img{
        transform:translate3d(var(--sl54-px,0px),var(--sl54-py,0px),0)!important;
        transition:transform .18s ease-out!important;
      }

      #${CELEBRATE_ID}{
        position:fixed;
        right:20px;
        top:50vh;
        width:min(32vw,540px);
        height:min(76vh,780px);
        transform:translateY(-50%);
        pointer-events:none;
        z-index:2147482550;
        opacity:0;
      }
      #${CELEBRATE_ID}.show{opacity:1}
      #${CELEBRATE_ID} i{
        position:absolute;
        left:50%;
        top:44%;
        width:6px;
        height:6px;
        border-radius:50%;
        background:rgba(255,255,255,.96);
        box-shadow:0 0 13px rgba(199,231,249,.95);
        animation:sl54Celebrate 1.35s ease-out forwards;
      }
      @keyframes sl54Celebrate{
        from{transform:translate3d(0,0,0) scale(.6);opacity:0}
        18%{opacity:.92}
        to{transform:translate3d(var(--cx),var(--cy),0) scale(1.08);opacity:0}
      }

      html.sl55-quiet #${SPEECH_ID},
      html.sl55-quiet #${CELEBRATE_ID},
      html.sl55-quiet #${FX_ID},
      html.sl55-quiet #${STATE_FX_ID},
      html.sl55-quiet #${BURST_ID},
      html.sl55-quiet #${REACTIVE_FX_ID},
      html.sl55-quiet #${DEPTH_ID},
      html.sl55-quiet #${TRANSITION_ID}{
        display:none!important;
      }

      html[data-sl-state="thinking"] #${STATE_FX_ID} .thinking-aura{
        animation-duration:4.6s!important;
        opacity:.72;
      }
      html[data-sl-state="generating"] #${STATE_FX_ID} .dragon-flow{
        animation-duration:3.1s!important;
        opacity:.82;
      }

      @media(max-width:1100px){
        #${HITBOX_ID}{width:min(24vw,230px)}
        #${SPEECH_ID}{right:175px;top:28vh;max-width:210px}
      }

      @media(max-width:900px){
        #${HITBOX_ID}{
          right:-4px;
          width:min(34vw,190px);
          height:min(50vh,430px);
        }
        #${SPEECH_ID}{
          right:125px;
          top:25vh;
          max-width:185px;
          font-size:11px;
        }
      }
    `;
    (document.head||document.documentElement).appendChild(st);
  }

  /* V5.6.3 left-side character stage.
     This stylesheet is mounted after the older theme layers so it becomes
     the single authoritative position rule without disturbing chat width. */
  function addLeftStageStyle(){
    if(document.getElementById(LEFT_STAGE_STYLE_ID))return;
    const st=document.createElement('style');
    st.id=LEFT_STAGE_STYLE_ID;
    st.textContent=`
      :root{--sl563-left-rail:260px}

      html{
        background:#edf2fa!important;
        background-image:none!important;
      }
      body{
        background:transparent!important;
        background-image:none!important;
      }
      body::before{
        content:""!important;
        position:fixed!important;
        inset:0!important;
        z-index:-2!important;
        pointer-events:none!important;
        background-image:url("https://raw.githubusercontent.com/z394547292-cloud/chatgpt-dragon-theme/main/assets/bg-dragon.png")!important;
        background-size:cover!important;
        background-position:center center!important;
        background-repeat:no-repeat!important;
        opacity:1!important;
        filter:none!important;
        animation:none!important;
        transform:scaleX(-1)!important;
        transform-origin:center center!important;
      }
      main{
        background:
          linear-gradient(rgba(248,250,255,.72),rgba(248,250,255,.72))!important;
      }

      html body #${HERO_ID},
      html[data-sl-scene] body #${HERO_ID},
      html[data-sl-state] body #${HERO_ID},
      html[data-sl-task-page] body #${HERO_ID}{
        position:fixed!important;
        left:calc(var(--sl563-left-rail) + 8px)!important;
        right:auto!important;
        top:52vh!important;
        bottom:auto!important;
        width:min(23vw,430px)!important;
        height:min(76vh,760px)!important;
        margin:0!important;
        transform:translate3d(0,-50%,0)!important;
        transform-origin:center center!important;
      }
      html.sl53-click body #${HERO_ID}{
        transform:translate3d(4px,-50%,0) scale(1.008)!important;
      }

      #${HITBOX_ID}{
        left:calc(var(--sl563-left-rail) + 8px)!important;
        right:auto!important;
        top:52vh!important;
        width:min(23vw,430px)!important;
        height:min(70vh,690px)!important;
      }
      #${SPEECH_ID}{
        left:calc(var(--sl563-left-rail) + min(20vw,350px))!important;
        right:auto!important;
        top:25vh!important;
        border-radius:16px 16px 16px 4px!important;
      }
      #${SPEECH_ID}::after{
        left:-7px!important;
        right:auto!important;
        border-right:0!important;
        border-left:1px solid rgba(144,130,178,.14)!important;
        transform:rotate(45deg)!important;
      }
      #${CELEBRATE_ID}{
        left:calc(var(--sl563-left-rail) + 2px)!important;
        right:auto!important;
        top:52vh!important;
        width:min(25vw,460px)!important;
      }
      #${STATE_FX_ID} .thinking-aura{
        left:calc(var(--sl563-left-rail) - 8vw)!important;
        right:auto!important;
      }

      /* Keep the settings dialog visually dominant. */
      html.sl563-settings-open body #${HERO_ID}{
        opacity:.08!important;
        filter:saturate(.45) brightness(.92) blur(.45px)!important;
        transition:opacity .18s ease,filter .18s ease!important;
      }
      html.sl563-settings-open #${HITBOX_ID}{pointer-events:none!important}
      html.sl563-settings-open #${SPEECH_ID},
      html.sl563-settings-open #${CELEBRATE_ID}{display:none!important}

      /* Native ChatGPT modal/dialog open: remove the character completely. */
      html.sl571-system-modal-open body #${HERO_ID}{
        opacity:0!important;
        visibility:hidden!important;
        pointer-events:none!important;
        transition:opacity .12s ease!important;
      }
      html.sl571-system-modal-open #${HITBOX_ID},
      html.sl571-system-modal-open #${SPEECH_ID},
      html.sl571-system-modal-open #${CELEBRATE_ID}{
        display:none!important;
        pointer-events:none!important;
      }

      @media(max-width:1200px){
        html body #${HERO_ID},
        html[data-sl-scene] body #${HERO_ID},
        html[data-sl-state] body #${HERO_ID},
        html[data-sl-task-page] body #${HERO_ID}{
          left:calc(var(--sl563-left-rail) + 2px)!important;
          width:min(27vw,360px)!important;
        }
        #${HITBOX_ID}{
          left:calc(var(--sl563-left-rail) + 2px)!important;
          width:min(27vw,360px)!important;
        }
        #${SPEECH_ID}{
          left:calc(var(--sl563-left-rail) + min(22vw,290px))!important;
          max-width:190px!important;
        }
      }
      @media(max-width:900px){
        html body #${HERO_ID},
        html[data-sl-scene] body #${HERO_ID},
        html[data-sl-state] body #${HERO_ID},
        html[data-sl-task-page] body #${HERO_ID}{
          left:calc(var(--sl563-left-rail) + 0px)!important;
          width:min(38vw,300px)!important;
          height:min(64vh,560px)!important;
        }
        #${HITBOX_ID}{
          left:var(--sl563-left-rail)!important;
          width:min(38vw,300px)!important;
        }
        #${SPEECH_ID}{display:none!important}
      }
    `;
    (document.head||document.documentElement).appendChild(st);
  }

  function syncLeftStageLayout(){
    let rail=0;
    document.querySelectorAll('nav,aside,[data-testid="app-shell-floating-left-panel"]').forEach(el=>{
      const r=el.getBoundingClientRect();
      if(r.height>innerHeight*.45 && r.left<=8 && r.right>150 && r.right<460){
        rail=Math.max(rail,Math.round(r.right));
      }
    });
    document.documentElement.style.setProperty('--sl563-left-rail',(rail||260)+'px');
    if(!window.__SHUANGLI_LEFT_STAGE_RESIZE__){
      window.__SHUANGLI_LEFT_STAGE_RESIZE__=true;
      window.addEventListener('resize',syncLeftStageLayout,{passive:true});
    }
  }

  let sl571ModalFrame=0;
  function isThemeNode(el){
    return !el || el===document.documentElement || el===document.body ||
      (el.id&&el.id.startsWith('sl')) || !!el.closest('[id^="sl"]');
  }

  function isVisibleModalBox(el){
    if(isThemeNode(el))return false;
    const cs=getComputedStyle(el);
    if(cs.display==='none'||cs.visibility==='hidden'||Number(cs.opacity||1)<=0)return false;
    const r=el.getBoundingClientRect();
    if(r.width<120||r.height<80)return false;
    return true;
  }

  function hasLargeSystemOverlay(){
    const points=[
      [innerWidth*.5,innerHeight*.5],
      [innerWidth*.35,innerHeight*.35],
      [innerWidth*.65,innerHeight*.35],
      [innerWidth*.35,innerHeight*.65],
      [innerWidth*.65,innerHeight*.65]
    ];
    const candidates=new Set();
    points.forEach(([x,y])=>{
      document.elementsFromPoint(x,y).forEach(node=>{
        let el=node;
        for(let depth=0;el&&depth<8;depth++,el=el.parentElement)candidates.add(el);
      });
    });
    return [...candidates].some(el=>{
      if(!isVisibleModalBox(el))return false;
      const cs=getComputedStyle(el);
      if(cs.position!=='fixed')return false;
      const r=el.getBoundingClientRect();
      const large=r.width>=innerWidth*.52&&r.height>=innerHeight*.52;
      const centered=r.width>=Math.min(420,innerWidth*.34)&&
        r.height>=Math.min(300,innerHeight*.34)&&
        Math.abs((r.left+r.width/2)-innerWidth/2)<innerWidth*.22&&
        Math.abs((r.top+r.height/2)-innerHeight/2)<innerHeight*.24;
      return large||centered;
    });
  }

  function syncSystemModalState(){
    sl571ModalFrame=0;
    const selectors='[aria-modal="true"],[role="dialog"],[data-testid*="modal" i],[data-testid*="dialog" i]';
    const semanticOpen=[...document.querySelectorAll(selectors)].some(el=>{
      if(el.id===SETTINGS_ID || el.id==='sl48-image-manager')return false;
      return isVisibleModalBox(el);
    });
    const open=semanticOpen||hasLargeSystemOverlay();
    document.documentElement.classList.toggle('sl571-system-modal-open',open);
  }

  function scheduleSystemModalCheck(){
    if(sl571ModalFrame)return;
    sl571ModalFrame=requestAnimationFrame(syncSystemModalState);
  }

  function bindSystemModalWatcher(){
    if(window.__SHUANGLI_SYSTEM_MODAL_WATCHER__)return;
    window.__SHUANGLI_SYSTEM_MODAL_WATCHER__=true;
    const observer=new MutationObserver(scheduleSystemModalCheck);
    observer.observe(document.documentElement,{
      childList:true,
      subtree:true,
      attributes:true,
      attributeFilter:['aria-modal','aria-hidden','data-state','open','style','class']
    });
    window.addEventListener('focus',scheduleSystemModalCheck,{passive:true});
    document.addEventListener('pointerup',()=>{
      scheduleSystemModalCheck();
      setTimeout(scheduleSystemModalCheck,80);
      setTimeout(scheduleSystemModalCheck,260);
      setTimeout(scheduleSystemModalCheck,600);
    },{passive:true,capture:true});
    scheduleSystemModalCheck();
  }

  const sl54ClickLines={
    home:['欢迎回来。','今天也交给我吧。','我已经准备好了。'],
    idle:['嗯？我在。','有事叫我就好。','还在陪着你呢。','别戳太用力呀。'],
    thinking:['先让我想清楚。','这里得认真一点。','嗯……再给我一点点时间。'],
    generating:['正在输出／完成。','马上就好。','答案正在成形。'],
    done:['输出／完成啦。','这一轮结束了。','好了，可以看看结果了。']
  };

  const sl53StateLines={
    home:'欢迎回来。',
    idle:'我在这边待命。',
    thinking:'让我想一下。',
    generating:'正在输出／完成。',
    done:'输出／完成啦。'
  };

  let sl53SpeechTimer=null;
  let sl53LastStateHint='';

  function addHeroSpeech(){
    if(document.getElementById(SPEECH_ID)||!document.body)return;
    const el=document.createElement('div');
    el.id=SPEECH_ID;
    document.body.appendChild(el);
  }

  function positionHeroSpeech(){
    const el=document.getElementById(SPEECH_ID);
    if(!el)return;

    const vw=window.innerWidth;
    const vh=window.innerHeight;
    let right=vw<=900?125:vw<=1100?175:230;
    let top=Math.round(vh*.31);

    const composer=document.querySelector('form > div:has(textarea), form > div:has([contenteditable="true"]), [data-composer-surface-variant], .composer-surface-chrome');
    if(composer){
      const cr=composer.getBoundingClientRect();
      const estimatedBottom=top+105;
      if(estimatedBottom>cr.top-18){
        top=Math.max(88,Math.round(cr.top-125));
      }
    }

    const main=document.querySelector('main');
    if(main){
      const mr=main.getBoundingClientRect();
      if(vw<1250 && mr.right>vw-right-255){
        right=Math.max(110,Math.round(vw-mr.right+18));
      }
    }

    el.style.right=right+'px';
    el.style.top=top+'px';
  }

  function showHeroSpeech(text,duration=2200){
    if(get(KEY_INTERACTION,'1')==='0' || get(KEY_QUIET,'0')==='1')return;
    addHeroSpeech();
    const el=document.getElementById(SPEECH_ID);
    if(!el)return;
    el.textContent=text;
    positionHeroSpeech();
    el.classList.add('show');
    clearTimeout(sl53SpeechTimer);
    sl53SpeechTimer=setTimeout(()=>el.classList.remove('show'),duration);
  }

  function effectiveInteractionState(){
    const scene=document.documentElement.getAttribute('data-sl-scene')||'chat';
    if(scene==='home')return 'home';
    return document.documentElement.getAttribute('data-sl-state')||'idle';
  }

  function addHeroHitbox(){
    if(document.getElementById(HITBOX_ID)||!document.body)return;
    const hit=document.createElement('div');
    hit.id=HITBOX_ID;
    hit.title='霜璃 · 单击互动 / 双击设置';
    document.body.appendChild(hit);

    hit.addEventListener('mouseenter',()=>{
      if(get(KEY_INTERACTION,'1')==='0' || get(KEY_QUIET,'0')==='1')return;
      document.documentElement.classList.add('sl53-hover');
    });
    hit.addEventListener('mouseleave',()=>{
      document.documentElement.classList.remove('sl53-hover');
      const hero=document.getElementById(HERO_ID);
      if(hero){
        hero.style.setProperty('--sl54-px','0px');
        hero.style.setProperty('--sl54-py','0px');
      }
    });
    hit.addEventListener('pointermove',e=>{
      if(get(KEY_INTERACTION,'1')==='0' || get(KEY_PARALLAX,'1')==='0' || get(KEY_QUIET,'0')==='1')return;
      const r=hit.getBoundingClientRect();
      const nx=((e.clientX-r.left)/Math.max(1,r.width)-.5);
      const ny=((e.clientY-r.top)/Math.max(1,r.height)-.5);
      const scene=document.documentElement.getAttribute('data-sl-scene')||'chat';
      const amp=scene==='home'?1:0.55;
      const hero=document.getElementById(HERO_ID);
      if(hero){
        hero.style.setProperty('--sl54-px',(nx*5*amp).toFixed(2)+'px');
        hero.style.setProperty('--sl54-py',(ny*4*amp).toFixed(2)+'px');
      }
    });
    hit.addEventListener('click',()=>{
      if(get(KEY_INTERACTION,'1')==='0' || get(KEY_QUIET,'0')==='1')return;
      const st=effectiveInteractionState();
      const pool=sl54ClickLines[st]||sl54ClickLines.idle;
      const line=pool[Math.floor(Math.random()*pool.length)];
      showHeroSpeech(line,2400);
      document.documentElement.classList.add('sl53-click');
      setTimeout(()=>document.documentElement.classList.remove('sl53-click'),220);
    });
    hit.addEventListener('dblclick',e=>{
      if(get(KEY_INTERACTION,'1')==='0')return;
      e.preventDefault();
      openSettings();
      showHeroSpeech('设置在这里。',1400);
    });
  }

  function addCelebrateLayer(){
    if(document.getElementById(CELEBRATE_ID)||!document.body)return;
    const el=document.createElement('div');
    el.id=CELEBRATE_ID;
    document.body.appendChild(el);
  }

  function celebrateDone(){
    if(get(KEY_CELEBRATE,'1')==='0' || get(KEY_FX,'1')==='0' || get(KEY_QUIET,'0')==='1')return;
    addCelebrateLayer();
    const el=document.getElementById(CELEBRATE_ID);
    if(!el)return;
    el.innerHTML='';
    el.classList.add('show');
    for(let i=0;i<18;i++){
      const p=document.createElement('i');
      const a=Math.PI*2*i/18+(Math.random()*.25);
      const d=65+Math.random()*120;
      p.style.setProperty('--cx',(Math.cos(a)*d).toFixed(0)+'px');
      p.style.setProperty('--cy',(Math.sin(a)*d).toFixed(0)+'px');
      p.style.animationDelay=(Math.random()*.12).toFixed(2)+'s';
      el.appendChild(p);
    }
    setTimeout(()=>{el.classList.remove('show');el.innerHTML='';},1700);
  }

  function syncInteractionStateHint(){
    if(get(KEY_INTERACTION,'1')==='0' || get(KEY_QUIET,'0')==='1')return;
    const state=effectiveInteractionState();
    if(state===sl53LastStateHint)return;
    sl53LastStateHint=state;
    const line=sl53StateLines[state];
    if(line) showHeroSpeech(line,state==='done'?2600:1900);
    if(state==='done') celebrateDone();
  }

  const sl55IdleLines=[
    '我在，不用急。',
    '累了就稍微歇一会儿。',
    '今天的进度也在往前走。',
    '需要我的时候点一下就好。',
    '这里很安静，正适合慢慢整理。'
  ];
  let sl55LastActivity=Date.now();
  let sl55NextChatter=Date.now()+120000;

  function noteSl55Activity(){
    sl55LastActivity=Date.now();
    sl55NextChatter=Date.now()+90000+Math.floor(Math.random()*90000);
  }

  function applyQuietMode(){
    const quiet=get(KEY_QUIET,'0')==='1';
    document.documentElement.classList.toggle('sl55-quiet',quiet);
    if(quiet){
      document.documentElement.classList.remove('sl53-hover','sl53-click');
      const sp=document.getElementById(SPEECH_ID);
      if(sp)sp.classList.remove('show');
      const hero=document.getElementById(HERO_ID);
      if(hero){
        hero.style.setProperty('--sl54-px','0px');
        hero.style.setProperty('--sl54-py','0px');
      }
    }
  }

  function maybeIdleChatter(){
    if(get(KEY_QUIET,'0')==='1' || get(KEY_INTERACTION,'1')==='0' || get(KEY_IDLE_CHATTER,'1')==='0')return;
    if(document.hidden)return;
    if(effectiveInteractionState()!=='idle')return;
    const now=Date.now();
    if(now<sl55NextChatter || now-sl55LastActivity<90000)return;
    const line=sl55IdleLines[Math.floor(Math.random()*sl55IdleLines.length)];
    showHeroSpeech(line,2800);
    sl55NextChatter=now+150000+Math.floor(Math.random()*150000);
  }

  function bindSl55Activity(){
    if(window.__SHUANGLI_V55_ACTIVITY__)return;
    window.__SHUANGLI_V55_ACTIVITY__=true;
    ['pointerdown','keydown','wheel','touchstart'].forEach(type=>{
      window.addEventListener(type,noteSl55Activity,{passive:true});
    });
    window.addEventListener('resize',positionHeroSpeech,{passive:true});
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

      if(/^(项目|Projects?)$/i.test(t)){
        el.classList.add('sl56-project-entry');
      }else{
        el.classList.remove('sl56-project-entry');
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

  function markTopModeTabs(){
    document.querySelectorAll('.sl56-mode-tab').forEach(el=>el.classList.remove('sl56-mode-tab'));
    document.querySelectorAll('.sl56-mode-tabs').forEach(el=>el.classList.remove('sl56-mode-tabs'));
    document.querySelectorAll('.sl56-mode-wrap').forEach(el=>el.classList.remove('sl56-mode-wrap'));

    const buttons=[...document.querySelectorAll('button,[role="button"],[role="tab"]')];
    const chat=buttons.find(el=>(el.textContent||'').trim()==='聊天');
    const work=buttons.find(el=>(el.textContent||'').trim()==='工作');
    if(!chat||!work)return;

    // A sidebar project can also contain a “工作” badge. Only decorate a
    // genuine shared header switcher; never stretch individual sidebar rows.
    const header=chat.closest('header');
    if(!header || !header.contains(work) || chat.closest('nav,aside') || work.closest('nav,aside'))return;

    chat.classList.add('sl56-mode-tab');
    work.classList.add('sl56-mode-tab');

    let common=chat.parentElement;
    while(common && !common.contains(work)){
      common=common.parentElement;
    }
    if(!common)return;

    common.classList.add('sl56-mode-tabs');

    [chat.parentElement, work.parentElement].forEach(el=>{
      if(el && el!==common) el.classList.add('sl56-mode-wrap');
    });
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
      <p>V5.6.1：人物略微缩小并右移，优先减少翅膀对正文的遮挡；聊天区布局保持不变。</p>

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
        <span>四阶段角色图</span>
        <select data-k="stateimages">
          <option value="1">开启</option>
          <option value="0">关闭</option>
        </select>
      </div>

      <div class="row">
        <span>角色互动</span>
        <select data-k="interaction">
          <option value="1">开启</option>
          <option value="0">关闭</option>
        </select>
      </div>

      <div class="row">
        <span>轻量鼠标跟随</span>
        <select data-k="parallax">
          <option value="1">开启</option>
          <option value="0">关闭</option>
        </select>
      </div>

      <div class="row">
        <span>完成庆祝</span>
        <select data-k="celebrate">
          <option value="1">开启</option>
          <option value="0">关闭</option>
        </select>
      </div>

      <div class="row">
        <span>低频待机台词</span>
        <select data-k="idlechatter">
          <option value="1">开启</option>
          <option value="0">关闭</option>
        </select>
      </div>

      <div class="row">
        <span>安静模式</span>
        <select data-k="quiet">
          <option value="0">关闭</option>
          <option value="1">开启</option>
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
  
  /* V5.2 hard viewport-center lock: this is intentionally the LAST hero rule. */
  html body #${HERO_ID},
  html[data-sl-scene] body #${HERO_ID},
  html[data-sl-state] body #${HERO_ID},
  html[data-sl-task-page] body #${HERO_ID}{
    position:fixed!important;
    top:50vh!important;
    bottom:auto!important;
    right:-38px!important;
    left:auto!important;
    width:min(29.5vw,500px)!important;
    height:min(70vh,720px)!important;
    margin:0!important;
    padding:0!important;
    opacity:1!important;
    visibility:visible!important;
    display:block!important;
    animation:none!important;
    transform:translate3d(0,-50%,0)!important;
    transform-origin:center center!important;
    z-index:2147482500!important;
  }

  html body #${HERO_ID} img{
    width:100%!important;
    height:100%!important;
    object-fit:contain!important;
    object-position:center center!important;
    transform:none!important;
    opacity:1!important;
  }

  @media(max-width:900px){
    html body #${HERO_ID},
    html[data-sl-scene] body #${HERO_ID},
    html[data-sl-state] body #${HERO_ID},
    html[data-sl-task-page] body #${HERO_ID}{
      top:50vh!important;
      right:-16px!important;
      width:min(50vw,390px)!important;
      height:min(68vh,640px)!important;
      transform:translate3d(0,-50%,0)!important;
    }
  }

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
    box.querySelector('[data-k="interaction"]').value=get(KEY_INTERACTION,'1');
    box.querySelector('[data-k="parallax"]').value=get(KEY_PARALLAX,'1');
    box.querySelector('[data-k="celebrate"]').value=get(KEY_CELEBRATE,'1');
    box.querySelector('[data-k="idlechatter"]').value=get(KEY_IDLE_CHATTER,'1');
    box.querySelector('[data-k="quiet"]').value=get(KEY_QUIET,'0');

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
    box.querySelector('[data-k="interaction"]').onchange=e=>{
      localStorage.setItem(KEY_INTERACTION,e.target.value);
      if(e.target.value==='0'){
        document.documentElement.classList.remove('sl53-hover','sl53-click');
        const sp=document.getElementById(SPEECH_ID);
        if(sp)sp.classList.remove('show');
      }else{
        showHeroSpeech('互动已开启。',1600);
      }
    };
    box.querySelector('[data-k="parallax"]').onchange=e=>{
      localStorage.setItem(KEY_PARALLAX,e.target.value);
      if(e.target.value==='0'){
        const hero=document.getElementById(HERO_ID);
        if(hero){
          hero.style.setProperty('--sl54-px','0px');
          hero.style.setProperty('--sl54-py','0px');
        }
      }
    };
    box.querySelector('[data-k="celebrate"]').onchange=e=>{
      localStorage.setItem(KEY_CELEBRATE,e.target.value);
    };
    box.querySelector('[data-k="idlechatter"]').onchange=e=>{
      localStorage.setItem(KEY_IDLE_CHATTER,e.target.value);
      noteSl55Activity();
    };
    box.querySelector('[data-k="quiet"]').onchange=e=>{
      localStorage.setItem(KEY_QUIET,e.target.value);
      applyQuietMode();
      if(e.target.value==='0') showHeroSpeech('安静模式已关闭。',1500);
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
    document.documentElement.classList.add('sl563-settings-open');
    document.getElementById(BACKDROP_ID).style.display='block';
    document.getElementById(SETTINGS_ID).style.display='block';
  }

  function closeSettings(){
    document.documentElement.classList.remove('sl563-settings-open');
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
    addInteractionStyle();
    addPolishStyle();
    addDetailStyle();
    addLeftStageStyle();
    syncLeftStageLayout();
    bindSystemModalWatcher();
    addHeroSpeech();
    addHeroHitbox();
    addCelebrateLayer();
    bindSl55Activity();
    bindV56ScrollPolish();
    applyPrefs();
    applyQuietMode();
    preloadBuiltinStateImages();
    syncHeroImage();
    syncStateImage();
    detectState();
    detectScene();
    detectTaskPage();
    markTopModeTabs();
    syncInteractionStateHint();

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
    addInteractionStyle();
    addPolishStyle();
    addDetailStyle();
    addLeftStageStyle();
    syncLeftStageLayout();
    scheduleSystemModalCheck();
    addHeroSpeech();
    addHeroHitbox();
    addCelebrateLayer();
    applyPrefs();
    applyQuietMode();
    syncHeroImage();
    syncStateImage();
    detectTaskPage();
    markTopModeTabs();
  },2500);

  setInterval(()=>{
    detectState();
    detectScene();
    detectTaskPage();
    syncInteractionStateHint();
  },700);

  setInterval(()=>{
    maybeIdleChatter();
  },15000);

  console.log('[霜璃主题] V5.7.3 loaded · stable identity and structural modal auto-hide');
})();
