// ==========================================================================
//  router.js — Routing utilities & Parameter Parsers
// ==========================================================================

window.Router = {
  getParam(key) {
    const params = new URLSearchParams(window.location.search);
    return params.get(key);
  },

  getCurrentProject() {
    const slug = this.getParam('p');
    if (!window.STUDIO || !window.STUDIO.projects) return null;
    if (!slug) return window.STUDIO.projects[0];
    return window.STUDIO.projects.find(p => p.slug === slug) || window.STUDIO.projects[0];
  },

  getCurrentArticle() {
    const slug = this.getParam('a');
    if (!window.STUDIO || !window.STUDIO.articles) return null;
    if (!slug) return window.STUDIO.articles[0];
    return window.STUDIO.articles.find(a => a.slug === slug) || window.STUDIO.articles[0];
  },

  initNav() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav__links a');

    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      // Normalize comparison for index and subpages
      if (
        (currentPath.endsWith('/') || currentPath.endsWith('index.html')) &&
        (href === 'index.html' || href === './index.html')
      ) {
        link.classList.add('is-active');
      } else if (href && currentPath.includes(href.replace('../', '').replace('./', ''))) {
        link.classList.add('is-active');
      }
    });

    // Mobile nav toggle
    const toggle = document.querySelector('.nav__mobile-toggle');
    const menu = document.querySelector('.nav__links');
    if (toggle && menu) {
      toggle.addEventListener('click', () => {
        menu.classList.toggle('is-open');
        const isOpen = menu.classList.contains('is-open');
        toggle.setAttribute('aria-expanded', isOpen);
      });
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  window.Router.initNav();
});
