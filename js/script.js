/* ── script.js — Ramanuj Vidyapeeth International School ── */

// ── Tab Navigation ────────────────────────────────────────
function showTab(tabId) {
  // Hide all panes
  document.querySelectorAll('.tab-pane').forEach(function(pane) {
    pane.classList.remove('active');
  });

  // Deactivate all nav items
  document.querySelectorAll('.nav-item').forEach(function(item) {
    item.classList.remove('active');
  });

  // Show target pane
  var target = document.getElementById('tab-' + tabId);
  if (target) target.classList.add('active');

  // Activate nav item
  document.querySelectorAll('.nav-link[data-tab="' + tabId + '"]').forEach(function(link) {
    link.closest('.nav-item').classList.add('active');
  });

  // Scroll to top of main content
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Close mobile menu
  closeMobileMenu();
}

// ── Scroll to Section within Active Tab ──────────────────
function scrollToSection(sectionId) {
  setTimeout(function() {
    var el = document.getElementById(sectionId);
    if (el) {
      var offset = 120; // header + nav height
      var top = el.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: top, behavior: 'smooth' });
    }
  }, 80);
}

// ── FAQ Accordion ─────────────────────────────────────────
function toggleFAQ(btn) {
  var answer = btn.nextElementSibling;
  var isOpen = btn.getAttribute('aria-expanded') === 'true';

  // Optionally close all others in the same group
  var group = btn.closest('.faq-group');
  if (group) {
    group.querySelectorAll('.faq-question[aria-expanded="true"]').forEach(function(other) {
      if (other !== btn) {
        other.setAttribute('aria-expanded', 'false');
        other.nextElementSibling.classList.remove('open');
      }
    });
  }

  if (isOpen) {
    btn.setAttribute('aria-expanded', 'false');
    answer.classList.remove('open');
  } else {
    btn.setAttribute('aria-expanded', 'true');
    answer.classList.add('open');
  }
}

// ── FAQ Category Filter ───────────────────────────────────
function filterFAQ(category) {
  // Update filter buttons
  document.querySelectorAll('.faq-filter-btn').forEach(function(btn) {
    btn.classList.toggle('active', btn.getAttribute('data-filter') === category);
  });

  // Show/hide FAQ groups
  document.querySelectorAll('.faq-group').forEach(function(group) {
    if (category === 'all') {
      group.classList.remove('hidden');
    } else {
      var matches = group.getAttribute('data-category') === category;
      group.classList.toggle('hidden', !matches);
    }
  });

  // Scroll to FAQ filters area
  var filtersEl = document.getElementById('faqFilters');
  if (filtersEl) {
    setTimeout(function() {
      var offset = 120;
      var top = filtersEl.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: top, behavior: 'smooth' });
    }, 50);
  }
}

// ── Contact Form Handler ──────────────────────────────────
function handleContact(event) {
  event.preventDefault();
  var form = event.target;

  var name    = (form.querySelector('#cName')    || {}).value || '';
  var email   = (form.querySelector('#cEmail')   || {}).value || '';
  var subject = (form.querySelector('#cSubject') || {}).value || 'Inquiry from Website';
  var message = (form.querySelector('#cMessage') || {}).value || '';

  if (!name || !email || !message) {
    alert('Please fill in all required fields.');
    return;
  }

  var body = encodeURIComponent(
    'Name: ' + name + '\n' +
    'Email: ' + email + '\n\n' +
    message
  );
  var mailtoLink = 'mailto:rvpsandiego@gmail.com' +
    '?subject=' + encodeURIComponent(subject) +
    '&body=' + body;

  window.location.href = mailtoLink;

  var successEl = document.getElementById('contactSuccess');
  if (successEl) {
    successEl.style.display = 'flex';
    form.reset();
    setTimeout(function() { successEl.style.display = 'none'; }, 8000);
  }
}

// ── Mobile Hamburger ──────────────────────────────────────
function closeMobileMenu() {
  var btn  = document.getElementById('hamburgerBtn');
  var list = document.getElementById('navList');
  if (btn && list) {
    btn.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
    list.classList.remove('open');
  }
}

document.addEventListener('DOMContentLoaded', function() {
  var hamburger = document.getElementById('hamburgerBtn');
  var navList   = document.getElementById('navList');

  if (hamburger && navList) {
    hamburger.addEventListener('click', function() {
      var isOpen = navList.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
    });
  }

  // Close mobile menu when clicking outside
  document.addEventListener('click', function(e) {
    if (hamburger && navList) {
      if (!hamburger.contains(e.target) && !navList.contains(e.target)) {
        closeMobileMenu();
      }
    }
  });

  // Keyboard accessibility for FAQ items
  document.querySelectorAll('.faq-question').forEach(function(btn) {
    btn.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleFAQ(btn);
      }
    });
  });
});
