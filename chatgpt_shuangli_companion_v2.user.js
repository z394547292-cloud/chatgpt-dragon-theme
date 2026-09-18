// ==UserScript==
// @name         ChatGPT 霜璃陪伴主题 V2
// @namespace    https://chatgpt.com/
// @version      2.0.0
// @description  稳定版：淡紫银白界面 + 可导入龙娘图片 + 可拖动陪伴卡
// @match        https://chatgpt.com/*
// @run-at       document-end
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  const PANEL_ID = 'dragon-companion-v2';
  const STYLE_ID = 'dragon-companion-style-v2';
  const TOGGLE_ID = 'dragon-companion-toggle-v2';
  const IMAGE_KEY = 'dragon_companion_image_v2';
  const HIDDEN_KEY = 'dragon_companion_hidden_v2';
  const POS_KEY = 'dragon_companion_pos_v2';

  const lines = [
    '嗯，在这呢。',
    '慢慢来，不急。',
    '今天也别把自己卷坏了。',
    '有事就叫我，别硬扛。',
    '嗯，这样就顺眼多了。'
  ];

  function injectStyle() {
    if (document.getElementById(STYLE_ID)) return;

    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = [
      'html, body {',
      '  background: radial-gradient(circle at 80% 10%, rgba(213,199,239,.30), transparent 30%),',
      '              radial-gradient(circle at 10% 90%, rgba(224,216,242,.24), transparent 32%),',
      '              linear-gradient(145deg,#fbfaff 0%,#f4f0fa 55%,#faf8fd 100%) !important;',
      '}',

      'nav, aside {',
      '  background: rgba(248,246,252,.74) !important;',
      '  backdrop-filter: blur(20px) !important;',
      '  -webkit-backdrop-filter: blur(20px) !important;',
      '  border-right: 1px solid rgba(145,123,184,.12) !important;',
      '}',

      'header {',
      '  background: rgba(250,249,253,.62) !important;',
      '  backdrop-filter: blur(18px) !important;',
      '  -webkit-backdrop-filter: blur(18px) !important;',
      '}',

      'main { background: transparent !important; }',

      '[data-message-author-role="user"] > div {',
      '  background: rgba(218,208,237,.56) !important;',
      '  border: 1px solid rgba(145,126,181,.12) !important;',
      '  border-radius: 18px 18px 7px 18px !important;',
      '}',

      'form > div:has(textarea) {',
      '  background: rgba(255,255,255,.82) !important;',
      '  border: 1px solid rgba(145,125,181,.18) !important;',
      '  border-radius: 22px !important;',
      '  box-shadow: 0 12px 40px rgba(86,68,118,.10) !important;',
      '}',

      '#' + PANEL_ID + ' {',
      '  position: fixed;',
      '  right: 18px;',
      '  bottom: 18px;',
      '  width: 290px;',
      '  height: 460px;',
      '  z-index: 2147483646;',
      '  border-radius: 28px;',
      '  overflow: hidden;',
      '  border: 1px solid rgba(145,123,184,.20);',
      '  background: linear-gradient(160deg,rgba(255,255,255,.92),rgba(239,233,248,.82));',
      '  box-shadow: 0 22px 60px rgba(82,63,116,.18);',
      '  backdrop-filter: blur(18px);',
      '  -webkit-backdrop-filter: blur(18px);',
      '  font-family: -apple-system,BlinkMacSystemFont,"Segoe UI","Microsoft YaHei",sans-serif;',
      '}',

      '#' + PANEL_ID + ' .dg-image {',
      '  position:absolute; inset:0; width:100%; height:100%;',
      '  object-fit:cover; object-position:center top;',
      '}',

      '#' + PANEL_ID + ' .dg-empty {',
      '  position:absolute; inset:58px 20px 88px;',
      '  display:flex; align-items:center; justify-content:center;',
      '  padding:18px; text-align:center;',
      '  border:1px dashed rgba(145,123,184,.32);',
      '  border-radius:18px;',
      '  color:#756983;',
      '  background:rgba(255,255,255,.35);',
      '  font-size:13px; line-height:1.7;',
      '}',

      '#' + PANEL_ID + ' .dg-title {',
      '  position:absolute; left:14px; top:13px;',
      '  padding:7px 11px;',
      '  border-radius:999px;',
      '  background:rgba(255,255,255,.80);',
      '  border:1px solid rgba(142,120,179,.16);',
      '  color:#695c7b;',
      '  font-size:12px; font-weight:600;',
      '  cursor:grab;',
      '}',

      '#' + PANEL_ID + ' .dg-actions {',
      '  position:absolute; right:12px; top:12px;',
      '  display:flex; gap:7px;',
      '}',

      '#' + PANEL_ID + ' button, #' + TOGGLE_ID + ' {',
      '  border:1px solid rgba(138,117,173,.18);',
      '  background:rgba(255,255,255,.84);',
      '  color:#70617f;',
      '  border-radius:999px;',
      '  cursor:pointer;',
      '  font:600 12px/1 -apple-system,BlinkMacSystemFont,"Segoe UI","Microsoft YaHei",sans-serif;',
      '}',

      '#' + PANEL_ID + ' button { height:30px; padding:0 10px; }',

      '#' + PANEL_ID + ' .dg-bubble {',
      '  position:absolute; left:16px; right:16px; bottom:16px;',
      '  min-height:46px;',
      '  display:flex; align-items:center;',
      '  padding:10px 13px;',
      '  border-radius:14px;',
      '  background:rgba(255,255,255,.82);',
      '  border:1px solid rgba(141,119,178,.15);',
      '  color:#5f566e;',
      '  font-size:13px;',
      '  cursor:pointer;',
      '}',

      '#' + TOGGLE_ID + ' {',
      '  position:fixed; right:18px; bottom:18px;',
      '  z-index:2147483647;',
      '  display:none;',
      '  height:44px;',
      '  padding:0 15px;',
      '  box-shadow:0 12px 30px rgba(82,63,114,.14);',
      '}',

      '@media (max-width: 900px) {',
      '  #' + PANEL_ID + ' { width:225px; height:360px; right:10px; bottom:10px; }',
      '}'
    ].join('\n');

    document.head.appendChild(style);
  }

  function renderImage(panel) {
    const img = panel.querySelector('.dg-image');
    const empty = panel.querySelector('.dg-empty');
    const saved = localStorage.getItem(IMAGE_KEY);

    if (saved) {
      img.src = saved;
      img.style.display = 'block';
      empty.style.display = 'none';
    } else {
      img.style.display = 'none';
      empty.style.display = 'flex';
    }
  }

  function chooseImage(panel) {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/png,image/jpeg,image/webp';
    input.style.display = 'none';

    input.addEventListener('change', function () {
      const file = input.files && input.files[0];
      if (!file) return;

      if (file.size > 4 * 1024 * 1024) {
        alert('图片太大了，建议控制在 4MB 以内。');
        input.remove();
        return;
      }

      const reader = new FileReader();
      reader.onload = function () {
        try {
          localStorage.setItem(IMAGE_KEY, String(reader.result));
          renderImage(panel);
        } catch (e) {
          alert('保存图片失败，请换一张体积更小的图片。');
        }
        input.remove();
      };
      reader.readAsDataURL(file);
    });

    document.body.appendChild(input);
    input.click();
  }

  function createPanel() {
    if (document.getElementById(PANEL_ID)) return;

    const panel = document.createElement('div');
    panel.id = PANEL_ID;
    panel.innerHTML =
      '<img class="dg-image" alt="">' +
      '<div class="dg-empty">点右上角“导入图片”<br>选择你的白发龙娘图片。<br><br>导入一次后会保存在当前浏览器里。</div>' +
      '<div class="dg-title">霜璃</div>' +
      '<div class="dg-actions">' +
        '<button class="dg-import" type="button">导入图片</button>' +
        '<button class="dg-hide" type="button">隐藏</button>' +
      '</div>' +
      '<div class="dg-bubble">嗯，在这呢。</div>';

    document.body.appendChild(panel);

    renderImage(panel);

    panel.querySelector('.dg-import').addEventListener('click', function () {
      chooseImage(panel);
    });

    panel.querySelector('.dg-hide').addEventListener('click', function () {
      panel.style.display = 'none';
      const toggle = document.getElementById(TOGGLE_ID);
      if (toggle) toggle.style.display = 'block';
      localStorage.setItem(HIDDEN_KEY, '1');
    });

    let idx = 0;
    panel.querySelector('.dg-bubble').addEventListener('click', function (e) {
      idx = (idx + 1) % lines.length;
      e.currentTarget.textContent = lines[idx];
    });

    const handle = panel.querySelector('.dg-title');
    let dragging = false;
    let sx = 0, sy = 0, sl = 0, st = 0;

    handle.addEventListener('pointerdown', function (e) {
      dragging = true;
      const r = panel.getBoundingClientRect();
      sx = e.clientX;
      sy = e.clientY;
      sl = r.left;
      st = r.top;

      panel.style.left = r.left + 'px';
      panel.style.top = r.top + 'px';
      panel.style.right = 'auto';
      panel.style.bottom = 'auto';

      handle.setPointerCapture(e.pointerId);
      e.preventDefault();
    });

    handle.addEventListener('pointermove', function (e) {
      if (!dragging) return;

      const left = Math.max(0, Math.min(window.innerWidth - panel.offsetWidth, sl + e.clientX - sx));
      const top = Math.max(0, Math.min(window.innerHeight - panel.offsetHeight, st + e.clientY - sy));

      panel.style.left = left + 'px';
      panel.style.top = top + 'px';
    });

    function finishDrag() {
      if (!dragging) return;
      dragging = false;
      const r = panel.getBoundingClientRect();
      localStorage.setItem(POS_KEY, JSON.stringify({left:r.left, top:r.top}));
    }

    handle.addEventListener('pointerup', finishDrag);
    handle.addEventListener('pointercancel', finishDrag);

    try {
      const savedPos = JSON.parse(localStorage.getItem(POS_KEY) || 'null');
      if (savedPos && Number.isFinite(savedPos.left) && Number.isFinite(savedPos.top)) {
        panel.style.left = Math.max(0, Math.min(window.innerWidth - panel.offsetWidth, savedPos.left)) + 'px';
        panel.style.top = Math.max(0, Math.min(window.innerHeight - panel.offsetHeight, savedPos.top)) + 'px';
        panel.style.right = 'auto';
        panel.style.bottom = 'auto';
      }
    } catch (e) {}

    if (localStorage.getItem(HIDDEN_KEY) === '1') {
      panel.style.display = 'none';
    }
  }

  function createToggle() {
    if (document.getElementById(TOGGLE_ID)) return;

    const btn = document.createElement('button');
    btn.id = TOGGLE_ID;
    btn.type = 'button';
    btn.textContent = '霜璃';

    btn.addEventListener('click', function () {
      const panel = document.getElementById(PANEL_ID);
      if (panel) {
        panel.style.display = 'block';
        btn.style.display = 'none';
        localStorage.setItem(HIDDEN_KEY, '0');
      }
    });

    document.body.appendChild(btn);

    if (localStorage.getItem(HIDDEN_KEY) === '1') {
      btn.style.display = 'block';
    }
  }

  function boot() {
    injectStyle();
    createToggle();
    createPanel();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, {once:true});
  } else {
    boot();
  }

  setInterval(function () {
    if (!document.getElementById(PANEL_ID)) createPanel();
    if (!document.getElementById(TOGGLE_ID)) createToggle();
    if (!document.getElementById(STYLE_ID)) injectStyle();
  }, 2000);
})();