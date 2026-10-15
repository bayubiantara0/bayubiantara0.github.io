/* =====================================================================
   Bayu Biantara — Portfolio (ArtCraft-style light edition)
   Vanilla JS + GSAP/ScrollTrigger + Lenis. Everything degrades: if the
   libraries are missing or the visitor prefers reduced motion, the page
   still renders fully with CSS alone.
   ===================================================================== */
(function () {
  "use strict";

  var html = document.documentElement;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fine = window.matchMedia("(pointer: fine)").matches;
  var hasGsap = typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined";
  if (hasGsap) gsap.registerPlugin(ScrollTrigger);

  var esc = function (s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  };
  var pad = function (n) { return (n < 10 ? "0" : "") + n; };

  /* ---------- Smooth scroll ---------- */
  var lenis = null;
  if (typeof Lenis !== "undefined" && !reduce) {
    lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    window.__lenis = lenis;
    html.style.scrollBehavior = "auto";
    if (hasGsap) {
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
      gsap.ticker.lagSmoothing(0);
    } else {
      var loop = function (t) { lenis.raf(t); requestAnimationFrame(loop); };
      requestAnimationFrame(loop);
    }
  }

  function scrollToEl(el, offset) {
    if (!el) return;
    if (lenis) lenis.scrollTo(el, { offset: offset || -48, duration: 1.1 });
    else el.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
  }

  document.addEventListener("click", function (e) {
    var a = e.target.closest('a[href^="#"]');
    if (!a) return;
    var id = a.getAttribute("href");
    if (id.length < 2) return;
    var el = document.querySelector(id);
    if (!el) return;
    e.preventDefault();
    document.body.classList.remove("menu-open", "is-locked");
    scrollToEl(el, id === "#hero" ? -48 : -47);
  });

  /* ---------- Intro ---------- */
  var intro = document.querySelector(".intro");
  var startedAt = Date.now();

  function finishIntro() {
    html.classList.add("is-ready");
    if (intro) intro.classList.add("is-done");
    revealWordmark();
  }

  if (intro) {
    var count = intro.querySelector(".intro__count");
    var tick = function () {
      var p = Math.min(1, (Date.now() - startedAt) / 800);
      if (count) count.textContent = Math.round(p * 100) + "%";
      if (p < 1) requestAnimationFrame(tick);
    };
    if (!reduce) requestAnimationFrame(tick);
    var done = function () {
      var wait = reduce ? 0 : Math.max(0, 850 - (Date.now() - startedAt));
      setTimeout(finishIntro, wait);
    };
    if (document.readyState === "complete") done();
    else window.addEventListener("load", done);
    setTimeout(finishIntro, 4000); // safety net
  } else {
    html.classList.add("is-ready");
    revealWordmark();
  }

  var wordmarkDone = false;
  function revealWordmark() {
    if (wordmarkDone) return;
    wordmarkDone = true;
    var letters = document.querySelectorAll(".wordmark .wm-letter");
    if (!letters.length) return;
    if (hasGsap && !reduce) {
      gsap.to(letters, { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", stagger: 0.07, delay: 0.05 });
    } else {
      letters.forEach(function (l) { l.style.transform = "none"; l.style.opacity = "1"; });
    }
  }

  /* ---------- Nav ---------- */
  var toggle = document.querySelector(".nav-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var open = document.body.classList.toggle("menu-open");
      document.body.classList.toggle("is-locked", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav-links a[href^="#"]'));
  var sections = Array.prototype.slice.call(document.querySelectorAll("section[data-index]"));

  /* ---------- Right HUD: ruler + rolling percent ---------- */
  var ruler = document.getElementById("ruler");
  var cursor = document.getElementById("ruler-cursor");
  var digitsEl = document.getElementById("ruler-digits");
  if (ruler) {
    var ticks = "";
    for (var i = 0; i <= 100; i += 5) {
      ticks += '<div class="ruler__tick' + (i % 25 === 0 ? " is-major" : "") + '" style="top:' + i + '%"><span>' + i + "</span></div>";
    }
    ruler.insertAdjacentHTML("afterbegin", ticks);
    if (digitsEl) {
      digitsEl.innerHTML = [0, 0, 0].map(function () {
        return '<span class="col">' + "0123456789".split("").map(function (d) { return "<span>" + d + "</span>"; }).join("") + "</span>";
      }).join("");
    }
  }

  var lastPct = -1;
  function updateRuler() {
    if (!cursor) return;
    var max = html.scrollHeight - window.innerHeight;
    var pct = max > 0 ? Math.round((window.scrollY / max) * 100) : 0;
    pct = Math.max(0, Math.min(100, pct));
    cursor.style.top = pct + "%";
    if (pct === lastPct || !digitsEl) return;
    lastPct = pct;
    var str = String(pct);
    var cols = digitsEl.querySelectorAll(".col");
    var padded = ("   " + str).slice(-3);
    cols.forEach(function (col, k) {
      var ch = padded[k];
      if (ch === " ") { col.style.display = "none"; return; }
      col.style.display = "";
      col.style.transform = "translateY(-" + parseInt(ch, 10) + "em)";
    });
  }

  /* ---------- Section index (bottom right) + active nav ---------- */
  var index = document.getElementById("sections-index");
  var indexLinks = [];
  if (index && sections.length) {
    index.innerHTML = sections.map(function (s) {
      var label = s.getAttribute("data-index");
      return '<a href="#' + s.id + '" data-target="' + s.id + '">' + label.split("").map(function (ch) { return '<span class="l">' + esc(ch) + "</span>"; }).join("") + "</a>";
    }).join("");
    indexLinks = Array.prototype.slice.call(index.querySelectorAll("a"));
  }

  var activeId = null;
  function setActive(id) {
    if (id === activeId) return;
    activeId = id;
    navLinks.forEach(function (a) { a.classList.toggle("is-active", a.getAttribute("href") === "#" + id); });
    indexLinks.forEach(function (a) {
      var on = a.getAttribute("data-target") === id;
      var was = a.classList.contains("is-active");
      a.classList.toggle("is-active", on);
      if (on && !was && hasGsap && !reduce) {
        gsap.fromTo(a.querySelectorAll(".l"), { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power3.out", stagger: 0.03 });
      }
    });
  }

  if (sections.length && "IntersectionObserver" in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) setActive(en.target.id); });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(function (s) { spy.observe(s); });
    setActive(sections[0].id);
  }

  /* ---------- Scroll handlers ---------- */
  var toTop = document.querySelector(".to-top");
  if (toTop) toTop.addEventListener("click", function () {
    if (lenis) lenis.scrollTo(0, { duration: 1.2 });
    else window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  });

  function onScroll() {
    updateRuler();
    if (toTop) toTop.classList.toggle("is-visible", window.scrollY > 700);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);

  /* ---------- Reveal on scroll ---------- */
  var revealEls = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window && !reduce) {
    var ro = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-visible"); ro.unobserve(en.target); }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -6% 0px" });
    revealEls.forEach(function (el) { ro.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- Counters ---------- */
  var counters = document.querySelectorAll("[data-count]");
  if (counters.length && "IntersectionObserver" in window) {
    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target, end = parseInt(el.getAttribute("data-count"), 10) || 0;
        co.unobserve(el);
        if (reduce) { el.textContent = end; return; }
        var start = null;
        var step = function (ts) {
          if (!start) start = ts;
          var p = Math.min(1, (ts - start) / 1100);
          el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3)));
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      });
    }, { threshold: 0.6 });
    counters.forEach(function (c) { co.observe(c); });
  }

  /* ---------- Project grid + footer list (index) ---------- */
  var grid = document.getElementById("projects-grid");
  var featured = document.getElementById("project-featured");
  function cardHtml(p, i, isFeatured) {
    var href = "project-details.html?project=" + p.slug;
    return '<article class="card" data-cat="' + esc(p.category) + '" data-reveal style="--i:' + (i % 2) + '">' +
      '<div class="card__strip hud"><span>' + (isFeatured ? "Featured · " : "") + esc(p.category) + '</span><span class="faint">' + pad(i + 1) + "</span></div>" +
      '<div class="card__media">' + window.renderStage(p, isFeatured ? { large: true } : {}) + "</div>" +
      '<div class="card__body">' + (isFeatured ? '<p class="card__kicker hud">' + esc(p.client) + " · " + esc(p.year) + "</p>" : "") +
      '<h3 class="card__title display">' + esc(p.title) +
      '<svg class="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17 17 7m0 0H9m8 0v8"/></svg></h3>' +
      '<p class="card__desc">' + esc(p.short) + "</p>" +
      '<div class="card__chips">' + p.tags.map(function (t) { return '<span class="chip">' + esc(t) + "</span>"; }).join("") +
      (p.live ? '<span class="chip chip--ok">Live</span>' : "") + "</div>" +
      (isFeatured ? '<div class="card__actions"><a class="btn btn--sm" href="' + href + '">Open case study</a></div>' : "") + "</div>" +
      '<a class="card__link" href="' + href + '" aria-label="Open ' + esc(p.title) + '"></a></article>';
  }
  function observeCards(root) {
    if (!reduce && "IntersectionObserver" in window) {
      var ro2 = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("is-visible"); ro2.unobserve(en.target); } });
      }, { threshold: 0.08 });
      root.querySelectorAll("[data-reveal]").forEach(function (el) { ro2.observe(el); });
    } else {
      root.querySelectorAll("[data-reveal]").forEach(function (el) { el.classList.add("is-visible"); });
    }
  }
  if (featured && window.PROJECTS && window.renderStage) {
    featured.innerHTML = cardHtml(window.PROJECTS[0], 0, true);
    observeCards(featured);
  }
  if (grid && window.PROJECTS && window.renderStage) {
    grid.innerHTML = window.PROJECTS.slice(1).map(function (p, i) { return cardHtml(p, i + 1, false); }).join("");
    observeCards(grid);
    var filters = document.getElementById("project-filters");
    if (filters) {
      filters.addEventListener("click", function (e) {
        var b = e.target.closest("button[data-filter]");
        if (!b) return;
        var f = b.getAttribute("data-filter");
        filters.querySelectorAll("button").forEach(function (x) { x.classList.toggle("is-active", x === b); });
        document.querySelectorAll("#project-featured .card, #projects-grid .card").forEach(function (c) {
          var show = f === "all" || c.getAttribute("data-cat") === f;
          c.classList.toggle("is-hidden", !show);
          if (show) c.classList.add("is-visible");
        });
        if (hasGsap) ScrollTrigger.refresh();
      });
    }
  }

  var footerList = document.getElementById("footer-projects");
  if (footerList && window.PROJECTS) {
    footerList.innerHTML = window.PROJECTS.slice(0, 6).map(function (p) {
      return '<li><a href="project-details.html?project=' + p.slug + '">' + esc(p.title) + "</a></li>";
    }).join("") + '<li><a href="index.html#projects">All projects →</a></li>';
  }

  // reveal observer for detail-page content rendered before app.js ran
  document.querySelectorAll("[data-reveal]:not(.is-visible)").forEach(function (el) {
    if (reduce || !("IntersectionObserver" in window)) el.classList.add("is-visible");
  });

  /* ---------- Hero orbit ---------- */
  var orbit = document.getElementById("orbit");
  if (orbit && window.PROJECTS) {
    var picks = [
      ["qrion-for-teacher", "phone", 1, 20],
      ["certificate-manager", "web", 2, 80],
      ["tokopilot-mobile", "phone", 1, 200],
      ["logistics-dashboard", "web", 3, 140],
      ["erp-checkpoint", "web", 2, 250],
      ["nestify", "phone", 3, 320],
      ["local-traveling", "web", 1, 110],
      ["recruitment-system", "web", 3, 40]
    ];
    var radii = { 1: 300, 2: 440, 3: 580 };
    var rings = {};
    picks.forEach(function (pk) {
      var p = window.PROJECTS.filter(function (x) { return x.slug === pk[0]; })[0];
      if (!p) return;
      var g = p.gallery[0];
      var ring = rings[pk[2]];
      if (!ring) {
        ring = document.createElement("div");
        ring.className = "orbit__ring";
        ring.dataset.r = radii[pk[2]];
        orbit.appendChild(ring);
        rings[pk[2]] = ring;
      }
      var item = document.createElement("div");
      item.className = "orbit__item" + (g.kind === "phone" || g.kind === "poster" ? " orbit__item--phone" : "");
      item.dataset.angle = pk[3];
      item.innerHTML = '<img src="' + esc(g.src) + '" alt="" loading="eager" />';
      ring.appendChild(item);
    });

    var ringEls = Object.keys(rings).map(function (k) { return rings[k]; });
    var scaleFor = function () { return Math.min(1, Math.max(0.55, window.innerWidth / 1400)); };
    var rot = { 1: 0, 2: 0, 3: 0 };
    var speeds = { 1: 0.012, 2: -0.008, 3: 0.006 };
    var mx = 0, my = 0, tx = 0, ty = 0;

    function placeOrbit() {
      var s = scaleFor();
      ringEls.forEach(function (ring, ri) {
        var level = ri + 1;
        var r = parseFloat(ring.dataset.r) * s;
        Array.prototype.forEach.call(ring.children, function (item) {
          var a = (parseFloat(item.dataset.angle) + rot[level]) * Math.PI / 180;
          var x = Math.cos(a) * r + mx * (0.4 + level * 0.25);
          var y = Math.sin(a) * r * 0.78 + my * (0.4 + level * 0.25);
          item.style.transform = "translate(" + x.toFixed(1) + "px," + y.toFixed(1) + "px)";
        });
      });
    }

    function orbitLoop() {
      if (!reduce) {
        rot[1] += speeds[1]; rot[2] += speeds[2]; rot[3] += speeds[3];
        mx += (tx - mx) * 0.05; my += (ty - my) * 0.05;
      }
      placeOrbit();
      if (!reduce) requestAnimationFrame(orbitLoop);
    }
    placeOrbit();
    orbitLoop();

    if (fine && !reduce) {
      orbit.parentElement.addEventListener("mousemove", function (e) {
        var r = orbit.getBoundingClientRect();
        tx = ((e.clientX - r.left) / r.width - 0.5) * -40;
        ty = ((e.clientY - r.top) / r.height - 0.5) * -30;
      });
    }
    window.addEventListener("resize", placeOrbit);

    var items = orbit.querySelectorAll(".orbit__item");
    var showItems = function () {
      if (hasGsap && !reduce) gsap.to(items, { opacity: 1, duration: 1.2, ease: "power2.out", stagger: 0.08, delay: 0.5 });
      else items.forEach(function (it) { it.style.opacity = "1"; });
    };
    if (html.classList.contains("is-ready")) showItems();
    else {
      var obs = new MutationObserver(function () { if (html.classList.contains("is-ready")) { showItems(); obs.disconnect(); } });
      obs.observe(html, { attributes: true, attributeFilter: ["class"] });
    }

    // hero content fades as it leaves
    if (hasGsap && !reduce) {
      gsap.to(".hero__content", { y: 60, opacity: 0.2, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
      gsap.to(orbit, { y: 120, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
    }
  }

  /* ---------- Lightbox ---------- */
  var lightbox = document.querySelector(".lightbox");
  if (lightbox) {
    var lbImg = lightbox.querySelector("img");
    var closeLb = function () { lightbox.classList.remove("is-open"); document.body.classList.remove("is-locked"); };
    document.addEventListener("click", function (e) {
      var trigger = e.target.closest("[data-lightbox]");
      if (trigger) {
        e.preventDefault();
        lbImg.src = trigger.getAttribute("data-lightbox");
        lbImg.alt = trigger.getAttribute("data-lightbox-alt") || "";
        lightbox.classList.add("is-open");
        document.body.classList.add("is-locked");
        return;
      }
      if (e.target === lightbox || e.target.closest(".lightbox__close")) closeLb();
    });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeLb(); });
  }

  /* ---------- View transition hand-off ---------- */
  document.addEventListener("click", function (e) {
    var a = e.target.closest('a[href*="project-details.html"]');
    if (!a) return;
    var host = a.closest(".card, .pager a");
    var stage = host ? host.querySelector(".stage") : null;
    document.querySelectorAll('[style*="view-transition-name"]').forEach(function (el) { el.style.viewTransitionName = ""; });
    if (stage) stage.style.viewTransitionName = "project-stage";
  });

  /* ---------- Misc ---------- */
  document.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
  onScroll();
  if (hasGsap) window.addEventListener("load", function () { ScrollTrigger.refresh(); });
})();
