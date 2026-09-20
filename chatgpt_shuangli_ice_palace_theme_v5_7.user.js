// ==UserScript==
// @name         ChatGPT 霜璃 · 冰晶月宫主题 V5.7
// @namespace    https://chatgpt.com/
// @version      5.7
// @description  霜璃冰晶龙娘主题 V5.7：基于V5.6.1，替换为冰晶月宫背景场景。
// @match        https://chatgpt.com/*
// @match        https://www.chatgpt.com/*
// @run-at       document-end
// @grant        none
// @require      https://raw.githubusercontent.com/z394547292-cloud/chatgpt-dragon-theme/main/chatgpt_shuangli_theme_v5_6_1.user.js
// ==/UserScript==

(function(){
  'use strict';

  const BG = 'https://raw.githubusercontent.com/z394547292-cloud/chatgpt-dragon-theme/main/assets/bg-dragon.png';

  function applyIcePalace(){
    const style = document.createElement('style');
    style.id = 'shuangli-ice-palace-bg-v57';
    style.textContent = `
      html, body {
        background: #eef3ff !important;
      }

      body::before {
        content:"";
        position:fixed;
        inset:0;
        z-index:-10;
        pointer-events:none;
        background-image:
          linear-gradient(rgba(240,245,255,.32),rgba(240,245,255,.32)),
          url('${BG}');
        background-size:cover;
        background-position:center center;
        background-repeat:no-repeat;
        opacity:.92;
      }

      body::after {
        background:radial-gradient(circle at 50% 20%,rgba(255,255,255,.25),transparent 45%) !important;
      }

      main {
        background:transparent !important;
      }
    `;
    document.head.appendChild(style);
  }

  setTimeout(applyIcePalace,1500);
})();
