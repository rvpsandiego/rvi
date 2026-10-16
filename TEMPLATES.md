# RVI Website — Content Templates & Developer Guide

Ramanuj Vidyapeeth International School website.  
Built with plain HTML · CSS · JavaScript — no framework required.

---

## Project Structure

```
rvp/
├── index.html            Home page
├── about.html            About page
├── registration.html     Registration page
├── contact.html          Contact page
├── faqs.html             FAQs page
├── styles.css            Shared stylesheet (all pages)
│
├── js/
│   ├── site-config.js    ← EDIT THIS to change nav, footer, school info
│   ├── components.js     Renders header / nav / footer on every page
│   └── faqs.js           FAQ accordion + category filter logic
│
└── images/
    └── logo.png          School logo (used in header & footer)
```

---

## How to Make Common Changes

### Add a new top-level page

1. Add an entry to `SITE_CONFIG.navigation` in `js/site-config.js`:

```js
{
  label:  "Gallery",
  href:   "gallery.html",
  pageId: "gallery",
  icon:   "fas fa-images"
}
```

2. Create `gallery.html` — copy any existing page as a starting point and change `<body data-page="gallery">`.

3. That's it — the header, nav, and footer will include the new page automatically.

---

### Add a submenu item

In `js/site-config.js`, add to a nav item's `submenu` array:

```js
{ label: "Our Team", href: "about.html#team", icon: "fas fa-users" }
```

---

### Update footer links

Edit `footerQuickLinks` or `footerProgramLinks` in `js/site-config.js`.

---

### Change school info (name, email, launch date, etc.)

Edit the fields at the top of `js/site-config.js`.

---

### Add a new FAQ category

1. Add a filter button inside `.faq-filters` in `faqs.html`:

```html
<button class="faq-filter-btn" onclick="filterFAQ('newcat'); return false;"
        data-filter="newcat">New Category</button>
```

2. Add a new group in `faqs.html`:

```html
<div class="faq-group" data-category="newcat">
  <h2 class="faq-group-title">
    <i class="fas fa-star" aria-hidden="true"></i> New Category
  </h2>
  <!-- faq items here — see Template F below -->
</div>
```

3. Add `'newcat'` to the `validCategories` array in `js/faqs.js`.

---

## HTML Content Templates

Copy and paste these blocks into any page.

---

### Template A — Image + Text Section

```html
<section class="content-section bg-white">
  <div class="container">
    <div class="img-text-block">

      <div class="img-text-image">
        <img src="images/your-photo.jpg" alt="Brief description of the photo">
        <!--
          While a real photo is not available, use a placeholder:
          <div class="img-placeholder">
            <i class="fas fa-image"></i>
            <span>Photo coming soon</span>
          </div>
        -->
      </div>

      <div class="img-text-content">
        <h3>Section Heading</h3>
        <p>Your paragraph text here. Keep it concise and focused.</p>
        <a href="page.html" class="btn btn-primary">Learn More</a>
      </div>

    </div>
  </div>
</section>

<!-- Reversed (image on right): add class="reverse" to .img-text-block -->
```

---

### Template B — Cards Row (2, 3, or 4 columns)

```html
<section class="content-section bg-light">
  <div class="container">

    <div class="section-header">
      <h3 class="section-title">Section Title</h3>
      <p class="section-sub">Optional subtitle text</p>
      <div class="section-divider"></div>
    </div>

    <!-- Change cols-3 to cols-2 or cols-4 as needed -->
    <div class="cards-grid cols-3">

      <div class="card">
        <div class="card-icon-wrap saffron">
          <!-- Option 1: Font Awesome icon -->
          <i class="fas fa-star" style="font-size:1.6rem;color:var(--saffron-dark);"></i>
          <!-- Option 2: Image icon from images/ folder -->
          <!-- <img src="images/icon-name.png" alt="" class="card-img-icon"> -->
          <!-- Option 3: Devanagari text (for language labels) -->
          <!-- <span class="card-lang-icon">सं</span> -->
        </div>
        <h4>Card Title</h4>
        <p>Short description of this card's topic.</p>
      </div>

      <!-- Repeat <div class="card"> blocks as needed -->

    </div>
  </div>
</section>
```

Card icon wrap color variants: `saffron` · `amber` · `gold` · `warm`

---

### Template C — Full-width Text Block

```html
<section class="content-section bg-saffron-light">
  <div class="container" style="max-width: 760px;">
    <h3 class="section-title centered">Heading</h3>
    <div class="section-divider" style="margin: 12px auto 20px;"></div>
    <p style="text-align: center; color: var(--text-muted); line-height: 1.75;">
      Your paragraph text here.
    </p>
  </div>
</section>
```

Background variants: `bg-white` · `bg-light` · `bg-saffron-light`

---

### Template D — Photo Gallery Row

```html
<section class="content-section bg-white">
  <div class="container">

    <div class="section-header">
      <h3 class="section-title">Gallery Title</h3>
      <div class="section-divider"></div>
    </div>

    <div class="cards-grid cols-3">
      <figure style="margin: 0;">
        <img
          src="images/photo1.jpg"
          alt="Caption describing the photo"
          style="width:100%; border-radius:var(--radius); aspect-ratio:4/3; object-fit:cover; box-shadow:var(--shadow-sm);"
        >
        <figcaption style="text-align:center; margin-top:8px; font-size:.85rem; color:var(--text-muted);">
          Caption text
        </figcaption>
      </figure>
      <!-- Repeat <figure> blocks for each photo -->
    </div>

  </div>
</section>
```

---

### Template E — Feature List (icon + heading + text)

```html
<section class="content-section bg-white">
  <div class="container">
    <div class="section-header">
      <h3 class="section-title">Features Heading</h3>
      <div class="section-divider"></div>
    </div>
    <div class="features-grid">

      <div class="feature-item">
        <div class="feature-icon-wrap">
          <i class="fas fa-star"></i>
        </div>
        <div class="feature-text">
          <h4>Feature Title</h4>
          <p>Short description of this feature.</p>
        </div>
      </div>

      <!-- Repeat .feature-item blocks — grid auto-fills 4 columns on desktop -->

    </div>
  </div>
</section>
```

---

### Template F — Single FAQ Item

Use inside any `.faq-group` block in `faqs.html`:

```html
<div class="faq-item">
  <button class="faq-question" onclick="toggleFAQ(this)" aria-expanded="false">
    Your question goes here?
    <i class="fas fa-chevron-down faq-icon" aria-hidden="true"></i>
  </button>
  <div class="faq-answer">
    <p>Answer paragraph one.</p>
    <p>Answer paragraph two (optional).</p>
    <!-- Or a list: -->
    <ul>
      <li>Point one</li>
      <li>Point two</li>
    </ul>
  </div>
</div>
```

---

### Template G — Contact Info Card

Use inside `.contact-cards-grid` in `contact.html`:

```html
<div class="contact-card">
  <div class="contact-card-icon">
    <i class="fas fa-phone"></i>
  </div>
  <div class="contact-card-body">
    <h3>Phone</h3>
    <a href="tel:+16195550000">(619) 555-0000</a>
    <p style="margin-top:5px; font-size:.82rem; color:var(--text-muted);">
      Optional supporting text.
    </p>
  </div>
</div>
```

---

### Template H — New Page Boilerplate

Copy this to create a new page. Replace `PAGEID` with a unique lowercase identifier
and update the `<title>` and `<meta name="description">`.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Page Title — Ramanuj Vidyapeeth International School (R V I)</title>
  <meta name="description" content="Page description for search engines.">
  <link rel="stylesheet" href="styles.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Nunito+Sans:wght@400;500;600;700&family=Noto+Serif+Devanagari:wght@400;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
</head>
<body data-page="PAGEID">

  <header id="site-header" class="site-header"></header>
  <nav    id="site-nav"    class="site-nav" role="navigation" aria-label="Main navigation"></nav>

  <main id="main-content">

    <!-- Page Hero -->
    <div class="page-hero page-hero-about">
      <div class="container">
        <h1>Page Title</h1>
        <p>Optional subtitle</p>
      </div>
    </div>

    <!-- Page Content -->
    <div class="container page-content">

      <!-- Add content sections here using templates above -->

    </div>

  </main>

  <footer id="site-footer" class="site-footer"></footer>

  <script src="js/site-config.js"></script>
  <script src="js/components.js"></script>
  <!-- Add page-specific scripts here if needed -->
</body>
</html>
```

Page hero style variants: `page-hero-about` · `page-hero-reg` · `page-hero-contact` · `page-hero-faq`

---

## Adding Images

Place all images in the `images/` folder.

```
images/
├── logo.png          School logo (do not rename — referenced in js/site-config.js)
├── campus.jpg        Example: campus photo
├── students.jpg      Example: student photo
└── icons/
    └── rakhi.png     Example: icon asset
```

Reference in HTML: `src="images/campus.jpg"`  
Reference in CSS:  `background-image: url('../images/campus.jpg')`  
*(CSS files are in the root, so use `images/` not `../images/`.)*

---

## CSS Color Variables (quick reference)

```css
var(--saffron)        /* Primary brand color */
var(--saffron-dark)   /* Hover states, emphasis */
var(--saffron-light)  /* Accent / highlight */
var(--saffron-pale)   /* Light section backgrounds */
var(--saffron-cream)  /* Page background */
var(--brown-dark)     /* Footer background, deep text */
var(--text)           /* Body text */
var(--text-muted)     /* Secondary / caption text */
var(--white)          /* Pure white */
var(--border)         /* Card and divider borders */
```

To adjust the color scheme globally, edit `:root { }` in `styles.css`.
