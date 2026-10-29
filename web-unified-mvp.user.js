// ==UserScript==
// @name         冰晶宫殿网页主题（验证版）
// @namespace    https://chatgpt.com/
// @version      0.1.0
// @description  同一份网页主题覆盖 ChatGPT 和 Codex Cloud；仅供实机验证。
// @match        https://chatgpt.com/*
// @match        https://www.chatgpt.com/*
// @run-at       document-start
// @grant        none
// @updateURL    https://raw.githubusercontent.com/z394547292-cloud/chatgpt-dragon-theme/main/web-unified-mvp.user.js
// @downloadURL  https://raw.githubusercontent.com/z394547292-cloud/chatgpt-dragon-theme/main/web-unified-mvp.user.js
// ==/UserScript==

(() => {
  'use strict';

  const id = 'ice-palace-web-mvp';
  const style = document.createElement('style');
  style.id = id;
  style.textContent = `
    html {
      background: #dbe7ff url('https://raw.githubusercontent.com/z394547292-cloud/chatgpt-dragon-theme/main/assets/bg-dragon.png') center center / cover fixed no-repeat !important;
    }
    body {
      background: transparent !important;
    }
    main, #main {
      background-color: rgba(246, 249, 255, .18) !important;
    }
  `;

  const mount = () => {
    if (document.getElementById(id) || !document.head) return false;
    document.head.appendChild(style);
    return true;
  };
  if (!mount()) {
    const observer = new MutationObserver(() => {
      if (mount()) observer.disconnect();
    });
    observer.observe(document, { childList: true, subtree: true });
  }
})();
