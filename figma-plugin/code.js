// ============================================================
// devl.dev Design System Generator — Figma Plugin  code.js
// Run inside Figma to generate all token + component pages.
// ============================================================

figma.showUI(__html__, { width: 380, height: 360 });

figma.ui.onmessage = async (msg) => {
  if (msg.type !== 'generate') return;
  try {
    await run();
    figma.ui.postMessage({ type: 'done', pages: 14 });
  } catch (e) {
    console.error(e);
    figma.ui.postMessage({ type: 'error', text: e.message });
  }
};

// ─────────────────────────────────────────────────────────────
// COLOUR HELPERS
// ─────────────────────────────────────────────────────────────
function hex(h) {
  h = h.replace('#', '');
  if (h.length === 3) h = h.split('').map(c => c + c).join('');
  return {
    r: parseInt(h.slice(0, 2), 16) / 255,
    g: parseInt(h.slice(2, 4), 16) / 255,
    b: parseInt(h.slice(4, 6), 16) / 255,
  };
}
function solid(c)   { return [{ type: 'SOLID', color: { r: c.r, g: c.g, b: c.b }, opacity: c.a !== undefined ? c.a : 1 }]; }
function noFill()   { return []; }
function stroke(c, w = 1) { return [{ type: 'SOLID', color: { r: c.r, g: c.g, b: c.b } }]; }

// ─────────────────────────────────────────────────────────────
// TOKEN DATA  (mirrors tokens.css exactly)
// ─────────────────────────────────────────────────────────────

// Layer 1 – Primitive palette
const PRIM_COLORS = {
  'slate/50':  '#F8FAFC', 'slate/100': '#F1F5F9', 'slate/200': '#E2E8F0',
  'slate/300': '#CBD5E1', 'slate/400': '#94A3B8', 'slate/500': '#64748B',
  'slate/600': '#475569', 'slate/700': '#334155', 'slate/800': '#1E293B',
  'slate/900': '#0F172A', 'slate/950': '#020617',
  'indigo/50':  '#EEF2FF', 'indigo/100': '#E0E7FF', 'indigo/200': '#C7D2FE',
  'indigo/300': '#A5B4FC', 'indigo/400': '#818CF8', 'indigo/500': '#6366F1',
  'indigo/600': '#4F46E5', 'indigo/700': '#4338CA', 'indigo/800': '#3730A3',
  'indigo/900': '#312E81',
  'green/50':  '#F0FDF4', 'green/100': '#DCFCE7', 'green/400': '#4ADE80',
  'green/500': '#22C55E', 'green/600': '#16A34A', 'green/700': '#15803D',
  'red/50':  '#FEF2F2', 'red/100': '#FEE2E2', 'red/400': '#F87171',
  'red/500': '#EF4444', 'red/600': '#DC2626', 'red/700': '#B91C1C',
  'amber/50':  '#FFFBEB', 'amber/100': '#FEF3C7', 'amber/400': '#FBBF24',
  'amber/500': '#F59E0B', 'amber/600': '#D97706', 'amber/700': '#B45309',
  'white': '#FFFFFF', 'black': '#000000',
};

const PRIM_SPACING = {
  'space/1': 4, 'space/2': 8,  'space/3': 12, 'space/4': 16,
  'space/5': 20,'space/6': 24, 'space/8': 32, 'space/10': 40,
  'space/12': 48,'space/16': 64,'space/20': 80,'space/24': 96,'space/32': 128,
};

const PRIM_RADIUS = {
  'radius/none': 0,  'radius/sm': 2,   'radius/base': 4,
  'radius/md':   6,  'radius/lg':  8,  'radius/xl':  12,
  'radius/2xl':  16, 'radius/3xl': 24, 'radius/full': 999,
};

const PRIM_FONT_SIZES = {
  'size/xs': 12, 'size/sm': 14, 'size/base': 16, 'size/lg': 18,
  'size/xl': 20, 'size/2xl': 24,'size/3xl': 30,  'size/4xl': 36,
  'size/5xl': 48,'size/6xl': 60,
};

const PRIM_WEIGHTS = {
  'weight/normal': 400, 'weight/medium': 500,
  'weight/semibold': 600, 'weight/bold': 700,
};

const PRIM_SHADOWS = [
  { name: 'shadow/none',  val: 'none' },
  { name: 'shadow/xs',    r:0,   g:0,   b:0, a:0.05, x:0, y:1, blur:2,  spread:0 },
  { name: 'shadow/sm',    r:0,   g:0,   b:0, a:0.10, x:0, y:1, blur:3,  spread:0 },
  { name: 'shadow/md',    r:0,   g:0,   b:0, a:0.10, x:0, y:4, blur:6,  spread:-1 },
  { name: 'shadow/lg',    r:0,   g:0,   b:0, a:0.10, x:0, y:10,blur:15, spread:-3 },
  { name: 'shadow/xl',    r:0,   g:0,   b:0, a:0.10, x:0, y:20,blur:25, spread:-5 },
  { name: 'shadow/2xl',   r:0,   g:0,   b:0, a:0.25, x:0, y:25,blur:50, spread:-12 },
];

const PRIM_ZINDEX = {
  'z/base': 0, 'z/raised': 10, 'z/dropdown': 100, 'z/sticky': 200,
  'z/overlay': 300, 'z/modal': 400, 'z/popover': 500, 'z/toast': 600, 'z/tooltip': 700,
};

const PRIM_DURATIONS = {
  'duration/instant': '0ms',   'duration/fast': '100ms',
  'duration/normal':  '150ms', 'duration/slow': '300ms',
  'duration/slower':  '500ms',
};

// Layer 2 – Semantic aliases  { name, light hex, dark hex, group }
const ALIAS_COLORS = [
  // Backgrounds
  { n: 'color/bg/canvas',   l: '#F8FAFC', d: '#020617', g: 'Background' },
  { n: 'color/bg/surface',  l: '#FFFFFF', d: '#0F172A', g: 'Background' },
  { n: 'color/bg/elevated', l: '#FFFFFF', d: '#1E293B', g: 'Background' },
  { n: 'color/bg/inset',    l: '#F1F5F9', d: '#1E293B', g: 'Background' },
  { n: 'color/bg/subtle',   l: '#F8FAFC', d: '#0F172A', g: 'Background' },
  { n: 'color/bg/code',     l: '#0F172A', d: '#020617', g: 'Background' },
  // Text
  { n: 'color/text/primary',   l: '#0F172A', d: '#F8FAFC', g: 'Text' },
  { n: 'color/text/secondary', l: '#475569', d: '#CBD5E1', g: 'Text' },
  { n: 'color/text/tertiary',  l: '#94A3B8', d: '#64748B', g: 'Text' },
  { n: 'color/text/disabled',  l: '#CBD5E1', d: '#475569', g: 'Text' },
  { n: 'color/text/inverse',   l: '#FFFFFF', d: '#0F172A', g: 'Text' },
  { n: 'color/text/code',      l: '#4F46E5', d: '#A5B4FC', g: 'Text' },
  // Links
  { n: 'color/link/default', l: '#4F46E5', d: '#818CF8', g: 'Link' },
  { n: 'color/link/hover',   l: '#4338CA', d: '#A5B4FC', g: 'Link' },
  // Borders
  { n: 'color/border/default', l: '#E2E8F0', d: '#334155', g: 'Border' },
  { n: 'color/border/strong',  l: '#CBD5E1', d: '#475569', g: 'Border' },
  { n: 'color/border/muted',   l: '#F1F5F9', d: '#1E293B', g: 'Border' },
  { n: 'color/border/focus',   l: '#6366F1', d: '#6366F1', g: 'Border' },
  { n: 'color/border/error',   l: '#EF4444', d: '#EF4444', g: 'Border' },
  // Primary interactive
  { n: 'color/interactive/primary',        l: '#4F46E5', d: '#4F46E5', g: 'Interactive' },
  { n: 'color/interactive/primary-hover',  l: '#4338CA', d: '#4338CA', g: 'Interactive' },
  { n: 'color/interactive/primary-subtle', l: '#EEF2FF', d: '#312E81', g: 'Interactive' },
  { n: 'color/interactive/primary-fg',     l: '#FFFFFF', d: '#FFFFFF', g: 'Interactive' },
  { n: 'color/interactive/ghost-hover',    l: '#F1F5F9', d: '#1E293B', g: 'Interactive' },
  { n: 'color/interactive/danger',         l: '#DC2626', d: '#DC2626', g: 'Interactive' },
  { n: 'color/interactive/danger-subtle',  l: '#FEF2F2', d: '#450a0a', g: 'Interactive' },
  // Status
  { n: 'color/status/success',        l: '#22C55E', d: '#22C55E', g: 'Status' },
  { n: 'color/status/success-subtle', l: '#F0FDF4', d: '#052e16', g: 'Status' },
  { n: 'color/status/success-text',   l: '#15803D', d: '#4ADE80', g: 'Status' },
  { n: 'color/status/warning',        l: '#F59E0B', d: '#F59E0B', g: 'Status' },
  { n: 'color/status/warning-subtle', l: '#FFFBEB', d: '#451a03', g: 'Status' },
  { n: 'color/status/warning-text',   l: '#B45309', d: '#FBBF24', g: 'Status' },
  { n: 'color/status/error',          l: '#EF4444', d: '#EF4444', g: 'Status' },
  { n: 'color/status/error-subtle',   l: '#FEF2F2', d: '#450a0a', g: 'Status' },
  { n: 'color/status/error-text',     l: '#B91C1C', d: '#F87171', g: 'Status' },
  { n: 'color/status/info',           l: '#6366F1', d: '#6366F1', g: 'Status' },
  { n: 'color/status/info-subtle',    l: '#EEF2FF', d: '#1e1b4b', g: 'Status' },
  { n: 'color/status/info-text',      l: '#4338CA', d: '#A5B4FC', g: 'Status' },
];

// ─────────────────────────────────────────────────────────────
// FIGMA VARIABLES  (token collections with Light / Dark modes)
// ─────────────────────────────────────────────────────────────
async function createVariables() {
  // ── Primitives collection ──────────────────────────────────
  const primColl = figma.variables.createVariableCollection('Primitives');
  const primMode = primColl.modes[0].modeId;
  primColl.renameMode(primMode, 'Value');

  for (const [name, hexVal] of Object.entries(PRIM_COLORS)) {
    const v = figma.variables.createVariable(`primitive/${name}`, primColl, 'COLOR');
    v.setValueForMode(primMode, hex(hexVal));
  }
  for (const [name, px] of Object.entries(PRIM_SPACING)) {
    const v = figma.variables.createVariable(`primitive/${name}`, primColl, 'FLOAT');
    v.setValueForMode(primMode, px);
  }
  for (const [name, px] of Object.entries(PRIM_RADIUS)) {
    const v = figma.variables.createVariable(`primitive/${name}`, primColl, 'FLOAT');
    v.setValueForMode(primMode, px);
  }
  for (const [name, px] of Object.entries(PRIM_FONT_SIZES)) {
    const v = figma.variables.createVariable(`primitive/${name}`, primColl, 'FLOAT');
    v.setValueForMode(primMode, px);
  }
  for (const [name, w] of Object.entries(PRIM_WEIGHTS)) {
    const v = figma.variables.createVariable(`primitive/${name}`, primColl, 'FLOAT');
    v.setValueForMode(primMode, w);
  }
  for (const [name, val] of Object.entries(PRIM_ZINDEX)) {
    const v = figma.variables.createVariable(`primitive/${name}`, primColl, 'FLOAT');
    v.setValueForMode(primMode, val);
  }
  for (const [name, val] of Object.entries(PRIM_DURATIONS)) {
    const v = figma.variables.createVariable(`primitive/${name}`, primColl, 'STRING');
    v.setValueForMode(primMode, val);
  }

  // ── Aliases collection (Light + Dark modes) ────────────────
  const aliasColl = figma.variables.createVariableCollection('Aliases');
  const lightMode = aliasColl.modes[0].modeId;
  aliasColl.renameMode(lightMode, 'Light');
  const darkModeId = aliasColl.addMode('Dark');

  for (const tok of ALIAS_COLORS) {
    const v = figma.variables.createVariable(tok.n, aliasColl, 'COLOR');
    v.setValueForMode(lightMode, hex(tok.l));
    v.setValueForMode(darkModeId, hex(tok.d));
  }
}

// ─────────────────────────────────────────────────────────────
// DRAW UTILITIES
// ─────────────────────────────────────────────────────────────
const FONTS = {
  regular:  { family: 'Inter', style: 'Regular' },
  medium:   { family: 'Inter', style: 'Medium' },
  semibold: { family: 'Inter', style: 'Semi Bold' },
  bold:     { family: 'Inter', style: 'Bold' },
  mono:     { family: 'Roboto Mono', style: 'Regular' },
};

async function loadFonts() {
  await Promise.all(Object.values(FONTS).map(f => figma.loadFontAsync(f)));
}

// Create a text node
function makeText(str, size, fontKey, colorHex, parent) {
  const t = figma.createText();
  t.fontName  = FONTS[fontKey] !== undefined ? FONTS[fontKey] : FONTS.regular;
  t.fontSize  = size;
  t.characters = String(str);
  t.fills     = solid(hex(colorHex));
  if (parent) parent.appendChild(t);
  return t;
}

// Create a rectangle
function makeRect(w, h, colorHex, parent, opts = {}) {
  const r = figma.createRectangle();
  r.resize(w, h);
  r.fills = colorHex ? solid(hex(colorHex)) : noFill();
  if (opts.radius !== undefined) r.cornerRadius = opts.radius;
  if (opts.stroke) {
    r.strokes = stroke(hex(opts.stroke));
    r.strokeWeight = opts.strokeWeight !== undefined ? opts.strokeWeight : 1;
    r.strokeAlign = 'INSIDE';
  }
  if (opts.shadow) {
    r.effects = [{
      type: 'DROP_SHADOW',
      color: { r: 0, g: 0, b: 0, a: opts.shadow.a !== undefined ? opts.shadow.a : 0.1 },
      offset: { x: opts.shadow.x !== undefined ? opts.shadow.x : 0, y: opts.shadow.y !== undefined ? opts.shadow.y : 4 },
      radius: opts.shadow.blur !== undefined ? opts.shadow.blur : 6,
      spread: opts.shadow.spread !== undefined ? opts.shadow.spread : 0,
      visible: true, blendMode: 'NORMAL',
    }];
  }
  if (parent) parent.appendChild(r);
  return r;
}

// Create a frame (auto-layout or free)
function makeFrame(w, h, colorHex, parent) {
  const f = figma.createFrame();
  f.resize(w, h);
  f.fills = colorHex ? solid(hex(colorHex)) : noFill();
  f.clipsContent = false;
  if (parent) parent.appendChild(f);
  return f;
}

// Page background
function setPageBg(page, colorHex) {
  page.backgrounds = [{ type: 'SOLID', color: hex(colorHex), opacity: 1 }];
}

// Section header label
function sectionLabel(text, x, y, parent) {
  const t = makeText(text, 11, 'semibold', '#94A3B8', parent);
  t.x = x; t.y = y;
  t.letterSpacing = { value: 1.2, unit: 'PIXELS' };
  try { t.textCase = 'UPPER'; } catch(_) {}
  return t;
}

// Page title
function pageTitle(text, x, y, parent) {
  const t = makeText(text, 32, 'bold', '#0F172A', parent);
  t.x = x; t.y = y;
  return t;
}

// Chip label below a swatch
function swatchLabel(top, label, sub, x, y, parent) {
  const t1 = makeText(label, 11, 'medium', '#0F172A', parent);
  t1.x = x; t1.y = y;
  const t2 = makeText(sub, 10, 'regular', '#64748B', parent);
  t2.x = x; t2.y = y + 16;
  return y + 32;
}

// ─────────────────────────────────────────────────────────────
// PAGE FACTORY
// ─────────────────────────────────────────────────────────────
function getOrCreatePage(name) {
  // Reuse if it exists (idempotent re-runs)
  const existing = figma.root.children.find(p => p.name === name);
  if (existing) return existing;
  const p = figma.createPage();
  p.name = name;
  return p;
}

// ─────────────────────────────────────────────────────────────
// PAGE: 🎨 PRIMITIVES
// ─────────────────────────────────────────────────────────────
async function buildPrimitivesPage(page) {
  await figma.setCurrentPageAsync(page);
  setPageBg(page, '#F1F5F9');

  const canvas = makeFrame(1800, 3600, '#F1F5F9', null);
  canvas.name = 'Primitives';
  page.appendChild(canvas);

  const ML = 80; // left margin
  let y = 80;

  pageTitle('🎨 Primitives', ML, y, canvas); y += 64;

  // ── Color palettes ────────────────────────────────────────
  sectionLabel('Color Primitives', ML, y, canvas); y += 28;

  const palettes = [
    { label: 'Slate',  keys: ['slate/50','slate/100','slate/200','slate/300','slate/400','slate/500','slate/600','slate/700','slate/800','slate/900','slate/950'] },
    { label: 'Indigo', keys: ['indigo/50','indigo/100','indigo/200','indigo/300','indigo/400','indigo/500','indigo/600','indigo/700','indigo/800','indigo/900'] },
    { label: 'Green',  keys: ['green/50','green/100','green/400','green/500','green/600','green/700'] },
    { label: 'Red',    keys: ['red/50','red/100','red/400','red/500','red/600','red/700'] },
    { label: 'Amber',  keys: ['amber/50','amber/100','amber/400','amber/500','amber/600','amber/700'] },
  ];

  for (const pal of palettes) {
    const lbl = makeText(pal.label, 12, 'medium', '#475569', canvas);
    lbl.x = ML; lbl.y = y; y += 20;

    let x = ML;
    for (const key of pal.keys) {
      const hexVal = PRIM_COLORS[key];
      const sw = makeRect(72, 56, hexVal, canvas, { radius: 8, stroke: '#E2E8F0' });
      sw.name = key;
      sw.x = x; sw.y = y;

      const short = key.split('/')[1];
      const t1 = makeText(short, 10, 'medium', '#0F172A', canvas);
      t1.x = x; t1.y = y + 60;
      const t2 = makeText(hexVal, 9, 'regular', '#64748B', canvas);
      t2.x = x; t2.y = y + 74;
      x += 88;
    }
    y += 110;
  }
  y += 16;

  // ── Spacing scale ─────────────────────────────────────────
  sectionLabel('Spacing Scale', ML, y, canvas); y += 28;
  for (const [name, px] of Object.entries(PRIM_SPACING)) {
    const bar = makeRect(px, 20, '#4F46E5', canvas, { radius: 3 });
    bar.name = name; bar.x = ML; bar.y = y;
    const lbl = makeText(`${name.split('/')[1]}  →  ${px}px`, 11, 'regular', '#475569', canvas);
    lbl.x = ML + px + 12; lbl.y = y + 2;
    y += 32;
  }
  y += 24;

  // ── Border radius ─────────────────────────────────────────
  sectionLabel('Border Radius', ML, y, canvas); y += 28;
  let rx = ML;
  for (const [name, val] of Object.entries(PRIM_RADIUS)) {
    const r = makeRect(56, 56, '#4F46E5', canvas, { radius: Math.min(val, 28) });
    r.name = name; r.x = rx; r.y = y;
    const t = makeText(`${name.split('/')[1]}\n${val}px`, 10, 'regular', '#475569', canvas);
    t.x = rx; t.y = y + 62;
    rx += 80;
  }
  y += 120;

  // ── Typography scale ──────────────────────────────────────
  sectionLabel('Font Size Scale', ML, y, canvas); y += 28;
  for (const [name, size] of Object.entries(PRIM_FONT_SIZES)) {
    const specimen = makeText('Aa', Math.min(size, 48), 'bold', '#0F172A', canvas);
    specimen.x = ML; specimen.y = y;
    const lbl = makeText(`${name}  ·  ${size}px`, 11, 'regular', '#64748B', canvas);
    lbl.x = ML + 80; lbl.y = y + Math.min(size, 48) / 2 - 6;
    y += Math.min(size, 48) + 16;
  }
  y += 16;

  // ── Elevation / shadows ───────────────────────────────────
  sectionLabel('Elevation', ML, y, canvas); y += 28;
  let ex = ML;
  for (const s of PRIM_SHADOWS) {
    const opts = s.val === 'none' ? { radius: 8 } : {
      radius: 8,
      shadow: { a: s.a, x: s.x, y: s.y, blur: s.blur, spread: s.spread },
    };
    const box = makeRect(80, 80, '#FFFFFF', canvas, opts);
    box.name = s.name; box.x = ex; box.y = y;
    const t = makeText(s.name.split('/')[1], 10, 'regular', '#475569', canvas);
    t.x = ex; t.y = y + 88;
    ex += 112;
  }
  y += 136;

  // ── Z-index ───────────────────────────────────────────────
  sectionLabel('Z-Index', ML, y, canvas); y += 28;
  let zx = ML;
  for (const [name, val] of Object.entries(PRIM_ZINDEX)) {
    const box = makeRect(72, 40, '#4F46E5', canvas, { radius: 6 });
    box.x = zx; box.y = y; box.name = name;
    const t = makeText(`${name.split('/')[1]}\n${val}`, 10, 'medium', '#FFFFFF', canvas);
    t.x = zx + 8; t.y = y + 6;
    zx += 90;
  }
  y += 80;

  // Resize canvas to content
  canvas.resize(1800, y + 80);
}

// ─────────────────────────────────────────────────────────────
// PAGE: 🔗 ALIASES
// ─────────────────────────────────────────────────────────────
async function buildAliasesPage(page) {
  await figma.setCurrentPageAsync(page);
  setPageBg(page, '#F1F5F9');

  const canvas = makeFrame(1800, 3200, '#F1F5F9', null);
  canvas.name = 'Aliases';
  page.appendChild(canvas);

  const ML = 80;
  let y = 80;

  pageTitle('🔗 Aliases', ML, y, canvas); y += 48;
  const sub = makeText('Semantic token mappings. Left = Light mode · Right = Dark mode', 13, 'regular', '#64748B', canvas);
  sub.x = ML; sub.y = y; y += 56;

  // Column headers
  const ch1 = makeText('TOKEN NAME', 10, 'semibold', '#94A3B8', canvas);
  ch1.x = ML; ch1.y = y;
  const ch2 = makeText('LIGHT', 10, 'semibold', '#94A3B8', canvas);
  ch2.x = ML + 340; ch2.y = y;
  const ch3 = makeText('HEX', 10, 'semibold', '#94A3B8', canvas);
  ch3.x = ML + 420; ch3.y = y;
  const ch4 = makeText('DARK', 10, 'semibold', '#94A3B8', canvas);
  ch4.x = ML + 560; ch4.y = y;
  const ch5 = makeText('HEX', 10, 'semibold', '#94A3B8', canvas);
  ch5.x = ML + 640; ch5.y = y;
  y += 28;

  // Divider
  const div0 = makeRect(900, 1, '#CBD5E1', canvas);
  div0.x = ML; div0.y = y; y += 16;

  let lastGroup = '';
  for (const tok of ALIAS_COLORS) {
    if (tok.g !== lastGroup) {
      lastGroup = tok.g;
      y += 8;
      sectionLabel(tok.g, ML, y, canvas);
      y += 24;
    }

    const row = y;

    // Token name
    const tn = makeText(tok.n, 11, 'mono', '#334155', canvas);
    tn.x = ML; tn.y = row + 4;

    // Light swatch + hex
    const ls = makeRect(28, 28, tok.l, canvas, { radius: 6, stroke: '#E2E8F0' });
    ls.x = ML + 340; ls.y = row;
    const lh = makeText(tok.l, 10, 'regular', '#475569', canvas);
    lh.x = ML + 376; lh.y = row + 7;

    // Dark swatch + hex
    const ds = makeRect(28, 28, tok.d, canvas, { radius: 6, stroke: '#CBD5E1' });
    ds.x = ML + 560; ds.y = row;
    const dh = makeText(tok.d, 10, 'regular', '#475569', canvas);
    dh.x = ML + 596; dh.y = row + 7;

    y += 36;
  }

  canvas.resize(1800, y + 80);
}

// ─────────────────────────────────────────────────────────────
// SHARED COMPONENT-PAGE SCAFFOLD
// ─────────────────────────────────────────────────────────────
async function componentPageSetup(page, title, subtitle) {
  await figma.setCurrentPageAsync(page);
  setPageBg(page, '#F1F5F9');
  const canvas = makeFrame(1800, 4000, '#F1F5F9', null);
  canvas.name = title;
  page.appendChild(canvas);
  let y = 80;
  pageTitle(title, 80, y, canvas); y += 48;
  const st = makeText(subtitle, 13, 'regular', '#64748B', canvas);
  st.x = 80; st.y = y; y += 52;
  return { canvas, y };
}

// Draw a labelled group frame on a page
function groupFrame(label, x, y, w, h, parent) {
  const lbl = makeText(label, 10, 'semibold', '#94A3B8', parent);
  lbl.x = x; lbl.y = y - 18;
  const f = makeFrame(w, h, '#FFFFFF', parent);
  f.x = x; f.y = y;
  f.cornerRadius = 12;
  f.strokes = stroke(hex('#E2E8F0'));
  f.strokeWeight = 1;
  f.strokeAlign = 'INSIDE';
  f.effects = [{ type:'DROP_SHADOW', color:{r:0,g:0,b:0,a:0.06}, offset:{x:0,y:2}, radius:6, spread:0, visible:true, blendMode:'NORMAL' }];
  return f;
}

// ─────────────────────────────────────────────────────────────
// PAGE: ⚡ BUTTON
// ─────────────────────────────────────────────────────────────
async function buildButtonPage(page) {
  let { canvas, y } = await componentPageSetup(page, '⚡ Button', 'All variants, sizes, and states. tokens.css → styles/components/button.css');

  // ── Variants row ──────────────────────────────────────────
  sectionLabel('Variants', 80, y, canvas); y += 28;
  const variants = [
    { label: 'Primary',      bg:'#4F46E5', fg:'#FFFFFF', border:null },
    { label: 'Secondary',    bg:'#FFFFFF', fg:'#334155', border:'#E2E8F0' },
    { label: 'Ghost',        bg:'transparent', fg:'#334155', border:null },
    { label: 'Danger',       bg:'#DC2626', fg:'#FFFFFF', border:null },
    { label: 'Danger Ghost', bg:'transparent', fg:'#DC2626', border:null },
    { label: 'Link',         bg:'transparent', fg:'#4F46E5', border:null },
  ];
  let x = 80;
  for (const v of variants) {
    const f = groupFrame(v.label, x, y, 140, 44, canvas);
    const bg = v.bg === 'transparent' ? null : v.bg;
    if (bg) f.fills = solid(hex(bg)); else f.fills = noFill();
    f.cornerRadius = 6;
    if (v.border) { f.strokes = stroke(hex(v.border)); f.strokeWeight = 1; f.strokeAlign = 'INSIDE'; }
    f.effects = [];
    const t = makeText(v.label, 13, 'semibold', v.fg === 'transparent' ? '#4F46E5' : v.fg, f);
    t.x = (140 - t.width) / 2; t.y = 13;
    x += 164;
  }
  y += 88;

  // ── Sizes row ─────────────────────────────────────────────
  sectionLabel('Sizes', 80, y, canvas); y += 28;
  const sizes = [
    { lbl:'XS', fs:11, py:6,  px:8,  h:28 },
    { lbl:'SM', fs:12, py:6,  px:12, h:32 },
    { lbl:'MD', fs:13, py:8,  px:16, h:40 },
    { lbl:'LG', fs:14, py:10, px:20, h:44 },
    { lbl:'XL', fs:16, py:12, px:24, h:52 },
  ];
  x = 80;
  for (const s of sizes) {
    const w = 40 + s.px * 2;
    const f = groupFrame(s.lbl, x, y, w, s.h, canvas);
    f.fills = solid(hex('#4F46E5')); f.cornerRadius = 6; f.effects = []; f.strokes = [];
    const t = makeText('Button', s.fs, 'semibold', '#FFFFFF', f);
    t.x = (w - t.width) / 2; t.y = (s.h - t.height) / 2;
    x += w + 24;
  }
  y += 100;

  // ── States ────────────────────────────────────────────────
  sectionLabel('States', 80, y, canvas); y += 28;
  const states = [
    { lbl:'Default',  bg:'#4F46E5', opacity:1 },
    { lbl:'Hover',    bg:'#4338CA', opacity:1 },
    { lbl:'Active',   bg:'#3730A3', opacity:1 },
    { lbl:'Disabled', bg:'#4F46E5', opacity:0.5 },
    { lbl:'Loading',  bg:'#4F46E5', opacity:1, spinner:true },
  ];
  x = 80;
  for (const s of states) {
    const f = groupFrame(s.lbl, x, y, 140, 40, canvas);
    f.fills = solid(hex(s.bg)); f.cornerRadius = 6; f.effects = []; f.strokes = [];
    f.opacity = s.opacity;
    const label = s.spinner ? '↻  Loading…' : s.lbl;
    const t = makeText(label, 13, 'semibold', '#FFFFFF', f);
    t.x = (140 - t.width) / 2; t.y = 10;
    x += 164;
  }
  y += 88;

  // ── Icon-only ─────────────────────────────────────────────
  sectionLabel('Icon-only', 80, y, canvas); y += 28;
  const iconSizes = [28, 32, 40, 48];
  x = 80;
  for (const sz of iconSizes) {
    const f = groupFrame(`${sz}×${sz}`, x, y, sz, sz, canvas);
    f.fills = solid(hex('#4F46E5')); f.cornerRadius = 6; f.effects = []; f.strokes = [];
    const ic = makeText('⊕', sz * 0.4, 'regular', '#FFFFFF', f);
    ic.x = (sz - ic.width) / 2; ic.y = (sz - ic.height) / 2;
    x += sz + 24;
  }
  y += 88;

  canvas.resize(1800, y + 80);
}

// ─────────────────────────────────────────────────────────────
// PAGE: 🃏 CARD
// ─────────────────────────────────────────────────────────────
async function buildCardPage(page) {
  let { canvas, y } = await componentPageSetup(page, '🃏 Card', 'Content container surface. tokens.css → styles/components/card.css');

  // Standard card
  sectionLabel('Standard Card', 80, y, canvas); y += 28;
  const c1 = groupFrame('', 80, y, 320, 200, canvas);
  c1.cornerRadius = 12;
  // Header strip
  const hdr = makeRect(320, 56, '#F8FAFC', c1, { radius: 0 });
  hdr.x = 0; hdr.y = 0;
  const htitle = makeText('Card Title', 15, 'semibold', '#0F172A', c1);
  htitle.x = 20; htitle.y = 18;
  const hdiv = makeRect(320, 1, '#F1F5F9', c1); hdiv.x = 0; hdiv.y = 56;
  // Body
  const bdesc = makeText('Card description text goes here in the body area.\nSupporting information for the card content.', 13, 'regular', '#475569', c1);
  bdesc.x = 20; bdesc.y = 70;
  // Footer
  const fdiv = makeRect(320, 1, '#F1F5F9', c1); fdiv.x = 0; fdiv.y = 160;
  const ftr = makeRect(320, 40, '#F8FAFC', c1); ftr.x = 0; ftr.y = 160;

  // Flat card
  sectionLabel('Flat', 440, y - 28, canvas);
  const c2 = makeFrame(280, 140, '#FFFFFF', canvas);
  c2.x = 440; c2.y = y; c2.cornerRadius = 12;
  c2.strokes = stroke(hex('#E2E8F0')); c2.strokeWeight = 1; c2.strokeAlign = 'INSIDE';
  const c2t = makeText('Flat Card', 15, 'semibold', '#0F172A', c2); c2t.x = 20; c2t.y = 20;
  const c2d = makeText('No elevation shadow.', 13, 'regular', '#64748B', c2); c2d.x = 20; c2d.y = 44;

  // Stat card
  sectionLabel('Stat', 760, y - 28, canvas);
  const c3 = groupFrame('', 760, y, 220, 140, canvas); c3.cornerRadius = 12;
  const svl = makeText('1,042', 36, 'bold', '#0F172A', c3); svl.x = 20; svl.y = 20;
  const slbl = makeText('Total Deployments', 12, 'regular', '#64748B', c3); slbl.x = 20; slbl.y = 64;
  const sdelta = makeText('↑ 12% from yesterday', 12, 'medium', '#15803D', c3); sdelta.x = 20; sdelta.y = 86;

  y += 240;

  // Interactive card
  sectionLabel('Interactive (hover state)', 80, y, canvas); y += 28;
  const c4 = makeFrame(300, 160, '#FFFFFF', canvas);
  c4.x = 80; c4.y = y; c4.cornerRadius = 12;
  c4.strokes = stroke(hex('#E2E8F0')); c4.strokeWeight = 1; c4.strokeAlign = 'INSIDE';
  c4.effects = [{ type:'DROP_SHADOW', color:{r:0,g:0,b:0,a:0.1}, offset:{x:0,y:4}, radius:6, spread:-1, visible:true, blendMode:'NORMAL' }];
  const c4t = makeText('Interactive Card', 15, 'semibold', '#0F172A', c4); c4t.x = 20; c4t.y = 20;
  const c4d = makeText('Hover lifts with stronger shadow\nand slight upward translate.', 13, 'regular', '#64748B', c4); c4d.x = 20; c4d.y = 50;

  y += 220;
  canvas.resize(1800, y + 80);
}

// ─────────────────────────────────────────────────────────────
// PAGE: 📝 INPUT
// ─────────────────────────────────────────────────────────────
async function buildInputPage(page) {
  let { canvas, y } = await componentPageSetup(page, '📝 Input', 'Form controls. tokens.css → styles/components/input.css');

  // Helper: draw an input field
  function drawInput(label, placeholder, state, x, yy, parent) {
    const lnode = makeText(label, 11, 'medium', '#0F172A', parent);
    lnode.x = x; lnode.y = yy;
    const borderColor = state === 'error' ? '#EF4444' : state === 'focus' ? '#6366F1' : '#E2E8F0';
    const bg = state === 'disabled' ? '#F1F5F9' : '#FFFFFF';
    const inputF = makeFrame(240, 40, bg, parent);
    inputF.x = x; inputF.y = yy + 20;
    inputF.cornerRadius = 6;
    inputF.strokes = stroke(hex(borderColor)); inputF.strokeWeight = 1; inputF.strokeAlign = 'INSIDE';
    if (state === 'focus') {
      inputF.effects = [{ type:'DROP_SHADOW', color:{r:0.388,g:0.4,b:0.945,a:0.2}, offset:{x:0,y:0}, radius:0, spread:3, visible:true, blendMode:'NORMAL' }];
    }
    const ph = makeText(placeholder, 13, 'regular', state === 'disabled' ? '#CBD5E1' : '#94A3B8', inputF);
    ph.x = 12; ph.y = 12;
    if (state === 'error') {
      const err = makeText('This field is required.', 11, 'regular', '#B91C1C', parent);
      err.x = x; err.y = yy + 66;
    }
    return yy + 88;
  }

  // Row 1: States
  sectionLabel('Input States', 80, y, canvas); y += 28;
  const states2 = [
    { lbl:'Default', ph:'Enter value…',    state:'default' },
    { lbl:'Focus',   ph:'Text here…',      state:'focus' },
    { lbl:'Error',   ph:'Invalid value',   state:'error' },
    { lbl:'Disabled',ph:'Not available',   state:'disabled' },
  ];
  let ix = 80;
  for (const s of states2) {
    drawInput(s.lbl, s.ph, s.state, ix, y, canvas);
    ix += 280;
  }
  y += 110;

  // Row 2: Sizes
  sectionLabel('Input Sizes', 80, y, canvas); y += 28;
  const inputSizes = [
    { lbl:'Small  (32px)',   h:32, fs:11 },
    { lbl:'Medium (40px)',   h:40, fs:13 },
    { lbl:'Large  (48px)',   h:48, fs:15 },
  ];
  ix = 80;
  for (const s of inputSizes) {
    makeText(s.lbl, 10, 'medium', '#0F172A', canvas).x = ix;
    const f = makeFrame(200, s.h, '#FFFFFF', canvas);
    f.x = ix; f.y = y + 20; f.cornerRadius = 6;
    f.strokes = stroke(hex('#E2E8F0')); f.strokeWeight = 1; f.strokeAlign = 'INSIDE';
    const pt = makeText('Placeholder', s.fs, 'regular', '#94A3B8', f); pt.x = 12; pt.y = (s.h - pt.height) / 2;
    ix += 240;
  }
  y += 100;

  // Row 3: Checkbox, Radio, Toggle
  sectionLabel('Checkbox · Radio · Toggle', 80, y, canvas); y += 28;
  // Checkbox
  const cbBox = makeRect(18, 18, '#4F46E5', canvas, { radius: 4 });
  cbBox.x = 80; cbBox.y = y + 2;
  const cbLbl = makeText('Checkbox (checked)', 13, 'regular', '#0F172A', canvas);
  cbLbl.x = 106; cbLbl.y = y + 3;
  // Unchecked checkbox
  const cbBox2 = makeRect(18, 18, '#FFFFFF', canvas, { radius: 4, stroke: '#CBD5E1' });
  cbBox2.x = 80; cbBox2.y = y + 34;
  const cbLbl2 = makeText('Checkbox (unchecked)', 13, 'regular', '#0F172A', canvas);
  cbLbl2.x = 106; cbLbl2.y = y + 35;
  // Toggle
  const togTrack = makeRect(40, 22, '#4F46E5', canvas, { radius: 11 });
  togTrack.x = 340; togTrack.y = y + 2;
  const togThumb = makeRect(16, 16, '#FFFFFF', canvas, { radius: 8 });
  togThumb.x = 361; togThumb.y = y + 5;
  makeText('Toggle (on)', 13, 'regular', '#0F172A', canvas).x = 392; canvas.children[canvas.children.length-1].y = y + 5;
  const togTrack2 = makeRect(40, 22, '#CBD5E1', canvas, { radius: 11 });
  togTrack2.x = 340; togTrack2.y = y + 34;
  const togThumb2 = makeRect(16, 16, '#FFFFFF', canvas, { radius: 8 });
  togThumb2.x = 343; togThumb2.y = y + 37;
  makeText('Toggle (off)', 13, 'regular', '#0F172A', canvas).x = 392; canvas.children[canvas.children.length-1].y = y + 37;
  y += 88;

  canvas.resize(1800, y + 80);
}

// ─────────────────────────────────────────────────────────────
// PAGE: 🧭 NAVIGATION
// ─────────────────────────────────────────────────────────────
async function buildNavigationPage(page) {
  let { canvas, y } = await componentPageSetup(page, '🧭 Navigation', 'Top nav bar, sidebar nav, breadcrumb. styles/components/navigation.css');

  // Top nav bar
  sectionLabel('Top Navigation Bar', 80, y, canvas); y += 28;
  const navBar = makeFrame(1100, 64, '#FFFFFF', canvas);
  navBar.x = 80; navBar.y = y;
  navBar.effects = [{ type:'DROP_SHADOW', color:{r:0,g:0,b:0,a:0.06}, offset:{x:0,y:1}, radius:3, spread:0, visible:true, blendMode:'NORMAL' }];
  navBar.strokes = stroke(hex('#E2E8F0')); navBar.strokeWeight = 1; navBar.strokeAlign = 'OUTSIDE';
  // Logo
  const logoMark = makeRect(32, 32, '#4F46E5', navBar, { radius: 8 });
  logoMark.x = 20; logoMark.y = 16;
  const logoT = makeText('D', 16, 'bold', '#FFFFFF', navBar); logoT.x = 29; logoT.y = 22;
  const logoWord = makeText('devl.dev', 15, 'bold', '#0F172A', navBar); logoWord.x = 60; logoWord.y = 22;
  // Nav links
  const navLinks = ['Docs', 'Projects', 'Pricing', 'Blog'];
  let nlx = 200;
  for (const nl of navLinks) {
    const isActive = nl === 'Docs';
    const linkBg = makeRect(isActive ? 72 : 0, isActive ? 32 : 0, isActive ? '#EEF2FF' : 'transparent', navBar, { radius: 6 });
    linkBg.x = nlx - 10; linkBg.y = 16;
    if (!isActive) linkBg.fills = noFill();
    const lt = makeText(nl, 13, 'medium', isActive ? '#4F46E5' : '#475569', navBar);
    lt.x = nlx; lt.y = 23;
    nlx += lt.width + 28;
  }
  // Actions
  const loginBtn = makeFrame(64, 32, '#FFFFFF', navBar);
  loginBtn.x = 980; loginBtn.y = 16; loginBtn.cornerRadius = 6;
  loginBtn.strokes = stroke(hex('#E2E8F0')); loginBtn.strokeWeight = 1; loginBtn.strokeAlign = 'INSIDE';
  const loginT = makeText('Log in', 12, 'medium', '#334155', loginBtn); loginT.x = 12; loginT.y = 7;
  const signupBtn = makeFrame(80, 32, '#4F46E5', navBar);
  signupBtn.x = 1056; signupBtn.y = 16; signupBtn.cornerRadius = 6;
  const signupT = makeText('Sign up', 12, 'semibold', '#FFFFFF', signupBtn); signupT.x = 12; signupT.y = 7;
  y += 108;

  // Breadcrumb
  sectionLabel('Breadcrumb', 80, y, canvas); y += 28;
  const bcrumb = makeFrame(400, 24, null, canvas);
  bcrumb.x = 80; bcrumb.y = y; bcrumb.fills = noFill();
  const bParts = ['Home', '/', 'Docs', '/', 'Getting Started'];
  let bx = 0;
  for (const bp of bParts) {
    const isSep = bp === '/';
    const isLast = bp === 'Getting Started';
    const bc = isSep ? '#CBD5E1' : isLast ? '#0F172A' : '#475569';
    const bw = isSep ? 'regular' : isLast ? 'medium' : 'regular';
    const bt = makeText(bp, 12, bw, bc, bcrumb);
    bt.x = bx; bt.y = 2;
    bx += bt.width + (isSep ? 6 : 8);
  }
  y += 60;

  // Sidebar nav
  sectionLabel('Sidebar Navigation', 80, y, canvas); y += 28;
  const sidebar = makeFrame(240, 400, '#FFFFFF', canvas);
  sidebar.x = 80; sidebar.y = y;
  sidebar.cornerRadius = 12;
  sidebar.strokes = stroke(hex('#E2E8F0')); sidebar.strokeWeight = 1; sidebar.strokeAlign = 'INSIDE';
  sidebar.effects = [{ type:'DROP_SHADOW', color:{r:0,g:0,b:0,a:0.05}, offset:{x:0,y:2}, radius:4, spread:0, visible:true, blendMode:'NORMAL' }];
  // Section label
  const sblbl = makeText('DOCUMENTATION', 9, 'semibold', '#94A3B8', sidebar); sblbl.x = 16; sblbl.y = 16;
  // Items
  const sideItems = [
    { lbl:'Getting Started', active: true  },
    { lbl:'Installation',    active: false },
    { lbl:'Configuration',   active: false },
    { lbl:'API Reference',   active: false },
    { lbl:'Examples',        active: false },
  ];
  let sy = 44;
  for (const si of sideItems) {
    if (si.active) {
      const hl = makeRect(208, 32, '#EEF2FF', sidebar, { radius: 6 });
      hl.x = 16; hl.y = sy;
    }
    const slt = makeText(si.lbl, 13, si.active ? 'medium' : 'regular', si.active ? '#4F46E5' : '#475569', sidebar);
    slt.x = 32; slt.y = sy + 7;
    sy += 40;
  }
  y += 460;

  canvas.resize(1800, y + 80);
}

// ─────────────────────────────────────────────────────────────
// PAGE: 🏷 BADGE
// ─────────────────────────────────────────────────────────────
async function buildBadgePage(page) {
  let { canvas, y } = await componentPageSetup(page, '🏷 Badge', 'Status labels, tags, count indicators. styles/components/badge.css');

  const badgeData = [
    { lbl:'Default', bg:'#F1F5F9', fg:'#475569', border:'#E2E8F0' },
    { lbl:'Primary', bg:'#EEF2FF', fg:'#4F46E5', border:'#4F46E5' },
    { lbl:'Success', bg:'#F0FDF4', fg:'#15803D', border:'#22C55E' },
    { lbl:'Warning', bg:'#FFFBEB', fg:'#B45309', border:'#F59E0B' },
    { lbl:'Error',   bg:'#FEF2F2', fg:'#B91C1C', border:'#EF4444' },
    { lbl:'Info',    bg:'#EEF2FF', fg:'#4338CA', border:'#6366F1' },
  ];

  // Subtle (default) row
  sectionLabel('Subtle Variants', 80, y, canvas); y += 28;
  let bx = 80;
  for (const b of badgeData) {
    const bf = makeFrame(80, 24, b.bg, canvas);
    bf.x = bx; bf.y = y; bf.cornerRadius = 999;
    bf.strokes = stroke(hex(b.border)); bf.strokeWeight = 1; bf.strokeAlign = 'INSIDE';
    // dot
    const dot = makeRect(6, 6, b.border, bf, { radius: 3 });
    dot.x = 10; dot.y = 9;
    const txt = makeText(b.lbl, 11, 'medium', b.fg, bf);
    txt.x = 22; txt.y = 5;
    bx += 100;
  }
  y += 60;

  // Solid row
  sectionLabel('Solid Variants', 80, y, canvas); y += 28;
  const solidBadges = [
    { lbl:'Primary', bg:'#4F46E5', fg:'#FFFFFF' },
    { lbl:'Success', bg:'#22C55E', fg:'#FFFFFF' },
    { lbl:'Warning', bg:'#F59E0B', fg:'#FFFFFF' },
    { lbl:'Error',   bg:'#EF4444', fg:'#FFFFFF' },
  ];
  bx = 80;
  for (const b of solidBadges) {
    const bf = makeFrame(80, 24, b.bg, canvas);
    bf.x = bx; bf.y = y; bf.cornerRadius = 999;
    const txt = makeText(b.lbl, 11, 'semibold', b.fg, bf); txt.x = 16; txt.y = 5;
    bx += 100;
  }
  y += 60;

  // Count badge
  sectionLabel('Count Badge', 80, y, canvas); y += 28;
  const counts = [3, 12, 99];
  bx = 80;
  for (const n of counts) {
    const cf = makeFrame(n > 9 ? 28 : 22, 22, '#4F46E5', canvas);
    cf.x = bx; cf.y = y; cf.cornerRadius = 999;
    const ct = makeText(String(n), 11, 'semibold', '#FFFFFF', cf);
    ct.x = (cf.width - ct.width) / 2; ct.y = 4;
    bx += 48;
  }
  y += 60;

  // Tags (removable)
  sectionLabel('Tags (removable)', 80, y, canvas); y += 28;
  const tags = ['TypeScript', 'React', 'Node.js', 'CSS'];
  bx = 80;
  for (const tag of tags) {
    const tf = makeFrame(0, 26, '#F1F5F9', canvas);
    tf.cornerRadius = 999;
    tf.strokes = stroke(hex('#E2E8F0')); tf.strokeWeight = 1; tf.strokeAlign = 'INSIDE';
    const tt = makeText(tag, 11, 'medium', '#334155', tf); tt.x = 10; tt.y = 6;
    const tx = makeText('×', 12, 'regular', '#94A3B8', tf); tx.x = tt.width + 16; tx.y = 5;
    tf.resize(tt.width + 32, 26);
    tf.x = bx; tf.y = y;
    bx += tf.width + 10;
  }
  y += 60;

  canvas.resize(1800, y + 80);
}

// ─────────────────────────────────────────────────────────────
// PAGE: 💻 CODE BLOCK
// ─────────────────────────────────────────────────────────────
async function buildCodeBlockPage(page) {
  let { canvas, y } = await componentPageSetup(page, '💻 Code Block', 'Syntax display, terminal, inline code. styles/components/code-block.css');

  // Standard code block
  sectionLabel('Code Block with Header', 80, y, canvas); y += 28;
  const cb = makeFrame(640, 200, '#0F172A', canvas);
  cb.x = 80; cb.y = y; cb.cornerRadius = 8;
  // Header bar
  const cbHdr = makeRect(640, 44, '#1E293B', cb); cbHdr.x = 0; cbHdr.y = 0;
  const cbHdrDiv = makeRect(640, 1, '#334155', cb); cbHdrDiv.x = 0; cbHdrDiv.y = 44;
  const cbFname = makeText('deploy.sh', 12, 'mono', '#94A3B8', cb); cbFname.x = 16; cbFname.y = 14;
  const cbLang  = makeText('BASH', 10, 'semibold', '#64748B', cb); cbLang.x = 550; cbLang.y = 16;
  const cbCopy  = makeText('Copy', 11, 'medium', '#64748B', cb); cbCopy.x = 590; cbCopy.y = 16;
  // Code body
  const codeLine1 = makeText('$ npx devl deploy --env production', 13, 'mono', '#E2E8F0', cb); codeLine1.x = 20; codeLine1.y = 60;
  const codeLine2 = makeText('✓  Connected to devl.dev', 13, 'mono', '#4ADE80', cb); codeLine2.x = 20; codeLine2.y = 84;
  const codeLine3 = makeText('✓  Build complete (2.4s)', 13, 'mono', '#4ADE80', cb); codeLine3.x = 20; codeLine3.y = 108;
  const codeLine4 = makeText('⠿  Deploying to production…', 13, 'mono', '#818CF8', cb); codeLine4.x = 20; codeLine4.y = 132;
  const codeLine5 = makeText('✓  Live at https://alpha.devl.app', 13, 'mono', '#F8FAFC', cb); codeLine5.x = 20; codeLine5.y = 156;
  y += 240;

  // Diff view
  sectionLabel('Diff View', 80, y, canvas); y += 28;
  const diff = makeFrame(640, 148, '#0F172A', canvas);
  diff.x = 80; diff.y = y; diff.cornerRadius = 8;
  const diffLines = [
    { text: '  import { deploy } from "devl";',       bg: null,      fg: '#CBD5E1' },
    { text: '- const target = "staging";',            bg: '#450a0a', fg: '#F87171' },
    { text: '+ const target = "production";',         bg: '#052e16', fg: '#4ADE80' },
    { text: '  await deploy({ target, force: true });',bg: null,     fg: '#CBD5E1' },
  ];
  let dy = 12;
  for (const dl of diffLines) {
    if (dl.bg) {
      const dlbg = makeRect(640, 28, dl.bg, diff); dlbg.x = 0; dlbg.y = dy - 4;
    }
    const dlt = makeText(dl.text, 12, 'mono', dl.fg, diff); dlt.x = 16; dlt.y = dy;
    dy += 32;
  }
  y += 200;

  // Inline code
  sectionLabel('Inline Code', 80, y, canvas); y += 28;
  const proseLine = makeText('Run ', 14, 'regular', '#0F172A', canvas);
  proseLine.x = 80; proseLine.y = y;
  const inlineCode = makeFrame(80, 24, '#F1F5F9', canvas);
  inlineCode.x = 80 + proseLine.width; inlineCode.y = y - 2;
  inlineCode.cornerRadius = 4;
  inlineCode.strokes = stroke(hex('#E2E8F0')); inlineCode.strokeWeight = 1; inlineCode.strokeAlign = 'INSIDE';
  const ict = makeText('devl init', 13, 'mono', '#4F46E5', inlineCode); ict.x = 6; ict.y = 4;
  inlineCode.resize(ict.width + 12, 24);
  const prose2 = makeText(' to scaffold a new project.', 14, 'regular', '#0F172A', canvas);
  prose2.x = inlineCode.x + inlineCode.width; prose2.y = y;
  y += 60;

  canvas.resize(1800, y + 80);
}

// ─────────────────────────────────────────────────────────────
// PAGE: 👤 AVATAR
// ─────────────────────────────────────────────────────────────
async function buildAvatarPage(page) {
  let { canvas, y } = await componentPageSetup(page, '👤 Avatar', 'User identity. sizes, status, groups. styles/components/avatar.css');

  // Sizes
  sectionLabel('Sizes', 80, y, canvas); y += 28;
  const avSizes = [
    { lbl:'XS  24px', sz:24, fs:9  },
    { lbl:'SM  32px', sz:32, fs:11 },
    { lbl:'MD  40px', sz:40, fs:13 },
    { lbl:'LG  48px', sz:48, fs:15 },
    { lbl:'XL  64px', sz:64, fs:20 },
  ];
  let ax = 80;
  for (const a of avSizes) {
    const av = makeRect(a.sz, a.sz, '#EEF2FF', canvas, { radius: a.sz / 2 });
    av.x = ax; av.y = y;
    const initials = makeText('AK', a.fs, 'semibold', '#4F46E5', canvas);
    initials.x = ax + (a.sz - initials.width) / 2;
    initials.y = y + (a.sz - initials.height) / 2;
    const lbl = makeText(a.lbl, 9, 'regular', '#64748B', canvas);
    lbl.x = ax; lbl.y = y + a.sz + 6;
    ax += a.sz + 48;
  }
  y += 120;

  // Status indicators
  sectionLabel('Status Indicators', 80, y, canvas); y += 28;
  const statuses = [
    { lbl:'Online',  dot:'#22C55E' },
    { lbl:'Away',    dot:'#F59E0B' },
    { lbl:'Busy',    dot:'#EF4444' },
    { lbl:'Offline', dot:'#94A3B8' },
  ];
  ax = 80;
  for (const s of statuses) {
    const av = makeRect(40, 40, '#EEF2FF', canvas, { radius: 20 });
    av.x = ax; av.y = y;
    const ini = makeText('AK', 12, 'semibold', '#4F46E5', canvas);
    ini.x = ax + (40 - ini.width) / 2; ini.y = y + 12;
    // status dot
    const sdot = makeRect(12, 12, s.dot, canvas, { radius: 6 });
    sdot.x = ax + 29; sdot.y = y + 29;
    // border
    const sdotBdr = makeRect(12, 12, null, canvas, { radius: 6, stroke: '#F1F5F9' });
    sdotBdr.x = ax + 29; sdotBdr.y = y + 29; sdotBdr.fills = noFill();
    const lbl = makeText(s.lbl, 10, 'regular', '#475569', canvas);
    lbl.x = ax; lbl.y = y + 48;
    ax += 80;
  }
  y += 100;

  // Avatar group
  sectionLabel('Avatar Group (stacked)', 80, y, canvas); y += 28;
  const groupColors = ['#EEF2FF','#F0FDF4','#FEF2F2','#FFFBEB'];
  const groupFgs    = ['#4F46E5','#15803D','#B91C1C','#B45309'];
  const groupInits  = ['AK','JL','MR','TP'];
  ax = 80;
  for (let i = groupColors.length - 1; i >= 0; i--) {
    const av = makeRect(40, 40, groupColors[i], canvas, { radius: 20 });
    av.x = ax + i * 28; av.y = y;
    const bdr = makeRect(40, 40, null, canvas, { radius: 20, stroke: '#FFFFFF' });
    bdr.x = ax + i * 28; bdr.y = y; bdr.fills = noFill();
    const ini = makeText(groupInits[i], 12, 'semibold', groupFgs[i], canvas);
    ini.x = ax + i * 28 + (40 - ini.width) / 2; ini.y = y + 12;
  }
  // Overflow badge
  const ovf = makeRect(40, 40, '#F1F5F9', canvas, { radius: 20, stroke: '#E2E8F0' });
  ovf.x = ax + groupColors.length * 28; ovf.y = y;
  const ovt = makeText('+8', 11, 'semibold', '#475569', canvas);
  ovt.x = ax + groupColors.length * 28 + 8; ovt.y = y + 12;
  y += 100;

  // Square variant
  sectionLabel('Square (rounded) Variant', 80, y, canvas); y += 28;
  ax = 80;
  for (const a of avSizes.slice(1, 4)) {
    const av = makeRect(a.sz, a.sz, '#EEF2FF', canvas, { radius: Math.round(a.sz * 0.2) });
    av.x = ax; av.y = y;
    const ini = makeText('AK', a.fs, 'semibold', '#4F46E5', canvas);
    ini.x = ax + (a.sz - ini.width) / 2; ini.y = y + (a.sz - ini.height) / 2;
    ax += a.sz + 24;
  }
  y += 100;

  canvas.resize(1800, y + 80);
}

// ─────────────────────────────────────────────────────────────
// PAGE: ⚠️ ALERT
// ─────────────────────────────────────────────────────────────
async function buildAlertPage(page) {
  let { canvas, y } = await componentPageSetup(page, '⚠️ Alert', 'Inline feedback and transient toasts. styles/components/alert.css');

  const alerts = [
    { lbl:'Info',    bg:'#EEF2FF', border:'#6366F1', titleClr:'#4338CA', icon:'ℹ', msg:'Your account settings have been updated successfully.' },
    { lbl:'Success', bg:'#F0FDF4', border:'#22C55E', titleClr:'#15803D', icon:'✓', msg:'Deployment complete. Version 2.4.1 is now live.' },
    { lbl:'Warning', bg:'#FFFBEB', border:'#F59E0B', titleClr:'#B45309', icon:'⚠', msg:'Your free tier limit is 90% used this month.' },
    { lbl:'Error',   bg:'#FEF2F2', border:'#EF4444', titleClr:'#B91C1C', icon:'✖', msg:'Build failed: TypeScript error in src/api/index.ts:42' },
  ];

  sectionLabel('Alert Variants', 80, y, canvas); y += 28;
  for (const a of alerts) {
    const af = makeFrame(640, 72, a.bg, canvas);
    af.x = 80; af.y = y; af.cornerRadius = 8;
    af.strokes = stroke(hex(a.border)); af.strokeWeight = 1; af.strokeAlign = 'INSIDE';
    const icon = makeText(a.icon, 16, 'bold', a.titleClr, af); icon.x = 16; icon.y = 26;
    const title = makeText(a.lbl, 13, 'semibold', a.titleClr, af); title.x = 44; title.y = 14;
    const body  = makeText(a.msg, 12, 'regular', a.titleClr, af); body.x = 44; body.y = 34;
    const close = makeText('×', 16, 'regular', a.titleClr, af); close.x = 610; close.y = 26;
    y += 96;
  }

  // Bordered variant
  sectionLabel('Left-border Variant', 80, y, canvas); y += 28;
  const ba = makeFrame(640, 64, '#FFFFFF', canvas);
  ba.x = 80; ba.y = y; ba.cornerRadius = 0;
  const baAccent = makeRect(4, 64, '#6366F1', ba); baAccent.x = 0; baAccent.y = 0;
  ba.strokes = stroke(hex('#E2E8F0')); ba.strokeWeight = 1; ba.strokeAlign = 'INSIDE';
  const baTitle = makeText('Note', 13, 'semibold', '#4338CA', ba); baTitle.x = 20; baTitle.y = 12;
  const baBody  = makeText('This configuration applies to all environments.', 12, 'regular', '#475569', ba); baBody.x = 20; baBody.y = 32;
  y += 100;

  // Toasts
  sectionLabel('Toast Notifications', 80, y, canvas); y += 28;
  const toasts = [
    { msg:'Copied to clipboard', icon:'✓', iconClr:'#15803D' },
    { msg:'Deployment queued', icon:'↻', iconClr:'#4F46E5' },
    { msg:'Connection lost', icon:'✖', iconClr:'#B91C1C' },
  ];
  let tx = 80;
  for (const t of toasts) {
    const tf = makeFrame(220, 48, '#FFFFFF', canvas);
    tf.x = tx; tf.y = y; tf.cornerRadius = 12;
    tf.strokes = stroke(hex('#E2E8F0')); tf.strokeWeight = 1; tf.strokeAlign = 'INSIDE';
    tf.effects = [{ type:'DROP_SHADOW', color:{r:0,g:0,b:0,a:0.1}, offset:{x:0,y:4}, radius:12, spread:0, visible:true, blendMode:'NORMAL' }];
    const ic = makeText(t.icon, 14, 'bold', t.iconClr, tf); ic.x = 14; ic.y = 16;
    const tm = makeText(t.msg, 12, 'medium', '#0F172A', tf); tm.x = 36; tm.y = 15;
    tx += 244;
  }
  y += 100;

  canvas.resize(1800, y + 80);
}

// ─────────────────────────────────────────────────────────────
// PAGE: 📦 MODAL
// ─────────────────────────────────────────────────────────────
async function buildModalPage(page) {
  let { canvas, y } = await componentPageSetup(page, '📦 Modal', 'Dialog overlay and drawer. styles/components/modal.css');

  // Backdrop + dialog
  sectionLabel('Dialog (default)', 80, y, canvas); y += 28;
  const backdrop = makeFrame(700, 500, null, canvas);
  backdrop.x = 80; backdrop.y = y;
  backdrop.fills = [{ type:'SOLID', color:{ r:0.059, g:0.09, b:0.165 }, opacity:0.6 }];
  backdrop.cornerRadius = 16;
  const modal = makeFrame(420, 280, '#FFFFFF', backdrop);
  modal.x = 140; modal.y = 110; modal.cornerRadius = 16;
  modal.effects = [{ type:'DROP_SHADOW', color:{r:0,g:0,b:0,a:0.25}, offset:{x:0,y:20}, radius:25, spread:-5, visible:true, blendMode:'NORMAL' }];
  // Modal header
  const mhDiv = makeRect(420, 1, '#F1F5F9', modal); mhDiv.x = 0; mhDiv.y = 64;
  const mtitle = makeText('Delete project', 16, 'semibold', '#0F172A', modal); mtitle.x = 24; mtitle.y = 20;
  const msub   = makeText('This action cannot be undone.', 12, 'regular', '#64748B', modal); msub.x = 24; msub.y = 40;
  const mclose = makeText('×', 20, 'regular', '#94A3B8', modal); mclose.x = 388; mclose.y = 18;
  // Modal body
  const mbody  = makeText('Are you sure you want to delete Project Alpha?\nAll deployments and logs will be permanently removed.', 13, 'regular', '#475569', modal);
  mbody.x = 24; mbody.y = 80;
  // Footer
  const mfDiv = makeRect(420, 1, '#F1F5F9', modal); mfDiv.x = 0; mfDiv.y = 224;
  const mfBg  = makeRect(420, 56, '#F8FAFC', modal); mfBg.x = 0; mfBg.y = 224;
  const cancelBtn = makeFrame(80, 32, '#FFFFFF', modal); cancelBtn.x = 220; cancelBtn.y = 236; cancelBtn.cornerRadius = 6;
  cancelBtn.strokes = stroke(hex('#E2E8F0')); cancelBtn.strokeWeight = 1; cancelBtn.strokeAlign = 'INSIDE';
  const ct = makeText('Cancel', 12, 'medium', '#334155', cancelBtn); ct.x = 14; ct.y = 7;
  const delBtn = makeFrame(116, 32, '#DC2626', modal); delBtn.x = 312; delBtn.y = 236; delBtn.cornerRadius = 6;
  const dt = makeText('Delete project', 12, 'semibold', '#FFFFFF', delBtn); dt.x = 12; dt.y = 7;
  y += 540;

  // Drawer
  sectionLabel('Drawer (right slide-in)', 80, y, canvas); y += 28;
  const drawerBg = makeFrame(700, 400, null, canvas);
  drawerBg.x = 80; drawerBg.y = y;
  drawerBg.fills = [{ type:'SOLID', color:{ r:0.059, g:0.09, b:0.165 }, opacity:0.5 }];
  drawerBg.cornerRadius = 16;
  const drawer = makeFrame(300, 400, '#FFFFFF', drawerBg);
  drawer.x = 400; drawer.y = 0; drawer.cornerRadius = 16;
  drawer.effects = [{ type:'DROP_SHADOW', color:{r:0,g:0,b:0,a:0.2}, offset:{x:-4,y:0}, radius:20, spread:0, visible:true, blendMode:'NORMAL' }];
  const dhTitle = makeText('Project Settings', 15, 'semibold', '#0F172A', drawer); dhTitle.x = 20; dhTitle.y = 20;
  const dhDiv = makeRect(300, 1, '#F1F5F9', drawer); dhDiv.x = 0; dhDiv.y = 52;
  const dhBody = makeText('Settings content goes\nhere in the drawer body.', 13, 'regular', '#475569', drawer); dhBody.x = 20; dhBody.y = 68;
  y += 460;

  canvas.resize(1800, y + 80);
}

// ─────────────────────────────────────────────────────────────
// PAGE: 📊 TABLE
// ─────────────────────────────────────────────────────────────
async function buildTablePage(page) {
  let { canvas, y } = await componentPageSetup(page, '📊 Table', 'Data grid with sorting, selection, pagination. styles/components/table.css');

  sectionLabel('Data Table', 80, y, canvas); y += 28;

  const TW = 900;
  const wrapper = makeFrame(TW, 400, '#FFFFFF', canvas);
  wrapper.x = 80; wrapper.y = y; wrapper.cornerRadius = 12;
  wrapper.strokes = stroke(hex('#E2E8F0')); wrapper.strokeWeight = 1; wrapper.strokeAlign = 'INSIDE';
  wrapper.clipsContent = true;

  const cols = [44, 220, 120, 120, 140, 120, 80];
  const colTitles = ['', 'Project', 'Status', 'Region', 'Requests', 'Last deploy', ''];
  const colAligns = ['c','l','l','l','r','l','c'];

  // Header
  const thead = makeRect(TW, 44, '#F8FAFC', wrapper); thead.x = 0; thead.y = 0;
  const theadDiv = makeRect(TW, 1, '#E2E8F0', wrapper); theadDiv.x = 0; theadDiv.y = 44;

  let cx = 0;
  for (let i = 0; i < colTitles.length; i++) {
    if (colTitles[i]) {
      const th = makeText(colTitles[i].toUpperCase(), 10, 'semibold', '#64748B', wrapper);
      th.x = cx + 16; th.y = 14;
    }
    cx += cols[i];
  }

  // Rows
  const rows = [
    { checked: true,  name:'Project Alpha', status:'Live',    statusClr:'success', region:'US East',  reqs:'1,042,381', deploy:'2 min ago' },
    { checked: false, name:'Project Beta',  status:'Pending', statusClr:'warning', region:'EU West',  reqs:'  284,920', deploy:'1 hr ago' },
    { checked: false, name:'Project Gamma', status:'Failed',  statusClr:'error',   region:'AP South', reqs:'   12,003', deploy:'3 hr ago' },
    { checked: false, name:'Project Delta', status:'Live',    statusClr:'success', region:'US West',  reqs:'4,810,002', deploy:'5 min ago' },
  ];

  const statusColors = {
    success: { bg:'#F0FDF4', fg:'#15803D', border:'#22C55E' },
    warning: { bg:'#FFFBEB', fg:'#B45309', border:'#F59E0B' },
    error:   { bg:'#FEF2F2', fg:'#B91C1C', border:'#EF4444' },
  };

  let rowY = 45;
  for (let ri = 0; ri < rows.length; ri++) {
    const row = rows[ri];
    const rowH = 52;
    if (ri > 0) {
      const div = makeRect(TW, 1, '#F1F5F9', wrapper); div.x = 0; div.y = rowY;
    }
    if (row.checked) {
      const selBg = makeRect(TW, rowH, '#EEF2FF', wrapper); selBg.x = 0; selBg.y = rowY;
    }
    // Checkbox col
    const cbW = row.checked ? 14 : 14;
    const cb = makeRect(14, 14, row.checked ? '#4F46E5' : '#FFFFFF', wrapper, { radius: 3, stroke: row.checked ? undefined : '#CBD5E1' });
    cb.x = 15; cb.y = rowY + 19;
    // Name
    const nt = makeText(row.name, 13, 'medium', '#0F172A', wrapper); nt.x = cols[0] + 16; nt.y = rowY + 16;
    // Status badge
    const sc = statusColors[row.statusClr];
    const sb = makeFrame(80, 24, sc.bg, wrapper); sb.x = cols[0]+cols[1]+8; sb.y = rowY + 14; sb.cornerRadius = 999;
    sb.strokes = stroke(hex(sc.border)); sb.strokeWeight = 1; sb.strokeAlign = 'INSIDE';
    const sdot2 = makeRect(6, 6, sc.border, sb, { radius: 3 }); sdot2.x = 10; sdot2.y = 9;
    const stt = makeText(row.status, 11, 'medium', sc.fg, sb); stt.x = 22; stt.y = 5;
    // Region
    const rt = makeText(row.region, 13, 'regular', '#475569', wrapper); rt.x = cols[0]+cols[1]+cols[2]+16; rt.y = rowY + 16;
    // Requests
    const qt = makeText(row.reqs, 12, 'regular', '#334155', wrapper);
    qt.x = cols[0]+cols[1]+cols[2]+cols[3]+cols[4]-qt.width-16; qt.y = rowY + 16;
    // Deploy time
    const dt2 = makeText(row.deploy, 12, 'regular', '#64748B', wrapper);
    dt2.x = cols[0]+cols[1]+cols[2]+cols[3]+cols[4]+16; dt2.y = rowY + 16;
    // Actions
    const act = makeText('⋯', 16, 'regular', '#94A3B8', wrapper);
    act.x = TW - 36; act.y = rowY + 16;
    rowY += rowH;
  }

  // Pagination bar
  const pgBar = makeRect(TW, 48, '#F8FAFC', wrapper); pgBar.x = 0; pgBar.y = rowY;
  const pgDiv = makeRect(TW, 1, '#E2E8F0', wrapper); pgDiv.x = 0; pgDiv.y = rowY;
  const pgInfo = makeText('Showing 1–4 of 42 projects', 12, 'regular', '#64748B', wrapper); pgInfo.x = 20; pgInfo.y = rowY + 14;
  const pgPrev = makeFrame(76, 28, '#FFFFFF', wrapper); pgPrev.x = TW - 188; pgPrev.y = rowY + 10; pgPrev.cornerRadius = 6;
  pgPrev.strokes = stroke(hex('#E2E8F0')); pgPrev.strokeWeight = 1; pgPrev.strokeAlign = 'INSIDE';
  const pgPrevT = makeText('← Previous', 11, 'medium', '#334155', pgPrev); pgPrevT.x = 10; pgPrevT.y = 6;
  const pgNext = makeFrame(60, 28, '#FFFFFF', wrapper); pgNext.x = TW - 100; pgNext.y = rowY + 10; pgNext.cornerRadius = 6;
  pgNext.strokes = stroke(hex('#E2E8F0')); pgNext.strokeWeight = 1; pgNext.strokeAlign = 'INSIDE';
  const pgNextT = makeText('Next →', 11, 'medium', '#334155', pgNext); pgNextT.x = 10; pgNextT.y = 6;
  wrapper.resize(TW, rowY + 48);
  y += wrapper.height + 80;

  canvas.resize(1800, y + 80);
}

// ─────────────────────────────────────────────────────────────
// MAIN RUNNER
// ─────────────────────────────────────────────────────────────
async function run() {
  figma.ui.postMessage({ type: 'progress', text: 'Loading pages and fonts…' });
  // dynamic-page mode requires explicitly loading all pages before traversal
  await figma.loadAllPagesAsync();
  await loadFonts();

  figma.ui.postMessage({ type: 'progress', text: 'Creating Figma Variables…' });
  await createVariables();

  const pageMap = [
    { name: '🎨 Primitives',      fn: buildPrimitivesPage  },
    { name: '🔗 Aliases',         fn: buildAliasesPage     },
    { name: '⚡ Button',          fn: buildButtonPage      },
    { name: '🃏 Card',            fn: buildCardPage        },
    { name: '📝 Input',           fn: buildInputPage       },
    { name: '🧭 Navigation',      fn: buildNavigationPage  },
    { name: '🏷 Badge',           fn: buildBadgePage       },
    { name: '💻 Code Block',      fn: buildCodeBlockPage   },
    { name: '👤 Avatar',          fn: buildAvatarPage      },
    { name: '⚠️ Alert',           fn: buildAlertPage       },
    { name: '📦 Modal',           fn: buildModalPage       },
    { name: '📊 Table',           fn: buildTablePage       },
  ];

  for (const { name, fn } of pageMap) {
    figma.ui.postMessage({ type: 'progress', text: `Building ${name}…` });
    const p = getOrCreatePage(name);
    await fn(p);
  }

  // Remove the default empty page if it was never renamed
  const defaultPage = figma.root.children.find(p => p.name === 'Page 1');
  if (defaultPage && defaultPage.children.length === 0) {
    defaultPage.remove();
  }

  // Focus on Primitives page
  const first = figma.root.children.find(p => p.name === '🎨 Primitives');
  if (first) await figma.setCurrentPageAsync(first);
}
