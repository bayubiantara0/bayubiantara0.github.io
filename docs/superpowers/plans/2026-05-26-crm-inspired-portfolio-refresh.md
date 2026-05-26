# CRM-Inspired Portfolio Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refresh all existing public pages so they feel closer to the `shadcn-crm-dashboard` visual language in typography, background atmosphere, and navbar styling while remaining a static GitHub Pages site with light mode as the default and dark mode preserved.

**Architecture:** Keep the current HTML content and section structure, then apply the redesign through targeted HTML class cleanup and layered CSS overrides in the existing stylesheet system. Reuse the current theme toggle behavior, but tighten token consistency so both `index.html` and `project-details.html` share one visual system.

**Tech Stack:** Static HTML, CSS, vanilla JS, jQuery, Bootstrap utilities, existing theme toggle script

---

## File Structure Map

- `index.html`
  - Homepage markup for hero, services, projects, resume, skills, contact, footer, and inline theme toggle bootstrapping.
- `project-details.html`
  - Project detail markup that must visually match the homepage system.
- `assets/css/main.css`
  - Primary source of design tokens, component surfaces, section backgrounds, navbar styling, and cross-page visual system.
- `assets/css/responsive.css`
  - Responsive adjustments for the refreshed navbar, hero, cards, and project detail layout.
- `assets/css/theme-toggle.css`
  - Theme token overrides for light/dark behavior and toggle presentation.
- `assets/js/main.js`
  - Existing sticky header and mobile menu behavior; only touch if the new floating navbar needs behavior fixes.

## Verification Strategy

This repo has no `package.json`, no automated test runner, and no `npm run check` command available. Verification for this work must therefore be done through:
- direct browser smoke testing of `index.html` and `project-details.html`
- manual theme toggle verification in both directions
- mobile menu verification by resizing to tablet/mobile widths
- checking browser console for runtime errors

## Task 1: Align Homepage Markup For The New Visual System

**Files:**
- Modify: `index.html`
- Read for reference while editing: `assets/css/main.css`, `assets/css/theme-toggle.css`

- [ ] **Step 1: Add small structural hooks for the navbar and section surfaces in `index.html`**

Use the existing markup and only make minimal class-oriented changes so CSS can target the refreshed design cleanly. Expected edits include patterns like:

```html
<header class="tj-header-area header-absolute site-nav-shell">
```

```html
<header class="tj-header-area header-2 header-sticky sticky-out site-nav-shell">
```

```html
<section class="services-section section-panel" id="services-section">
```

```html
<section class="portfolio-section section-panel section-panel-muted" id="projects-section">
```

```html
<footer class="tj-footer-area footer-panel">
```

- [ ] **Step 2: Add navbar inner wrapper hooks without changing navigation content**

Wrap or retag existing navbar content so floating-pill styling can be applied consistently to both headers. Preserve all current links and toggle button behavior.

```html
<div class="container">
  <div class="row">
    <div class="col-12">
      <div class="nav-inner d-flex flex-wrap align-items-center">
        ...existing logo, email, menu, buttons...
      </div>
    </div>
  </div>
</div>
```

- [ ] **Step 3: Add visual utility hooks to homepage component groups that need premium surface treatment**

Keep content unchanged, but apply stable class names for hero, service, project, resume, skills, and contact sections.

```html
<div class="hero-content-box hero-copy" data-aos="fade-right" data-aos-delay="200">
```

```html
<div class="hero-visual-shell dashboard-surface" data-aos="fade-left" data-aos-delay="300">
```

```html
<div class="resume-item timeline-card" data-aos="fade-up" data-aos-delay="300">
```

```html
<div class="contact-form-box dashboard-surface" data-aos="fade-up" data-aos-delay="200">
```

- [ ] **Step 4: Manually smoke-check `index.html` markup for broken anchors or accidental content changes**

Open the file and confirm the existing anchors and content still exist:
- `#services-section`
- `#projects-section`
- `#resume-section`
- `#skills-section`
- `#contact-section`
- theme switch button markup

Expected: all original content remains, with only class/wrapper adjustments.

## Task 2: Align Project Detail Markup With The Same Design Tokens

**Files:**
- Modify: `project-details.html`
- Read for reference while editing: `assets/css/main.css`, `assets/css/theme-toggle.css`

- [ ] **Step 1: Apply the same navbar shell classes used on the homepage**

Mirror the homepage navbar structure so both pages share the same floating/sticky behavior.

```html
<header class="tj-header-area header-absolute site-nav-shell">
```

```html
<header class="tj-header-area header-2 header-sticky sticky-out site-nav-shell">
```

```html
<div class="nav-inner d-flex flex-wrap align-items-center">
  ...existing nav content...
</div>
```

- [ ] **Step 2: Add page-level hooks for project hero and content panels**

Keep content intact, only add the class hooks needed for styling.

```html
<section class="project-hero page-hero-shell">
```

```html
<section class="project-content-section section-panel">
```

```html
<div class="project-info-card dashboard-surface">
```

```html
<div class="feature-card dashboard-surface">
```

- [ ] **Step 3: Normalize project navigation and metadata hook names if needed**

Do not change labels or links; only make CSS targeting more robust.

```html
<div class="project-meta-tags meta-chip-row">
```

```html
<div class="project-nav project-nav-single project-nav-shell">
```

- [ ] **Step 4: Manually smoke-check `project-details.html` for retained navigation flow**

Confirm these remain unchanged:
- backlink to `index.html`
- section anchors pointing back to homepage sections
- theme switch button markup
- project content text and CTA

Expected: only presentation hooks changed.

## Task 3: Refresh Core Design Tokens, Typography, Backgrounds, And Navbar

**Files:**
- Modify: `assets/css/main.css`
- Reference only: `index.html`, `project-details.html`

- [ ] **Step 1: Update font imports and root tokens to push the site closer to the reference feel while keeping light mode default**

Replace the current font setup with a more modern sans pairing and cleaner token system. Example direction:

```css
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Manrope:wght@500;600;700;800&display=swap");

:root {
  --tj-ff-body: "Inter", sans-serif;
  --tj-ff-heading: "Manrope", sans-serif;
  --tj-body: #526075;
  --tj-white: #0f172a;
  --tj-black-2: #f7f9fc;
  --tj-heading-primary: #0b1220;
  --tj-theme-primary: #2563eb;
  --tj-theme-secondary: #06b6d4;
  --tj-theme-accent-1: #f8fbff;
  --tj-theme-accent-2: rgba(255, 255, 255, 0.82);
}
```

- [ ] **Step 2: Replace the flat page background with a layered light-first background system**

Add reusable page-level background rules for a premium SaaS-like atmosphere.

```css
body {
  background:
    radial-gradient(circle at top left, rgba(37, 99, 235, 0.14), transparent 28%),
    radial-gradient(circle at top right, rgba(6, 182, 212, 0.12), transparent 24%),
    linear-gradient(180deg, #f8fbff 0%, #eef4fb 100%);
  color: var(--tj-body);
}

.section-panel {
  position: relative;
}

.section-panel::before {
  content: "";
  position: absolute;
  inset: 18px;
  border-radius: 32px;
  background: rgba(255, 255, 255, 0.54);
  border: 1px solid rgba(148, 163, 184, 0.16);
  z-index: 0;
}

.section-panel > .container {
  position: relative;
  z-index: 1;
}
```

- [ ] **Step 3: Rebuild navbar presentation into a floating blurred container while preserving existing sticky behavior**

Style the new `site-nav-shell` and `nav-inner` hooks, keeping the current markup and JS logic compatible.

```css
.site-nav-shell {
  background: transparent;
  border: none;
}

.site-nav-shell .nav-inner {
  background: rgba(255, 255, 255, 0.72);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(148, 163, 184, 0.18);
  box-shadow: 0 24px 60px -34px rgba(15, 23, 42, 0.28);
  border-radius: 22px;
  padding: 14px 18px;
}

.tj-header-area.header-2.site-nav-shell .nav-inner {
  background: rgba(255, 255, 255, 0.84);
}
```

- [ ] **Step 4: Tighten typography hierarchy for headings, body text, badges, nav items, and chips**

Apply a more deliberate type scale and spacing.

```css
body {
  font-size: 16px;
  line-height: 1.7;
}

.hero-title,
.project-title {
  letter-spacing: -0.04em;
  font-weight: 800;
}

.tj-header-area .header-menu ul li a,
.section-kicker,
.hero-badge,
.project-meta-tags .tag {
  letter-spacing: -0.01em;
  font-weight: 600;
}
```

- [ ] **Step 5: Restyle section surfaces and cards to use one shared visual language**

Refine existing card components instead of inventing new ones.

```css
.dashboard-surface,
.hero-metric-card,
.resume-widget .resume-item,
.skills-widget .skill-inner,
.contact-form-box,
.project-info-card,
.feature-card,
.tech-badge,
.project-nav a,
.portfolio-box .portfolio-item {
  background: rgba(255, 255, 255, 0.78);
  border: 1px solid rgba(148, 163, 184, 0.16);
  box-shadow: 0 24px 60px -40px rgba(15, 23, 42, 0.24);
  backdrop-filter: blur(18px);
}
```

- [ ] **Step 6: Refresh hover states so the site feels cohesive and premium**

Keep motion restrained.

```css
.resume-widget .resume-item:hover,
.skills-widget .skill-item:hover .skill-inner,
.portfolio-box .portfolio-item:hover,
.project-nav a:hover,
.feature-card:hover {
  transform: translateY(-6px);
  border-color: rgba(37, 99, 235, 0.28);
  box-shadow: 0 28px 65px -38px rgba(37, 99, 235, 0.28);
}
```

- [ ] **Step 7: Manually review both pages in a browser for the light theme baseline**

Open `index.html` and `project-details.html` with no `theme` key set in `localStorage`.

Expected:
- light mode loads by default
- typography feels updated
- navbar appears like a floating blurred shell
- background layers render without obscuring content
- no layout collapse on desktop widths

## Task 4: Polish Dark Theme And Toggle Behavior Without Losing Light Default

**Files:**
- Modify: `assets/css/theme-toggle.css`
- Optional small edit if needed: `index.html`, `project-details.html` inline theme script

- [ ] **Step 1: Redefine dark theme tokens so they mirror the new visual system instead of acting like a separate old theme**

Keep the same toggle mechanism, but upgrade the palette.

```css
[data-theme="dark"] {
  --tj-body: #b7c2d3;
  --tj-white: #f8fbff;
  --tj-black-2: #07111f;
  --tj-heading-primary: #f8fbff;
  --tj-theme-primary: #60a5fa;
  --tj-theme-secondary: #22d3ee;
  --tj-theme-accent-1: #07111f;
  --tj-theme-accent-2: rgba(10, 19, 33, 0.82);
}
```

- [ ] **Step 2: Add dark-mode equivalents for navbar shell, background glows, section panels, and cards**

Make dark mode feel intentionally designed, not merely inverted.

```css
[data-theme="dark"] body {
  background:
    radial-gradient(circle at top left, rgba(96, 165, 250, 0.14), transparent 28%),
    radial-gradient(circle at top right, rgba(34, 211, 238, 0.12), transparent 24%),
    linear-gradient(180deg, #07111f 0%, #0b1527 100%);
}

[data-theme="dark"] .site-nav-shell .nav-inner,
[data-theme="dark"] .dashboard-surface,
[data-theme="dark"] .hero-metric-card,
[data-theme="dark"] .resume-widget .resume-item,
[data-theme="dark"] .skills-widget .skill-inner,
[data-theme="dark"] .project-info-card,
[data-theme="dark"] .feature-card,
[data-theme="dark"] .tech-badge,
[data-theme="dark"] .project-nav a,
[data-theme="dark"] .contact-form-box {
  background: rgba(10, 19, 33, 0.74);
  border-color: rgba(96, 165, 250, 0.16);
}
```

- [ ] **Step 3: Restyle the theme toggle button to match the new navbar component language**

Use the existing `.theme-switch` markup.

```css
.theme-switch {
  width: 46px;
  height: 46px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.76);
  border: 1px solid rgba(148, 163, 184, 0.18);
  box-shadow: 0 18px 40px -28px rgba(15, 23, 42, 0.22);
}

[data-theme="dark"] .theme-switch {
  background: rgba(10, 19, 33, 0.82);
  border-color: rgba(96, 165, 250, 0.18);
}
```

- [ ] **Step 4: Confirm the inline theme bootstrapping still defaults to light mode**

The homepage and detail page should keep logic equivalent to:

```html
<script>
  function initTheme() {
    let theme = localStorage.getItem("theme");
    if (!theme) theme = "light";
    document.documentElement.setAttribute("data-theme", theme);
  }
</script>
```

Expected: first load is light; a previously chosen dark mode still persists.

- [ ] **Step 5: Manually verify toggle behavior on both pages**

Check this exact sequence:
1. Load page with no `localStorage.theme` set → expect light mode.
2. Click toggle once → expect dark mode.
3. Refresh → expect dark mode persisted.
4. Click toggle again → expect light mode.
5. Navigate from `index.html` to `project-details.html` → expect same persisted theme.

## Task 5: Tune Responsive Behavior For Mobile Menu, Floating Navbar, And Cards

**Files:**
- Modify: `assets/css/responsive.css`
- Optional if behavior breaks: `assets/js/main.js`

- [ ] **Step 1: Update tablet and mobile navbar rules so the floating shell still works when the menu opens**

Adjust the responsive navbar to avoid a broken transparent overlay.

```css
@media only screen and (max-width: 991px) {
  .site-nav-shell .nav-inner {
    padding: 12px 14px;
    border-radius: 18px;
  }

  .tj-header-area .header-menu {
    margin-top: 12px;
    border-radius: 20px;
    background: rgba(255, 255, 255, 0.92);
    border: 1px solid rgba(148, 163, 184, 0.16);
    box-shadow: 0 24px 60px -34px rgba(15, 23, 42, 0.28);
  }

  [data-theme="dark"] .tj-header-area .header-menu {
    background: rgba(10, 19, 33, 0.94);
    border-color: rgba(96, 165, 250, 0.16);
  }
}
```

- [ ] **Step 2: Tune homepage spacing and card stacking for tablet/mobile**

Focus on the hero, metric cards, services, projects, and contact panels.

```css
@media only screen and (max-width: 767px) {
  .hero-clean {
    padding: 138px 0 64px;
  }

  .hero-metric-grid,
  .project-nav {
    grid-template-columns: 1fr;
    flex-direction: column;
  }

  .portfolio-box .portfolio-item,
  .contact-form-box,
  .project-info-card,
  .feature-card {
    border-radius: 22px;
  }
}
```

- [ ] **Step 3: Tune project detail responsiveness so metadata and feature cards remain balanced**

Preserve readability rather than trying to mimic desktop density.

```css
@media only screen and (max-width: 767px) {
  .project-title {
    font-size: 34px;
  }

  .project-meta-tags .tag,
  .tech-badge {
    width: 100%;
    justify-content: flex-start;
  }
}
```

- [ ] **Step 4: Only if necessary, patch sticky/mobile menu behavior in `assets/js/main.js`**

If the floating navbar causes flicker or the menu fails to close cleanly, keep JS changes minimal. The only acceptable kind of patch here is a targeted class cleanup like:

```js
$(".header-menu ul li a").on("click", function () {
  $(".menu-bar").removeClass("menu-bar-toggeled");
  $(".header-menu").removeClass("opened");
  $("body").removeClass("overflow-hidden");
});
```

Expected: no rewrite of the existing navigation script unless a specific bug is observed.

- [ ] **Step 5: Manually verify responsive states**

Check at least these widths in browser devtools:
- desktop around `1440px`
- tablet around `820px`
- mobile around `390px`

Expected:
- floating navbar still looks intentional
- mobile menu opens and closes cleanly
- cards do not overflow
- hero text remains readable
- project details stack correctly

## Task 6: Final Smoke Test And Delivery Notes

**Files:**
- Review only: `index.html`, `project-details.html`, `assets/css/main.css`, `assets/css/responsive.css`, `assets/css/theme-toggle.css`

- [ ] **Step 1: Run a final browser smoke test on both pages**

Check:
- no missing images
- no broken anchors
- no unreadable text in light mode
- no unreadable text in dark mode
- hover states look consistent
- navbar looks aligned on both pages

Expected: both pages feel like one design system.

- [ ] **Step 2: Open browser console on both pages and confirm no new runtime errors**

Expected:
- no JavaScript errors after load
- no errors after using theme toggle
- no errors after opening/closing mobile menu

- [ ] **Step 3: Review diff for scope discipline**

Confirm only these files were changed unless a specific bug required the JS patch:

```text
index.html
project-details.html
assets/css/main.css
assets/css/responsive.css
assets/css/theme-toggle.css
assets/js/main.js   # only if needed
docs/superpowers/specs/2026-05-26-crm-inspired-portfolio-refresh-design.md
docs/superpowers/plans/2026-05-26-crm-inspired-portfolio-refresh.md
```

- [ ] **Step 4: Prepare a concise completion summary for the user**

The final summary should state:
- which files changed
- that the site remains static and GitHub Pages compatible
- that light mode remains default
- that dark mode remains available
- any known follow-up opportunities, if observed
