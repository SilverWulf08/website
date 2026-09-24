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
      li.setAttribute('aria-label', `Opties voor ${item.label}: ${item.waarde}`);
      li.innerHTML = `
        <i class="${item.icon}" aria-hidden="true"></i>
        <span class="info-label">${item.label}</span>
        <span class="info-value">${item.waarde}</span>
        <span class="copy-hint" aria-hidden="true"><i class="fa-regular fa-copy"></i></span>`;

      li.addEventListener('click', (event) => {
        event.stopPropagation();
        showContextMenu(item, li);
      });

      li.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          showContextMenu(item, li);
        }
      });
      ul.appendChild(li);
    }
    return { title: 'Persoonlijke Gegevens', path: 'CV / Persoonlijk', content: ul };
  },

  opleidingen() {
    const wrap = document.createElement('div');

    // Diplomas
    const diplomaSection = document.createElement('div');
    diplomaSection.className = 'skills-section';
    diplomaSection.innerHTML = `<h3><i class="fa-solid fa-graduation-cap" aria-hidden="true"></i> Diploma's</h3>`;
    const timeline = document.createElement('div');
    timeline.className = 'timeline';
    for (const opl of config.opleidingen) {
      const div = document.createElement('div');
      div.className = 'timeline-item';
      div.innerHTML = `
        <h3>${opl.titel}</h3>
        <div class="timeline-sub">${opl.instituut}</div>
        <div class="timeline-period">${opl.periode}</div>
        <p>${opl.beschrijving}</p>`;
      timeline.appendChild(div);
    }
    diplomaSection.appendChild(timeline);
    wrap.appendChild(diplomaSection);

    // Trainingen & Cursussen
    if (config.trainingen && config.trainingen.length) {
      const trSection = document.createElement('div');
      trSection.className = 'skills-section';
      trSection.innerHTML = `<h3><i class="fa-solid fa-certificate" aria-hidden="true"></i> Trainingen & Cursussen</h3>`;
      const trList = document.createElement('ul');
      trList.className = 'info-list';
      trList.setAttribute('role', 'list');
      for (const tr of config.trainingen) {
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
    const { taalbeheersing, software, kwaliteiten } = config.vaardigheden;

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

    // Kwaliteiten
    if (kwaliteiten && kwaliteiten.length) {
      const plSection = document.createElement('div');
      plSection.className = 'skills-section';
      plSection.innerHTML = `<h3><i class="fa-solid fa-star" aria-hidden="true"></i> kwaliteiten</h3>`;
      const plList = document.createElement('div');
      plList.className = 'prog-lang-list';
      for (const lang of kwaliteiten) {
        const item = document.createElement('div');
        item.className = 'prog-lang-item';
        item.innerHTML = `
          <div class="prog-lang-label">
            <i class="${lang.icon}" aria-hidden="true"></i>
            <span>${lang.naam}</span>
          </div>
          <div class="prog-lang-bar">
            <div class="prog-lang-fill" style="width:${Math.min(100, Math.max(0, lang.percentage))}%"></div>
          </div>`;
        plList.appendChild(item);
      }
      plSection.appendChild(plList);
      wrap.appendChild(plSection);
    }

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
  },

  profielschets() {
    const wrap = document.createElement('div');
    wrap.className = 'profile-sketch-wrapper';

    const lines = (config.profielschets || 'Hier komt je profielschets te staan.').split(/\n/);
    let paragraphBuffer = [];
    let listBuffer = [];

    function flushParagraph() {
      if (!paragraphBuffer.length) return;
      const paragraph = document.createElement('p');
      paragraph.className = 'profile-sketch-text';
      paragraph.textContent = paragraphBuffer.join(' ').trim();
      wrap.appendChild(paragraph);
      paragraphBuffer = [];
    }

    function flushList() {
      if (!listBuffer.length) return;
      const list = document.createElement('ul');
      list.className = 'profile-sketch-list';
      for (const item of listBuffer) {
        const li = document.createElement('li');
        li.textContent = item.replace(/^[-•]\s*/, '').trim();
        list.appendChild(li);
      }
      wrap.appendChild(list);
      listBuffer = [];
    }

    for (const rawLine of lines) {
      const line = rawLine.trim();
      if (!line) {
        flushParagraph();
        flushList();
        continue;
      }

      if (line.startsWith('- ')) {
        flushParagraph();
        listBuffer.push(line);
        continue;
      }

      if (listBuffer.length) {
        flushList();
      }

      paragraphBuffer.push(line);
    }

    flushParagraph();
    flushList();

    return { title: 'Profielschets', path: 'CV / Profielschets', content: wrap };
  }
};

/* ── Kopieer naar klembord ────────────────── */
let toastTimer = null;

function removeActionMenu() {
  const existing = document.querySelector('.context-action-menu');
  if (existing) existing.remove();
}

function openGoogleMaps(query) {
  const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}

function handleItemAction(item, action) {
  const value = item.waarde;

  switch (action) {
    case 'copy':
      copyToClipboard(value);
      break;
    case 'map':
      openGoogleMaps(value);
      break;
    case 'mailto':
      window.location.href = `mailto:${value}`;
      break;
    case 'tel':
      window.location.href = `tel:${value}`;
      break;
    default:
      copyToClipboard(value);
  }

  removeActionMenu();
}

function getContextActions(item) {
  const label = item.label.toLowerCase();
  const actions = [{ label: 'Kopiëren', action: 'copy' }];

  if (label.includes('e-mail') || label.includes('email')) {
    actions.push({ label: 'E-mail openen', action: 'mailto' });
  }

  if (label.includes('telefoon') || label.includes('nummer')) {
    actions.push({ label: 'Telefoonnummer bellen', action: 'tel' });
  }

  if (label.includes('woonplaats') || label.includes('adres') || label.includes('locatie')) {
    actions.push({ label: 'Open in Google Maps', action: 'map' });
  }

  return actions;
}

function showContextMenu(item, trigger) {
  removeActionMenu();

  const menu = document.createElement('div');
  menu.className = 'context-action-menu';

  const actions = getContextActions(item);
  for (const action of actions) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'context-action-item';
    button.textContent = action.label;
    button.addEventListener('click', () => handleItemAction(item, action.action));
    menu.appendChild(button);
  }

  const rect = trigger.getBoundingClientRect();
  menu.style.left = `${Math.min(window.innerWidth - 220, rect.left + 12)}px`;
  menu.style.top = `${Math.min(window.innerHeight - menu.offsetHeight - 12, rect.bottom + 8)}px`;

  document.body.appendChild(menu);
  document.addEventListener('click', (event) => {
    if (!menu.contains(event.target)) {
      removeActionMenu();
    }
  }, { once: true });
}

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

  // Halverwege het thema wisselen (frame-gesynchroniseerd)
  requestAnimationFrame(() => {
    setTimeout(() => {
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('cv-theme', next);
    }, 240);
  });

  // Opruimen
  themeOverlay.addEventListener('animationend', () => {
    themeOverlay.classList.remove('active');
  }, { once: true });
}

/* ── Mapknoppen koppelen ─────────────────── */
function initFolderButtons() {
  const fileButtons = document.querySelectorAll('.folder-btn, .profile-sketch-link');

  for (const btn of fileButtons) {
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
