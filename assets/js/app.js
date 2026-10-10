/* =====================================================================
   Bayu Biantara — Portfolio interactions
   Vanilla JS, no dependencies. Respects prefers-reduced-motion.
   ===================================================================== */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia("(pointer: fine)").matches;

  /* ---------- Preloader ---------- */
  var preloader = document.querySelector(".preloader");
  var startedAt = Date.now();

  var counter = preloader ? preloader.querySelector(".preloader__count") : null;
  if (counter && !reduceMotion) {
    var c0 = Date.now();
    var tickCount = function () {
      var p = Math.min(1, (Date.now() - c0) / 850);
      counter.textContent = Math.round(p * 100);
      if (p < 1) requestAnimationFrame(tickCount);
    };
    requestAnimationFrame(tickCount);
  }

  function hidePreloader() {
    if (!preloader) return;
    var elapsed = Date.now() - startedAt;
    var wait = Math.max(0, 900 - elapsed);
    setTimeout(function () {
      if (counter) counter.textContent = "100";
      preloader.classList.add("is-done");
      document.body.classList.add("is-ready");
    }, reduceMotion ? 0 : wait);
  }

  if (document.readyState === "complete") hidePreloader();
  else window.addEventListener("load", hidePreloader);

  /* ---------- Header ---------- */
  var header = document.querySelector(".site-header");
  var toTop = document.querySelector(".to-top");

  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    if (header) header.classList.toggle("is-scrolled", y > 24);
    if (toTop) toTop.classList.toggle("is-visible", y > 600);
    runParallax(y);
  }

  window.addEventListener("scroll", onScroll, { passive: true });

  if (toTop) {
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    });
  }

  /* ---------- Mobile menu ---------- */
  var toggle = document.querySelector(".nav-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var open = document.body.classList.toggle("menu-open");
      document.body.classList.toggle("is-locked", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    document.querySelectorAll(".site-nav a").forEach(function (a) {
      a.addEventListener("click", function () {
        document.body.classList.remove("menu-open", "is-locked");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- Active nav link ---------- */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".site-nav a[href^='#']"));
  var sections = navLinks
    .map(function (a) {
      return document.querySelector(a.getAttribute("href"));
    })
    .filter(Boolean);

  if (sections.length && "IntersectionObserver" in window) {
    var navObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          navLinks.forEach(function (a) {
            a.classList.toggle("is-active", a.getAttribute("href") === "#" + entry.target.id);
          });
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach(function (s) {
      navObserver.observe(s);
    });
  }

  /* ---------- Hero title word reveal ---------- */
  var heroTitle = document.querySelector(".hero__title");
  if (heroTitle && !heroTitle.dataset.split) {
    heroTitle.dataset.split = "1";
    var index = 0;
    Array.prototype.slice.call(heroTitle.childNodes).forEach(function (node) {
      if (node.nodeType === 3) {
        var frag = document.createDocumentFragment();
        node.textContent.split(/(\s+)/).forEach(function (part) {
          if (!part) return;
          if (/^\s+$/.test(part)) {
            frag.appendChild(document.createTextNode(" "));
            return;
          }
          var w = document.createElement("span");
          w.className = "word";
          var inner = document.createElement("span");
          inner.style.setProperty("--i", index++);
          inner.textContent = part;
          w.appendChild(inner);
          frag.appendChild(w);
        });
        heroTitle.replaceChild(frag, node);
      } else if (node.nodeType === 1 && !node.classList.contains("hero__role")) {
        var w2 = document.createElement("span");
        w2.className = "word";
        var inner2 = document.createElement("span");
        inner2.style.setProperty("--i", index++);
        while (node.firstChild) inner2.appendChild(node.firstChild);
        node.appendChild(inner2);
        node.parentNode.insertBefore(w2, node);
        w2.appendChild(node);
      } else if (node.nodeType === 1) {
        node.style.setProperty("--i", index++);
      }
    });
  }

  /* ---------- Typing effect ---------- */
  var typed = document.querySelector("[data-typed]");
  if (typed) {
    var roles = [];
    try {
      roles = JSON.parse(typed.getAttribute("data-typed"));
    } catch (e) {
      roles = [typed.textContent];
    }
    var target = typed.querySelector(".typed-text") || typed;
    var cursor = document.createElement("span");
    cursor.className = "typed-cursor";
    typed.appendChild(cursor);

    // Lock the width to the longest role so the heading does not reflow while typing.
    var probe = document.createElement("span");
    probe.style.visibility = "hidden";
    probe.style.position = "absolute";
    probe.style.whiteSpace = "nowrap";
    typed.appendChild(probe);
    var widest = 0;
    roles.forEach(function (r) {
      probe.textContent = r;
      widest = Math.max(widest, probe.offsetWidth);
    });
    typed.removeChild(probe);
    if (widest) {
      typed.style.display = "inline-block";
      typed.style.minWidth = widest + 4 + "px";
    }

    if (reduceMotion) {
      target.textContent = roles[0];
    } else {
      var ri = 0;
      var ci = 0;
      var deleting = false;

      var tick = function () {
        var word = roles[ri];
        if (!deleting) {
          ci++;
          target.textContent = word.slice(0, ci);
          if (ci === word.length) {
            deleting = true;
            return setTimeout(tick, 2000);
          }
          return setTimeout(tick, 55 + Math.random() * 45);
        }
        ci--;
        target.textContent = word.slice(0, ci);
        if (ci === 0) {
          deleting = false;
          ri = (ri + 1) % roles.length;
          return setTimeout(tick, 400);
        }
        return setTimeout(tick, 30);
      };

      target.textContent = "";
      setTimeout(tick, 1300);
    }
  }

  /* ---------- Scroll reveal ---------- */
  var revealTargets = document.querySelectorAll(
    "[data-reveal], .section__title, .timeline, .about__visual"
  );

  if ("IntersectionObserver" in window && !reduceMotion) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    revealTargets.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    revealTargets.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* ---------- Parallax decorations ---------- */
  var parallaxEls = Array.prototype.slice.call(document.querySelectorAll("[data-parallax]"));

  function runParallax(y) {
    if (reduceMotion || !parallaxEls.length || window.ScrollTrigger) return;
    var vh = window.innerHeight;
    parallaxEls.forEach(function (el) {
      var rect = el.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > vh) return;
      var speed = parseFloat(el.getAttribute("data-parallax")) || 0.2;
      var center = rect.top + rect.height / 2 - vh / 2;
      el.style.transform = "translate3d(0," + (-center * speed).toFixed(1) + "px,0)";
    });
  }

  /* ---------- Tilt on cards ---------- */
  if (finePointer && !reduceMotion) {
    document.querySelectorAll("[data-tilt]").forEach(function (card) {
      var max = parseFloat(card.getAttribute("data-tilt")) || 6;
      card.addEventListener("mousemove", function (e) {
        var r = card.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform =
          "perspective(900px) rotateX(" + (-py * max).toFixed(2) + "deg) rotateY(" +
          (px * max).toFixed(2) + "deg) translateY(-4px)";
      });
      card.addEventListener("mouseleave", function () {
        card.style.transform = "";
      });
    });
  }

  /* ---------- Cursor glow ---------- */
  var glow = document.querySelector(".cursor-glow");
  if (glow && finePointer && !reduceMotion) {
    var gx = window.innerWidth / 2;
    var gy = window.innerHeight / 2;
    var tx = gx;
    var ty = gy;
    var raf = null;

    var animateGlow = function () {
      gx += (tx - gx) * 0.12;
      gy += (ty - gy) * 0.12;
      glow.style.transform = "translate(" + gx.toFixed(1) + "px," + gy.toFixed(1) + "px) translate(-50%,-50%)";
      if (Math.abs(tx - gx) > 0.5 || Math.abs(ty - gy) > 0.5) raf = requestAnimationFrame(animateGlow);
      else raf = null;
    };

    window.addEventListener("mousemove", function (e) {
      tx = e.clientX;
      ty = e.clientY;
      document.body.classList.add("has-pointer");
      if (!raf) raf = requestAnimationFrame(animateGlow);
    });
  }

  /* ---------- Counters ---------- */
  var counters = document.querySelectorAll("[data-count]");
  if (counters.length && "IntersectionObserver" in window) {
    var countObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var el = entry.target;
          var end = parseInt(el.getAttribute("data-count"), 10) || 0;
          countObserver.unobserve(el);
          if (reduceMotion) {
            el.textContent = end;
            return;
          }
          var start = null;
          var dur = 1200;
          var step = function (ts) {
            if (!start) start = ts;
            var p = Math.min(1, (ts - start) / dur);
            var eased = 1 - Math.pow(1 - p, 3);
            el.textContent = Math.round(end * eased);
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach(function (c) {
      countObserver.observe(c);
    });
  }

  /* ---------- Lightbox ---------- */
  var lightbox = document.querySelector(".lightbox");
  if (lightbox) {
    var lbImg = lightbox.querySelector("img");
    var closeLb = function () {
      lightbox.classList.remove("is-open");
      document.body.classList.remove("is-locked");
    };
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
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeLb();
    });
  }

  /* ---------- Footer year ---------- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  onScroll();
})();
