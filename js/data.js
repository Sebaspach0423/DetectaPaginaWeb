/* ============================================================
   DATA — contenido estático de la landing page
   ============================================================ */

const WA_URL = 'https://wa.me/51967990019?text=Hola%2C%20quisiera%20agendar%20una%20cita%20en%20Cl%C3%ADnica%20Coraz%C3%B3n%20de%20Le%C3%B3n';

// ─── Diagnostic SVG icons (viewBox 0 0 24 24) ─────────────────
const DIAG_ICONS = {
  endoscopia: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <circle cx="9" cy="9" r="5" stroke="#0F4C81" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M13 13L20 20" stroke="#0F4C81" stroke-width="2" stroke-linecap="round"/>
    <circle cx="9" cy="9" r="2" fill="#0F4C81"/>
  </svg>`,
  colonoscopia: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M4 14C4 8 8 7 12 7C16 7 16 12 16 14C16 19 19 19 21 18" stroke="#0F4C81" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,
  ecografia: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M8 12C8.5 9 10 8 12 8C14 8 15.5 9 16 12" stroke="#0F4C81" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M5 12C6 6 9 4 12 4C15 4 18 6 19 12" stroke="#0F4C81" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="12" cy="15" r="2" fill="#0F4C81"/>
  </svg>`,
  doppler: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M2 8C4 5 4 11 6 13C8 15 8 9 10 11C12 13 12 17 14 17C16 17 16 13 18 14C20 15 20 18 22 18" stroke="#0F4C81" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,
  ecg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M2 12H6L8 6L10 18L12 9L14 15L16 12H22" stroke="#0F4C81" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,
  lab: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M9 3V12L5 19C4 21 5 22 7 22H17C19 22 20 21 19 19L15 12V3Z" stroke="#0F4C81" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M9 15C10.5 13.5 13.5 13.5 15 15" stroke="#0F4C81" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M9 3H15" stroke="#0F4C81" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,
  pap: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="7" stroke="#0F4C81" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M10 9V15M12 8V16M14 9V15" stroke="#0F4C81" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,
  colpo: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <circle cx="10" cy="10" r="6" stroke="#0F4C81" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M15 15L21 21" stroke="#0F4C81" stroke-width="2" stroke-linecap="round"/>
    <circle cx="10" cy="10" r="2.5" fill="#0F4C81"/>
  </svg>`,
};

// ─── Specialties ──────────────────────────────────────────────
const specialties = [
  {
    id: 'cardio', n: 'Cardiología',
    d: 'Evaluación y diagnóstico de enfermedades del corazón y sistema cardiovascular.',
    detail: 'Nuestros cardiólogos emplean tecnología de vanguardia — electrocardiograma, ecocardiografía y Doppler cardíaco — para evaluar, diagnosticar y tratar patologías del corazón con precisión y rapidez.',
    featured: true,
    video: 'VideoCardiologia.mp4'
  },
  {
    id: 'gastro', n: 'Gastroenterología',
    d: 'Diagnóstico y tratamiento de enfermedades del aparato digestivo.',
    detail: 'Realizamos endoscopia, colonoscopia y estudios funcionales del aparato digestivo para detectar gastritis, úlceras, reflujo, pólipos y otras patologías con la mayor precisión diagnóstica.',
    featured: true,
    video: 'VideoGastroenterologia.mp4'
  },
  {
    id: 'interna', n: 'Medicina Interna',
    d: 'Atención integral del adulto y diagnóstico de enfermedades sistémicas.',
    detail: 'El internista coordina el diagnóstico y tratamiento de enfermedades complejas que afectan múltiples órganos y sistemas, brindando una atención integral, personalizada y continuada al paciente adulto.',
    video: 'VideoMedicinaInterna.mp4'
  },
  {
    id: 'general', n: 'Medicina General',
    d: 'Primera consulta y atención primaria para toda la familia.',
    detail: 'Ofrecemos consulta de primera atención para adultos y niños, manejo de enfermedades agudas y crónicas, chequeos preventivos y derivación oportuna al especialista que cada paciente necesita.',
    video: 'VideoMedicinaGeneral.mp4'
  },
  {
    id: 'neuro', n: 'Neurología',
    d: 'Diagnóstico y tratamiento de enfermedades del sistema nervioso.',
    detail: 'Evaluamos y tratamos migraña, epilepsia, vértigo, trastornos del movimiento y enfermedades cerebrovasculares, apoyados en electroencefalografía y diagnóstico por imagen cerebral de última generación.',
    video: 'VideoNeurologia.mp4'
  },
  {
    id: 'endocri', n: 'Endocrinología',
    d: 'Tratamiento de diabetes, tiroides y alteraciones hormonales.',
    detail: 'Diagnosticamos y tratamos diabetes mellitus, hipotiroidismo, hipertiroidismo, obesidad, síndrome metabólico y otras alteraciones hormonales con un enfoque preventivo y terapéutico personalizado.',
    video: 'VideoEndocrinologia.mp4'
  },
  {
    id: 'gineco', n: 'Ginecología y Obstetricia',
    d: 'Salud femenina, embarazo y seguimiento prenatal personalizado.',
    detail: 'Brindamos atención integral a la mujer en todas las etapas de su vida: control prenatal, ecografía obstétrica 3D/4D, Papanicolau, colposcopía y acompañamiento en el embarazo de alto riesgo.',
    video: 'VideoGinecologia.mp4'
  },
  {
    id: 'neumo', n: 'Neumología',
    d: 'Diagnóstico y tratamiento de enfermedades del sistema respiratorio.',
    detail: 'Atendemos asma, EPOC, neumonía, apnea del sueño y otras enfermedades respiratorias mediante espirometría, oximetría y estudios del sueño, con tratamiento especializado y seguimiento continuo.',
    video: 'VideoNeumologia.mp4'
  },
];

// ─── Diagnostics ──────────────────────────────────────────────
const diagnostics = [
  {
    id: 'endoscopia', n: 'Endoscopia', d: 'Tracto digestivo superior',
    detail: 'Visualización directa del esófago, estómago y duodeno para detectar gastritis, úlceras pépticas, reflujo gastroesofágico y pólipos con alta precisión.',
    tags: ['Sin hospitalización', 'Duración ~30 min']
  },
  {
    id: 'colonoscopia', n: 'Colonoscopia', d: 'Intestino grueso',
    detail: 'Examen completo del colon e intestino grueso para la detección y extirpación de pólipos, diagnóstico de colitis y prevención del cáncer colorrectal.',
    tags: ['Prevención oncológica', 'Duración ~45 min']
  },
  {
    id: 'ecografia', n: 'Ecografía 3D/4D/5D', d: 'Imagen de última generación',
    detail: 'Ecografía 3D/4D/5D en Huánuco: imagen tridimensional en tiempo real para órganos abdominales, pélvicos y seguimiento del embarazo con visualización detallada del feto.',
    tags: ['Embarazo & órganos', 'Alta resolución']
  },
  {
    id: 'doppler', n: 'Ecografía Doppler', d: 'Flujo sanguíneo',
    detail: 'Evaluación del flujo arterial y venoso para detectar obstrucciones, trombosis, insuficiencia venosa y alteraciones circulatorias periféricas.',
    tags: ['Cardiovascular', 'No invasivo']
  },
  {
    id: 'ecg', n: 'Electrocardiograma', d: 'Actividad cardíaca',
    detail: 'Registro de la actividad eléctrica del corazón para detectar arritmias, infartos silentes, hipertrofia ventricular y otras patologías cardíacas.',
    tags: ['Cardiología', 'Duración ~10 min']
  },
  {
    id: 'lab', n: 'Laboratorio Clínico', d: 'Resultados el mismo día',
    detail: 'Hemograma completo, glucosa, perfil lipídico, función renal y hepática, exámenes de orina, cultivos y marcadores tumorales con reporte rápido.',
    tags: ['Amplio catálogo', 'Entrega en horas']
  },
  {
    id: 'pap', n: 'Papanicolau', d: 'Detección temprana',
    detail: 'Citología cervical para la detección oportuna de lesiones premalignas y cáncer de cuello uterino, clave en la salud preventiva femenina.',
    tags: ['Ginecología', 'Duración ~10 min']
  },
  {
    id: 'colpo', n: 'Colposcopía', d: 'Cuello uterino',
    detail: 'Examen ampliado del cuello uterino con colposcopio de alta definición para identificar y biopsiar lesiones cervicales con máxima precisión diagnóstica.',
    tags: ['Ginecología', 'Alta precisión']
  },
];

// ─── Why Us ───────────────────────────────────────────────────
const whyUs = [
  { num: '01', t: 'Tecnología avanzada',        d: 'Ecografías 3D/4D/5D, Doppler, electrocardiograma y laboratorio clínico de última generación.' },
  { num: '02', t: 'Especialistas certificados', d: '8 especialidades médicas con profesionales certificados y amplia experiencia clínica.' },
  { num: '03', t: 'Resultados rápidos y confiables',    d: 'Laboratorio con resultados rápidos y diagnóstico oportuno para iniciar tu tratamiento.' },
  { num: '04', t: 'Atención de confianza',      d: 'Trato humano, cálido y personalizado para cada paciente. Tu bienestar, nuestra prioridad.' },
];

// ─── Testimonials ─────────────────────────────────────────────
const testimonials = [
  { n: 'María L.',  s: 'Gastroenterología', t: 'Me atendieron muy rápido y el diagnóstico fue preciso. Los especialistas son muy profesionales y el trato es excelente. Recomiendo Clínica Corazón de León al 100%.' },
  { n: 'Carlos R.', s: 'Cardiología',       t: 'El cardiólogo me explicó todo con claridad. Me realizaron el ECG el mismo día y tuve los resultados en pocas horas. Una clínica de primer nivel en Huánuco.' },
  { n: 'Ana M.',    s: 'Ecografía 4D',      t: 'Las ecografías son de altísima calidad. Pude ver a mi bebé con mucho detalle. El personal es muy amable y profesional. ¡Excelente servicio!' },
];

// ─── Team ─────────────────────────────────────────────────────
const team = [
  {
    n: 'Dr. Alejandro Ríos Paredes', r: 'Cardiólogo', cmp: 'CMP 45231', exp: 14,
    bio: 'Especialista en cardiología clínica e intervencionista, con formación en hemodinámica y diagnóstico de enfermedades cardiovasculares.',
    img: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=700&q=80'
  },
  {
    n: 'Dra. Lucía Fernández Torres', r: 'Gastroenteróloga', cmp: 'CMP 38872', exp: 11,
    bio: 'Experta en endoscopia diagnóstica y terapéutica, con enfoque en enfermedades inflamatorias del tracto digestivo.',
    img: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=700&q=80'
  },
  {
    n: 'Dr. Marco Salinas Vega', r: 'Neurólogo', cmp: 'CMP 51104', exp: 9,
    bio: 'Especialista en neurología clínica, enfermedades cerebrovasculares y diagnóstico por imagen del sistema nervioso.',
    img: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=700&q=80'
  },
  {
    n: 'Dra. Patricia Huanca Rojas', r: 'Ginecóloga y Obstetra', cmp: 'CMP 29945', exp: 16,
    bio: 'Amplia experiencia en obstetricia de alto riesgo, ecografía obstétrica 3D/4D y salud reproductiva integral.',
    img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=700&q=80'
  },
  {
    n: 'Dr. Roberto Chávez Mori', r: 'Endocrinólogo', cmp: 'CMP 44780', exp: 12,
    bio: 'Especialista en diabetes, enfermedades tiroideas y trastornos metabólicos y hormonales del adulto.',
    img: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=700&q=80'
  },
  {
    n: 'Dra. Ana Mejía Castillo', r: 'Neumóloga', cmp: 'CMP 36621', exp: 10,
    bio: 'Experta en diagnóstico y tratamiento de enfermedades respiratorias, espirometría y manejo del asma y EPOC.',
    img: 'https://images.unsplash.com/photo-1591604021695-0c69b7c05981?auto=format&fit=crop&w=700&q=80'
  },
];
