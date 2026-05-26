# Portfolio Modernization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Merapikan dan memodernkan seluruh halaman portfolio statis agar konsisten, personal, dan siap dipakai di GitHub Pages tanpa build step tambahan.

**Architecture:** Perubahan dilakukan langsung pada HTML statis dan stylesheet global yang sudah ada. Fokus utamanya adalah menyatukan design language di semua halaman, memindahkan style page-specific dari inline ke stylesheet global, lalu memverifikasi bahwa navigasi, path asset, responsive layout, dan theme behavior tetap aman.

**Tech Stack:** HTML, CSS, JavaScript statis, Bootstrap utilities existing, AOS/WOW existing plugins

---

## File Structure

**Modify:**
- `index.html` — homepage portfolio, hero, section structure, CTA, project cards, contact section
- `blog.html` — list artikel/blog, header/footer branding, post cards, sidebar widgets, pagination
- `blog-details.html` — halaman artikel detail, breadcrumb, article layout, tags/share/navigation/comments/sidebar
- `project-details.html` — halaman detail project, pindahkan inline style, samakan komponen dengan global system
- `assets/css/main.css` — design tokens, global components, page-level shared styles, migrated project-detail styles
- `assets/css/responsive.css` — penyesuaian responsive untuk komponen yang diubah

**Create:**
- Tidak ada file produksi baru yang wajib

**Plan artifacts:**
- `docs/superpowers/specs/2026-05-25-portfolio-modernization-design.md`
- `docs/superpowers/plans/2026-05-25-portfolio-modernization.md`

---

### Task 1: Audit dan samakan branding + struktur global lintas halaman

**Files:**
- Modify: `index.html`
- Modify: `blog.html`
- Modify: `blog-details.html`
- Modify: `project-details.html`

- [ ] **Step 1: Samakan metadata dasar, favicon, logo path, header links, dan footer branding di semua halaman**

Pastikan pola seperti ini konsisten:

```html
<title>Bayu Biantara - Portfolio</title>
<link rel="apple-touch-icon" href="./assets/img/logo.png" />
<link rel="shortcut icon" type="image/png" href="./assets/img/logo.png" />
```

Gunakan navigasi global seperti ini di halaman non-home:

```html
<ul>
  <li><a href="index.html#services-section">Services</a></li>
  <li><a href="index.html#projects-section">Projects</a></li>
  <li><a href="index.html#resume-section">Resume</a></li>
  <li><a href="index.html#skills-section">Skills</a></li>
  <li><a href="index.html#contact-section">Contact</a></li>
</ul>
```

Gunakan footer branding seperti ini:

```html
<div class="copy-text">
  <p>&copy; 2025 Copyright by <a href="#" target="_blank">Bayu Biantara</a></p>
</div>
```

- [ ] **Step 2: Bersihkan sisa copy/template identity yang masih generik di halaman blog**

Ganti pola seperti ini:

```html
<title>Blog - Gerold - Personal Portfolio HTML5 Template</title>
<li><a href="mailto:mail@gerolddesign.com">mail@gerolddesign.com</a></li>
<p>&copy; 2024 All rights reserved by <a href="#" target="_blank">ThemeJunction</a></p>
```

Menjadi versi personal Bayu Biantara yang konsisten dengan homepage.

- [ ] **Step 3: Pastikan link internal antar halaman tetap valid setelah penyelarasan branding**

Periksa minimal link berikut tetap ada dan valid:

```html
<a href="index.html">Home</a>
<a href="blog-details.html">Read more</a>
<a href="project-details.html" class="portfolio-link"></a>
<a href="index.html#contact-section" class="btn tj-btn-primary">Hire me!</a>
```

- [ ] **Step 4: Verifikasi manual file yang berubah secara cepat**

Checklist:
- title halaman tidak lagi memakai nama template lama
- logo path tidak menunjuk ke folder `assets/img/logo/logo.png` jika file aktual memakai `assets/img/logo.png`
- header/footer konsisten antar halaman
- tidak ada anchor homepage yang salah format di halaman internal

Expected: tidak ada sisa branding template yang jelas terlihat di empat halaman utama.

---

### Task 2: Unifikasi design system global di stylesheet

**Files:**
- Modify: `assets/css/main.css`
- Modify: `assets/css/responsive.css`

- [ ] **Step 1: Rapikan token visual global dan komponen dasar yang dipakai lintas halaman**

Pertahankan basis variabel existing, lalu pastikan komponen berikut menjadi baseline global:

```css
:root {
  --tj-body: #475569;
  --tj-white: #1e293b;
  --tj-black: #ffffff;
  --tj-black-2: #f8fafc;
  --tj-heading-primary: #0f172a;
  --tj-theme-primary: #0ea5e9;
  --tj-theme-secondary: #06b6d4;
  --tj-theme-accent-1: #ffffff;
  --tj-theme-accent-2: #f1f5f9;
  --tj-grey-1: #64748b;
  --tj-grey-2: #cbd5e1;
  --tj-grey-3: #e2e8f0;
}
```

Rapikan styling untuk:
- `.tj-btn-primary`
- `.tj-btn-secondary`
- `.section-header`
- `.tj-header-area`
- `.tj-footer-area`
- card surface reusable

- [ ] **Step 2: Tambahkan style reusable untuk minimal-clean cards, breadcrumb, blog card, sidebar widget, dan content blocks**

Tambahkan blok global yang sejenis berikut ke `assets/css/main.css`:

```css
.modern-surface {
  background: var(--tj-theme-accent-2);
  border: 1px solid rgba(14, 165, 233, 0.12);
  border-radius: 20px;
  box-shadow: 0 12px 30px -18px rgba(14, 165, 233, 0.18);
}

.modern-surface:hover {
  transform: translateY(-4px);
  border-color: rgba(14, 165, 233, 0.28);
}
```

Gunakan prinsip yang sama untuk post cards, sidebar widgets, breadcrumb overlay, content container, dan navigation cards.

- [ ] **Step 3: Tambahkan aturan responsive untuk komponen baru/dirapikan**

Masukkan penyesuaian ke `assets/css/responsive.css` untuk:
- spacing hero dan section
- mobile nav state yang tetap aman
- post card image/content spacing
- sidebar stack di tablet/mobile
- detail page cards dan navigation stack

Contoh pola yang dipertahankan:

```css
@media only screen and (max-width: 767px) {
  .portfolio-box .portfolio-item {
    width: 100%;
  }
}
```

- [ ] **Step 4: Review stylesheet untuk konflik obvious**

Checklist:
- tidak ada selector baru yang terlalu generik sampai merusak komponen lama
- responsive rules masih mengikuti breakpoint yang sudah dipakai repo
- style baru memanfaatkan kelas existing sebanyak mungkin

Expected: `assets/css/main.css` dan `assets/css/responsive.css` menjadi sumber styling utama tanpa ketergantungan inline style besar.

---

### Task 3: Modernisasi `index.html` dengan sistem visual yang konsisten

**Files:**
- Modify: `index.html`
- Modify: `assets/css/main.css`
- Modify: `assets/css/responsive.css`

- [ ] **Step 1: Rapikan hero structure dan CTA agar lebih kuat sebagai first impression**

Pertahankan struktur inti, tetapi rapikan bagian seperti:

```html
<span class="hero-sub-title">I am Bayu Biantara</span>
<h1 class="hero-title">Full Stack Developer</h1>
<p class="lead">...</p>
<div class="button-box d-flex flex-wrap align-items-center">
  <a href="CV_Bayu Biantara.pdf" class="btn tj-btn-secondary" target="_blank">Download CV</a>
  <ul class="ul-reset social-icons">...</ul>
</div>
```

Tambahkan class tambahan bila perlu untuk spacing/width/visual alignment, tanpa mengubahnya menjadi dynamic component.

- [ ] **Step 2: Rapikan services, projects, resume, skills, dan contact agar hierarchy lebih konsisten**

Pertahankan section IDs yang dipakai anchor:

```html
<section class="services-section" id="services-section"></section>
<section class="portfolio-section" id="projects-section"></section>
<section class="resume-section" id="resume-section"></section>
<section class="skills-section" id="skills-section"></section>
<section class="contact-section" id="contact-section"></section>
```

Fokus pada:
- copy alignment dan spacing antar block
- penyederhanaan visual yang terlalu padat
- konsistensi title/paragraph/cards/buttons

- [ ] **Step 3: Rapikan project cards dan contact form visual agar lebih professional**

Untuk cards portfolio, pertahankan link:

```html
<div class="portfolio-item web">
  <div class="image-box">
    <img src="assets/img/jobportal.png" alt="" />
  </div>
  <div class="content-box">
    <h3 class="portfolio-title">Job Portal</h3>
    <p>Project was about precision and information.</p>
    <i class="flaticon-up-right-arrow"></i>
    <a href="project-details.html" class="portfolio-link"></a>
  </div>
</div>
```

Pada contact section, pertahankan `id="contactForm"` dan field names agar JS existing tidak rusak.

- [ ] **Step 4: Verifikasi manual homepage**

Checklist:
- anchor nav menuju section yang benar
- CTA CV tetap membuka file PDF
- social links tetap jalan
- contact form markup tetap cocok dengan JS existing
- hero, cards, dan section spacing terlihat lebih rapi daripada baseline semula

Expected: homepage tampil lebih clean, lebih personal, dan lebih konsisten dengan halaman detail.

---

### Task 4: Personalize dan rapikan `blog.html`

**Files:**
- Modify: `blog.html`
- Modify: `assets/css/main.css`
- Modify: `assets/css/responsive.css`

- [ ] **Step 1: Samakan head, header, footer, dan breadcrumb dengan identitas portfolio**

Perbarui bagian seperti:

```html
<title>Blog - Bayu Biantara</title>
```

Pastikan logo, nama, CTA, dan nav mengikuti sistem global. Breadcrumb boleh tetap memakai struktur existing, tetapi tampilannya harus selaras dengan styling global.

- [ ] **Step 2: Rapikan post cards agar lebih minimal-clean**

Pertahankan struktur article existing, misalnya:

```html
<article class="tj-post">
  <div class="tj-post__thumb">...</div>
  <div class="tj-post__content">...</div>
</article>
```

Fokus perubahan:
- thumbnail radius/shadow/surface
- meta info lebih halus
- title dan excerpt lebih readable
- tombol `Read more` konsisten dengan global buttons
- category chip lebih clean

- [ ] **Step 3: Rapikan sidebar widgets dan pagination**

Gunakan struktur existing:

```html
<div class="sidebar_widget widget_search">...</div>
<div class="sidebar_widget widget_categories">...</div>
<div class="sidebar_widget tj_recent_posts">...</div>
<div class="sidebar_widget widget_tag_cloud">...</div>
```

Buat tampil lebih seragam sebagai cards minimal-clean. Pagination dipertahankan statis, hanya diperbaiki spacing/shape/hover.

- [ ] **Step 4: Verifikasi manual halaman blog**

Checklist:
- tidak ada nama template lama
- link ke `blog-details.html` tetap ada
- sidebar tetap terbaca di desktop dan stack rapi di mobile
- pagination tampil konsisten

Expected: `blog.html` terasa seperti blog portfolio pribadi, bukan halaman demo template.

---

### Task 5: Rapikan readability dan struktur `blog-details.html`

**Files:**
- Modify: `blog-details.html`
- Modify: `assets/css/main.css`
- Modify: `assets/css/responsive.css`

- [ ] **Step 1: Samakan branding, header/footer, dan breadcrumb global**

Gunakan pola head/footer/header yang sudah diselaraskan. Ubah title menjadi personal, misalnya:

```html
<title>Blog Details - Bayu Biantara</title>
```

- [ ] **Step 2: Tingkatkan readability article content, tags/share, dan post navigation**

Pertahankan struktur utama seperti:

```html
<article class="tj-single__post">...</article>
<div class="single-post_tag_share">...</div>
<div class="single-post__navigation">...</div>
```

Fokus pada:
- rhythm heading dan paragraph
- blockquote, list, meta, tag cloud
- share buttons dan post navigation cards yang lebih clean

- [ ] **Step 3: Rapikan comments, reply form, dan sidebar tanpa mengubahnya jadi dinamis**

Pertahankan comment markup existing dan form fields seperti:

```html
<form action="index.html" class="tj-post-comment__form">...</form>
```

Yang diubah hanya visual organization, spacing, borders, dan readability.

- [ ] **Step 4: Verifikasi manual halaman blog detail**

Checklist:
- konten artikel lebih nyaman dibaca
- tags/share/navigation/comments tidak terasa terlalu ramai
- sidebar tetap konsisten dengan `blog.html`
- form masih valid secara markup statis

Expected: `blog-details.html` tampil lebih editorial, clean, dan tetap statis.

---

### Task 6: Integrasikan `project-details.html` ke stylesheet global

**Files:**
- Modify: `project-details.html`
- Modify: `assets/css/main.css`
- Modify: `assets/css/responsive.css`

- [ ] **Step 1: Pindahkan seluruh blok `<style>` inline besar dari `project-details.html` ke `assets/css/main.css`**

Kelas yang harus dipindah meliputi pola seperti:

```css
.project-hero { ... }
.project-content-section { ... }
.project-showcase { ... }
.project-info-card { ... }
.project-about { ... }
.features-section { ... }
.tech-section { ... }
.project-nav { ... }
```

Setelah dipindah, hapus blok `<style>` inline dari file HTML.

- [ ] **Step 2: Rapikan HTML project detail agar class dan CTA konsisten dengan design system global**

Pertahankan struktur utama seperti:

```html
<section class="project-hero">...</section>
<section class="project-content-section">...</section>
<div class="project-info-card">...</div>
<div class="feature-card">...</div>
<div class="tech-badge">...</div>
<div class="project-nav">...</div>
```

Fokus pada penyelarasan spacing, buttons, breadcrumbs, dan typography dengan homepage/blog pages.

- [ ] **Step 3: Tambahkan/rapikan responsive rules project detail di `assets/css/responsive.css`**

Pastikan behavior berikut aman:
- hero title mengecil di tablet/mobile
- info card stack di layar kecil
- project navigation berubah vertikal di mobile
- content spacing tidak terlalu sempit/terlalu lebar

- [ ] **Step 4: Verifikasi manual halaman project detail**

Checklist:
- tidak ada inline stylesheet besar yang tersisa
- page tetap tampil modern setelah style dipindah
- breadcrumb, feature cards, tech badges, dan nav cards konsisten dengan halaman lain
- link kembali ke `index.html#projects-section` tetap benar

Expected: `project-details.html` menjadi bagian utuh dari sistem desain global.

---

### Task 7: Verifikasi akhir seluruh site

**Files:**
- Review only: `index.html`
- Review only: `blog.html`
- Review only: `blog-details.html`
- Review only: `project-details.html`
- Review only: `assets/css/main.css`
- Review only: `assets/css/responsive.css`

- [ ] **Step 1: Jalankan pemeriksaan struktur file dan pencarian sisa template identity**

Cari sisa string bermasalah seperti:

```text
Gerold
ThemeJunction
mail@gerolddesign.com
assets/img/logo/logo.png
```

Expected: string yang tidak relevan sudah hilang dari halaman publik utama.

- [ ] **Step 2: Jalankan pemeriksaan format/quality untuk file CSS yang diubah bila Biome mendukung**

Run:

```bash
biome_check assets/css/main.css assets/css/responsive.css
```

Expected: tidak ada error formatting/lint yang relevan.

Jika tool config repo target tidak mendukung atau Biome tidak tersedia untuk path ini, catat bahwa verifikasi dilakukan manual pada file CSS/HTML.

- [ ] **Step 3: Lakukan final review terhadap perilaku statis penting**

Checklist:
- navigasi homepage anchors tetap sama
- internal page links tetap valid
- asset paths valid
- mobile menu markup tidak rusak
- theme toggle di halaman yang memilikinya tetap ada
- style responsive untuk blog/project/home tidak saling bentrok

- [ ] **Step 4: Ringkas hasil dan siapkan handoff**

Expected summary mencakup:
- file yang diubah
- area visual yang dimodernisasi
- hal yang sengaja tidak diubah karena out of scope
- catatan verifikasi manual/tooling
