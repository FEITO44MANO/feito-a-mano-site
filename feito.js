
(function(){
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // Social links — EDIT these 2 lines
  const IG_URL = "https://instagram.com/YOUR_USERNAME";
  const ETSY_URL = "https://www.etsy.com/shop/YOUR_SHOP";

  for (const id of ["igLink","igLinkFoot"]) {
    const el = document.getElementById(id);
    if (el) el.href = IG_URL;
  }
  for (const id of ["etsyLink","etsyLinkFoot"]) {
    const el = document.getElementById(id);
    if (el) el.href = ETSY_URL;
  }

  // Loader fade
  function hideLoader(){
    const loader = document.getElementById('loader');
    if (!loader) return;
    loader.classList.add('hidden');
    setTimeout(() => loader.remove(), 700);
  }
  window.addEventListener('load', () => setTimeout(hideLoader, 800));
  setTimeout(hideLoader, 3500);

  // Parallax drift on scroll
  window.addEventListener('scroll', () => {
    const y = window.scrollY * 0.15;
    document.body.style.backgroundPosition = `center ${y}px, center`;
  });

  // Gallery filters
  const chips = document.querySelectorAll('.chip');
  const tiles = document.querySelectorAll('.tile');
  chips.forEach(ch => ch.addEventListener('click', () => {
    chips.forEach(c => c.classList.remove('active'));
    ch.classList.add('active');
    const f = ch.dataset.filter;
    tiles.forEach(t => {
      const show = f === 'all' || t.classList.contains(f);
      t.style.display = show ? '' : 'none';
    });
  }));

  // Lightbox
  const lightbox = document.getElementById('lightbox');
  const lbImg = lightbox.querySelector('img');
  document.getElementById('gallery')?.addEventListener('click', (e) => {
    if (e.target.closest('.view')){
      const fig = e.target.closest('.tile');
      const img = fig.querySelector('img');
      lbImg.src = img.src;
      lbImg.alt = img.alt;
      lightbox.classList.add('open');
    }
  });
  lightbox.querySelector('.close').addEventListener('click', () => lightbox.classList.remove('open'));
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) lightbox.classList.remove('open'); });

  // Language toggle
  const langToggle = document.getElementById('langToggle');
  let lang = localStorage.getItem('lang') || 'en';
  function applyLang(){
    const dict = window.__LANG__[lang] || {};
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) el.innerHTML = dict[key];
    });
    document.querySelectorAll('[data-i18n-label]').forEach(el => {
      const key = el.getAttribute('data-i18n-label');
      if (dict[key]) el.childNodes[0].nodeValue = dict[key];
    });
    document.querySelectorAll('[data-i18n-opt]').forEach(el => {
      const key = el.getAttribute('data-i18n-opt');
      if (dict[key]) el.textContent = dict[key];
    });
    langToggle.textContent = lang === 'en' ? 'PT' : 'EN';
    document.documentElement.lang = lang;
  }
  langToggle.addEventListener('click', () => {
    lang = (lang === 'en') ? 'pt' : 'en';
    localStorage.setItem('lang', lang);
    applyLang();
  });
  applyLang();
})();
