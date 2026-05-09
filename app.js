// ============================================================
//  9449 YELLOWJACKETS — TECH BINDER APP
// ============================================================

const { team, hardware, software, prototypes } = binderData;

// ── HELPERS ────────────────────────────────────────────────

function outcomeClass(o) {
  return { "Adopted": "adopted", "Rejected": "rejected", "Iterated": "iterated" }[o] || "iterated";
}
function outcomeIcon(o) {
  return { "Adopted": "✓", "Rejected": "✕", "Iterated": "↻" }[o] || "–";
}

// SVG icon paths per subsystem type
const ICONS = {
  drivetrain: "M8 30 L8 20 L16 14 L32 14 L40 20 L40 30 M14 30 L14 23 L18 23 L18 30 M30 30 L30 23 L34 23 L34 30 M8 23 L40 23",
  shooter:    "M10 24 L22 24 M22 18 L22 30 L34 24 Z M36 20 Q43 24 36 28 M38 17 Q48 24 38 31",
  intake:     "M8 30 L8 22 Q8 16 14 16 L34 16 Q40 16 40 22 L40 30 M17 16 L17 11 L31 11 L31 16 M20 30 L20 22 L28 22 L28 30",
  climber:    "M24 38 L24 10 M16 18 L24 10 L32 18 M18 30 L24 24 L30 30 M12 38 L36 38",
  autonomous: "M12 36 L12 20 L24 10 L36 20 L36 36 M19 36 L19 27 L29 27 L29 36 M22 21 L26 17 L30 21",
  vision:     "M24 24 m-9 0 a9 9 0 1 0 18 0 a9 9 0 1 0-18 0 M24 24 m-3 0 a3 3 0 1 0 6 0 a3 3 0 1 0-6 0 M7 24 L15 24 M33 24 L41 24 M24 7 L24 15 M24 33 L24 41",
  scouting:   "M14 12 L14 38 L34 38 L34 18 L28 12 Z M28 12 L28 18 L34 18 M18 22 L30 22 M18 27 L30 27 M18 32 L26 32",
  hook:       "M24 10 L24 28 Q24 36 32 36 Q40 36 40 28 M18 16 L24 10 L30 16",
  default:    "M12 38 L12 18 L24 8 L36 18 L36 38 M18 38 L18 28 L24 23 L30 28 L30 38"
};

function getIcon(id) {
  for (const key of Object.keys(ICONS)) {
    if (id && id.toLowerCase().includes(key)) return ICONS[key];
  }
  return ICONS.default;
}

function makeSVGPlaceholder(id, name, number) {
  const path = getIcon(id || name);
  // unique pattern id to avoid svg conflicts
  const pid = "p" + Math.random().toString(36).slice(2,7);
  return `<div style="width:100%;height:100%;min-height:400px;background:#161709;position:relative;overflow:hidden;">
<svg viewBox="0 0 480 400" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;position:absolute;inset:0;">
  <defs>
    <pattern id="${pid}" x="0" y="0" width="52" height="60" patternUnits="userSpaceOnUse">
      <polygon points="26,2 50,15 50,45 26,58 2,45 2,15" fill="none" stroke="#F5C518" stroke-width="0.4" opacity="0.1"/>
    </pattern>
  </defs>
  <rect width="480" height="400" fill="url(#${pid})"/>
  <g transform="translate(216,140)">
    <path d="${path}" fill="none" stroke="#F5C518" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" opacity="0.4"/>
  </g>
  <text x="240" y="240" text-anchor="middle" font-family="IBM Plex Mono,monospace" font-size="11" fill="#F5C518" opacity="0.45" letter-spacing="3">${name.toUpperCase()}</text>
  <text x="240" y="260" text-anchor="middle" font-family="IBM Plex Mono,monospace" font-size="8" fill="#4A4838" letter-spacing="2">REPLACE WITH PHOTO</text>
  <text x="22" y="385" font-family="Rajdhani,sans-serif" font-size="80" font-weight="700" fill="#F5C518" opacity="0.05">${number}</text>
</svg>
</div>`;
}

function makeCarousel(item) {
  const images = item.images || [];
  const id = item.id;
  const name = item.name;
  const number = item.number || "01";

  if (!images || images.length === 0) {
    return makeSVGPlaceholder(id, name, number);
  }

  if (images.length === 1) {
    return `<div class="entry-media-sticky">
      <img class="entry-img" src="${images[0]}" alt="${name}"
        style="opacity:0;transition:opacity 0.4s;display:block;width:100%;height:auto;"
        onload="this.style.opacity='0.88'"
        onerror="this.style.display='none'"
      />
    </div>`;
  }

  const imgTags = images.map((src, i) => `
    <img class="carousel-img" src="${src}" alt="${name} ${i+1}"
      style="display:block;width:100%;height:auto;${i===0?'':'display:none;'}"
      data-carousel-index="${i}"
    />`).join("");

  const dots = images.map((_, i) => `
    <button class="carousel-dot${i===0?" active":""}" data-carousel="${id}" data-index="${i}" aria-label="Image ${i+1}"></button>
  `).join("");

  return `<div class="entry-media-sticky" id="carousel-${id}" style="position:relative;">
    ${imgTags}
    <button class="carousel-arrow prev" data-carousel="${id}" data-dir="-1">&#8249;</button>
    <button class="carousel-arrow next" data-carousel="${id}" data-dir="1">&#8250;</button>
    <div class="carousel-nav">${dots}</div>
  </div>`;
}

function initCarousels() {
  const state = {};
  document.querySelectorAll("[data-carousel]").forEach(btn => {
    const id = btn.dataset.carousel;
    if (!state[id]) state[id] = 0;
    btn.addEventListener("click", () => {
      const wrap = document.getElementById("carousel-" + id);
      if (!wrap) return;
      const imgs = wrap.querySelectorAll(".carousel-img");
      const dots = document.querySelectorAll(`.carousel-dot[data-carousel="${id}"]`);
      const count = imgs.length;
      let next = state[id];
      if (btn.dataset.dir) next = (next + parseInt(btn.dataset.dir) + count) % count;
      else if (btn.dataset.index !== undefined) next = parseInt(btn.dataset.index);
      imgs[state[id]].style.display = "none";
      dots[state[id]]?.classList.remove("active");
      imgs[next].style.display = "block";
      dots[next]?.classList.add("active");
      state[id] = next;
    });
  });
}

// ── BUILD ENTRY ─────────────────────────────────────────────

function buildEntry(item, sectionKey, index) {
  const sectionLabel = { hardware: "Hardware", software: "Software", prototypes: "Prototypes" }[sectionKey];

  const specsHTML = item.specs && item.specs.length ? `
    <p class="specs-label">Specifications</p>
    <table class="specs-table">
      ${item.specs.map(s => `<tr><td>${s.label}</td><td>${s.value}</td></tr>`).join("")}
    </table>` : "";

  const featuresHTML = item.features && item.features.length ? `
    <p class="features-label">Features</p>
    <ul class="features-list">
      ${item.features.map(f => `<li>${f}</li>`).join("")}
    </ul>` : "";

  const outcomeHTML = item.outcome ? `
    <div class="outcome-badge ${outcomeClass(item.outcome)}">
      ${outcomeIcon(item.outcome)} &nbsp;${item.outcome}
    </div>
    ${item.outcomeNote ? `<p class="outcome-note">"${item.outcomeNote}"</p>` : ""}` : "";

  return `<article class="entry" id="entry-${item.id}">
    <div class="entry-media">${makeCarousel(item)}</div>
    <div class="entry-content">
      <p class="entry-eyebrow">${sectionLabel} &nbsp;·&nbsp; ${item.number}</p>
      <h3 class="entry-title">${item.name}</h3>
      ${outcomeHTML}
      <p class="entry-desc">${item.description}</p>
      ${specsHTML}
      ${featuresHTML}
    </div>
  </article>`;
}

// ── BUILD SECTION ────────────────────────────────────────────

function buildSection(items, key, label, anchorId) {
  return `<section>
    <div id="${anchorId}" class="section-anchor"></div>
    <div class="section-header">
      <div>
        <p class="section-header-label">9449 · ${team.season}</p>
        <h2 class="section-header-title">${label}</h2>
      </div>
      <span class="section-header-count">${String(items.length).padStart(2,"0")} entries</span>
    </div>
    ${items.map((item,i) => buildEntry(item, key, i)).join("")}
  </section>`;
}

// ── NAV ──────────────────────────────────────────────────────

function buildNav() {
  const linksEl = document.getElementById("nav-links");
  document.getElementById("nav-season").textContent = team.season;
  const logo = document.getElementById("nav-logo");
  if (team.logo) logo.src = team.logo; else logo.style.display = "none";

  const sections = [
    { label: "Contents",   anchor: "toc" },
    { label: "Hardware",   anchor: "hardware" },
    { label: "Software",   anchor: "software" },
    { label: "Prototypes", anchor: "prototypes" },
  ];

  sections.forEach(s => {
    const a = document.createElement("a");
    a.className = "nav-link";
    a.textContent = s.label;
    a.href = "#" + s.anchor;
    a.addEventListener("click", e => {
      e.preventDefault();
      document.querySelectorAll(".nav-link").forEach(l => l.classList.remove("active"));
      a.classList.add("active");
      document.getElementById(s.anchor)?.scrollIntoView({ behavior: "smooth" });
    });
    linksEl.appendChild(a);
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        document.querySelectorAll(".nav-link").forEach(l => {
          l.classList.toggle("active", l.getAttribute("href") === "#" + id);
        });
      }
    });
  }, { rootMargin: "-30% 0px -60% 0px" });

  ["toc","hardware","software","prototypes"].forEach(id => {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });
}

// ── HERO ─────────────────────────────────────────────────────

function buildHero() {
  document.getElementById("hero-pre").textContent = `Team ${team.number} · ${team.season} Technical Binder`;
  document.getElementById("hero-robot").textContent = team.robot;
  document.getElementById("hero-tagline").textContent = team.tagline;
  document.getElementById("hero-meta").innerHTML = [
    { label: "Team",     value: "#" + team.number },
    { label: "Robot",    value: team.robot },
    { label: "Season",   value: team.season },
    { label: "Location", value: team.location },
  ].map(m => `<div class="hero-meta-item">
    <span class="hero-meta-label">${m.label}</span>
    <span class="hero-meta-value">${m.value}</span>
  </div>`).join("");
}

// ── FOOTER ───────────────────────────────────────────────────

function buildFooter() {
  const footer = document.createElement("footer");
  footer.innerHTML = `<div class="footer-inner">
    <p class="footer-team">Team ${team.number} · ${team.name.toUpperCase()}</p>
    <p class="footer-sub">${team.season} &nbsp;·&nbsp; ${team.location} &nbsp;·&nbsp; FIRST Robotics Competition</p>
  </div>`;
  document.body.appendChild(footer);
}

// ── TABLE OF CONTENTS ─────────────────────────────────────────

function buildTOC() {
  const sections = [
    { key: "hardware",   label: "Hardware",   items: hardware },
    { key: "software",   label: "Software",   items: software },
    { key: "prototypes", label: "Prototypes", items: prototypes },
  ];

  // Global counter across all sections
  let globalNum = 1;

  const sectionsHTML = sections.map(s => {
    const rows = s.items.map(item => {
      const num = String(globalNum++).padStart(2, "0");
      const isPrototype = s.key === "prototypes";
      const badge = isPrototype && item.outcome
        ? `<span class="toc-outcome ${outcomeClass(item.outcome)}">${item.outcome}</span>`
        : "";
      return `<a class="toc-row" href="#entry-${item.id}">
        <span class="toc-num">${num}</span>
        <span class="toc-name">${item.name}</span>
        ${badge}
        <span class="toc-arrow">→</span>
      </a>`;
    }).join("");

    return `<div class="toc-section">
      <div class="toc-section-label">${s.label.toUpperCase()}</div>
      ${rows}
    </div>`;
  }).join("");

  return `<section id="toc">
    <div class="toc-inner">
      <div class="toc-header">
        <h2 class="toc-title">Contents</h2>
        <a class="toc-index-link" href="#hero">↑ Index</a>
      </div>
      <div class="toc-divider"></div>
      ${sectionsHTML}
    </div>
  </section>`;
}

// ── INIT ─────────────────────────────────────────────────────

function init() {
  buildHero();
  buildNav();
  document.getElementById("main").innerHTML = [
    buildTOC(),
    buildSection(hardware,   "hardware",   "Hardware",   "hardware"),
    buildSection(software,   "software",   "Software",   "software"),
    buildSection(prototypes, "prototypes", "Prototypes", "prototypes"),
  ].join("");
  buildFooter();
  initCarousels();
  document.title = `${team.number} ${team.name} — ${team.season} Tech Binder`;
}

document.addEventListener("DOMContentLoaded", init);
