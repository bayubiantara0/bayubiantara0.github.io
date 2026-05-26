# Portfolio Modernization Design

**Tanggal:** 2026-05-25  
**Project:** `C:\Bayu\Privasi\bayubiantara0.github.io`

## Tujuan

Merapikan dan memodernkan seluruh website portfolio statis Bayu Biantara agar terlihat lebih profesional, konsisten, dan personal, tanpa menambah build step, framework baru, atau fitur dinamis. Hasil akhir harus tetap kompatibel dengan deployment berbasis GitHub Pages/repo statis.

## Konteks Saat Ini

Struktur site saat ini terdiri dari halaman statis utama berikut:

- `index.html`
- `blog.html`
- `blog-details.html`
- `project-details.html`
- styling utama di `assets/css/main.css` dan `assets/css/responsive.css`

Temuan utama:

1. `index.html` sudah cukup dipersonalisasi, tetapi visual hierarchy, spacing, dan konsistensi komponen masih belum merata.
2. `blog.html` dan `blog-details.html` masih sangat mewarisi identitas template awal, termasuk title, logo path, copy, dan struktur visual yang belum terasa personal.
3. `project-details.html` sudah lebih modern, tetapi banyak style masih ditulis inline di dalam file HTML sehingga belum menjadi bagian dari sistem desain global.
4. Header, footer, breadcrumb, tombol, kartu, dan tone visual antar halaman belum sepenuhnya selaras.

## Constraints

- Tetap static site.
- Tidak menambah framework baru.
- Tidak menambah build tooling.
- Tidak mengubah deployment model.
- Tetap ringan dan mudah di-host di GitHub Pages/repo statis.
- Fokus pada visual cleanup, consistency, dan content alignment.

## Arah Visual

Pendekatan yang dipilih adalah **minimal clean**.

Karakter desain:

- tampilan lebih terang, rapi, dan profesional
- whitespace lebih lega
- penggunaan warna aksen biru/cyan lebih hemat dan strategis
- glow dan efek dekoratif tetap ada secukupnya, tetapi tidak mendominasi
- cards lebih ringan, konsisten, dan mudah dipindai
- tipografi lebih tenang dan modern
- detail page lebih mudah dibaca

## Pendekatan yang Dipilih

Pendekatan final adalah **full visual unification**.

Artinya:

- semua halaman akan mengikuti satu design language yang sama
- style inline besar di `project-details.html` akan dipindahkan ke stylesheet global
- halaman blog akan dipersonalisasi agar tidak lagi terasa seperti template generik
- komponen global akan dikonsolidasikan agar maintainable

## Architecture / Design System Scope

### 1. Global Design Tokens

Tetap memanfaatkan variabel yang sudah ada di `assets/css/main.css`, tetapi penggunaannya akan dirapikan agar mendukung:

- warna background utama
- warna surface/card
- warna heading dan body text
- aksen primary/secondary
- border dan shadow yang lebih halus

Tidak ada redesign total pada sistem variabel; perubahan dilakukan secara evolusioner agar aman untuk codebase sekarang.

### 2. Komponen Global

Komponen yang harus disatukan di semua halaman:

- header
- sticky header
- footer
- primary button
- secondary button
- section header
- cards
- breadcrumb area
- post cards
- sidebar widgets
- content container spacing

### 3. Page-Level Styling

Styling spesifik halaman tetap diperbolehkan bila memang hanya relevan untuk satu halaman, tetapi harus ditempatkan di stylesheet global, bukan di `<style>` inline besar dalam HTML.

## Rencana Per Halaman

### `index.html`

Fokus:

- memperkuat first impression hero
- merapikan hierarchy antar section
- membuat service, project, resume, skill, dan contact section terasa satu keluarga visual
- memperhalus CTA seperti `Hire me!` dan `Download CV`
- menjaga struktur statis dan anchor navigation saat ini

Detail desain:

- hero tetap memakai identitas Bayu Biantara sebagai full stack developer
- spacing hero, button group, dan funfact dibuat lebih seimbang
- service list dibuat lebih clean dan modern, tetapi tetap mempertahankan struktur existing
- portfolio card dibuat lebih rapi dan konsisten secara hover, content box, dan spacing
- skill cards dibuat lebih ringan dan lebih konsisten dengan resume/project cards
- contact section dibuat lebih bersih dan profesional

### `blog.html`

Fokus:

- mempertahankan halaman blog portfolio
- menghilangkan kesan template generik
- membuat list post dan sidebar lebih clean

Detail desain:

- title, branding, logo path, dan footer diselaraskan dengan identitas Bayu Biantara
- post cards dirapikan agar lebih modern dan mudah dibaca
- category chips, meta info, dan CTA disederhanakan secara visual
- sidebar widgets seperti search, categories, recent posts, dan tags dibuat selaras dengan komponen cards global
- pagination dipertahankan statis, tetapi dirapikan

### `blog-details.html`

Fokus:

- meningkatkan readability artikel
- menyederhanakan elemen visual yang terlalu ramai
- menjaga page tetap statis

Detail desain:

- hero/breadcrumb diselaraskan dengan style global
- content width, heading rhythm, paragraph spacing, blockquote, list, dan tags diperhalus
- share links dan post navigation dibuat lebih ringan
- comment list dan reply form tetap ada, tetapi tampil lebih rapi dan tidak terlalu template-heavy
- sidebar tetap dipertahankan untuk konsistensi dengan halaman blog index

### `project-details.html`

Fokus:

- mempertahankan struktur informasi project yang sudah baik
- menjadikannya bagian dari sistem desain global

Detail desain:

- style inline besar dipindah ke `assets/css/main.css` dan bila perlu ditambah penyesuaian di `assets/css/responsive.css`
- hero, meta tags, info card, feature cards, tech stack, dan project navigation diselaraskan dengan komponen global
- halaman ini menjadi referensi visual detail project yang konsisten dengan homepage

## Content Strategy

Tujuan perubahan bukan membuat CMS atau sistem blog dinamis, melainkan membuat konten statis yang ada terasa lebih personal dan intentional.

Aturan konten:

- hapus atau ganti elemen template yang jelas-jelas generik bila mengganggu branding personal
- pertahankan struktur halaman bila masih relevan
- tidak menambah sistem data baru
- tidak menambah JavaScript untuk content rendering

Untuk blog pages, konten dapat tetap statis, tetapi copy visual seperti title, footer credit, email template, dan branding yang masih milik template harus diselaraskan ke identitas portfolio Bayu Biantara.

## File Changes yang Diantisipasi

Kemungkinan file yang diubah:

- `index.html`
- `blog.html`
- `blog-details.html`
- `project-details.html`
- `assets/css/main.css`
- `assets/css/responsive.css`

Kemungkinan file baru:

- tidak wajib ada file CSS baru
- spec ini disimpan di `docs/superpowers/specs/2026-05-25-portfolio-modernization-design.md`

## Error Handling / Safety

Karena ini static site, error handling utama adalah menjaga agar perubahan visual tidak merusak:

- anchor navigation
- asset path gambar/logo/icon
- mobile menu behavior
- theme toggle existing
- link antar halaman
- responsive layout di breakpoint yang sudah ada

Perubahan harus kompatibel dengan JavaScript existing dan tidak bergantung pada tooling tambahan.

## Testing / Verification Strategy

Karena task ini dominan visual pada static site, verifikasi dilakukan melalui:

1. pemeriksaan struktur HTML agar path/link tetap valid
2. pemeriksaan CSS agar komponen global tidak bentrok dengan halaman detail
3. pengecekan responsive behavior untuk breakpoint utama di `assets/css/responsive.css`
4. validasi manual terhadap:
   - konsistensi header/footer
   - keterbacaan hero dan konten
   - tampilan cards, sidebar, breadcrumb, dan navigation
   - konsistensi visual light/dark theme bila fitur toggle aktif di halaman terkait

Jika setelah implementasi ada HTML/CSS/JS yang tersentuh, verifikasi akhir dilakukan dengan command check yang relevan dari repo target bila tersedia; bila tidak ada tooling, verifikasi berbasis inspeksi file dan perilaku statis akan dipakai.

## Out of Scope

Hal berikut tidak termasuk dalam fase ini:

- migrasi ke framework frontend
- integrasi CMS
- sistem blog dinamis
- backend/contact feature redesign
- penambahan build pipeline
- penulisan ulang total struktur site

## Deliverable

Deliverable fase ini:

1. seluruh halaman utama tampil lebih modern, rapi, dan konsisten
2. komponen visual global tersatukan
3. sisa identitas template lama dibersihkan dari halaman publik utama
4. `project-details.html` tidak lagi bergantung pada style inline besar
5. site tetap static dan siap dipakai di repo portfolio GitHub
