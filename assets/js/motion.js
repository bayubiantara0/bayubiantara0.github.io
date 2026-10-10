/* =====================================================================
   Scroll motion layer: Lenis smooth scroll + GSAP ScrollTrigger.
   Everything here is progressive enhancement: if the libraries are
   missing or the user prefers reduced motion, the page still works
   with the CSS reveals from app.js.
   ===================================================================== */
(function () {
  "use strict";

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fine = window.matchMedia("(pointer: fine)").matches;
  if (reduce || typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;

  gsap.registerPlugin(ScrollTrigger);
  gsap.defaults({ ease: "power3.out" });

  /* ---------- Smooth scroll (Lenis) ---------- */
  var lenis = null;
  if (typeof Lenis !== "undefined") {
    lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 0.95, smoothWheel: true });
    window.__lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(function (t) {
      lenis.raf(t * 1000);
    });
    gsap.ticker.lagSmoothing(0);
    document.documentElement.style.scrollBehavior = "auto";
    // programmatic / native scrolls (hash jumps, back-to-top, scripts) must also reach ScrollTrigger
    window.addEventListener("scroll", function () { ScrollTrigger.update(); }, { passive: true });
    var toTop = document.querySelector(".to-top");
    if (toTop) toTop.addEventListener("click", function () { lenis.scrollTo(0, { duration: 1.2 }); });

    // anchor links go through Lenis so they get the same easing
    document.addEventListener("click", function (e) {
      var a = e.target.closest('a[href^="#"]');
      if (!a) return;
      var id = a.getAttribute("href");
      if (id.length < 2) return;
      var el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el, { offset: -80, duration: 1.2 });
    });
  }

  /* ---------- Split helpers ---------- */
  function splitWords(el) {
    if (el.dataset.split) return Array.prototype.slice.call(el.querySelectorAll(".w"));
    el.dataset.split = "1";
    var html = "";
    Array.prototype.forEach.call(el.childNodes, function (node) {
      if (node.nodeType === 3) {
        node.textContent.split(/(\s+)/).forEach(function (part) {
          if (!part) return;
          html += /^\s+$/.test(part) ? " " : '<span class="w">' + part.replace(/[&<>]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]; }) + "</span>";
        });
      } else if (node.nodeType === 1) {
        html += node.outerHTML;
      }
    });
    el.innerHTML = html;
    return Array.prototype.slice.call(el.querySelectorAll(".w"));
  }

  /* ---------- Hero: depth on scroll ---------- */
  var hero = document.querySelector(".hero");
  if (hero) {
    gsap.to(".hero__copy", {
      y: 80,
      opacity: 0.15,
      ease: "none",
      scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true }
    });
    gsap.to(".hero__visual", {
      y: 140,
      scale: 0.94,
      ease: "none",
      scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true }
    });
  }

  /* ---------- Section titles slide in with scroll ---------- */
  gsap.utils.toArray(".section__title").forEach(function (t) {
    gsap.from(t, {
      x: -60,
      opacity: 0,
      ease: "none",
      scrollTrigger: { trigger: t, start: "top 95%", end: "top 60%", scrub: true }
    });
  });

  /* ---------- Word-by-word text reveal (about, quote, contact intro) ---------- */
  gsap.utils.toArray(".about__text > p, .quote__text, .contact__intro, .showcase-rail__intro").forEach(function (p) {
    var words = splitWords(p);
    if (!words.length) return;
    gsap.set(words, { opacity: 0.18 });
    gsap.to(words, {
      opacity: 1,
      stagger: 0.04,
      ease: "none",
      scrollTrigger: { trigger: p, start: "top 85%", end: "bottom 55%", scrub: true }
    });
  });

  /* ---------- Quote box grows in ---------- */
  var quote = document.querySelector(".quote__box");
  if (quote) {
    gsap.from(quote, {
      scale: 0.9,
      ease: "none",
      scrollTrigger: { trigger: quote, start: "top 95%", end: "top 45%", scrub: true }
    });
  }

  /* ---------- Marquee follows scroll velocity ---------- */
  var track = document.querySelector(".marquee__track");
  if (track) {
    var dir = 1;
    ScrollTrigger.create({
      onUpdate: function (self) {
        var v = self.getVelocity();
        dir = v < 0 ? -1 : 1;
        var speed = gsap.utils.clamp(1, 6, 1 + Math.abs(v) / 600);
        track.style.animationDuration = 32 / speed + "s";
        track.style.animationDirection = dir < 0 ? "reverse" : "normal";
      }
    });
  }

  /* ---------- Decorations drift (replaces simple parallax when GSAP is present) ---------- */
  gsap.utils.toArray("[data-parallax]").forEach(function (el) {
    var speed = parseFloat(el.getAttribute("data-parallax")) || 0.2;
    el.removeAttribute("data-parallax");
    gsap.to(el, {
      y: -180 * speed,
      ease: "none",
      scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true }
    });
  });

  /* ---------- Project panels: frames get depth as they pass ---------- */
  function wirePanels() {
    gsap.utils.toArray(".panel .stage").forEach(function (stage) {
      var f1 = stage.querySelector(".frame-1");
      var f2 = stage.querySelector(".frame-2");
      var f3 = stage.querySelector(".frame-3");
      var st = { trigger: stage, start: "top bottom", end: "bottom top", scrub: true };
      if (f1) gsap.fromTo(f1, { yPercent: 10 }, { yPercent: -8, ease: "none", scrollTrigger: st });
      if (f2) gsap.fromTo(f2, { yPercent: 18 }, { yPercent: -14, ease: "none", scrollTrigger: st });
      if (f3) gsap.fromTo(f3, { yPercent: 26 }, { yPercent: -20, ease: "none", scrollTrigger: st });
    });
  }
  wirePanels();

  /* ---------- Skill boxes and facts: stagger with scrub ---------- */
  gsap.utils.toArray(".skills__grid, .about__facts, .feature-grid, .stack").forEach(function (grid) {
    var items = grid.children;
    if (!items.length) return;
    gsap.from(items, {
      y: 40,
      opacity: 0,
      stagger: 0.08,
      ease: "none",
      scrollTrigger: { trigger: grid, start: "top 90%", end: "top 50%", scrub: true }
    });
  });

  /* ---------- Timeline: dots pop and line draws with scroll ---------- */
  var timeline = document.querySelector(".timeline");
  if (timeline) {
    var progress = timeline.querySelector(".timeline__progress");
    if (progress) {
      progress.style.transition = "none";
      gsap.fromTo(progress, { height: "0%" }, {
        height: "calc(100% - 16px)",
        ease: "none",
        scrollTrigger: { trigger: timeline, start: "top 70%", end: "bottom 60%", scrub: true }
      });
    }
  }

  /* ---------- Custom cursor ring ---------- */
  if (fine) {
    var ring = document.createElement("div");
    ring.className = "cursor-ring";
    ring.innerHTML = "<span></span>";
    document.body.appendChild(ring);
    var label = ring.firstChild;
    var rx = gsap.quickTo(ring, "x", { duration: 0.35, ease: "power3" });
    var ry = gsap.quickTo(ring, "y", { duration: 0.35, ease: "power3" });
    window.addEventListener("mousemove", function (e) {
      rx(e.clientX);
      ry(e.clientY);
      document.body.classList.add("has-ring");
    });
    document.addEventListener("mouseover", function (e) {
      var t = e.target.closest("a, button, .panel, .thumb, .frame[data-lightbox]");
      if (!t) {
        ring.classList.remove("is-link", "is-view");
        return;
      }
      var view = t.classList.contains("panel") || t.classList.contains("thumb") || t.hasAttribute("data-lightbox");
      ring.classList.toggle("is-view", view);
      ring.classList.toggle("is-link", !view);
      label.textContent = view ? (t.classList.contains("panel") ? "open" : "zoom") : "";
    });
    document.addEventListener("mouseleave", function () {
      document.body.classList.remove("has-ring");
    });
  }

  /* ---------- Refresh once images settle ---------- */
  window.addEventListener("load", function () {
    ScrollTrigger.refresh();
  });
})();
