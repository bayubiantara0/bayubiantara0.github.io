/* Interactive hero terminal. No dependencies. */
(function () {
  "use strict";

  var body = document.getElementById("term-body");
  var input = document.getElementById("term-input");
  var form = document.getElementById("term-form");
  var term = document.getElementById("hero-term");
  if (!body || !input || !form) return;

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var projects = window.PROJECTS || [];

  function esc(s) {
    return String(s).replace(/[&<>]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c];
    });
  }

  function line(html, cls) {
    var el = document.createElement("div");
    el.className = "term__line" + (cls ? " " + cls : "");
    el.innerHTML = html;
    body.appendChild(el);
    body.scrollTop = body.scrollHeight;
    return el;
  }

  function prompt(cmd) {
    return line('<span class="term__ps">bayu@portfolio:~$</span> <span class="term__cmd">' + esc(cmd) + "</span>", "is-prompt");
  }

  function go(id) {
    var el = document.querySelector(id);
    if (!el) return;
    if (window.__lenis) window.__lenis.scrollTo(el, { offset: -80, duration: 1.2 });
    else el.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
  }

  var commands = {
    help: function () {
      return [
        '<span class="k">help</span>        list commands',
        '<span class="k">whoami</span>      who is this guy',
        '<span class="k">skills</span>      stack and tools',
        '<span class="k">projects</span>    list projects  (open &lt;n&gt; to view one)',
        '<span class="k">experience</span>  work history',
        '<span class="k">contact</span>     email, whatsapp, linkedin',
        '<span class="k">cv</span>          download the CV',
        '<span class="k">github</span>      open github profile',
        '<span class="k">clear</span>       clear the screen'
      ];
    },
    whoami: function () {
      return [
        "Bayu Biantara — software engineer, Subang, Indonesia.",
        "Backend, databases, mobile, and the servers they run on.",
        'Currently at <span class="k">PT Fuji Seat Indonesia</span> building a manufacturing ERP.'
      ];
    },
    skills: function () {
      return [
        '<span class="k">languages</span>   PHP · JavaScript · TypeScript · Dart · SQL',
        '<span class="k">frameworks</span>  Laravel · CodeIgniter · NestJS · Express · React · Vue · Flutter',
        '<span class="k">databases</span>   MySQL · PostgreSQL · SQL Server',
        '<span class="k">ops</span>         Docker · CI/CD · Linux · Nginx',
        '<span class="k">tools</span>       VS Code · GitHub · DBeaver · Postman · Termius'
      ];
    },
    projects: function () {
      go("#projects");
      return projects.map(function (p, i) {
        return '<span class="k">' + (i < 9 ? "0" : "") + (i + 1) + "</span>  " + esc(p.title) + '  <span class="d">' + esc(p.tags.slice(0, 3).join(", ")) + "</span>";
      }).concat(['<span class="d">type</span> open &lt;number&gt; <span class="d">to view a project</span>']);
    },
    open: function (arg) {
      var n = parseInt(arg, 10);
      var p = projects[n - 1] || projects.filter(function (x) { return x.slug === arg; })[0];
      if (!p) return ['<span class="e">no such project:</span> ' + esc(arg || "") + '  (try <span class="k">projects</span>)'];
      setTimeout(function () { location.href = "project-details.html?project=" + p.slug; }, 350);
      return ["opening " + esc(p.title) + " …"];
    },
    experience: function () {
      go("#experience");
      return [
        '<span class="k">2026 — now</span>   Software Engineer · PT Fuji Seat Indonesia',
        '<span class="k">2024 — 2026</span>  Programmer Specialist · PCP Express',
        '<span class="k">2024</span>         Backend Developer · PT Digital Access Indonesia',
        '<span class="k">2023 — 2024</span>  HR Information System · PT Uni-Charm Indonesia'
      ];
    },
    contact: function () {
      go("#contacts");
      return [
        '<span class="k">email</span>     <a href="mailto:bayubiantara0@gmail.com">bayubiantara0@gmail.com</a>',
        '<span class="k">whatsapp</span>  <a href="https://wa.me/6285156328213" target="_blank" rel="noreferrer">+62 851 5632 8213</a>',
        '<span class="k">linkedin</span>  <a href="https://www.linkedin.com/in/bayu-biantara/" target="_blank" rel="noreferrer">linkedin.com/in/bayu-biantara</a>'
      ];
    },
    cv: function () {
      window.open("CV_Bayu Biantara.pdf", "_blank", "noopener");
      return ["opening CV_Bayu Biantara.pdf …"];
    },
    github: function () {
      window.open("https://github.com/bayubiantara0", "_blank", "noopener");
      return ["opening github.com/bayubiantara0 …"];
    },
    linkedin: function () {
      window.open("https://www.linkedin.com/in/bayu-biantara/", "_blank", "noopener");
      return ["opening linkedin …"];
    },
    about: function () { go("#about-me"); return ["scrolling to #about-me"]; },
    clear: function () { body.innerHTML = ""; return []; },
    date: function () { return [new Date().toString()]; },
    echo: function (arg) { return [esc(arg || "")]; },
    pwd: function () { return ["/home/bayu/portfolio"]; },
    ls: function () { return ["projects/  skills.txt  experience.md  contact.txt  CV_Bayu Biantara.pdf"]; },
    sudo: function () { return ['<span class="e">bayu is not in the sudoers file. This incident will be reported.</span>']; }
  };
  commands.exp = commands.experience;
  commands.cat = function (arg) {
    var map = { "skills.txt": "skills", "experience.md": "experience", "contact.txt": "contact" };
    return map[arg] ? commands[map[arg]]() : ['<span class="e">cat:</span> ' + esc(arg || "") + ": No such file"];
  };

  function run(raw) {
    var parts = raw.trim().split(/\s+/);
    var cmd = (parts.shift() || "").toLowerCase();
    var arg = parts.join(" ");
    if (!cmd) return;
    prompt(raw);
    var fn = commands[cmd];
    var out = fn ? fn(arg) : ['<span class="e">command not found:</span> ' + esc(cmd) + '  (try <span class="k">help</span>)'];
    out.forEach(function (l) { line(l); });
  }

  /* ---------- boot sequence ---------- */
  var booted = false;
  function type(text, cb) {
    var el = line('<span class="term__ps">bayu@portfolio:~$</span> <span class="term__cmd"></span>', "is-prompt");
    var target = el.querySelector(".term__cmd");
    if (reduce) { target.textContent = text; return cb(); }
    var i = 0;
    (function step() {
      target.textContent = text.slice(0, ++i);
      if (i < text.length) setTimeout(step, 40 + Math.random() * 50);
      else setTimeout(cb, 250);
    })();
  }

  function boot() {
    if (booted) return;
    booted = true;
    var steps = [
      ["whoami", commands.whoami],
      ["cat skills.txt", commands.skills],
      ["ls projects/", function () {
        return [projects.slice(0, 6).map(function (p) { return p.slug + "/"; }).join("  ") + (projects.length > 6 ? "  …" : "")];
      }]
    ];
    var k = 0;
    (function next() {
      if (k >= steps.length) {
        line('<span class="d">type</span> <span class="k">help</span> <span class="d">to explore, or click anywhere here to start typing.</span>');
        return;
      }
      var s = steps[k++];
      type(s[0], function () {
        s[1]().forEach(function (l, i) {
          setTimeout(function () { line(l); }, reduce ? 0 : i * 60);
        });
        setTimeout(next, reduce ? 0 : 600);
      });
    })();
  }

  var startDelay = document.body.classList.contains("is-ready") ? 400 : 1600;
  setTimeout(boot, startDelay);

  /* ---------- input ---------- */
  var history = [];
  var hIdx = -1;
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var v = input.value;
    if (v.trim()) { history.unshift(v); hIdx = -1; }
    input.value = "";
    run(v);
  });
  input.addEventListener("keydown", function (e) {
    if (e.key === "ArrowUp") { hIdx = Math.min(history.length - 1, hIdx + 1); input.value = history[hIdx] || ""; e.preventDefault(); }
    if (e.key === "ArrowDown") { hIdx = Math.max(-1, hIdx - 1); input.value = hIdx < 0 ? "" : history[hIdx]; e.preventDefault(); }
    if (e.key === "Tab") {
      var v = input.value.toLowerCase();
      var m = Object.keys(commands).filter(function (c) { return v && c.indexOf(v) === 0; });
      if (m.length === 1) { input.value = m[0] + " "; }
      e.preventDefault();
    }
    if (e.key === "l" && e.ctrlKey) { commands.clear(); e.preventDefault(); }
  });
  term.addEventListener("click", function (e) {
    if (e.target.closest("a")) return;
    input.focus({ preventScroll: true });
  });
  input.addEventListener("focus", function () { term.classList.add("is-focused"); });
  input.addEventListener("blur", function () { term.classList.remove("is-focused"); });
})();
