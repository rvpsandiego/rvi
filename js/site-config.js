/**
 * SITE CONFIGURATION — Ramanuj Vidyapeeth International School
 * =============================================================
 * This is the single source of truth for site-wide settings.
 *
 * HOW TO MAKE COMMON CHANGES:
 *
 *   Add a new top-level page
 *   ─────────────────────────
 *   1. Add an entry to SITE_CONFIG.navigation below.
 *   2. Set a unique pageId (match the <body data-page="..."> in the new HTML file).
 *   3. Create the HTML file (copy any existing page as a template).
 *
 *   Add a submenu item
 *   ──────────────────
 *   Add an entry to the parent nav item's `submenu` array.
 *
 *   Update footer links
 *   ───────────────────
 *   Edit footerQuickLinks or footerProgramLinks arrays below.
 *
 *   Change school info (name, email, launch date, etc.)
 *   ────────────────────────────────────────────────────
 *   Edit the fields in the top-level config object below.
 */

const SITE_CONFIG = {

  // ── School Info ────────────────────────────────────────────────
  schoolName:   "Ramanuj Vidyapeeth International School",
  schoolAbbr:   "R \u00a0V \u00a0I",   // non-breaking spaces for spacing
  tagline:      "Learn \u00a0\u2022\u00a0 Lead \u00a0\u2022\u00a0 Serve",
  launchText:   "Proposed Launch: Fall 2027",
  email:        "rvpsandiego@gmail.com",
  locationLine: "Serving San Diego County",
  logoSrc:      "images/logo.png",
  logoAlt:      "Ramanuj Vidyapeeth International School Logo",
  copyrightYear:"2026",

  // ── Top-Level Navigation ───────────────────────────────────────
  // To add a page: add an object here and create the HTML file.
  // pageId must match <body data-page="..."> in the HTML file.
  // icon: any Font Awesome class string (e.g. "fas fa-home")
  // submenu (optional): array of { label, href, icon }
  navigation: [
    {
      label:  "Home",
      href:   "index.html",
      pageId: "home",
      icon:   "fas fa-home"
    },
    {
      label:  "About",
      href:   "about.html",
      pageId: "about",
      icon:   "fas fa-school",
      submenu: [
        { label: "Mission & Values",    href: "about.html#mission",   icon: "fas fa-bullseye" },
        { label: "Vision",              href: "about.html#vision",    icon: "fas fa-eye"      },
        { label: "Guiding Principle",   href: "about.html#principle", icon: "fas fa-star"     }
      ]
    },
    {
      label:  "Registration",
      href:   "registration.html",
      pageId: "registration",
      icon:   "fas fa-file-alt"
    },
    {
      label:  "Contact",
      href:   "contact.html",
      pageId: "contact",
      icon:   "fas fa-envelope"
    },
    {
      label:  "FAQs",
      href:   "faqs.html",
      pageId: "faqs",
      icon:   "fas fa-question-circle",
      submenu: [
        { label: "Admissions", href: "faqs.html#admissions", icon: "fas fa-user-plus" },
        { label: "Academics",  href: "faqs.html#academics",  icon: "fas fa-book"      },
        { label: "Programs",   href: "faqs.html#programs",   icon: "fas fa-star"      }
      ]
    }
  ],

  // ── Footer — Quick Links (left column) ────────────────────────
  footerQuickLinks: [
    { label: "Home",         href: "index.html"        },
    { label: "About",        href: "about.html"        },
    { label: "Registration", href: "registration.html" },
    { label: "Contact",      href: "contact.html"      },
    { label: "FAQs",         href: "faqs.html"         }
  ],

  // ── Footer — Program Links (middle column) ────────────────────
  footerProgramLinks: [
    { label: "Sanskrit Immersion",     href: "about.html" },
    { label: "Hindi Immersion",        href: "about.html" },
    { label: "English Excellence",     href: "about.html" },
    { label: "Project-Based Learning", href: "about.html" }
  ]

};
