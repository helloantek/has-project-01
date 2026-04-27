#!/usr/bin/env node
/**
 * token-audit.js — devl.dev design system token compliance checker
 *
 * Scans all CSS files for hardcoded visual values that should be tokens.
 * Exits with code 1 if any errors are found. Warnings do not block CI.
 *
 * Usage:
 *   node scripts/token-audit.js [--dir ./styles] [--strict]
 *
 * Flags:
 *   --dir <path>   Directory to scan (default: project root + styles/)
 *   --strict       Treat warnings as errors
 *   --quiet        Print only summary line
 */

'use strict';

const fs   = require('fs');
const path = require('path');

// ─── CLI args ─────────────────────────────────────────────────────────────────
const args    = process.argv.slice(2);
const strict  = args.includes('--strict');
const quiet   = args.includes('--quiet');
const dirFlag = args.indexOf('--dir');
const rootDir = path.resolve(__dirname, '..');
const scanDirs = dirFlag !== -1
  ? [path.resolve(args[dirFlag + 1])]
  : [
      path.join(rootDir, 'styles'),
      path.join(rootDir, 'tokens.css'),
    ];

// ─── Token suggestion maps ────────────────────────────────────────────────────

const COLOR_SUGGESTIONS = {
  // Slate primitives → semantic aliases
  '#F8FAFC': '--color-bg-canvas or --color-bg-subtle',
  '#F1F5F9': '--color-bg-inset',
  '#E2E8F0': '--color-border-default',
  '#CBD5E1': '--color-border-strong or --color-text-disabled',
  '#94A3B8': '--color-text-tertiary',
  '#64748B': '--color-text-tertiary (dark)',
  '#475569': '--color-text-secondary',
  '#334155': '--color-interactive-ghost-fg',
  '#1E293B': '--color-bg-elevated (dark)',
  '#0F172A': '--color-bg-surface (dark) or --color-text-primary',
  '#020617': '--color-bg-canvas (dark)',
  // Indigo
  '#EEF2FF': '--color-interactive-primary-subtle or --color-status-info-subtle',
  '#E0E7FF': '--color-interactive-primary-subtle',
  '#C7D2FE': '--color-interactive-primary (light)',
  '#A5B4FC': '--color-text-code (dark)',
  '#818CF8': '--color-link-default (dark)',
  '#6366F1': '--color-status-info or --color-border-focus',
  '#4F46E5': '--color-interactive-primary',
  '#4338CA': '--color-interactive-primary-hover',
  '#3730A3': '--color-interactive-primary-active',
  // Green
  '#F0FDF4': '--color-status-success-subtle',
  '#22C55E': '--color-status-success',
  '#16A34A': '--color-status-success (hover)',
  '#15803D': '--color-status-success-text',
  // Red
  '#FEF2F2': '--color-status-error-subtle',
  '#EF4444': '--color-status-error',
  '#DC2626': '--color-interactive-danger',
  '#B91C1C': '--color-interactive-danger-hover',
  // Amber
  '#FFFBEB': '--color-status-warning-subtle',
  '#F59E0B': '--color-status-warning',
  '#D97706': '--color-status-warning (hover)',
  '#B45309': '--color-status-warning-text',
  // Basic
  '#FFFFFF': '--color-bg-surface or --color-text-inverse',
  '#000000': '--color-text-primary (consider --color-text-primary instead)',
  // Short form
  '#FFF': '--color-bg-surface or --color-text-inverse',
  '#000': '--color-text-primary',
};

const SPACING_SUGGESTIONS = {
  '2px':   '--space-1 (4px) or border/outline (allowed raw)',
  '4px':   '--space-1',
  '6px':   '--radius-md (for border-radius) or consider --space-1/--space-2',
  '8px':   '--space-2',
  '10px':  '--space-2 or --space-3 (closest match)',
  '12px':  '--space-3',
  '14px':  '--space-3 or --space-4 (closest match)',
  '16px':  '--space-4',
  '20px':  '--space-5',
  '24px':  '--space-6',
  '32px':  '--space-8',
  '40px':  '--space-10',
  '48px':  '--space-12',
  '64px':  '--space-16',
  '80px':  '--space-20',
  '96px':  '--space-24',
  '128px': '--space-32',
  '256px': '--layout-sidebar-width',
  '1280px':'--layout-max-width',
  '768px': '--layout-content-width or --modal--lg max-width',
};

const FONT_SIZE_SUGGESTIONS = {
  '10px': '--font-size-xs (12px closest)',
  '11px': '--font-size-xs (12px closest)',
  '12px': '--font-size-xs',
  '13px': '--font-size-xs or --font-size-sm',
  '14px': '--font-size-sm',
  '15px': '--font-size-sm or --font-size-base',
  '16px': '--font-size-base',
  '18px': '--font-size-lg',
  '20px': '--font-size-xl',
  '24px': '--font-size-2xl',
  '30px': '--font-size-3xl',
  '36px': '--font-size-4xl',
  '48px': '--font-size-5xl',
  '60px': '--font-size-6xl',
};

const FONT_WEIGHT_SUGGESTIONS = {
  '100': '(no token — avoid ultra-thin weights)',
  '200': '(no token — avoid)',
  '300': '(no token — avoid light weights)',
  '400': '--font-weight-normal',
  '500': '--font-weight-medium',
  '600': '--font-weight-semibold',
  '700': '--font-weight-bold',
  '800': '--font-weight-bold (extrabold not in aliases)',
  '900': '--font-weight-bold (black not in aliases)',
};

const RADIUS_SUGGESTIONS = {
  '2px':    '--radius-sm',
  '4px':    '--radius-base',
  '6px':    '--radius-md (or --radius-button / --radius-input)',
  '8px':    '--radius-lg (or --radius-code)',
  '10px':   '--radius-lg or --radius-xl',
  '12px':   '--radius-xl (or --radius-card)',
  '16px':   '--radius-2xl (or --radius-modal)',
  '24px':   '--radius-3xl',
  '9999px': '--radius-full (or --radius-badge / --radius-avatar)',
  '50%':    '--radius-full',
  '100%':   '--radius-full',
};

const Z_INDEX_SUGGESTIONS = {
  '1':    '--z-raised (10)',
  '10':   '--z-raised',
  '100':  '--z-dropdown',
  '200':  '--z-sticky',
  '300':  '--z-overlay',
  '400':  '--z-modal',
  '500':  '--z-popover',
  '600':  '--z-toast',
  '700':  '--z-tooltip',
  '999':  '--z-tooltip (700) or check layer intent',
  '1000': '--z-tooltip (700) or check layer intent',
  '9999': '--z-tooltip (700)',
};

const DURATION_SUGGESTIONS = {
  '0ms':   '--duration-instant',
  '100ms': '--duration-fast',
  '150ms': '--duration-normal',
  '200ms': '--duration-normal (closest)',
  '250ms': '--duration-normal or --duration-slow',
  '300ms': '--duration-slow',
  '400ms': '--duration-slow or --duration-slower',
  '500ms': '--duration-slower',
  '700ms': '--duration-slower (slowest primitive)',
  '0.1s':  '--duration-fast',
  '0.15s': '--duration-normal',
  '0.2s':  '--duration-normal',
  '0.3s':  '--duration-slow',
  '0.5s':  '--duration-slower',
};

// ─── Violation patterns ───────────────────────────────────────────────────────

const RULES = [
  // ERRORS — these must use tokens
  {
    level:   'error',
    name:    'hardcoded-color-hex',
    label:   'Hardcoded hex color',
    pattern: /#([0-9a-fA-F]{3,8})\b(?![^(]*\))/g,
    suggest: (match) => {
      const upper = match.toUpperCase();
      return COLOR_SUGGESTIONS[upper] || COLOR_SUGGESTIONS[match] || 'a --color-* alias from tokens.css';
    },
    skip: (line) => {
      // Allow inside var() declarations and in tokens.css color definitions
      return line.trim().startsWith('--primitive-') || line.trim().startsWith('--color-')
          || line.trim().startsWith('--elevation-') || line.trim().startsWith('--primitive-shadow');
    },
  },
  {
    level:   'error',
    name:    'hardcoded-color-rgb',
    label:   'Hardcoded rgb/rgba color',
    pattern: /\brgba?\s*\([^)]+\)/g,
    suggest: () => 'a --color-* alias from tokens.css',
    skip: (line) => {
      return line.trim().startsWith('--primitive-') || line.trim().startsWith('--color-')
          || line.trim().startsWith('--elevation-') || line.trim().startsWith('--primitive-shadow')
          || line.includes('color-mix(');
    },
  },
  {
    level:   'error',
    name:    'hardcoded-spacing',
    label:   'Hardcoded spacing value',
    // Match pixel values in spacing-related property positions
    pattern: /(?:^|\s)(?:padding|margin|gap|top|right|bottom|left|width|height|max-width|min-width|max-height|min-height|flex-basis|grid-template-columns|grid-gap|column-gap|row-gap)\s*:\s*[^;{]+?(\b\d+px\b)/g,
    suggest: (match) => SPACING_SUGGESTIONS[match] || `--space-* token matching ${match}`,
    extractMatch: (fullMatch) => {
      const m = fullMatch.match(/(\b\d+px\b)/);
      return m ? m[1] : fullMatch;
    },
    skip: (line) => {
      // Allow 0px, 1px (borders), 2px (focus rings)
      const px = line.match(/\b(\d+)px\b/g);
      if (!px) return true;
      return px.every(p => ['0px', '1px', '2px'].includes(p));
    },
  },
  {
    level:   'error',
    name:    'hardcoded-font-size',
    label:   'Hardcoded font-size',
    pattern: /font-size\s*:\s*(\d+(?:\.\d+)?(?:px|rem|em))/g,
    suggest: (match) => {
      const px = match.includes('rem')
        ? Math.round(parseFloat(match) * 16) + 'px'
        : match;
      return FONT_SIZE_SUGGESTIONS[px] || '--font-size-* alias from tokens.css';
    },
    extractMatch: (fullMatch) => {
      const m = fullMatch.match(/(\d+(?:\.\d+)?(?:px|rem|em))/);
      return m ? m[1] : fullMatch;
    },
    skip: (line) => line.trim().startsWith('--'),
  },
  {
    level:   'error',
    name:    'hardcoded-font-weight',
    label:   'Hardcoded font-weight',
    pattern: /font-weight\s*:\s*(\d{3})/g,
    suggest: (match) => FONT_WEIGHT_SUGGESTIONS[match] || '--font-weight-* alias',
    extractMatch: (fullMatch) => {
      const m = fullMatch.match(/(\d{3})/);
      return m ? m[1] : fullMatch;
    },
    skip: (line) => line.trim().startsWith('--'),
  },
  {
    level:   'error',
    name:    'hardcoded-border-radius',
    label:   'Hardcoded border-radius',
    pattern: /border-radius\s*:\s*([^;{var][^;{]*?)(?=;|{)/g,
    suggest: (rawVal) => {
      const val = rawVal.trim();
      return RADIUS_SUGGESTIONS[val] || '--radius-* alias from tokens.css';
    },
    extractMatch: (fullMatch) => {
      const m = fullMatch.match(/border-radius\s*:\s*(.+)/);
      return m ? m[1].trim() : fullMatch;
    },
    skip: (line) => {
      const val = line.match(/border-radius\s*:\s*(.+)/);
      if (!val) return true;
      const v = val[1].trim().replace(/;$/, '');
      if (v.startsWith('var(') || v === '0' || v === 'inherit' || v === 'none') return true;
      if (line.trim().startsWith('--')) return true;
      // Allow multi-value radius that only uses var() and 0 (e.g. "0 0 var(--x) var(--x)")
      const parts = v.split(/\s+/);
      if (parts.every(p => p === '0' || p.startsWith('var('))) return true;
      return false;
    },
  },
  {
    level:   'error',
    name:    'hardcoded-z-index',
    label:   'Hardcoded z-index',
    pattern: /z-index\s*:\s*(\d+)/g,
    suggest: (match) => Z_INDEX_SUGGESTIONS[match] || '--z-* alias from tokens.css',
    extractMatch: (fullMatch) => {
      const m = fullMatch.match(/(\d+)/);
      return m ? m[1] : fullMatch;
    },
    skip: (line) => line.trim().startsWith('--'),
  },
  {
    level:   'error',
    name:    'hardcoded-box-shadow',
    label:   'Hardcoded box-shadow value',
    pattern: /box-shadow\s*:\s*(?!var\()(?!none)(?!0\s+0\s+#0000)([^;{]+)/g,
    suggest: () => '--elevation-* alias from tokens.css',
    extractMatch: (fullMatch) => {
      const m = fullMatch.match(/box-shadow\s*:\s*(.+)/);
      return m ? m[1].trim() : fullMatch;
    },
    skip: (line) => {
      const v = line.match(/box-shadow\s*:\s*(.+)/);
      if (!v) return true;
      const val = v[1].trim();
      return val.startsWith('var(') || val === 'none' || val === 'inherit'
          || line.trim().startsWith('--');
    },
  },

  // WARNINGS — should use tokens but won't block CI
  {
    level:   'warning',
    name:    'hardcoded-duration',
    label:   'Hardcoded transition/animation duration',
    pattern: /(?:transition|animation)[^;{]*?(\b\d+m?s\b)/g,
    suggest: (match) => DURATION_SUGGESTIONS[match] || '--duration-* alias from tokens.css',
    extractMatch: (fullMatch) => {
      const m = fullMatch.match(/(\b\d+m?s\b)/);
      return m ? m[1] : fullMatch;
    },
    skip: (line) => line.trim().startsWith('--'),
  },
  {
    level:   'warning',
    name:    'hardcoded-easing',
    label:   'Hardcoded easing / cubic-bezier',
    pattern: /cubic-bezier\s*\([^)]+\)/g,
    suggest: () => '--ease-* alias from tokens.css',
    skip: (line) => line.trim().startsWith('--'),
  },
];

// ─── Utility: collect CSS files ───────────────────────────────────────────────

function collectCssFiles(targets) {
  const files = [];
  for (const target of targets) {
    if (!fs.existsSync(target)) continue;
    const stat = fs.statSync(target);
    if (stat.isFile() && target.endsWith('.css')) {
      files.push(target);
    } else if (stat.isDirectory()) {
      walk(target, files);
    }
  }
  return files;
}

function walk(dir, out) {
  for (const entry of fs.readdirSync(dir)) {
    const full = path.join(dir, entry);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      walk(full, out);
    } else if (entry.endsWith('.css')) {
      out.push(full);
    }
  }
}

// ─── Strip block and line comments from CSS ───────────────────────────────────

function stripComments(src) {
  return src
    .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, ' '))
    .replace(/\/\/[^\n]*/g, (m) => ' '.repeat(m.length));
}

// ─── Audit a single file ──────────────────────────────────────────────────────

function auditFile(filePath) {
  const src  = fs.readFileSync(filePath, 'utf8');
  const clean = stripComments(src);
  const lines = clean.split('\n');
  const findings = [];

  for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
    const line    = lines[lineIdx];
    const lineNum = lineIdx + 1;

    for (const rule of RULES) {
      if (rule.skip && rule.skip(line)) continue;

      rule.pattern.lastIndex = 0;
      let match;
      while ((match = rule.pattern.exec(line)) !== null) {
        const rawValue = rule.extractMatch
          ? rule.extractMatch(match[0])
          : (match[1] || match[0]);
        const suggestion = rule.suggest(rawValue);

        findings.push({
          level:      rule.level,
          name:       rule.name,
          label:      rule.label,
          line:       lineNum,
          col:        match.index + 1,
          value:      rawValue.trim(),
          suggestion,
          lineText:   lines[lineIdx].trim(),
        });
      }
    }
  }

  return findings;
}

// ─── Format output ────────────────────────────────────────────────────────────

const RESET  = '\x1b[0m';
const RED    = '\x1b[31m';
const YELLOW = '\x1b[33m';
const CYAN   = '\x1b[36m';
const GREEN  = '\x1b[32m';
const BOLD   = '\x1b[1m';
const DIM    = '\x1b[2m';

function levelColor(level) {
  return level === 'error' ? RED : YELLOW;
}

function printFinding(f, relPath) {
  const col  = levelColor(f.level);
  const icon = f.level === 'error' ? '✖' : '⚠';
  console.log(
    `  ${col}${icon}${RESET} ${CYAN}${relPath}:${f.line}:${f.col}${RESET} — ${BOLD}${f.value}${RESET}`
  );
  console.log(
    `    ${DIM}${f.label}${RESET}`
  );
  console.log(
    `    ${GREEN}→ Use:${RESET} ${f.suggestion}`
  );
  console.log(
    `    ${DIM}${f.lineText.substring(0, 100)}${RESET}`
  );
  console.log('');
}

// ─── Main ─────────────────────────────────────────────────────────────────────

function main() {
  const files = collectCssFiles(scanDirs);

  if (files.length === 0) {
    console.log(`${YELLOW}No CSS files found to audit.${RESET}`);
    process.exit(0);
  }

  if (!quiet) {
    console.log(`${BOLD}devl.dev token audit${RESET} — scanning ${files.length} file(s)\n`);
  }

  let totalErrors   = 0;
  let totalWarnings = 0;
  const fileResults = [];

  for (const filePath of files) {
    // Skip tokens.css itself — it defines raw values by design
    if (path.basename(filePath) === 'tokens.css') continue;

    const findings = auditFile(filePath);
    const errors   = findings.filter(f => f.level === 'error');
    const warnings = findings.filter(f => f.level === 'warning');
    totalErrors   += errors.length;
    totalWarnings += warnings.length;

    if (findings.length > 0) {
      fileResults.push({ filePath, findings, errors, warnings });
    }
  }

  if (!quiet) {
    // Sort: most violations first
    fileResults.sort((a, b) => b.findings.length - a.findings.length);

    for (const { filePath, findings } of fileResults) {
      const relPath = path.relative(rootDir, filePath);
      const errCount  = findings.filter(f => f.level === 'error').length;
      const warnCount = findings.filter(f => f.level === 'warning').length;
      const label = [
        errCount  ? `${RED}${errCount} error(s)${RESET}` : '',
        warnCount ? `${YELLOW}${warnCount} warning(s)${RESET}` : '',
      ].filter(Boolean).join(', ');

      console.log(`${BOLD}${relPath}${RESET} — ${label}`);
      console.log('');
      for (const f of findings) printFinding(f, relPath);
    }
  }

  // ─── Summary ────────────────────────────────────────────────────────────────
  const exitCode = (totalErrors > 0 || (strict && totalWarnings > 0)) ? 1 : 0;

  if (exitCode === 0 && totalErrors === 0 && totalWarnings === 0) {
    console.log(`${GREEN}${BOLD}✔ Zero violations — token compliance confirmed.${RESET}`);
  } else {
    console.log(
      `${BOLD}Summary:${RESET} ${RED}${totalErrors} error(s)${RESET}, ` +
      `${YELLOW}${totalWarnings} warning(s)${RESET} across ${fileResults.length} file(s).`
    );
    if (!strict && totalWarnings > 0) {
      console.log(`${DIM}Run with --strict to treat warnings as errors.${RESET}`);
    }
  }

  process.exit(exitCode);
}

main();
