/* ============================================================
   FORM — formulario de cita con validación y confirmación
   ============================================================ */

function initForm() {
  const form    = document.getElementById('citaForm');
  const success = document.getElementById('formSuccess');

  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }

    success.classList.add('show');
    form.reset();
    setTimeout(() => success.classList.remove('show'), 6000);
  });
}
