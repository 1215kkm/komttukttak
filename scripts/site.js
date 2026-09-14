// site.js — 컴뚝딱 사이트 공통 스크립트. 인라인 스크립트 0개 정책(_headers CSP) 때문에 여기 모은다.
(function () {
  'use strict';

  // 1) Lucide 아이콘
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }

  // 2) 모바일 메뉴 토글
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // 3) 헤드라인 A/B — 같은 URL, 첫 방문 50/50 배정 후 고정 (docs/marketing/다운로드페이지-카피.md §4)
  //    HTML 에는 A 안이 들어 있다(검색엔진은 A 를 본다). B 배정이면 data-b 텍스트로 바꾼다.
  var hero = document.querySelector('[data-ab-headline]');
  if (hero) {
    var KEY = 'ktd_hl';
    var variant = null;
    try { variant = localStorage.getItem(KEY); } catch (e) { /* 프라이빗 모드 등 — A 로 둔다 */ }
    if (variant !== 'A' && variant !== 'B') {
      variant = Math.random() < 0.5 ? 'A' : 'B';
      try { localStorage.setItem(KEY, variant); } catch (e) { /* 저장 못 해도 이번 방문은 배정값 사용 */ }
    }
    if (variant === 'B') {
      var h1 = hero.querySelector('h1');
      var sub = hero.querySelector('.sub');
      if (h1 && h1.dataset.b) h1.textContent = h1.dataset.b;
      if (sub && sub.dataset.b) sub.textContent = sub.dataset.b;
    }
    document.querySelectorAll('[data-cta]').forEach(function (a) { a.setAttribute('data-variant', variant); });
    // analytics: CEO 결정 후 — 여기서 variant 별 CTA 클릭 카운트를 보낸다 (현재 전송 없음)
  }
})();
