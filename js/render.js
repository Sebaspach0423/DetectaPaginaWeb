/* ============================================================
   RENDER — construye el DOM dinámico de cada sección
   ============================================================ */

/* ---------- Image fallback ---------- */
function attachImgFallback(img) {
  img.addEventListener('error', () => img.classList.add('failed'), { once: true });
}

/* ---------- Specialties — Full-bleed video section ---------- */
function renderSpecialties() {
  var wrap = document.getElementById('specGrid');
  if (!wrap) return;

  var activeIndex = 0;
  var curSlot     = 0;    /* 0 = vidA es activo, 1 = vidB es activo */
  var AUTO_MS     = 5000;
  var autoTimer   = null;

  /* ── Construye lista de ítems ── */
  var listHTML = specialties.map(function(s, i) {
    var num = (i < 9 ? '0' : '') + (i + 1);
    return '<button class="spec-item' + (i === 0 ? ' active' : '') + '" data-idx="' + i + '">'
         +   '<span class="spec-item-num">' + num + '</span>'
         +   '<span class="spec-item-name">' + s.n + '</span>'
         +   '<span class="spec-item-dot"></span>'
         + '</button>';
  }).join('');

  /* ── HTML completo de la sección ── */
  wrap.innerHTML =
    /* Fondo */
    '<div class="spec-bg">'
  +   '<video class="spec-vid" id="sVidA" muted loop playsinline></video>'
  +   '<video class="spec-vid" id="sVidB" muted loop playsinline></video>'
  +   '<img  class="spec-fallback" id="sFallback" alt="">'
  +   '<div class="spec-overlay"></div>'
  + '</div>'

    /* Contenido */
  + '<div class="spec-wrap">'
  +   '<div class="spec-left">'
  +     '<div class="spec-sec-eyebrow">Especialidades Médicas</div>'
  +     '<div class="spec-items">' + listHTML + '</div>'
  +   '</div>'
  +   '<div class="spec-right">'
  +     '<div class="spec-detail-inner" id="sDetailInner">'
  +       '<div class="spec-detail">'
  +         '<div class="spec-detail-ghost" id="sGhost"></div>'
  +         '<h2 class="spec-detail-name" id="sName"></h2>'
  +         '<div class="spec-detail-bar"></div>'
  +         '<p class="spec-detail-desc" id="sDesc"></p>'
  +         '<a href="#contacto" class="spec-cta">'
  +           'Consultar ahora'
  +           '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">'
  +             '<path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>'
  +           '</svg>'
  +         '</a>'
  +       '</div>'
  +     '</div>'
  +   '</div>'
  + '</div>'

    /* Barra de progreso */
  + '<div class="spec-progress-wrap"><div class="spec-progress-fill" id="sProgress"></div></div>';

  /* ── Referencias DOM ── */
  var items     = wrap.querySelectorAll('.spec-item');
  var vidA      = document.getElementById('sVidA');
  var vidB      = document.getElementById('sVidB');
  var fallback  = document.getElementById('sFallback');
  var ghost     = document.getElementById('sGhost');
  var nameEl    = document.getElementById('sName');
  var descEl    = document.getElementById('sDesc');
  var detail    = document.getElementById('sDetailInner');
  var progFill  = document.getElementById('sProgress');
  var VIDS      = [vidA, vidB];

  /* ── Cambia el fondo (video o imagen) ── */
  function switchBg(spec) {
    if (spec.video) {
      var nextSlot = 1 - curSlot;
      var nextVid  = VIDS[nextSlot];
      var prevVid  = VIDS[curSlot];

      nextVid.src = spec.video;
      nextVid.load();
      nextVid.play().catch(function() {});

      nextVid.style.opacity  = '1';
      prevVid.style.opacity  = '0';
      fallback.style.opacity = '0';
      curSlot = nextSlot;
    } else {
      /* Sin video: muestra la imagen de fallback */
      fallback.src           = spec.img;
      fallback.style.opacity = '1';
      vidA.style.opacity     = '0';
      vidB.style.opacity     = '0';
    }
  }

  /* ── Actualiza el panel derecho con fade ── */
  function updateContent(spec, idx) {
    var num = (idx < 9 ? '0' : '') + (idx + 1);
    detail.classList.add('exit');
    setTimeout(function() {
      ghost.textContent  = num;
      nameEl.textContent = spec.n;
      descEl.textContent = spec.detail || spec.d;
      detail.classList.remove('exit');
    }, 320);
  }

  /* ── Activa una especialidad ── */
  function activate(idx) {
    activeIndex = idx;
    var spec    = specialties[idx];

    items.forEach(function(el) { el.classList.remove('active'); });
    items[idx].classList.add('active');

    switchBg(spec);
    updateContent(spec, idx);
    startProgress();
  }

  /* ── Barra de progreso ── */
  function startProgress() {
    if (!progFill) return;
    progFill.style.transition = 'none';
    progFill.style.width      = '0%';
    progFill.getBoundingClientRect();
    progFill.style.transition = 'width ' + AUTO_MS + 'ms linear';
    progFill.style.width      = '100%';
  }

  /* ── Auto-avance circular ── */
  function startAuto() {
    clearInterval(autoTimer);
    autoTimer = setInterval(function() {
      activate((activeIndex + 1) % specialties.length);
    }, AUTO_MS);
    startProgress();
  }

  /* ── Eventos de interacción ── */
  items.forEach(function(el) {
    el.addEventListener('click', function() {
      activate(+el.dataset.idx);
      startAuto(); /* reinicia el timer tras click manual */
    });
  });

  /* ── Arranque inicial ── */
  activate(0);
  startAuto();
}

/* ---------- Diagnostics — 3D Card Stack + Auto-play ---------- */
function renderDiagnostics() {
  var wrap = document.getElementById('diagGrid');
  if (!wrap) return;

  var activeIndex  = 0;
  var AUTO_MS      = 4000;   /* intervalo de auto-avance en ms */
  var autoTimer    = null;

  /* ── HTML de tarjetas ── */
  var cardsHTML = diagnostics.map(function(d, i) {
    var icon     = DIAG_ICONS[d.id] || DIAG_ICONS.ecg;
    var tagsHTML = (d.tags || []).map(function(t) {
      return '<span class="diag-tag">' + t + '</span>';
    }).join('');

    return '<div class="diag-card-3d" data-index="' + i + '" role="button" tabindex="0" aria-label="' + d.n + '">'
         +   '<div class="diag-card-top">'
         +     '<div class="diag-card-icon">' + icon + '</div>'
         +     '<span class="diag-card-cat">' + d.d + '</span>'
         +   '</div>'
         +   '<div class="diag-card-body">'
         +     '<h3>' + d.n + '</h3>'
         +     '<p>' + (d.detail || '') + '</p>'
         +   '</div>'
         +   '<div class="diag-card-tags">' + tagsHTML + '</div>'
         + '</div>';
  }).join('');

  /* ── HTML de barra de progreso y puntos ── */
  var dotsHTML = diagnostics.map(function(d, i) {
    return '<button class="diag-dot' + (i === 0 ? ' active' : '') + '" data-index="' + i + '" aria-label="' + d.n + '"></button>';
  }).join('');

  wrap.innerHTML =
    '<div class="diag-stack-outer">' + cardsHTML + '</div>'
  + '<div class="diag-progress-wrap"><div class="diag-progress-fill"></div></div>'
  + '<div class="diag-dots">' + dotsHTML + '</div>';

  var cards      = wrap.querySelectorAll('.diag-card-3d');
  var dots       = wrap.querySelectorAll('.diag-dot');
  var stackOuter = wrap.querySelector('.diag-stack-outer');
  var progFill   = wrap.querySelector('.diag-progress-fill');

  /* ── Posiciona las tarjetas en el espacio 3D ── */
  function updateStack() {
    cards.forEach(function(card, i) {
      var offset  = i - activeIndex;
      var abs     = Math.abs(offset);

      if (abs > 2) {
        card.style.opacity       = '0';
        card.style.pointerEvents = 'none';
        card.style.zIndex        = '0';
        return;
      }

      var tx      = offset * 118;
      var tz      = -abs  * 90;
      var ry      = offset * 13;
      var scale   = 1 - abs * 0.10;
      var opacity = 1 - abs * 0.38;

      card.style.transform     = 'translateX(' + tx + 'px) translateZ(' + tz + 'px) rotateY(' + ry + 'deg) scale(' + scale + ')';
      card.style.opacity       = String(opacity);
      card.style.zIndex        = String(10 - abs);
      card.style.pointerEvents = 'auto';
    });

    dots.forEach(function(dot, i) {
      dot.classList.toggle('active', i === activeIndex);
    });
  }

  /* ── Barra de progreso: reinicia la animación CSS ── */
  function startProgress() {
    if (!progFill) return;
    progFill.style.transition = 'none';
    progFill.style.width      = '0%';
    progFill.getBoundingClientRect();                      /* fuerza reflow */
    progFill.style.transition = 'width ' + AUTO_MS + 'ms linear';
    progFill.style.width      = '100%';
  }

  /* ── Auto-play circular ── */
  function startAuto() {
    clearInterval(autoTimer);
    autoTimer = setInterval(function() {
      activeIndex = (activeIndex + 1) % diagnostics.length;
      updateStack();
      startProgress();
    }, AUTO_MS);
    startProgress();
  }

  /* ── Navegar a una tarjeta específica ── */
  function goTo(index) {
    var len = diagnostics.length;
    activeIndex = ((index % len) + len) % len;
    updateStack();
    startAuto(); /* reinicia el timer tras interacción manual */
  }

  /* ── Eventos de interacción ── */
  cards.forEach(function(card) {
    card.addEventListener('click', function() { goTo(+card.dataset.index); });
    card.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') goTo(+card.dataset.index);
    });
  });

  dots.forEach(function(dot) {
    dot.addEventListener('click', function() { goTo(+dot.dataset.index); });
  });

  /* Flechas de teclado */
  wrap.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft')  goTo(activeIndex - 1);
    if (e.key === 'ArrowRight') goTo(activeIndex + 1);
  });

  /* ── Arranque inicial ── */
  updateStack();
  startAuto();
}

/* ---------- Why Us ---------- */
function renderWhyUs() {
  const grid = document.getElementById('whyGrid');
  if (!grid) return;
  grid.innerHTML = whyUs.map((w, i) => `
    <article class="why-card reveal delay-${i + 1}">
      <div class="why-num">${w.num}</div>
      <div class="why-bar"></div>
      <h3>${w.t}</h3>
      <p>${w.d}</p>
    </article>`
  ).join('');
}

/* ---------- Testimonials ---------- */
function renderTestimonials() {
  const grid = document.getElementById('testGrid');
  if (!grid) return;
  grid.innerHTML = testimonials.map(t => `
    <article class="test-card reveal">
      <div class="test-quote">"</div>
      <p class="test-text">${t.t}</p>
      <div class="test-footer">
        <div class="test-avatar">${t.n[0]}</div>
        <div>
          <div class="test-name">${t.n}</div>
          <div class="test-spec">${t.s}</div>
        </div>
        <div class="test-stars">★★★★★</div>
      </div>
    </article>`
  ).join('');
}

/* ---------- Team — Pulso Vital ---------- */
function renderTeam() {
  var grid = document.getElementById('teamGrid');
  if (!grid) return;

  /* Trayectoria del EKG (reutilizada en todas las tarjetas) */
  var EKG_PATH  = 'M0 22 L44 22 L54 22 L59 5 L64 39 L67 10 L71 22 L124 22 L134 22 L139 5 L144 39 L147 10 L151 22 L204 22 L214 22 L219 5 L224 39 L227 10 L231 22 L284 22 L294 22 L299 5 L304 39 L307 10 L311 22 L364 22 L400 22';
  var EKG_GRID  = 'M100 0 L100 44 M200 0 L200 44 M300 0 L300 44';

  grid.innerHTML = team.map(function(doc) {
    return '<article class="team-card reveal">'

         /* ── Foto ── */
         + '<div class="team-photo">'
         +   '<img src="' + doc.img + '" alt="' + doc.n + '" loading="lazy">'
         + '</div>'

         /* ── Franja EKG ── */
         + '<div class="team-ekg" aria-hidden="true">'
         +   '<div class="team-ekg-wrap">'
         +     '<svg viewBox="0 0 400 44" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">'
         +       '<path stroke="rgba(255,255,255,.06)" stroke-width="1" fill="none" d="' + EKG_GRID + '"/>'
         +       '<path stroke="#C0102A" stroke-width="1.8" fill="none" d="' + EKG_PATH + '"/>'
         +     '</svg>'
         +   '</div>'
         + '</div>'

         /* ── Cuerpo ── */
         + '<div class="team-body">'
         +   '<div class="team-spec">' + doc.r + '</div>'
         +   '<h3>' + doc.n + '</h3>'
         +   (doc.bio ? '<p class="team-bio-text">' + doc.bio + '</p>' : '')
         +   '<div class="team-foot">'
         +     '<div>'
         +       '<div class="team-exp-num">' + (doc.exp || '—') + '</div>'
         +       '<div class="team-exp-sub">años de exp.</div>'
         +     '</div>'
         +     '<span class="team-cmp-badge">' + doc.cmp + '</span>'
         +     '<div class="team-pulse-dot"></div>'
         +   '</div>'
         + '</div>'

         + '</article>';
  }).join('');

  document.querySelectorAll('.team-photo img').forEach(attachImgFallback);
}

/* ---------- Render all ---------- */
function renderAll() {
  renderSpecialties();
  renderDiagnostics();
  renderWhyUs();
  renderTestimonials();
  renderTeam();
}
