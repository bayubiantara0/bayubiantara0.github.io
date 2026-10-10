/* UI flourishes: scramble text, magnetic buttons, 3D cover-flow, page transitions.
   Progressive: everything degrades to plain markup without GSAP or on touch devices. */
(function () {
  "use strict";

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fine = window.matchMedia("(pointer: fine)").matches;
  var hasGsap = typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined";

  /* ---------- Scramble text ---------- */
  var CHARS = "#$%&*+-/<>=?@[]{}~01";
  function scramble(el, duration) {
    if (reduce || el.dataset.scrambling) return;
    var text = el.dataset.text || el.textContent;
    el.dataset.text = text;
    el.dataset.scrambling = "1";
    var start = performance.now();
    duration = duration || 420;
    (function frame(now) {
      var p = Math.min(1, (now - start) / duration);
      var out = "";
      for (var i = 0; i < text.length; i++) {
        var ch = text[i];
        if (ch === " " || ch === "#") { out += ch; continue; }
        out += i / text.length < p ? ch : CHARS[Math.floor(Math.random() * CHARS.length)];
      }
      el.textContent = out;
      if (p < 1) requestAnimationFrame(frame);
      else { el.textContent = text; delete el.dataset.scrambling; }
    })(start);
  }

  // hover: nav links, project tabs, brand
  if (fine) {
    document.addEventListener("mouseover", function (e) {
      var t = e.target.closest("[data-scramble]");
      if (t) scramble(t);
    });
  }
  // once on reveal: section titles and panel titles
  if ("IntersectionObserver" in window && !reduce) {
    var seen = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var t = en.target.querySelector("[data-scramble-once]") || en.target;
        scramble(t, 700);
        seen.unobserve(en.target);
      });
    }, { threshold: 0.6 });
    document.querySelectorAll(".section__title, .panel__title, .detail-hero__title").forEach(function (el) {
      var target = el.querySelector("[data-scramble-once]");
      if (!target) {
        // wrap text nodes so the # stays styled
        var last = el.lastChild;
        if (last && last.nodeType === 3 && last.textContent.trim()) {
          var span = document.createElement("span");
          span.setAttribute("data-scramble-once", "");
          span.textContent = last.textContent;
          el.replaceChild(span, last);
        }
      }
      seen.observe(el);
    });
  }

  /* ---------- Magnetic buttons ---------- */
  if (fine && !reduce) {
    document.addEventListener("mousemove", function (e) {
      var b = e.target.closest(".btn, .to-top, .showcase-tab");
      if (!b) return;
      var r = b.getBoundingClientRect();
      var dx = (e.clientX - (r.left + r.width / 2)) / r.width;
      var dy = (e.clientY - (r.top + r.height / 2)) / r.height;
      b.style.transform = "translate(" + (dx * 10).toFixed(1) + "px," + (dy * 8).toFixed(1) + "px)";
      b.classList.add("is-magnet");
    });
    document.addEventListener("mouseout", function (e) {
      var b = e.target.closest(".btn, .to-top, .showcase-tab");
      if (!b || b.contains(e.relatedTarget)) return;
      b.style.transform = "";
      b.classList.remove("is-magnet");
    });
  }

  /* ---------- 3D cover-flow ---------- */
  var flow = document.getElementById("projects-flow");
  if (flow && window.PROJECTS && window.renderStage) {
    var track = flow.querySelector(".flow__track");
    var n = window.PROJECTS.length;
    var pad = function (i) { return (i < 9 ? "0" : "") + (i + 1); };
    track.innerHTML = window.PROJECTS.map(function (p, i) {
      return '<button class="flow__card" type="button" data-target="p-' + p.slug + '" aria-label="' + p.title.replace(/"/g, "&quot;") + '">' +
        '<span class="flow__media">' + window.renderStage(p) + "</span>" +
        '<span class="flow__label"><b>' + pad(i) + "</b>" + p.title.replace(/[&<>]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]; }) + "</span></button>";
    }).join("");
    var cards = Array.prototype.slice.call(track.children);
    var counter = flow.querySelector(".flow__counter");

    var wide = window.matchMedia("(min-width: 1024px)").matches;
    var active = 0;

    function layout(a) {
      active = a;
      var step = Math.min(260, flow.clientWidth * 0.26);
      cards.forEach(function (c, i) {
        var off = i - a;
        var abs = Math.abs(off);
        var rot = Math.max(-50, Math.min(50, -off * 38));
        c.style.transform = "translate(-50%, -50%) translateX(" + (off * step).toFixed(1) + "px) translateZ(" + (-abs * 140).toFixed(1) + "px) rotateY(" + rot.toFixed(1) + "deg)";
        c.style.opacity = Math.max(0.15, 1 - abs * 0.28).toFixed(2);
        c.style.zIndex = String(100 - Math.round(abs * 10));
        c.classList.toggle("is-active", Math.round(a) === i);
      });
      if (counter) counter.textContent = pad(Math.round(a)) + " / " + pad(n - 1);
    }

    if (wide && hasGsap && !reduce) {
      flow.classList.add("is-3d");
      layout(0);
      ScrollTrigger.create({
        trigger: flow,
        start: "top 12%",
        end: "+=" + n * 180,
        pin: true,
        scrub: 0.5,
        anticipatePin: 1,
        onUpdate: function (self) { layout(self.progress * (n - 1)); }
      });
      window.addEventListener("resize", function () { layout(active); });
    } else {
      flow.classList.add("is-strip");
    }

    track.addEventListener("click", function (e) {
      var c = e.target.closest(".flow__card");
      if (!c) return;
      var el = document.getElementById(c.getAttribute("data-target"));
      if (!el) return;
      if (window.__lenis) window.__lenis.scrollTo(el, { offset: -100, duration: 1.2 });
      else el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  /* ---------- Page transitions (View Transitions API, cross-document) ---------- */
  document.addEventListener("click", function (e) {
    var a = e.target.closest('a[href*="project-details.html"]');
    if (!a) return;
    var host = a.closest(".panel, .flow__card, .pager a, article");
    var stage = host ? host.querySelector(".stage") : null;
    document.querySelectorAll('[style*="view-transition-name"]').forEach(function (el) { el.style.viewTransitionName = ""; });
    if (stage) stage.style.viewTransitionName = "project-stage";
  });
})();
