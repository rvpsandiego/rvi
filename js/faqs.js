/**
 * faqs.js — FAQ accordion and category filtering
 * ================================================
 * Handles:
 *   - Collapsible FAQ items (accordion)
 *   - Category filter buttons
 *   - URL hash state (#admissions, #academics, #programs)
 *
 * ADDING A NEW CATEGORY:
 *   1. Add the category string to the validCategories array below.
 *   2. Add a filter button and faq-group to faqs.html (see template comments there).
 */

'use strict';

/** Categories that map to URL hashes and data-category attributes */
var validCategories = ['admissions', 'academics', 'programs'];

// ── Toggle a single FAQ item ──────────────────────────────
function toggleFAQ(btn) {
  var answer = btn.nextElementSibling;
  var isOpen = btn.getAttribute('aria-expanded') === 'true';

  // Close all other open items in the same group (one-open-at-a-time)
  var group = btn.closest('.faq-group');
  if (group) {
    group.querySelectorAll('.faq-question[aria-expanded="true"]').forEach(function (other) {
      if (other !== btn) {
        other.setAttribute('aria-expanded', 'false');
        other.nextElementSibling.classList.remove('open');
      }
    });
  }

  btn.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
  answer.classList.toggle('open', !isOpen);
}

// ── Filter FAQ groups by category ────────────────────────
function filterFAQ(category) {
  // Update active filter button
  document.querySelectorAll('.faq-filter-btn').forEach(function (btn) {
    btn.classList.toggle('active', btn.getAttribute('data-filter') === category);
  });

  // Show/hide groups
  document.querySelectorAll('.faq-group').forEach(function (group) {
    var groupCat = group.getAttribute('data-category');
    var show = (category === 'all') || (groupCat === category);
    group.classList.toggle('hidden', !show);
  });

  // Persist selection in URL hash without triggering a page jump
  var newHash = category === 'all' ? '' : '#' + category;
  if (window.history && window.history.replaceState) {
    window.history.replaceState(null, '', newHash || window.location.pathname);
  }

  // Scroll to filter bar so category is in view
  var filtersEl = document.getElementById('faqFilters');
  if (filtersEl) {
    var offset = 140;
    var top = filtersEl.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top: top, behavior: 'smooth' });
  }
}

// ── Init ──────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function () {

  // Apply filter from URL hash on load
  var hash = window.location.hash.slice(1);
  if (validCategories.indexOf(hash) !== -1) {
    // Use setTimeout so components.js has time to render nav first
    setTimeout(function () { filterFAQ(hash); }, 50);
  }

  // React to hash changes (e.g. browser back/forward, submenu clicks)
  window.addEventListener('hashchange', function () {
    var newHash = window.location.hash.slice(1);
    if (validCategories.indexOf(newHash) !== -1) {
      filterFAQ(newHash);
    } else {
      filterFAQ('all');
    }
  });

  // Keyboard support for FAQ buttons
  document.querySelectorAll('.faq-question').forEach(function (btn) {
    btn.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleFAQ(btn);
      }
    });
  });
});
