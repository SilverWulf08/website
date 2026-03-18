/* ============================================
   CV WEBSITE — MAIN SCRIPT
   Verkenner-vensters, thema-wisseling, drag
   ============================================ */

import config from './config.js';

/* ── DOM referenties ─────────────────────── */
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

const themeToggle    = $('#themeToggle');
const themeOverlay   = $('#themeOverlay');
const closeAllBtn    = $('#closeAllBtn');
const profileAvatar  = $('#profileAvatar');
const profileName    = $('#profileName');
const profileIntro   = $('#profileIntro');
const windowTemplate = $('#windowTemplate');

/* ── Profiel invullen ────────────────────── */
function initProfile() {
  const { naam, foto } = config.persoonlijk;

  // Avatar: foto of initialen
  if (foto) {
    const img = document.createElement('img');
    img.src = foto;
    img.alt = `Foto van ${naam}`;
    profileAvatar.appendChild(img);
  } else {
    const initialen = naam.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
    profileAvatar.textContent = initialen;
  }

  profileName.textContent  = naam;
  profileIntro.textContent = config.introductie;

  // Paginatitel bijwerken
  document.title = naam;
}

/* ── Sectie-inhoud genereren ─────────────── */
const sectionRenderers = {

  persoonlijk() {
    const ul = document.createElement('ul');
    ul.className = 'info-list';
    ul.setAttribute('role', 'list');
    for (const item of config.persoonlijk.gegevens) {
      const li = document.createElement('li');
      li.className = 'copyable';
      li.setAttribute('tabindex', '0');
      li.setAttribute('role', 'button');
      li.setAttribute('aria-label', `Kopieer ${item.label}: ${item.waarde}`);
      li.innerHTML = `
        <i class="${item.icon}" aria-hidden="true"></i>
        <span class="info-label">${item.label}</span>
        <span class="info-value">${item.waarde}</span>
        <span class="copy-hint" aria-hidden="true"><i class="fa-regular fa-copy"></i></span>`;
      li.addEventListener('click', () => copyToClipboard(item.waarde));
      li.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          copyToClipboard(item.waarde);
        }
      });
      ul.appendChild(li);
    }
    return { title: 'Persoonlijke Gegevens', path: 'CV / Persoonlijk', content: ul };
  },

  opleidingen() {
    const wrap = document.createElement('div');
    wrap.className = 'timeline';
    for (const opl of config.opleidingen) {
      const div = document.createElement('div');
      div.className = 'timeline-item';
      div.innerHTML = `
        <h3>${opl.titel}</h3>
        <div class="timeline-sub">${opl.instituut}</div>
        <div class="timeline-period">${opl.periode}</div>
        <p>${opl.beschrijving}</p>`;
      wrap.appendChild(div);
    }
    return { title: 'Opleidingen', path: 'CV / Opleidingen', content: wrap };
  },

  werkervaring() {
    const wrap = document.createElement('div');
    wrap.className = 'timeline';
    for (const werk of config.werkervaring) {
      const div = document.createElement('div');
      div.className = 'timeline-item';
      div.innerHTML = `
        <h3>${werk.functie}</h3>
        <div class="timeline-sub">${werk.bedrijf}</div>
        <div class="timeline-period">${werk.periode}</div>
        <p>${werk.beschrijving}</p>`;
      wrap.appendChild(div);
    }
    return { title: 'Werkervaring', path: 'CV / Werkervaring', content: wrap };
  },

  vaardigheden() {
    const wrap = document.createElement('div');
    const { taalbeheersing, software, trainingen } = config.vaardigheden;

    // Taalbeheersing
    const langSection = document.createElement('div');
    langSection.className = 'skills-section';
    langSection.innerHTML = `<h3><i class="fa-solid fa-language" aria-hidden="true"></i> Taalbeheersing</h3>`;
    const table = document.createElement('table');
    table.className = 'lang-table';
    table.innerHTML = `
      <thead><tr><th>Taal</th><th>Niveau</th></tr></thead>
      <tbody>${taalbeheersing.map(t => `<tr><td>${t.taal}</td><td>${t.niveau}</td></tr>`).join('')}</tbody>`;
    langSection.appendChild(table);
    wrap.appendChild(langSection);

    // Software
    const swSection = document.createElement('div');
    swSection.className = 'skills-section';
    swSection.innerHTML = `<h3><i class="fa-solid fa-laptop-code" aria-hidden="true"></i> Software</h3>`;
    const swList = document.createElement('ul');
    swList.className = 'tag-list';
    swList.setAttribute('role', 'list');
    for (const sw of software) {
      const li = document.createElement('li');
      li.textContent = sw;
      swList.appendChild(li);
    }
    swSection.appendChild(swList);
    wrap.appendChild(swSection);

    // Trainingen
    const trSection = document.createElement('div');
    trSection.className = 'skills-section';
    trSection.innerHTML = `<h3><i class="fa-solid fa-certificate" aria-hidden="true"></i> Trainingen & Cursussen</h3>`;
    const trList = document.createElement('ul');
    trList.className = 'info-list';
    trList.setAttribute('role', 'list');
    for (const tr of trainingen) {
      const li = document.createElement('li');
      const naam = tr.link
        ? `<a href="${tr.link}" target="_blank" rel="noopener noreferrer" class="info-value training-link">${tr.naam} <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></a>`
        : `<span class="info-value">${tr.naam}</span>`;
      li.innerHTML = `<i class="fa-solid fa-check" aria-hidden="true"></i>
        ${naam}
        <span class="timeline-period">${tr.jaar}</span>`;
      trList.appendChild(li);
    }
    trSection.appendChild(trList);
    wrap.appendChild(trSection);

    return { title: 'Vaardigheden', path: 'CV / Vaardigheden', content: wrap };
  },

  interesses() {
    const wrap = document.createElement('div');

    // Interesses tags
    const heading = document.createElement('h2');
    heading.className = 'section-heading';
    heading.textContent = 'Interesses';
    wrap.appendChild(heading);

    const grid = document.createElement('div');
    grid.className = 'interest-grid';
    for (const interesse of config.interesses) {
      const tag = document.createElement('span');
      tag.className = 'interest-tag';
      tag.innerHTML = `<i class="fa-solid fa-star" aria-hidden="true"></i> ${interesse}`;
      grid.appendChild(tag);
    }
    wrap.appendChild(grid);

    // Aanvullende informatie
    if (config.aanvullend) {
      const heading2 = document.createElement('h2');
      heading2.className = 'section-heading';
      heading2.textContent = 'Aanvullende informatie';
      wrap.appendChild(heading2);

      const p = document.createElement('p');
      p.className = 'additional-text';
      p.textContent = config.aanvullend;
      wrap.appendChild(p);
    }

    return { title: 'Interesses & Meer', path: 'CV / Interesses', content: wrap };
  }
};

/* ── Kopieer naar klembord ────────────────── */
let toastTimer = null;
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    showCopyToast(`"${text}" gekopieerd`);
  }).catch(() => {
    // Fallback
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    ta.remove();
    showCopyToast(`"${text}" gekopieerd`);
  });
}

function showCopyToast(msg) {
  let toast = $('.copy-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'copy-toast';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  clearTimeout(toastTimer);
  requestAnimationFrame(() => {
    toast.classList.add('visible');
    toastTimer = setTimeout(() => toast.classList.remove('visible'), 2000);
  });
}

/* ── Venster openen ──────────────────────── */
let highestZ = 5000;
const openWindows = new Set();

function openWindow(sectionKey) {
  const renderer = sectionRenderers[sectionKey];
  if (!renderer) return;

  const isMobile = window.innerWidth <= 600;

  // Op mobiel: sluit bestaand venster eerst
  if (isMobile && openWindows.size > 0) {
    for (const w of openWindows) {
      openWindows.delete(w);
      w.remove();
    }
    updateCloseAllBtn();
  }

  const data = renderer();
  const clone = windowTemplate.content.cloneNode(true);
  const win = clone.querySelector('.sub-window');

  // Titelbalk en adresbalk
  win.querySelector('.titlebar-text').textContent = data.title;
  win.querySelector('.addressbar-path').textContent = data.path;
  win.querySelector('.window-body').appendChild(data.content);

  // Aria
  win.setAttribute('aria-label', data.title);

  // Positie: fullscreen op mobiel, willekeurig op desktop
  if (!isMobile) {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const winW = Math.min(440, vw * 0.9);
    const winH = Math.min(vh * 0.7, 500);
    const maxX = Math.max(0, vw - winW - 20);
    const maxY = Math.max(0, vh - winH - 20);
    const x = Math.floor(Math.random() * maxX) + 10;
    const y = Math.floor(Math.random() * maxY) + 10;
    win.style.left = `${x}px`;
    win.style.top  = `${y}px`;
  }

  // Bovenop plaatsen
  highestZ++;
  win.style.zIndex = highestZ;

  // Sluiten
  const closeBtn = win.querySelector('.window-close');
  closeBtn.addEventListener('click', () => closeWindow(win));

  // Escape toets om te sluiten
  win.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeWindow(win);
  });

  // Klik om bovenop te brengen
  win.addEventListener('mousedown', () => bringToFront(win));
  win.addEventListener('touchstart', () => bringToFront(win), { passive: true });

  // Slepen (alleen desktop)
  if (!isMobile) initDrag(win);

  // Toevoegen aan DOM
  document.body.appendChild(clone);

  // Focus op venster voor toegankelijkheid
  requestAnimationFrame(() => win.focus());

  openWindows.add(win);
  updateCloseAllBtn();
}

function closeWindow(win) {
  win.style.animation = 'windowClose 0.25s var(--ease) forwards';
  win.addEventListener('animationend', () => {
    openWindows.delete(win);
    win.remove();
    updateCloseAllBtn();
  }, { once: true });
}

/* ── Sluit alle vensters (cascade) ───────── */
function closeAllWindows() {
  const wins = [...openWindows];
  if (wins.length === 0) return;

  wins.forEach((win, i) => {
    const angle = Math.random() * 360;
    const rad   = angle * (Math.PI / 180);
    const dist  = 150 + Math.random() * 100;
    const tx    = Math.cos(rad) * dist;
    const ty    = Math.sin(rad) * dist;
    const rot   = (Math.random() - 0.5) * 40;

    win.style.setProperty('--scatter-x', `${tx}px`);
    win.style.setProperty('--scatter-y', `${ty}px`);
    win.style.setProperty('--scatter-r', `${rot}deg`);
    win.style.animationDelay = `${i * 100}ms`;
    win.style.animation = `windowScatter 0.5s cubic-bezier(0.55,0,1,0.45) forwards`;
    win.style.animationDelay = `${i * 100}ms`;

    win.addEventListener('animationend', () => {
      openWindows.delete(win);
      win.remove();
      updateCloseAllBtn();
    }, { once: true });
  });
}

function updateCloseAllBtn() {
  closeAllBtn.hidden = openWindows.size === 0;
}

function bringToFront(win) {
  highestZ++;
  win.style.zIndex = highestZ;
}

/* Sluit-animaties */
const closeKeyframes = `
@keyframes windowClose {
  from { opacity: 1; transform: scale(1); }
  to   { opacity: 0; transform: scale(0.9); }
}
@keyframes windowScatter {
  0%   { opacity: 1; transform: translate(0,0) rotate(0) scale(1); }
  100% { opacity: 0; transform: translate(var(--scatter-x),var(--scatter-y)) rotate(var(--scatter-r)) scale(0.2); }
}`;
const styleSheet = document.createElement('style');
styleSheet.textContent = closeKeyframes;
document.head.appendChild(styleSheet);

/* ── Drag functionaliteit ────────────────── */
function initDrag(win) {
  const titlebar = win.querySelector('.draggable');
  let isDragging = false;
  let startX, startY, origX, origY;

  function onStart(e) {
    // Niet slepen als op de sluitknop geklikt
    if (e.target.closest('.window-close')) return;

    isDragging = true;
    bringToFront(win);

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    startX = clientX;
    startY = clientY;
    origX  = win.offsetLeft;
    origY  = win.offsetTop;

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onEnd);
    document.addEventListener('touchmove', onMove, { passive: false });
    document.addEventListener('touchend', onEnd);

    e.preventDefault();
  }

  function onMove(e) {
    if (!isDragging) return;
    e.preventDefault();

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const dx = clientX - startX;
    const dy = clientY - startY;

    win.style.left = `${origX + dx}px`;
    win.style.top  = `${origY + dy}px`;
  }

  function onEnd() {
    isDragging = false;
    document.removeEventListener('mousemove', onMove);
    document.removeEventListener('mouseup', onEnd);
    document.removeEventListener('touchmove', onMove);
    document.removeEventListener('touchend', onEnd);
  }

  titlebar.addEventListener('mousedown', onStart);
  titlebar.addEventListener('touchstart', onStart, { passive: false });
}

/* ── Thema-wisselaar ─────────────────────── */
function initTheme() {
  // Ophalen voorkeur uit localStorage
  const saved = localStorage.getItem('cv-theme');
  if (saved) {
    document.documentElement.setAttribute('data-theme', saved);
  }

  themeToggle.addEventListener('click', toggleTheme);
}

function toggleTheme() {
  const current  = document.documentElement.getAttribute('data-theme');
  const next     = current === 'dark' ? 'light' : 'dark';
  const nextBg   = next === 'dark' ? '#111113' : '#f7f6f3';

  // Overlay positioneren vanuit de knop
  const rect = themeToggle.getBoundingClientRect();
  const cx   = rect.left + rect.width / 2;
  const cy   = rect.top  + rect.height / 2;

  themeOverlay.style.background   = nextBg;
  themeOverlay.style.left         = `${cx}px`;
  themeOverlay.style.top          = `${cy}px`;
  themeOverlay.style.transformOrigin = `${cx}px ${cy}px`;

  // Animatie starten
  themeOverlay.classList.add('active');

  // Halverwege het thema wisselen
  setTimeout(() => {
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('cv-theme', next);
  }, 250);

  // Opruimen
  themeOverlay.addEventListener('animationend', () => {
    themeOverlay.classList.remove('active');
  }, { once: true });
}

/* ── Mapknoppen koppelen ─────────────────── */
function initFolderButtons() {
  for (const btn of $$('.folder-btn')) {
    btn.addEventListener('click', () => {
      openWindow(btn.dataset.section);
    });
    // Enter en spatie werken al standaard voor <button>
  }
}

/* ── Sluit-alle-knop koppelen ─────────────── */
function initCloseAll() {
  closeAllBtn.addEventListener('click', closeAllWindows);
}

/* ── Initialisatie ───────────────────────── */
function init() {
  initProfile();
  initTheme();
  initFolderButtons();
  initCloseAll();
}

document.addEventListener('DOMContentLoaded', init);
