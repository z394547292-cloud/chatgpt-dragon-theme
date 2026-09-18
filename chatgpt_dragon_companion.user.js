// ==UserScript==
// @name         ChatGPT 银白龙娘 · 淡紫冰晶陪伴主题
// @namespace    https://chatgpt.com/
// @version      1.1.0
// @description  ChatGPT 网页版银白/淡紫玻璃主题 + 可拖动龙娘陪伴卡。首次使用可一键导入自己的龙娘图片。
// @author       z394547292-cloud
// @match        https://chatgpt.com/*
// @run-at       document-idle
// @grant        none
// @updateURL    https://raw.githubusercontent.com/z394547292-cloud/chatgpt-dragon-theme/main/chatgpt_dragon_companion.user.js
// @downloadURL  https://raw.githubusercontent.com/z394547292-cloud/chatgpt-dragon-theme/main/chatgpt_dragon_companion.user.js
// ==/UserScript==

(function () {
  'use strict';

  const ID = {
    style: 'dragon-theme-style-v11',
    panel: 'dragon-companion-panel-v11',
    toggle: 'dragon-companion-toggle-v11',
    picker: 'dragon-image-picker-v11'
  };

  const KEY = {
    image: 'dragon_companion_image_v11',
    hidden: 'dragon_companion_hidden_v11',
    pos: 'dragon_companion_pos_v11'
  };

  const LINES = [
    '嗯，在这呢。',
    '慢慢来，不急。',
    '今天也别把自己卷坏了。',
    '有事就叫我，别硬扛。',
    '嗯，这样就顺眼多了。'
  ];

  function addStyle() {
    if (document.getElementById(ID.style)) return;
    const style = document.createElement('style');
    style.id = ID.style;
    style.textContent = `
      :root{
        --dg-bg0:#fbfaff;
        --dg-bg1:#f5f1fb;
        --dg-card:rgba(255,255,255,.76);
        --dg-line:rgba(145,123,184,.18);
        --dg-text:#393442;
        --dg-soft:#6f647e;
      }

      html,body{
        background:
          radial-gradient(circle at 82% 10%,rgba(207,193,235,.34),transparent 30%),
          radial-gradient(circle at 18% 90%,rgba(222,214,241,.26),transparent 32%),
          linear-gradient(145deg,var(--dg-bg0),var(--dg-bg1) 55%,#faf8fd)!important;
        color:var(--dg-text)!important;
      }

      body{background-attachment:fixed!important}

      nav,aside{
        background:rgba(248,246,252,.72)!important;
        backdrop-filter:blur(22px) saturate(118%)!important;
        -webkit-backdrop-filter:blur(22px) saturate(118%)!important;
        border-right:1px solid rgba(145,123,184,.12)!important;
      }

      header{
        background:rgba(250,249,253,.60)!important;
        backdrop-filter:blur(18px) saturate(118%)!important;
        -webkit-backdrop-filter:blur(18px) saturate(118%)!important;
        border-bottom:1px solid rgba(137,118,170,.08)!important;
      }

      main{background:transparent!important}

      [data-message-author-role="user"] > div{
        background:rgba(218,208,237,.58)!important;
        border:1px solid rgba(145,126,181,.12)!important;
        border-radius:18px 18px 7px 18px!important;
        box-shadow:0 4px 17px rgba(88,68,119,.055)!important;
      }

      [data-message-author-role="assistant"] > div{
        background:rgba(255,255,255,.38)!important;
        border-radius:18px!important;
      }

      form > div:has(textarea){
        background:rgba(255,255,255,.82)!important;
        backdrop-filter:blur(24px) saturate(120%)!important;
        -webkit-backdrop-filter:blur(24px) saturate(120%)!important;
        border:1px solid rgba(145,125,181,.18)!important;
        border-radius:22px!important;
        box-shadow:0 12px 44px rgba(86,68,118,.10),inset 0 0 0 1px rgba(255,255,255,.58)!important;
      }

      [role="menu"],[role="dialog"]{
        background:rgba(251,250,253,.94)!important;
        backdrop-filter:blur(24px)!important;
        -webkit-backdrop-filter:blur(24px)!important;
        border:1px solid var(--dg-line)!important;
        border-radius:16px!important;
      }

      pre{
        background:linear-gradient(145deg,#302b39,#24202c)!important;
        color:#eeeaf6!important;
        border-radius:14px!important;
      }

      :not(pre)>code{
        background:rgba(210,198,233,.30)!important;
        color:#695780!important;
        border-radius:6px!important;
      }

      ::selection{background:rgba(185,165,220,.32)!important}

      ::-webkit-scrollbar{width:8px;height:8px}
      ::-webkit-scrollbar-track{background:transparent}
      ::-webkit-scrollbar-thumb{background:rgba(153,136,184,.30);border-radius:999px}

      #${ID.panel}{
        position:fixed;
        right:18px;
        bottom:18px;
        width:292px;
        height:468px;
        z-index:2147483000;
        overflow:hidden;
        border-radius:28px;
        border:1px solid var(--dg-line);
        background:
          radial-gradient(circle at 55% 25%,rgba(236,229,248,.95),transparent 34%),
          linear-gradient(160deg,rgba(255,255,255,.90),rgba(239,233,248,.78));
        box-shadow:0 24px 65px rgba(82,63,116,.18),0 0 40px rgba(192,172,227,.14);
        backdrop-filter:blur(22px) saturate(120%);
        -webkit-backdrop-filter:blur(22px) saturate(120%);
        user-select:none;
      }

      #${ID.panel} .dg-image{
        position:absolute;inset:0;width:100%;height:100%;
        object-fit:cover;object-position:center top;
        filter:saturate(.95) contrast(.99);
        transition:transform .22s ease;
        pointer-events:none;
      }

      #${ID.panel}:hover .dg-image{transform:scale(1.015)}

      #${ID.panel} .dg-empty{
        position:absolute;inset:58px 22px 88px;
        display:flex;align-items:center;justify-content:center;text-align:center;
        color:#766985;font:500 13px/1.7 -apple-system,BlinkMacSystemFont,"Segoe UI","Microsoft YaHei",sans-serif;
        border:1px dashed rgba(145,123,184,.30);
        border-radius:18px;background:rgba(255,255,255,.35);
        padding:18px;
      }

      #${ID.panel} .dg-fade{
        position:absolute;inset:0;pointer-events:none;
        background:linear-gradient(to bottom,transparent 48%,rgba(244,238,250,.14) 69%,rgba(241,235,249,.92) 100%);
      }

      #${ID.panel} .dg-title{
        position:absolute;left:14px;top:13px;
        padding:7px 11px;border-radius:999px;
        background:rgba(255,255,255,.72);
        border:1px solid rgba(142,120,179,.15);
        color:#6a5d7c;
        font:600 12px/1 -apple-system,BlinkMacSystemFont,"Segoe UI","Microsoft YaHei",sans-serif;
        box-shadow:0 7px 20px rgba(78,59,105,.07);
        backdrop-filter:blur(12px);
        cursor:grab;
      }

      #${ID.panel} .dg-actions{
        position:absolute;right:12px;top:12px;
        display:flex;gap:7px;
      }

      #${ID.panel} .dg-btn,
      #${ID.toggle}{
        border:1px solid rgba(138,117,173,.17);
        background:rgba(255,255,255,.78);
        color:#71627f;
        box-shadow:0 6px 15px rgba(79,61,105,.08);
        cursor:pointer;
        font:600 12px/1 -apple-system,BlinkMacSystemFont,"Segoe UI","Microsoft YaHei",sans-serif;
      }

      #${ID.panel} .dg-btn{
        height:30px;padding:0 10px;border-radius:999px;
      }

      #${ID.panel} .dg-bubble{
        position:absolute;left:16px;right:16px;bottom:16px;
        min-height:46px;display:flex;align-items:center;
        padding:10px 13px;border-radius:14px;
        background:rgba(255,255,255,.77);
        border:1px solid rgba(141,119,178,.15);
        color:#5f566e;
        font:500 13px/1.45 -apple-system,BlinkMacSystemFont,"Segoe UI","Microsoft YaHei",sans-serif;
        box-shadow:0 8px 22px rgba(80,61,108,.09);
        backdrop-filter:blur(14px);
        cursor:pointer;
      }

      #${ID.toggle}{
        position:fixed;right:18px;bottom:18px;z-index:2147483001;
        display:none;height:46px;padding:0 15px;border-radius:999px;
        backdrop-filter:blur(16px);
      }

      @media(max-width:900px){
        #${ID.panel}{width:225px;height:360px;right:10px;bottom:10px}
      }
    `;
    document.documentElement.appendChild(style);
  }

  function pickImage() {
    let input = document.getElementById(ID.picker);
    if (!input) {
      input = document.createElement('input');
      input.id = ID.picker;
      input.type = 'file';
      input.accept = 'image/png,image/jpeg,image/webp';
      input.style.display = 'none';
      document.body.appendChild(input);
      input.addEventListener('change', () => {
        const file = input.files && input.files[0];
        if (!file) return;

        if (file.size > 4.2 * 1024 * 1024) {
          alert('图片有点大，建议先压缩到 4MB 以内再导入。');
          input.value = '';
          return;
        }

        const reader = new FileReader();
        reader.onload = () => {
          try {
            localStorage.setItem(KEY.image, String(reader.result));
            renderImage();
          } catch (e) {
            alert('图片保存失败。请换一张体积更小的图片再试。');
          }
          input.value = '';
        };
        reader.readAsDataURL(file);
      });
    }
    input.click();
  }

  function renderImage() {
    const panel = document.getElementById(ID.panel);
    if (!panel) return;
    const image = panel.querySelector('.dg-image');
    const empty = panel.querySelector('.dg-empty');
    const saved = localStorage.getItem(KEY.image);

    if (saved) {
      image.src = saved;
      image.style.display = 'block';
      empty.style.display = 'none';
    } else {
      image.removeAttribute('src');
      image.style.display = 'none';
      empty.style.display = 'flex';
    }
  }

  function createPanel() {
    if (document.getElementById(ID.panel)) return;

    const panel = document.createElement('div');
    panel.id = ID.panel;
    panel.innerHTML = `
      <img class="dg-image" alt="">
      <div class="dg-empty">第一次使用：点右上角“导入图片”，选择你那张白发龙娘图片。<br><br>导入一次后会保存在当前浏览器里，以后刷新也还在。</div>
      <div class="dg-fade"></div>
      <div class="dg-title" title="按住这里拖动">银白龙娘</div>
      <div class="dg-actions">
        <button class="dg-btn dg-import" type="button">导入图片</button>
        <button class="dg-btn dg-hide" type="button">隐藏</button>
      </div>
      <div class="dg-bubble">嗯，在这呢。</div>
    `;

    document.body.appendChild(panel);

    panel.querySelector('.dg-import').addEventListener('click', pickImage);

    panel.querySelector('.dg-hide').addEventListener('click', () => {
      panel.style.display = 'none';
      document.getElementById(ID.toggle).style.display = 'block';
      localStorage.setItem(KEY.hidden, '1');
    });

    let lineIndex = 0;
    panel.querySelector('.dg-bubble').addEventListener('click', (e) => {
      lineIndex = (lineIndex + 1) % LINES.length;
      e.currentTarget.textContent = LINES[lineIndex];
    });

    const handle = panel.querySelector('.dg-title');
    let active = false, sx = 0, sy = 0, sl = 0, st = 0;

    handle.addEventListener('pointerdown', (e) => {
      active = true;
      const r = panel.getBoundingClientRect();
      sx = e.clientX; sy = e.clientY; sl = r.left; st = r.top;
      panel.style.left = r.left + 'px';
      panel.style.top = r.top + 'px';
      panel.style.right = 'auto';
      panel.style.bottom = 'auto';
      handle.setPointerCapture(e.pointerId);
      e.preventDefault();
    });

    handle.addEventListener('pointermove', (e) => {
      if (!active) return;
      const maxL = Math.max(0, innerWidth - panel.offsetWidth);
      const maxT = Math.max(0, innerHeight - panel.offsetHeight);
      const left = Math.min(Math.max(0, sl + e.clientX - sx), maxL);
      const top = Math.min(Math.max(0, st + e.clientY - sy), maxT);
      panel.style.left = left + 'px';
      panel.style.top = top + 'px';
    });

    const end = () => {
      if (!active) return;
      active = false;
      const r = panel.getBoundingClientRect();
      localStorage.setItem(KEY.pos, JSON.stringify({left:Math.round(r.left),top:Math.round(r.top)}));
    };

    handle.addEventListener('pointerup', end);
    handle.addEventListener('pointercancel', end);

    try {
      const pos = JSON.parse(localStorage.getItem(KEY.pos) || 'null');
      if (pos && Number.isFinite(pos.left) && Number.isFinite(pos.top)) {
        panel.style.left = Math.min(pos.left, Math.max(0, innerWidth-panel.offsetWidth)) + 'px';
        panel.style.top = Math.min(pos.top, Math.max(0, innerHeight-panel.offsetHeight)) + 'px';
        panel.style.right = 'auto';
        panel.style.bottom = 'auto';
      }
    } catch (_) {}

    if (localStorage.getItem(KEY.hidden) === '1') panel.style.display = 'none';

    renderImage();
  }

  function createToggle() {
    if (document.getElementById(ID.toggle)) return;
    const btn = document.createElement('button');
    btn.id = ID.toggle;
    btn.textContent = '龙娘';
    btn.title = '显示银白龙娘';
    btn.addEventListener('click', () => {
      const panel = document.getElementById(ID.panel);
      panel.style.display = 'block';
      btn.style.display = 'none';
      localStorage.setItem(KEY.hidden, '0');
    });
    document.body.appendChild(btn);
    if (localStorage.getItem(KEY.hidden) === '1') btn.style.display = 'block';
  }

  function boot() {
    addStyle();
    createToggle();
    createPanel();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, {once:true});
  } else {
    boot();
  }

  // ChatGPT 是单页应用；保险起见，页面切换后检查一次。
  setInterval(() => {
    if (!document.getElementById(ID.style)) addStyle();
    if (!document.getElementById(ID.toggle)) createToggle();
    if (!document.getElementById(ID.panel)) createPanel();
  }, 2500);
})();