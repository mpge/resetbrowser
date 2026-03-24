(function () {
  'use strict';

  // --- Browser Detection ---
  function detectBrowser() {
    const ua = navigator.userAgent;
    if (ua.includes('Edg/')) return 'edge';
    if (ua.includes('Chrome') && !ua.includes('Edg')) return 'chrome';
    if (ua.includes('Firefox')) return 'firefox';
    if (ua.includes('Safari') && !ua.includes('Chrome')) return 'safari';
    return 'other';
  }

  // --- URL Personalization ---
  function getAppName() {
    const params = new URLSearchParams(window.location.search);
    return params.get('app');
  }

  // --- Browser Instructions ---
  const instructions = {
    chrome: {
      name: 'Chrome',
      shortcut: { win: 'Ctrl + Shift + Delete', mac: 'Cmd + Shift + Delete' },
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
      shortcut: null,
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
      shortcut: { win: 'Ctrl + Shift + Delete', mac: 'Cmd + Shift + Delete' },
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
      shortcut: { win: 'Ctrl + Shift + Delete', mac: 'Cmd + Shift + Delete' },
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
      shortcut: null,
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

  // --- Render ---
  function render() {
    const detected = detectBrowser();
    const appName = getAppName();
    const info = instructions[detected];

    // App badge
    const appBadge = appName
      ? `<div class="app-badge">Fixing issues for: ${escapeHtml(appName)}</div>`
      : '';

    // Browser tabs
    const tabs = Object.entries(instructions)
      .filter(([k]) => k !== 'other')
      .map(([key, val]) =>
        `<button class="browser-tab ${key === detected ? 'active' : ''}" data-browser="${key}">${val.name}</button>`
      ).join('');

    // Instructions
    const stepsHtml = info.steps.map(s => `<li>${s}</li>`).join('');

    document.getElementById('app').innerHTML = `
      <header>
        <div class="container">
          <a href="/" class="logo">Reset<span>Browser</span></a>
          <a href="https://github.com/mpge/resetbrowser" class="github" target="_blank" rel="noopener">GitHub</a>
        </div>
      </header>

      <main class="container">
        <section class="hero">
          <h1>Fix login or loading issues<br>in 30 seconds</h1>
          <p>Clear cookies & cache for your browser — step-by-step</p>
          ${appBadge}
        </section>

        <div class="browser-tabs">${tabs}</div>

        <div id="instructions">
          <div class="card">
            <h2>Clear ${info.name} Data</h2>
            <p class="subtitle">Follow these steps to fix login, loading, or display issues</p>
            <ol class="steps">${stepsHtml}</ol>
          </div>
        </div>

        <div class="card">
          <h2>Quick Reset</h2>
          <p class="subtitle">Clear local data for this site instantly</p>
          <div class="btn-group">
            <button class="btn btn-blue" id="quickReset">
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
              Clear Local Data
            </button>
          </div>
        </div>

        <div class="card">
          <h2>Console Script</h2>
          <p class="subtitle">Copy and paste into your browser's DevTools console for a deep clean</p>
          <p style="font-size:13px;color:var(--gray-500);margin-bottom:8px;">Open DevTools: <span class="shortcut">F12</span> or <span class="shortcut">Ctrl+Shift+I</span> &rarr; Console tab &rarr; Paste &rarr; Enter</p>
          <div class="code-block">
            <button class="copy-btn" id="copyScript">Copy</button>
            <pre id="scriptCode">${escapeHtml(resetScript)}</pre>
          </div>
        </div>
      </main>

      <footer>
        <p>Open source &middot; <a href="https://github.com/mpge/resetbrowser">GitHub</a> &middot; No tracking &middot; No data collected</p>
      </footer>

      <div class="toast" id="toast"></div>
    `;

    bindEvents(detected);
  }

  function bindEvents(currentBrowser) {
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
            <h2>Clear ${info.name} Data</h2>
            <p class="subtitle">Follow these steps to fix login, loading, or display issues</p>
            <ol class="steps">${stepsHtml}</ol>
          </div>
        `;
      });
    });

    // Quick Reset
    document.getElementById('quickReset').addEventListener('click', () => {
      // Clear cookies for current domain
      document.cookie.split(';').forEach(c => {
        document.cookie = c.trim().split('=')[0] + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
      });
      localStorage.clear();
      sessionStorage.clear();
      if ('caches' in window) {
        caches.keys().then(names => names.forEach(n => caches.delete(n)));
      }
      showToast('Local data cleared. Please refresh the page.');
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
