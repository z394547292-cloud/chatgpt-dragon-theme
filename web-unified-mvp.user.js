// ==UserScript==
// @name         冰晶宫殿网页主题（未验证预览版）
// @namespace    https://chatgpt.com/
// @version      0.2.0
// @description  ChatGPT 与 Codex Cloud 共用的冰蓝紫网页主题。
// @match        https://chatgpt.com/*
// @match        https://www.chatgpt.com/*
// @run-at       document-start
// @grant        none
// @updateURL    https://raw.githubusercontent.com/z394547292-cloud/chatgpt-dragon-theme/main/web-unified-mvp.user.js
// @downloadURL  https://raw.githubusercontent.com/z394547292-cloud/chatgpt-dragon-theme/main/web-unified-mvp.user.js
// ==/UserScript==

(() => {
  'use strict';

  const STYLE_ID = 'ice-palace-web-style';
  const ASSISTANT_ID = 'ice-palace-web-assistant';
  const PALACE = 'https://raw.githubusercontent.com/z394547292-cloud/chatgpt-dragon-theme/main/assets/bg-dragon.png';
  const DRAGON = 'https://raw.githubusercontent.com/z394547292-cloud/chatgpt-dragon-theme/main/assets/shuangli-v5/idle.webp';

  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = `
    html {
      background: #dce8fb url("${PALACE}") center center / cover fixed no-repeat !important;
      color-scheme: light;
    }
    body, #__next, #root { background-color: transparent !important; }
    main, #main, [data-testid="app-shell"] {
      background-color: rgba(248, 250, 255, .16) !important;
    }
    #thread, #thread-bottom, #thread-bottom-container,
    [data-thread-scroll-footer], [data-thread-footer-overflow-spacer] {
      background-color: transparent !important;
    }
    nav, aside, [data-testid="app-shell-floating-left-panel"] {
      background: rgba(235, 243, 255, .78) !important;
      border-right: 1px solid rgba(126, 149, 208, .28) !important;
      box-shadow: 8px 0 32px rgba(83, 105, 160, .08) !important;
      backdrop-filter: blur(18px) saturate(120%);
      -webkit-backdrop-filter: blur(18px) saturate(120%);
    }
    header {
      background-color: rgba(243, 247, 255, .62) !important;
      border-bottom: 1px solid rgba(130, 145, 205, .18) !important;
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
    }
    #composer-background, [data-testid="composer"],
    [class*="composer-parent"], [class*="composer-container"] {
      background: rgba(248, 250, 255, .84) !important;
      border: 1px solid rgba(132, 150, 210, .30) !important;
      border-radius: 20px !important;
      box-shadow: 0 12px 34px rgba(88, 103, 160, .12) !important;
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
    }
    [data-message-author-role="user"] > div {
      border: 1px solid rgba(140, 155, 215, .22) !important;
      border-radius: 20px !important;
    }
    :is(button, a, textarea, [contenteditable="true"]):focus-visible {
      outline: 2px solid #829ce5 !important;
      outline-offset: 2px !important;
    }
    #${ASSISTANT_ID} {
      position: fixed; right: 14px; bottom: 110px; z-index: 40;
      pointer-events: none; font-family: system-ui, sans-serif;
    }
    #${ASSISTANT_ID} .ice-assistant-button {
      display: block; width: 52px; height: 52px; overflow: hidden; padding: 0;
      border: 1px solid rgba(139, 157, 220, .6); border-radius: 50%;
      background: rgba(242, 247, 255, .94);
      box-shadow: 0 4px 18px rgba(79, 98, 165, .24);
      cursor: pointer; pointer-events: auto;
    }
    #${ASSISTANT_ID} .ice-assistant-button img {
      width: 100%; height: 100%; object-fit: cover; object-position: center 10%;
      transform: scale(1.8) translateY(16%);
    }
    #${ASSISTANT_ID} .ice-assistant-figure {
      position: absolute; right: 58px; bottom: -4px;
      width: 170px; height: 280px; object-fit: contain; object-position: bottom;
      filter: drop-shadow(0 7px 14px rgba(88, 91, 150, .25));
      pointer-events: none;
    }
    #${ASSISTANT_ID}[data-open="false"] .ice-assistant-figure { display: none; }
    @media (max-width: 900px) { #${ASSISTANT_ID} { display: none; } }
  `;

  const mountStyle = () => {
    if (!document.head) return;
    if (!document.getElementById(STYLE_ID)) document.head.appendChild(style);
  };
  const mountAssistant = () => {
    if (!document.body || document.getElementById(ASSISTANT_ID)) return;
    const root = document.createElement('div');
    root.id = ASSISTANT_ID;
    root.dataset.open = 'false';
    const figure = document.createElement('img');
    figure.className = 'ice-assistant-figure';
    figure.src = DRAGON;
    figure.alt = '';
    figure.decoding = 'async';
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'ice-assistant-button';
    button.setAttribute('aria-label', '显示龙娘小助手');
    button.setAttribute('aria-expanded', 'false');
    const thumbnail = document.createElement('img');
    thumbnail.src = DRAGON;
    thumbnail.alt = '';
    thumbnail.decoding = 'async';
    button.appendChild(thumbnail);
    button.addEventListener('click', () => {
      const open = root.dataset.open !== 'true';
      root.dataset.open = String(open);
      button.setAttribute('aria-expanded', String(open));
      button.setAttribute('aria-label', open ? '隐藏龙娘小助手' : '显示龙娘小助手');
    });
    root.append(figure, button);
    document.body.appendChild(root);
  };
  const mount = () => {
    mountStyle();
    mountAssistant();
    if (document.getElementById(STYLE_ID) && document.getElementById(ASSISTANT_ID)) observer.disconnect();
  };
  const observer = new MutationObserver(mount);
  observer.observe(document, { childList: true, subtree: true });
  mount();
})();
