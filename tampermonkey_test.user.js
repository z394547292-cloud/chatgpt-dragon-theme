// ==UserScript==
// @name         ChatGPT Tampermonkey 测试脚本
// @namespace    https://chatgpt.com/
// @version      1.0.0
// @description  用于确认 Tampermonkey 是否能在 ChatGPT 页面运行
// @match        https://chatgpt.com/*
// @run-at       document-end
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  const id = 'tm-chatgpt-test-badge';
  if (document.getElementById(id)) return;

  const badge = document.createElement('div');
  badge.id = id;
  badge.textContent = 'Tampermonkey 已运行 ✓';
  Object.assign(badge.style, {
    position: 'fixed',
    top: '18px',
    right: '18px',
    zIndex: '2147483647',
    padding: '12px 16px',
    borderRadius: '14px',
    background: 'rgba(235,225,250,.96)',
    color: '#5e4a79',
    border: '1px solid rgba(130,100,170,.28)',
    boxShadow: '0 10px 30px rgba(70,50,100,.18)',
    fontFamily: 'Segoe UI, Microsoft YaHei, sans-serif',
    fontSize: '14px',
    fontWeight: '600'
  });
  document.body.appendChild(badge);
})();