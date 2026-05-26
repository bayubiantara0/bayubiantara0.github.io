# Mobile Bottom Navigation Design

## Summary
Add an app-like mobile navigation experience to the static portfolio homepage by replacing the current mobile hamburger interaction with a fixed bottom navigation on `index.html`. Keep the 5 main navigation targets unchanged: Services, Projects, Resume, Skills, and Contact. Desktop behavior remains unchanged, and the implementation must stay compatible with GitHub Pages.

## Goals
- Make the mobile homepage feel more like an app.
- Keep the 5 current primary navigation targets.
- Remove dependence on the current hamburger-first mobile navigation pattern for the homepage.
- Preserve static HTML/CSS/JS deployment compatibility for GitHub Pages.

## Non-Goals
- Do not redesign desktop navigation behavior.
- Do not add framework dependencies.
- Do not add a build step.
- Do not add a bottom navigation to `project-details.html`.

## Scope
### Page in scope
- `index.html`

### Supporting files
- `assets/css/main.css`
- `assets/css/responsive.css`
- `assets/css/theme-toggle.css`
- `assets/js/main.js` if active-state behavior needs lightweight JS support

## Design Direction
### Mobile Navigation
- Replace the current mobile UX emphasis on the hamburger menu with a bottom navigation bar.
- The bottom nav is fixed at the bottom on mobile and tablet breakpoints.
- It contains 5 items:
  - Services
  - Projects
  - Resume
  - Skills
  - Contact
- Each item uses an icon plus a short label.
- The active item should visually reflect the current section in view.

### Visual Style
- Use the same premium visual language already established:
  - rounded shell
  - blur / semi-transparent surface
  - light and dark theme support
  - modern active-state highlight
- The component should feel like an app dock/tab bar rather than a website footer menu.

### Mobile Section Treatment
- Mobile spacing should be tightened slightly so sections feel more screen-native.
- Cards and panels should feel more compact and rounded.
- Extra bottom padding must be added so the bottom nav does not cover content.

## Behavior
- On desktop: existing top navigation remains as-is.
- On mobile/tablet: bottom nav becomes the main in-page navigation.
- Tapping an item scrolls to the section anchor.
- The current section updates the active nav item as the user scrolls.

## Technical Constraints
- Must work as a static site on GitHub Pages.
- Must not rely on Next.js, React, or `next/font`.
- Must not require a bundler.
- Must not break existing anchor navigation.

## Recommended Approach
- Add the bottom nav markup directly to `index.html`.
- Hide the hamburger/menu-bar on mobile once bottom nav is present.
- Keep the desktop nav untouched.
- Use lightweight JS only if needed to maintain accurate active-section highlighting.

## Acceptance Criteria
- `index.html` shows a fixed bottom nav on mobile and tablet.
- The bottom nav contains 5 items for the existing primary sections.
- The active item updates as the visible section changes.
- The bottom nav does not cover important content.
- Desktop navigation remains unchanged.
- The site remains GitHub Pages compatible.
