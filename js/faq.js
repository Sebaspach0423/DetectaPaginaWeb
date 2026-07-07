/* ============================================================
   FAQ — acordeón animado de preguntas frecuentes
   ============================================================ */

function initFAQ() {
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-q');
    const a = item.querySelector('.faq-a');

    q.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      /* cerrar todos */
      document.querySelectorAll('.faq-item').forEach(it => {
        it.classList.remove('open');
        it.querySelector('.faq-a').style.maxHeight = null;
      });

      /* abrir el pulsado si estaba cerrado */
      if (!isOpen) {
        item.classList.add('open');
        a.style.maxHeight = a.scrollHeight + 'px';
      }
    });
  });
}
