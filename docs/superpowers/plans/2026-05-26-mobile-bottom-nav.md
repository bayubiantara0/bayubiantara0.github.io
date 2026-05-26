# Mobile Bottom Navigation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add an app-like fixed bottom navigation to `index.html` on mobile/tablet while keeping desktop navigation unchanged and preserving GitHub Pages compatibility.

**Architecture:** Add static bottom-nav markup to the homepage, then use responsive CSS to hide the hamburger/menu overlay on smaller breakpoints and style the new dock-like navigation. Use lightweight JS in `assets/js/main.js` only to keep the active mobile nav item synchronized with the visible section.

**Tech Stack:** Static HTML, CSS, vanilla JS, jQuery, existing one-page anchors

---

## File Structure Map

- `index.html`
  - Add the bottom navigation markup with 5 links to the existing homepage sections.
- `assets/css/main.css`
  - Add shared visual styles for the bottom nav component.
- `assets/css/responsive.css`
  - Control when the bottom nav appears and adjust mobile spacing/panel sizing.
- `assets/css/theme-toggle.css`
  - Ensure light/dark theme consistency for the mobile nav.
- `assets/js/main.js`
  - Add lightweight section tracking for active mobile nav state if needed.

## Verification Strategy

This repo has no automated test runner. Verification must use:
- anchor navigation smoke checks on `index.html`
- mobile responsive checks
- light/dark toggle checks with the bottom nav visible
- browser console check for JS errors

### Task 1: Add Homepage Bottom Navigation Markup

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Add the fixed mobile nav markup near the end of `index.html` before the closing `</body>`**

```html
<nav class="mobile-bottom-nav" aria-label="Mobile Section Navigation">
  <a href="#services-section" class="mobile-bottom-nav__item is-active" data-section="services-section">
    <i class="fa-regular fa-briefcase"></i>
    <span>Services</span>
  </a>
  <a href="#projects-section" class="mobile-bottom-nav__item" data-section="projects-section">
    <i class="fa-regular fa-grid-2"></i>
    <span>Projects</span>
  </a>
  <a href="#resume-section" class="mobile-bottom-nav__item" data-section="resume-section">
    <i class="fa-regular fa-file-lines"></i>
    <span>Resume</span>
  </a>
  <a href="#skills-section" class="mobile-bottom-nav__item" data-section="skills-section">
    <i class="fa-regular fa-sparkles"></i>
    <span>Skills</span>
  </a>
  <a href="#contact-section" class="mobile-bottom-nav__item" data-section="contact-section">
    <i class="fa-regular fa-envelope"></i>
    <span>Contact</span>
  </a>
</nav>
```

- [ ] **Step 2: Verify the anchor IDs already exist in `index.html`**

Check these IDs remain present:
- `services-section`
- `projects-section`
- `resume-section`
- `skills-section`
- `contact-section`

Expected: all links target existing sections with no content changes.

### Task 2: Style The Mobile Nav And App-Like Mobile Layout

**Files:**
- Modify: `assets/css/main.css`
- Modify: `assets/css/responsive.css`
- Modify: `assets/css/theme-toggle.css`

- [ ] **Step 1: Add shared base styles for the bottom nav component in `assets/css/main.css`**

```css
.mobile-bottom-nav {
  display: none;
}

.mobile-bottom-nav__item {
  text-decoration: none;
}
```

- [ ] **Step 2: Add responsive mobile/tablet styles in `assets/css/responsive.css`**

```css
@media only screen and (max-width: 991px) {
  .menu-bar,
  .tj-header-area .header-menu {
    display: none !important;
  }

  .mobile-bottom-nav {
    position: fixed;
    left: 12px;
    right: 12px;
    bottom: 12px;
    z-index: 140;
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: 8px;
    padding: 10px;
    border-radius: 24px;
  }

  body,
  .site-content {
    padding-bottom: 110px;
  }
}
```

- [ ] **Step 3: Add compact app-like card and section tuning in `assets/css/responsive.css`**

```css
@media only screen and (max-width: 991px) {
  .hero-clean {
    padding-bottom: 56px;
  }

  .hero-visual-shell,
  .contact-form-box,
  .project-info-card,
  .feature-card,
  .portfolio-box .portfolio-item,
  .resume-widget .resume-item,
  .skills-widget .skill-inner {
    border-radius: 22px;
  }
}
```

- [ ] **Step 4: Add light/dark theme treatment for the bottom nav in `assets/css/theme-toggle.css`**

```css
.mobile-bottom-nav {
  background: rgba(255, 255, 255, 0.78);
  border: 1px solid rgba(148, 163, 184, 0.18);
  backdrop-filter: blur(18px);
}

[data-theme="dark"] .mobile-bottom-nav {
  background: rgba(7, 17, 31, 0.8);
  border-color: rgba(96, 165, 250, 0.18);
}
```

### Task 3: Add Active-State Sync For Mobile Section Navigation

**Files:**
- Modify: `assets/js/main.js`

- [ ] **Step 1: Add lightweight JS to update the active bottom nav item based on the visible section**

```js
function updateMobileBottomNav() {
  const links = document.querySelectorAll(".mobile-bottom-nav__item");
  const sections = Array.from(links)
    .map((link) => document.getElementById(link.dataset.section))
    .filter(Boolean);

  if (!links.length || !sections.length) return;

  const scrollY = window.scrollY + window.innerHeight * 0.35;
  let activeId = sections[0].id;

  sections.forEach((section) => {
    if (scrollY >= section.offsetTop) {
      activeId = section.id;
    }
  });

  links.forEach((link) => {
    link.classList.toggle("is-active", link.dataset.section === activeId);
  });
}
```

- [ ] **Step 2: Bind the updater on load and scroll without rewriting the existing navigation behavior**

```js
window.addEventListener("load", updateMobileBottomNav);
window.addEventListener("scroll", updateMobileBottomNav, { passive: true });
```

### Task 4: Manual Verification

**Files:**
- Review only: `index.html`, `assets/css/main.css`, `assets/css/responsive.css`, `assets/css/theme-toggle.css`, `assets/js/main.js`

- [ ] **Step 1: Check HTML/CSS patch integrity**

Run:
```bash
git diff --check -- index.html assets/css/main.css assets/css/responsive.css assets/css/theme-toggle.css assets/js/main.js
```
Expected: no patch or whitespace errors.

- [ ] **Step 2: Verify mobile navigation structure is present**

Run:
```bash
grep -n "mobile-bottom-nav" index.html assets/css/main.css assets/css/responsive.css assets/css/theme-toggle.css assets/js/main.js
```
Expected: bottom nav markup, styles, and active-state script are all present.

- [ ] **Step 3: Browser smoke-test on GitHub Pages-compatible static behavior**

Check in browser responsive mode:
- desktop: top nav remains normal, bottom nav hidden
- tablet/mobile: bottom nav visible, hamburger hidden
- tapping each bottom item scrolls correctly
- active state changes while scrolling
- bottom nav works in light and dark themes
- bottom nav does not cover final content

- [ ] **Step 4: Console check**

Expected: no new JavaScript errors after load, scroll, or theme toggle.
