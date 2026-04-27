/* Rahul Niroop — portfolio interactions
   Minimal: nav state, mobile menu, reveal-on-scroll,
   stat counters, skill bar fills, footer year. */

(function () {
  'use strict';

  // Footer year
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // ---- Nav: scroll state + mobile toggle ----
  var nav = document.getElementById('nav');
  var toggle = document.getElementById('nav-toggle');
  var links = document.getElementById('nav-links');

  function onScroll() {
    if (!nav) return;
    if (window.scrollY > 16) nav.classList.add('is-scrolled');
    else nav.classList.remove('is-scrolled');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
  }

  // Close mobile menu after clicking a link
  if (links && nav) {
    links.addEventListener('click', function (e) {
      var t = e.target;
      if (t && t.tagName === 'A' && nav.classList.contains('is-open')) {
        nav.classList.remove('is-open');
        if (toggle) toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ---- Reveal-on-scroll ----
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-in'); });
  }

  // ---- Stat counters ----
  var counters = document.querySelectorAll('.num[data-target]');
  function animateCount(el) {
    var target = parseInt(el.getAttribute('data-target'), 10) || 0;
    var duration = 1200;
    var start = performance.now();
    function tick(now) {
      var t = Math.min(1, (now - start) / duration);
      var eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
      el.textContent = String(Math.round(target * eased));
      if (t < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  if ('IntersectionObserver' in window && counters.length) {
    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          animateCount(e.target);
          co.unobserve(e.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(function (c) { co.observe(c); });
  }

  // ---- Skill bars ----
  var bars = document.querySelectorAll('.bars b[data-level]');
  if ('IntersectionObserver' in window && bars.length) {
    var bo = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          var level = parseInt(e.target.getAttribute('data-level'), 10) || 0;
          // small stagger for visual delight
          setTimeout(function () {
            e.target.style.setProperty('--w', level + '%');
          }, 80);
          bo.unobserve(e.target);
        }
      });
    }, { threshold: 0.4 });
    bars.forEach(function (b) { bo.observe(b); });
  } else {
    bars.forEach(function (b) {
      var level = parseInt(b.getAttribute('data-level'), 10) || 0;
      b.style.setProperty('--w', level + '%');
    });
  }

  // ---- Resume button placeholder ----
  var dl = document.getElementById('download-resume');
  if (dl) {
    dl.addEventListener('click', function (e) {
      // Replace href with your hosted PDF when ready.
      // For now, show a friendly message instead of a 404.
      if (dl.getAttribute('href') === '#') {
        e.preventDefault();
        alert('Resume PDF coming soon. Reach out via the contact section in the meantime.');
      }
    });
  }
})();
