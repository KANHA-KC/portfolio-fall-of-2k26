document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initCursor();
  initEasterEgg();
  initFooterYear();
  initHomePage();
  initMagneticElements();
  initReadingProgress();
  initToast();
  initExperiments();
});

/* --------------------------------------------------------------------------
   THEME MANAGER (Paper / Clay / Nocturne)
--------------------------------------------------------------------------- */
function initTheme() {
  const themes = ['paper', 'clay', 'dark'];
  const labels = {
    paper: '◐ Paper',
    clay: '◐ Clay',
    dark: '◐ Nocturne'
  };

  let current = localStorage.getItem('studio_theme') || 'paper';
  document.documentElement.setAttribute('data-theme', current);

  function updateButtons() {
    document.querySelectorAll('[data-theme-toggle]').forEach(btn => {
      btn.textContent = labels[current] || '◐ Theme';
      btn.setAttribute('aria-label', `Current theme: ${current}. Click to switch.`);
    });
  }

  window.toggleTheme = function() {
    const nextIdx = (themes.indexOf(current) + 1) % themes.length;
    current = themes[nextIdx];
    document.documentElement.setAttribute('data-theme', current);
    localStorage.setItem('studio_theme', current);
    updateButtons();
    if (window.showToast) window.showToast(`Theme switched to ${current.toUpperCase()}`);
  };

  document.addEventListener('click', (e) => {
    const target = e.target.closest('[data-theme-toggle]');
    if (target) {
      e.preventDefault();
      window.toggleTheme();
    }
  });

  updateButtons();
}

/* --------------------------------------------------------------------------
   CUSTOM CURSOR
--------------------------------------------------------------------------- */
function initCursor() {
  const cursor = document.querySelector('.cursor');
  if (!cursor) return;

  const dot = cursor.querySelector('.cursor__dot');
  const ring = cursor.querySelector('.cursor__ring');
  const label = cursor.querySelector('.cursor__label');

  let mouseX = -100, mouseY = -100;
  let ringX = -100, ringY = -100;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (dot) {
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    }
  });

  // Smooth lerp loop for the outer ring
  function renderRing() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    if (ring) {
      ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
    }
    if (label) {
      label.style.transform = `translate(${ringX}px, ${ringY}px)`;
    }
    requestAnimationFrame(renderRing);
  }
  requestAnimationFrame(renderRing);

  // Dynamic Cursor State Handlers
  function attachCursorEvents() {
    const targets = document.querySelectorAll('[data-cursor]');
    targets.forEach(target => {
      target.addEventListener('mouseenter', () => {
        const type = target.getAttribute('data-cursor') || 'view';
        cursor.className = `cursor is-hovering cursor--${type}`;
        if (label) label.textContent = type.toUpperCase();
      });
      target.addEventListener('mouseleave', () => {
        cursor.className = 'cursor';
        if (label) label.textContent = '';
      });
    });
  }

  attachCursorEvents();
  // Expose in case dynamic DOM changes occur
  window.refreshCursorEvents = attachCursorEvents;
}

/* --------------------------------------------------------------------------
   5X LOGO CLICK EASTER EGG
--------------------------------------------------------------------------- */
function initEasterEgg() {
  const logo = document.querySelector('[data-logo]');
  if (!logo) return;

  let clicks = 0;
  let timer = null;

  logo.addEventListener('click', (e) => {
    clicks++;
    clearTimeout(timer);
    timer = setTimeout(() => { clicks = 0; }, 2500);

    if (clicks >= 5) {
      e.preventDefault();
      clicks = 0;
      triggerEasterEgg();
    }
  });
}

function triggerEasterEgg() {
  let modal = document.querySelector('.easter-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.className = 'easter-modal is-active';
    modal.innerHTML = `
      <div class="easter-card">
        <div style="font-size:2.8rem; margin-bottom:12px;">🌱 ☕️ ✦</div>
        <h3>Curiosity Rewarded</h3>
        <p>You found the workshop backdoor. Software is best when built with equal parts restraint, curiosity, and warmth.</p>
        <button class="btn btn--primary" id="closeEaster">Back to the surface</button>
      </div>
    `;
    document.body.appendChild(modal);

    modal.querySelector('#closeEaster').addEventListener('click', () => {
      modal.classList.remove('is-active');
    });
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('is-active');
    });
  } else {
    modal.classList.add('is-active');
  }

  // Mini burst celebration
  firePaperConfetti();
}

function firePaperConfetti() {
  const count = 36;
  for (let i = 0; i < count; i++) {
    const flake = document.createElement('div');
    const color = ['#c97a5b', '#506653', '#a65839', '#1a1917', '#d4c5b2'][Math.floor(Math.random() * 5)];
    flake.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      width: ${8 + Math.random() * 10}px;
      height: ${12 + Math.random() * 12}px;
      background: ${color};
      border-radius: 2px;
      pointer-events: none;
      z-index: 100000;
      transform: translate(-50%, -50%);
      transition: all 1.2s cubic-bezier(0.16, 1, 0.3, 1);
    `;
    document.body.appendChild(flake);

    const angle = Math.random() * Math.PI * 2;
    const distance = 120 + Math.random() * 320;
    const destX = Math.cos(angle) * distance;
    const destY = Math.sin(angle) * distance;
    const rot = Math.random() * 720 - 360;

    requestAnimationFrame(() => {
      flake.style.transform = `translate(calc(-50% + ${destX}px), calc(-50% + ${destY}px)) rotate(${rot}deg)`;
      flake.style.opacity = '0';
    });

    setTimeout(() => flake.remove(), 1300);
  }
}

/* --------------------------------------------------------------------------
   HOMEPAGE DYNAMIC COMPONENTS
--------------------------------------------------------------------------- */
function initHomePage() {
  if (document.body.getAttribute('data-page') !== 'home') return;

  const data = window.STUDIO;
  if (!data) return;

  // Render Selected Projects Preview (first 2 projects)
  const previewGrid = document.getElementById('previewGrid');
  if (previewGrid && data.projects) {
    previewGrid.innerHTML = data.projects.slice(0, 2).map(p => `
      <a href="pages/project.html?p=${p.slug}" class="project-card" data-cursor="view">
        <div class="project-card__cover project-card__cover--${p.cover.tone}">
          ${p.cover.svg || ''}
          <div class="project-card__cover-art">${p.title}</div>
        </div>
        <div class="project-card__body">
          <div>
            <div class="project-card__meta">
              <span>§${p.n}</span>
              <span>${p.year}</span>
            </div>
            <h3 class="project-card__title">${p.title}</h3>
            <p class="project-card__thesis">${p.thesis}</p>
          </div>
          <div class="project-card__footer">
            <span>${p.category.split('/')[0].trim()}</span>
            <span>Case Study →</span>
          </div>
        </div>
      </a>
    `).join('');
  }

  // Render Principles Accordion
  const principlesList = document.getElementById('principles');
  if (principlesList && data.principles) {
    principlesList.innerHTML = data.principles.map((pr, idx) => `
      <li class="principle-item ${idx === 0 ? 'is-open' : ''}">
        <button class="principle-item__header" type="button" aria-expanded="${idx === 0}">
          <div class="principle-item__left">
            <span class="principle-item__num">${pr.n}</span>
            <span class="principle-item__title">${pr.t}</span>
          </div>
          <span class="principle-item__icon">+</span>
        </button>
        <div class="principle-item__content">
          <p>${pr.d}</p>
        </div>
      </li>
    `).join('');

    // Accordion click handlers
    principlesList.querySelectorAll('.principle-item__header').forEach(btn => {
      btn.addEventListener('click', () => {
        const item = btn.closest('.principle-item');
        const isOpen = item.classList.contains('is-open');
        item.classList.toggle('is-open');
        btn.setAttribute('aria-expanded', !isOpen);
      });
    });
  }

  // Render Writing Preview (first 3 articles)
  const articlesPreview = document.getElementById('articlesPreview');
  if (articlesPreview && data.articles) {
    articlesPreview.innerHTML = data.articles.slice(0, 3).map(art => `
      <li class="article-row">
        <a href="pages/article.html?a=${art.slug}" data-cursor="read">
          <span class="article-row__date">${art.date}</span>
          <span class="article-row__title">${art.title}</span>
          <div class="article-row__meta">
            <span class="tag-pill">${art.tag}</span>
            <span>${art.read}</span>
          </div>
        </a>
      </li>
    `).join('');
  }

  if (window.refreshCursorEvents) window.refreshCursorEvents();
}

/* --------------------------------------------------------------------------
   FOOTER YEAR AUTO-UPDATE
--------------------------------------------------------------------------- */
function initFooterYear() {
  const yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();
}

/* --------------------------------------------------------------------------
   MAGNETIC BUTTONS
--------------------------------------------------------------------------- */
function initMagneticElements() {
  const magnets = document.querySelectorAll('.btn--magnetic, .btn--primary');
  magnets.forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      el.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px)`;
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = 'translate(0px, 0px)';
    });
  });
}

/* --------------------------------------------------------------------------
   READING PROGRESS BAR (for article.html)
--------------------------------------------------------------------------- */
function initReadingProgress() {
  const progressBar = document.getElementById('readingProgress');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight <= 0) return;
    const progress = (window.scrollY / totalHeight) * 100;
    progressBar.style.width = `${progress}%`;
  });
}

/* --------------------------------------------------------------------------
   TOAST NOTIFICATION UTILITY
--------------------------------------------------------------------------- */
function initToast() {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }

  window.showToast = function(message) {
    toast.textContent = message;
    toast.classList.add('is-visible');
    setTimeout(() => {
      toast.classList.remove('is-visible');
    }, 2800);
  };
}

/* --------------------------------------------------------------------------
   EXPERIMENTS BENCH LOGIC (pages/experiments.html)
--------------------------------------------------------------------------- */
function initExperiments() {
  // 1. Kinetic Text drag/velocity
  const kinetic = document.querySelector('.kinetic-box');
  if (kinetic) {
    let isDown = false, startX, startY;
    kinetic.addEventListener('mousedown', (e) => {
      isDown = true;
      startX = e.clientX;
      startY = e.clientY;
    });
    window.addEventListener('mouseup', () => {
      isDown = false;
      kinetic.style.transform = 'scale(1) rotate(0deg)';
    });
    window.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      const dx = (e.clientX - startX) * 0.2;
      const dy = (e.clientY - startY) * 0.2;
      kinetic.style.transform = `translate(${dx}px, ${dy}px) rotate(${dx * 0.1}deg) scale(1.08)`;
    });
  }

  // 2. Tactile Switch with Web Audio Haptic Feedback
  const lever = document.querySelector('.tactile-lever');
  const switchStatus = document.querySelector('.switch-status');

  function playTactileClick(isEngaged) {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(isEngaged ? 280 : 180, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(isEngaged ? 90 : 60, ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.18, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch(e) {}
  }

  if (lever && switchStatus) {
    lever.addEventListener('click', () => {
      lever.classList.toggle('is-on');
      const on = lever.classList.contains('is-on');
      playTactileClick(on);
      switchStatus.textContent = on ? "State: Engaged (40N)" : "State: Resting (0N)";
      lever.setAttribute('aria-checked', on);
    });
  }

  // 3. Generative Noise Canvas
  const canvas = document.getElementById('noiseCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    function resize() {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
      drawContours();
    }

    let mouse = { x: 120, y: 120 };
    canvas.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      drawContours();
    });

    function drawContours() {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = '#c97a5b';
      ctx.lineWidth = 1.2;

      for (let r = 20; r < 240; r += 24) {
        ctx.beginPath();
        for (let a = 0; a < Math.PI * 2; a += 0.1) {
          const distortion = Math.sin(a * 4 + r * 0.05) * 8 + Math.cos(a * 3) * 6;
          const x = mouse.x + Math.cos(a) * (r + distortion);
          const y = mouse.y + Math.sin(a) * (r + distortion);
          if (a === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.stroke();
      }
    }

    window.addEventListener('resize', resize);
    resize();
  }

  // 4. Microcopy Oracle
  const oracleIn = document.querySelector('.oracle-input');
  const oracleOut = document.querySelector('.oracle-output');
  if (oracleIn && oracleOut) {
    const dictionary = {
      "synergy": "working together naturally",
      "leverage": "use",
      "paradigm shift": "new way of thinking",
      "bandwidth": "time and energy",
      "deep dive": "thorough study",
      "actionable insights": "clear next steps",
      "touch base": "talk briefly",
      "move the needle": "make a real difference"
    };

    oracleIn.addEventListener('input', () => {
      let val = oracleIn.value.toLowerCase().trim();
      let found = false;
      for (const [jargon, plain] of Object.entries(dictionary)) {
        if (val.includes(jargon)) {
          oracleOut.textContent = `“${plain}”`;
          found = true;
          break;
        }
      }
      if (!found && val.length > 0) {
        oracleOut.textContent = `“Say what it is in plain words.”`;
      } else if (val.length === 0) {
        oracleOut.textContent = `“Type corporate jargon to clarify.”`;
      }
    });
  }
}
