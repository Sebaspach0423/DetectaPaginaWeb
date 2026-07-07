/* ============================================================
   MAIN — punto de entrada: renderiza y arranca todos los módulos
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {
  renderAll();       /* render.js      — construye secciones dinámicas */
  initNav();         /* nav.js         — navbar scroll + menú móvil    */
  initAnimations();  /* animations.js  — reveal al hacer scroll        */
  initHeroVideo();   /* (abajo)        — video hero auto-play           */
});

/* ─── Hero: video en bucle automático ────────────────────────── */
function initHeroVideo() {
  var vid   = document.getElementById('heroVid');
  var frame = document.getElementById('heroMediaFrame');
  if (!vid || !frame) return;

  /* Cuando el video pueda reproducirse, cambia al video y oculta la imagen */
  function onPlay() {
    frame.classList.add('playing');
  }

  vid.addEventListener('canplay', onPlay, { once: true });

  /* Por si el navegador ya tiene el buffer listo antes de DOMContentLoaded */
  if (vid.readyState >= 3) onPlay();
}
