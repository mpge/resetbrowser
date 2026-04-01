(function () {
  'use strict';

  // --- SVG Icons ---
  const icons = {
    chrome: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><line x1="21.17" y1="8" x2="12" y2="8"/><line x1="3.95" y1="6.06" x2="8.54" y2="14"/><line x1="10.88" y1="21.94" x2="15.46" y2="14"/></svg>',
    safari: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="16.24" y1="7.76" x2="14.12" y2="14.12"/><line x1="9.88" y1="9.88" x2="7.76" y2="16.24"/><line x1="14.12" y1="9.88" x2="9.88" y2="14.12"/></svg>',
    firefox: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10"/><path d="M17 8c-1-2-3.5-3-5.5-2.5"/></svg>',
    edge: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a10 10 0 0 1 7.07 17.07"/><path d="M8 12h8"/></svg>',
    github: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>',
    refresh: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>',
    list: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>',
    terminal: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>',
    cookie: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"/><path d="M8.5 8.5v.01"/><path d="M16 15.5v.01"/><path d="M12 12v.01"/><path d="M11 17v.01"/><path d="M7 14v.01"/></svg>',
    database: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>',
    hardDrive: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="12" x2="2" y2="12"/><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/><line x1="6" y1="16" x2="6.01" y2="16"/><line x1="10" y1="16" x2="10.01" y2="16"/></svg>',
    shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
    zap: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
    info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>',
  };

  // --- Browser Detection ---
  function detectBrowser() {
    const ua = navigator.userAgent;
    if (ua.includes('Edg/')) return 'edge';
    if (ua.includes('Chrome') && !ua.includes('Edg')) return 'chrome';
    if (ua.includes('Firefox')) return 'firefox';
    if (ua.includes('Safari') && !ua.includes('Chrome')) return 'safari';
    return 'other';
  }

  // --- Brand slug from URL path ---
  function getBrandSlug() {
    const path = window.location.pathname.replace(/^\/+|\/+$/g, '').toLowerCase();
    if (!path || path === 'index.html') return null;
    return path;
  }

  // --- Load brand config ---
  async function loadBrand(slug) {
    try {
      const res = await fetch(`/brands/${slug}.json`);
      if (!res.ok) return null;
      return await res.json();
    } catch {
      return null;
    }
  }

  // --- Apply brand theme to CSS vars ---
  function applyBrandTheme(brand) {
    if (!brand || !brand.color) return;
    const root = document.documentElement.style;
    root.setProperty('--accent', brand.color);

    // Derive hover (darken 10%)
    const hex = brand.color.replace('#', '');
    const r = Math.max(0, parseInt(hex.slice(0, 2), 16) - 25);
    const g = Math.max(0, parseInt(hex.slice(2, 4), 16) - 25);
    const b = Math.max(0, parseInt(hex.slice(4, 6), 16) - 25);
    root.setProperty('--accent-hover', `rgb(${r},${g},${b})`);

    // Derive light bg
    const rr = parseInt(hex.slice(0, 2), 16);
    const gg = parseInt(hex.slice(2, 4), 16);
    const bb = parseInt(hex.slice(4, 6), 16);
    root.setProperty('--accent-light', `rgba(${rr},${gg},${bb},0.07)`);
    root.setProperty('--accent-border', `rgba(${rr},${gg},${bb},0.2)`);
  }

  // --- Browser Instructions ---
  const instructions = {
    chrome: {
      name: 'Chrome',
      steps: [
        'Open Chrome and press <span class="shortcut">Ctrl+Shift+Delete</span> (Windows) or <span class="shortcut">Cmd+Shift+Delete</span> (Mac)',
        'Set time range to <strong>"All time"</strong>',
        'Check <strong>"Cookies and other site data"</strong>',
        'Check <strong>"Cached images and files"</strong>',
        'Click <strong>"Clear data"</strong>',
        'Close and reopen Chrome, then try logging in again',
      ],
    },
    safari: {
      name: 'Safari',
      steps: [
        'Open Safari and click <strong>Safari</strong> in the menu bar',
        'Select <strong>"Settings..."</strong> (or <strong>"Preferences..."</strong>)',
        'Go to the <strong>"Privacy"</strong> tab',
        'Click <strong>"Manage Website Data..."</strong>',
        'Click <strong>"Remove All"</strong> and confirm',
        'Close and reopen Safari, then try logging in again',
      ],
    },
    firefox: {
      name: 'Firefox',
      steps: [
        'Open Firefox and press <span class="shortcut">Ctrl+Shift+Delete</span> (Windows) or <span class="shortcut">Cmd+Shift+Delete</span> (Mac)',
        'Set time range to <strong>"Everything"</strong>',
        'Check <strong>"Cookies"</strong> and <strong>"Cache"</strong>',
        'Click <strong>"Clear Now"</strong>',
        'Close and reopen Firefox, then try logging in again',
      ],
    },
    edge: {
      name: 'Edge',
      steps: [
        'Open Edge and press <span class="shortcut">Ctrl+Shift+Delete</span> (Windows) or <span class="shortcut">Cmd+Shift+Delete</span> (Mac)',
        'Set time range to <strong>"All time"</strong>',
        'Check <strong>"Cookies and other site data"</strong>',
        'Check <strong>"Cached images and files"</strong>',
        'Click <strong>"Clear now"</strong>',
        'Close and reopen Edge, then try logging in again',
      ],
    },
    other: {
      name: 'Your Browser',
      steps: [
        'Open your browser\'s <strong>Settings</strong> or <strong>Preferences</strong>',
        'Find the <strong>Privacy</strong> or <strong>Security</strong> section',
        'Look for <strong>"Clear browsing data"</strong> or <strong>"Clear cookies and cache"</strong>',
        'Select <strong>"All time"</strong> as the time range',
        'Clear <strong>cookies</strong> and <strong>cached files</strong>',
        'Restart your browser and try again',
      ],
    },
  };

  // --- Console Reset Script ---
  const resetScript = `// Clear all cookies
document.cookie.split(';').forEach(c => {
  document.cookie = c.trim().split('=')[0] +
    '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
});

// Clear storage
localStorage.clear();
sessionStorage.clear();

// Clear caches (if available)
if ('caches' in window) {
  caches.keys().then(names => names.forEach(n => caches.delete(n)));
}

console.log('All cookies, storage, and caches cleared.');
alert('Browser data cleared! Please refresh the page.');`;

  // --- Syntax Highlighting ---
  function highlightCode(code) {
    return escapeHtml(code)
      .replace(/(\/\/[^\n]*)/g, '<span class="token-comment">$1</span>')
      .replace(/('(?:[^'\\]|\\.)*')/g, '<span class="token-string">$1</span>')
      .replace(/\b(const|let|var|if|in|function|return|forEach|then)\b/g, '<span class="token-keyword">$1</span>')
      .replace(/\b(document|window|localStorage|sessionStorage|console|caches)\b/g, '<span class="token-property">$1</span>')
      .replace(/\.(cookie|split|trim|keys|forEach|delete|clear|log)\b/g, '.<span class="token-method">$1</span>');
  }

  // --- Render ---
  async function render() {
    const detected = detectBrowser();
    const brandSlug = getBrandSlug();
    const brand = brandSlug ? await loadBrand(brandSlug) : null;

    if (brand) {
      applyBrandTheme(brand);
      if (brand.name) {
        document.title = `Reset Browser for ${brand.name}`;
      }
    }

    const info = instructions[detected];

    // Header — branded or default
    let headerContent;
    if (brand) {
      const logoImg = brand.logo
        ? `<img class="brand-logo" src="${escapeHtml(brand.logo)}" alt="${escapeHtml(brand.name)} logo">`
        : '';
      headerContent = `
        <div class="brand-header">
          ${logoImg}
          <span class="brand-name">${escapeHtml(brand.name)}</span>
          <span class="brand-separator"></span>
          <span class="brand-powered">Powered by <a href="/">ResetBrowser</a></span>
        </div>
      `;
    } else {
      headerContent = `<a href="/" class="logo">${icons.refresh}Reset<span>Browser</span></a>`;
    }

    // Brand callout or default subtitle
    const heroTitle = brand && brand.name
      ? `Having trouble with <span class="accent">${escapeHtml(brand.name)}</span>?`
      : 'Fix login or loading issues<br><span class="accent">in 30 seconds</span>';

    const heroDesc = brand && brand.message
      ? escapeHtml(brand.message)
      : 'Clear cookies & cache for your browser with step-by-step guidance. Free, open source, no tracking.';

    // Browser tabs
    const tabs = Object.entries(instructions)
      .filter(([k]) => k !== 'other')
      .map(([key, val]) => {
        const isDetected = key === detected;
        const badge = isDetected ? '<span class="detected-badge">You</span>' : '';
        return `<button class="browser-tab ${isDetected ? 'active' : ''}" data-browser="${key}">${icons[key]}${val.name}${badge}</button>`;
      }).join('');

    // Instructions
    const stepsHtml = info.steps.map(s => `<li>${s}</li>`).join('');

    // Website link for branded pages
    const brandLink = brand && brand.url
      ? `<div class="brand-callout animate-in animate-delay-5">
          ${icons.info}
          <p>Once you've cleared your browser data, head back to <a href="${escapeHtml(brand.url)}" style="color:var(--accent);font-weight:600;text-decoration:underline;">${escapeHtml(brand.url)}</a> and try again.</p>
        </div>`
      : '';

    // Integration tip (default page only)
    const integrationTip = !brand
      ? `<div class="integration-tip animate-in animate-delay-5">
          ${icons.zap}
          <div class="tip-content">
            <div class="tip-title">Get your own branded page</div>
            <div class="tip-text">Submit a PR adding your brand config to <code>/brands/</code> and get a page like <code>resetbrowser.com/yourapp</code>. <a href="https://github.com/mpge/resetbrowser/issues" style="color:var(--accent);text-decoration:underline;">Open an issue</a> or see the README for details.</div>
          </div>
        </div>`
      : '';

    document.getElementById('app').innerHTML = `
      <header>
        <div class="container">
          ${headerContent}
          <a href="https://github.com/mpge/resetbrowser" class="github" target="_blank" rel="noopener">${icons.github}GitHub</a>
        </div>
      </header>

      <main class="container">
        <section class="hero animate-in">
          <h1>${heroTitle}</h1>
          <p>${heroDesc}</p>
        </section>

        <div class="feature-grid animate-in animate-delay-1">
          <div class="feature-item">
            <div class="feature-icon">${icons.cookie}</div>
            <span class="feature-label">Cookies</span>
            <span class="feature-desc">Session & auth tokens</span>
          </div>
          <div class="feature-item">
            <div class="feature-icon">${icons.hardDrive}</div>
            <span class="feature-label">Cache</span>
            <span class="feature-desc">Images & static files</span>
          </div>
          <div class="feature-item">
            <div class="feature-icon">${icons.database}</div>
            <span class="feature-label">Storage</span>
            <span class="feature-desc">Local & session data</span>
          </div>
          <div class="feature-item">
            <div class="feature-icon">${icons.shield}</div>
            <span class="feature-label">Workers</span>
            <span class="feature-desc">Service worker caches</span>
          </div>
        </div>

        <div class="browser-tabs animate-in animate-delay-2">${tabs}</div>

        <div id="instructions" class="animate-in animate-delay-3">
          <div class="card">
            <div class="card-header">${icons.list}<h2>Clear ${info.name} Data</h2></div>
            <p class="subtitle">Follow these steps to fix login, loading, or display issues</p>
            <ol class="steps">${stepsHtml}</ol>
          </div>
        </div>

        <div class="card animate-in animate-delay-4">
          <div class="card-header">${icons.terminal}<h2>Console Script</h2></div>
          <p class="subtitle">Copy and paste into your browser's DevTools console for a deep clean</p>
          <p style="font-size:13px;color:var(--text-2);margin-bottom:8px;">Open DevTools: <span class="shortcut">F12</span> or <span class="shortcut">Ctrl+Shift+I</span> &rarr; Console tab &rarr; Paste &rarr; Enter</p>
          <div class="code-block">
            <button class="copy-btn" id="copyScript">Copy</button>
            <pre id="scriptCode">${highlightCode(resetScript)}</pre>
          </div>
        </div>

        ${brandLink}
        ${integrationTip}
      </main>

      <footer class="animate-in animate-delay-5">
        <p>Open source &middot; <a href="https://github.com/mpge/resetbrowser">GitHub</a> &middot; No tracking &middot; No data collected</p>
      </footer>

      <div class="toast" id="toast"></div>
    `;

    bindEvents();
  }

  function bindEvents() {
    // Tab switching
    document.querySelectorAll('.browser-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        const browser = tab.dataset.browser;
        document.querySelectorAll('.browser-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const info = instructions[browser];
        const stepsHtml = info.steps.map(s => `<li>${s}</li>`).join('');
        document.getElementById('instructions').innerHTML = `
          <div class="card">
            <div class="card-header">${icons.list}<h2>Clear ${info.name} Data</h2></div>
            <p class="subtitle">Follow these steps to fix login, loading, or display issues</p>
            <ol class="steps">${stepsHtml}</ol>
          </div>
        `;
      });
    });

    // Copy script
    document.getElementById('copyScript').addEventListener('click', () => {
      navigator.clipboard.writeText(resetScript).then(() => {
        showToast('Script copied to clipboard!');
        document.getElementById('copyScript').textContent = 'Copied!';
        setTimeout(() => { document.getElementById('copyScript').textContent = 'Copy'; }, 2000);
      });
    });
  }

  function showToast(msg) {
    const toast = document.getElementById('toast');
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // Init
  document.addEventListener('DOMContentLoaded', render);
})();
