# CRM-Inspired Portfolio Refresh Design

## Summary
Refresh the existing static portfolio website so its visual presentation takes inspiration from `https://shadcn-crm-dashboard.vercel.app/#home`, specifically the typography feel, background atmosphere, and navbar style. The site must remain a static HTML/CSS site compatible with GitHub Pages and must preserve the current content structure.

## Goals
- Improve the visual quality of all existing pages.
- Keep the current content and section structure largely intact.
- Apply a more premium, product-oriented look through typography, background layering, and navigation styling.
- Keep deployment simple for GitHub Pages with no build step.

## Non-Goals
- Do not migrate to React, Next.js, Tailwind, or shadcn/ui.
- Do not turn the portfolio into an application dashboard.
- Do not rewrite site content or significantly change information architecture.
- Do not introduce a bundler or framework dependency.

## Scope
### Pages
- `index.html`
- `project-details.html`

### Assets
- CSS updates primarily in:
  - `assets/css/main.css`
  - `assets/css/responsive.css`
  - `assets/css/theme-toggle.css` if needed
- Optional support changes in shared JS only if required for navbar behavior consistency.

## Design Direction
### 1. Typography
Use a cleaner, more modern typographic hierarchy inspired by the reference site:
- Stronger, more deliberate heading scale.
- Cleaner body text rhythm and spacing.
- More polished treatment for labels, navigation items, metadata, and badges.
- The resulting look should feel modern SaaS/product-inspired while still fitting a personal portfolio.

### 2. Background System
Replace the flatter current presentation with a layered dark-first visual system inspired by the reference:
- Dark background base with subtle gradients.
- Soft glow or blur accents used sparingly.
- Panel/surface contrast for major sections.
- Thin borders and restrained shadows to separate surfaces.
- Keep the background elegant and lightweight, avoiding noisy decoration.

### 3. Navbar
Refresh the navbar to feel closer to the reference style while preserving current navigation links:
- Floating or visually detached sticky navbar.
- Semi-transparent background with blur treatment.
- Rounded outer container.
- Improved spacing and hover/active states.
- Consistent styling on both homepage and project detail page.

### 4. UI Surfaces
Unify core sections with a more premium card/panel language:
- Hero support surfaces.
- Service items.
- Project cards.
- Resume items.
- Skill items.
- Contact form and contact info cards.
- Project detail metadata, feature cards, and tech badges.

## Page-by-Page Plan
### `index.html`
Keep the current sections and content, but restyle presentation:
- Hero: stronger typography, cleaner spacing, better visual anchoring.
- Services: more premium list/card treatment.
- Projects: more polished card surfaces and metadata emphasis.
- Resume: cleaner card grouping and timeline readability.
- Skills: more consistent badge/card styling.
- Contact: better panel hierarchy and form presentation.
- Footer: visually aligned with the new navbar and background system.

### `project-details.html`
Keep the current project detail content and improve the visual system:
- More refined hero heading and subtitle treatment.
- Stronger project metadata card styling.
- Consistent surfaces for showcase image, features, tech stack, and back navigation.
- Match homepage visual tokens so the site feels like one system.

## Technical Constraints
- Must remain static HTML/CSS/JS.
- Must be deployable on GitHub Pages without a build step.
- Avoid adding external dependencies that complicate deployment.
- Prefer CSS-first changes over HTML restructuring unless minor structural wrappers are needed.
- Preserve current navigation targets and page behavior.
- Keep the light/dark toggle available, with light mode as the default initial theme.

## Implementation Notes
- The work should primarily use CSS overrides and selective HTML class adjustments.
- The redesign should be done as a visual refresh, not a full template rewrite.
- The existing theme toggle must be preserved.
- Light mode must remain the default initial theme.
- Both light and dark themes must use the same refreshed visual language, with the reference inspiration applied most strongly through typography, background treatment, and navbar styling.

## Risks
- Over-applying dashboard styling could make the site feel less like a portfolio.
- Large CSS overrides may create inconsistencies across sections if not normalized carefully.
- Because light mode must remain the default, the dark-first atmosphere from the reference will need adaptation so both themes still feel intentional.

## Recommended Approach
Adopt a soft CRM-inspired refresh:
- Keep content and section flow.
- Focus on typography, backgrounds, navbar, and component surfaces.
- Apply a premium dual-theme visual system, with light mode as default and dark mode as an equally polished alternative.
- Maintain GitHub Pages compatibility with no framework migration.

## Acceptance Criteria
- Both `index.html` and `project-details.html` visually feel more modern and premium.
- The new styling clearly reflects inspiration from the reference site's typography, background mood, and navbar behavior.
- The website remains fully static and GitHub Pages friendly.
- Existing content remains intact.
- Page-to-page styling is consistent.
- The light/dark toggle remains available.
- Light mode is the default initial theme.
- Both themes feel intentionally designed rather than one being a degraded fallback.
