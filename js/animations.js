/* ============================================================
   ANIMATIONS — scroll reveal para todas las secciones
   ============================================================ */

function initReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal, .reveal-l, .reveal-r').forEach(el => {
    if (!el.classList.contains('in')) observer.observe(el);
  });
}

function initAnimations() {
  initReveal();
}
