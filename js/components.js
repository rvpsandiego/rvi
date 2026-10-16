/**
 * SHARED COMPONENTS — Ramanuj Vidyapeeth International School
 * ===========================================================
 * Dynamically renders the site Header, Navigation, Footer,
 * and utility elements (scroll-to-top button, progress bar)
 * into every page.
 *
 * Pages must include placeholders:
 *   <header id="site-header" class="site-header"></header>
 *   <nav    id="site-nav"    class="site-nav"    role="navigation"></nav>
 *   <footer id="site-footer" class="site-footer"></footer>
 *
 * And declare their page identity on <body>:
 *   <body data-page="home">   (matches SITE_CONFIG.navigation[n].pageId)
 *
 * To customize header/nav/footer structure, edit the build*()
 * functions below.
 */

(function () {

  // ── Build: Site Header ────────────────────────────────────────
  function buildHeader() {
    return `
      <div class="header-inner">
        <a href="index.html" class="header-logo-wrap" aria-label="${SITE_CONFIG.schoolName} — home">
          <img src="${SITE_CONFIG.logoSrc}" alt="${SITE_CONFIG.logoAlt}" class="site-logo">
          <div class="header-text">
            <span class="school-name">${SITE_CONFIG.schoolName}</span>
            <span class="school-abbr">${SITE_CONFIG.schoolAbbr}</span>
            <span class="school-tagline">${SITE_CONFIG.tagline}</span>
          </div>
        </a>
        <div class="header-meta">
          <span class="launch-badge">
            <i class="fas fa-calendar-alt" aria-hidden="true"></i>
            ${SITE_CONFIG.launchText}
          </span>
          <span class="location-badge">
            <i class="fas fa-map-marker-alt" aria-hidden="true"></i>
            ${SITE_CONFIG.locationLine}
          </span>
        </div>
      </div>
    `;
  }

  // ── Build: Navigation ─────────────────────────────────────────
  function buildNav(currentPage) {
    var items = SITE_CONFIG.navigation.map(function (item) {
      var isActive    = (item.pageId === currentPage);
      var hasSubmenu  = Array.isArray(item.submenu) && item.submenu.length > 0;
      var arrowHtml   = hasSubmenu
        ? '<i class="fas fa-caret-down submenu-arrow" aria-hidden="true"></i>'
        : '';

      var submenuHtml = '';
      if (hasSubmenu) {
        var subItems = item.submenu.map(function (sub) {
          return '<li><a href="' + sub.href + '">'
               + '<i class="' + sub.icon + '" aria-hidden="true"></i> '
               + sub.label + '</a></li>';
        }).join('');
        submenuHtml = '<ul class="submenu" role="menu">' + subItems + '</ul>';
      }

      return '<li class="nav-item'
           + (isActive   ? ' active'      : '')
           + (hasSubmenu ? ' has-submenu' : '')
           + '" role="none">'
           + '<a href="' + item.href + '" class="nav-link" role="menuitem">'
           + '<i class="' + item.icon + '" aria-hidden="true"></i> '
           + item.label + arrowHtml
           + '</a>'
           + submenuHtml
           + '</li>';
    }).join('');

    return `
      <div class="nav-container">
        <button class="hamburger" id="hamburgerBtn"
                aria-label="Toggle navigation" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
        <ul class="nav-list" id="navList" role="menubar">${items}</ul>
      </div>
    `;
  }

  // ── Build: Footer ─────────────────────────────────────────────
  function buildFooter() {
    var quickLinks = SITE_CONFIG.footerQuickLinks.map(function (lk) {
      return '<li><a href="' + lk.href + '">'
           + '<i class="fas fa-chevron-right" aria-hidden="true"></i> '
           + lk.label + '</a></li>';
    }).join('');

    var programLinks = SITE_CONFIG.footerProgramLinks.map(function (lk) {
      return '<li><a href="' + lk.href + '">'
           + '<i class="fas fa-chevron-right" aria-hidden="true"></i> '
           + lk.label + '</a></li>';
    }).join('');

    return `
      <div class="footer-main">
        <div class="container footer-grid">

          <div class="footer-brand">
            <a href="index.html">
              <img src="${SITE_CONFIG.logoSrc}" alt="${SITE_CONFIG.logoAlt}" class="footer-logo">
            </a>
            <div>
              <p class="footer-school-name">${SITE_CONFIG.schoolName}</p>
              <p class="footer-school-abbr">${SITE_CONFIG.schoolAbbr}</p>
              <p class="footer-tagline">${SITE_CONFIG.tagline}</p>
            </div>
          </div>

          <div class="footer-links-col">
            <h4>Quick Links</h4>
            <ul>${quickLinks}</ul>
          </div>

          <div class="footer-links-col">
            <h4>Our Programs</h4>
            <ul>${programLinks}</ul>
          </div>

          <div class="footer-contact-col">
            <h4>Contact</h4>
            <div class="footer-contact-item">
              <i class="fas fa-envelope" aria-hidden="true"></i>
              <a href="mailto:${SITE_CONFIG.email}">${SITE_CONFIG.email}</a>
            </div>
            <div class="footer-contact-item">
              <i class="fas fa-map-marker-alt" aria-hidden="true"></i>
              <span>${SITE_CONFIG.locationLine}</span>
            </div>
            <div class="footer-contact-item">
              <i class="fas fa-calendar-alt" aria-hidden="true"></i>
              <span>${SITE_CONFIG.launchText}</span>
            </div>
            <div class="footer-enroll">
              <a href="registration.html" class="btn btn-sm btn-saffron">
                <i class="fas fa-pencil-alt" aria-hidden="true"></i>
                Register Your Interest
              </a>
            </div>
          </div>

        </div>
      </div>
      <div class="footer-bottom">
        <div class="container footer-bottom-inner">
          <p>&copy; ${SITE_CONFIG.copyrightYear} ${SITE_CONFIG.schoolName}. All rights reserved.</p>
          <p class="footer-disclaimer">
            A proposed Countywide Benefit Charter School serving San Diego County.
          </p>
        </div>
      </div>
    `;
  }

  // ── Mobile Nav ────────────────────────────────────────────────
  function setupMobileNav() {
    var btn  = document.getElementById('hamburgerBtn');
    var list = document.getElementById('navList');
    if (!btn || !list) return;

    btn.addEventListener('click', function () {
      var open = list.classList.toggle('open');
      btn.classList.toggle('open', open);
      btn.setAttribute('aria-expanded', String(open));
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!btn.contains(e.target) && !list.contains(e.target)) {
        list.classList.remove('open');
        btn.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      }
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        list.classList.remove('open');
        btn.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ── Scroll-to-Top Button ──────────────────────────────────────
  function setupScrollTop() {
    var btn = document.createElement('button');
    btn.className = 'scroll-top';
    btn.setAttribute('aria-label', 'Scroll to top');
    btn.innerHTML = '<i class="fas fa-chevron-up" aria-hidden="true"></i>';
    document.body.appendChild(btn);

    window.addEventListener('scroll', function () {
      btn.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });

    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ── Scroll Progress Bar ───────────────────────────────────────
  function setupProgressBar() {
    var bar = document.createElement('div');
    bar.className = 'scroll-progress';
    document.body.prepend(bar);

    window.addEventListener('scroll', function () {
      var scrolled = window.scrollY;
      var total    = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (total > 0 ? (scrolled / total) * 100 : 0) + '%';
    }, { passive: true });
  }

  // ── Scroll Offset for Anchor Hash ─────────────────────────────
  function handleHashScroll() {
    if (!window.location.hash) return;
    var id = window.location.hash.slice(1);
    var el = document.getElementById(id);
    if (!el) return;
    setTimeout(function () {
      var offset = 130; // header + nav height
      var top    = el.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: top, behavior: 'smooth' });
    }, 200);
  }

  // ── Section Fade-In (IntersectionObserver) ────────────────────
  function setupRevealAnimations() {
    if (!window.IntersectionObserver) return;
    var targets = document.querySelectorAll(
      '.card, .feature-item, .model-card, .festival-card, .value-card, ' +
      '.about-block, .approach-card, .contact-card'
    );
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    targets.forEach(function (el) {
      el.classList.add('reveal');
      obs.observe(el);
    });
  }

  // ── Sticky Nav Shadow on Scroll ───────────────────────────────
  function setupStickyNav() {
    var nav = document.getElementById('site-nav');
    if (!nav) return;
    window.addEventListener('scroll', function () {
      nav.classList.toggle('scrolled', window.scrollY > 10);
    }, { passive: true });
  }

  // ── Init ──────────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', function () {
    var currentPage = document.body.getAttribute('data-page') || 'home';

    var headerEl = document.getElementById('site-header');
    var navEl    = document.getElementById('site-nav');
    var footerEl = document.getElementById('site-footer');

    if (headerEl) headerEl.innerHTML = buildHeader();
    if (navEl)    navEl.innerHTML    = buildNav(currentPage);
    if (footerEl) footerEl.innerHTML = buildFooter();

    setupMobileNav();
    setupScrollTop();
    setupProgressBar();
    setupStickyNav();
    handleHashScroll();

    // Reveal animations after a short delay so layout is settled
    setTimeout(setupRevealAnimations, 100);
  });

})();
