/* ============================================================
   NAV — navbar scroll + menú hamburguesa móvil
   ============================================================ */

function initNav() {
  const nav    = document.getElementById('siteNav');
  const burger = document.getElementById('navBurger');
  const menu   = document.getElementById('mobileMenu');

  if (!nav) return;

  /* ── Scroll: añade clase .scrolled ──────────────────────── */
  function onScroll() {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── Mobile menu toggle ─────────────────────────────────── */
  function toggleMenu(open) {
    burger.classList.toggle('open', open);
    menu.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  }

  if (burger) {
    burger.addEventListener('click', () => {
      toggleMenu(!menu.classList.contains('open'));
    });
  }

  /* ── Close on nav-link click (mobile) ──────────────────── */
  if (menu) {
    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => toggleMenu(false));
    });
  }

  /* ── Close on Escape ────────────────────────────────────── */
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') toggleMenu(false);
  });

  /* ── Smooth scroll for all in-page anchors ──────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const id = link.getAttribute('href').slice(1);
      const el = document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      const top = el.getBoundingClientRect().top + window.pageYOffset - 72;
      window.scrollTo({ top, behavior: 'smooth' });
      toggleMenu(false);
    });
  });
}
