/* ============================================================
   CAROUSEL — carrusel automático de testimonios
   ============================================================ */

function initCarousel() {
  const cards = [...document.querySelectorAll('.test-card')];
  const dots  = [...document.querySelectorAll('.test-dots button')];
  let idx     = 0;
  let timer;

  function show(i) {
    idx = (i + cards.length) % cards.length;
    cards.forEach((c, k) => c.classList.toggle('active', k === idx));
    dots.forEach((d, k)  => d.classList.toggle('active', k === idx));
  }

  function start() {
    timer = setInterval(() => show(idx + 1), 5500);
  }

  dots.forEach(d => d.addEventListener('click', () => {
    show(+d.dataset.idx);
    clearInterval(timer);
    start();
  }));

  start();
}
