const assert = require('node:assert/strict');
const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');
const { test } = require('node:test');

const app = require('../server');

function request(path, headers = {}) {
  return new Promise((resolve, reject) => {
    const server = http.createServer(app);

    server.listen(0, '127.0.0.1', () => {
      const { port } = server.address();
      const req = http.get({ host: '127.0.0.1', port, path, headers }, (res) => {
        res.resume();
        res.on('end', () => {
          server.close(() => resolve(res));
        });
      });

      req.on('error', (error) => {
        server.close(() => reject(error));
      });
    });
  });
}

test('serves baseline browser security headers', async () => {
  const res = await request('/');

  assert.equal(res.statusCode, 200);
  assert.equal(res.headers['x-powered-by'], undefined);
  assert.equal(res.headers['x-content-type-options'], 'nosniff');
  assert.equal(res.headers['x-frame-options'], 'SAMEORIGIN');
  assert.equal(res.headers['referrer-policy'], 'strict-origin-when-cross-origin');
  assert.equal(res.headers['permissions-policy'], 'camera=(), geolocation=(), microphone=()');
  assert.equal(res.headers['x-permitted-cross-domain-policies'], 'none');
  assert.equal(res.headers['cross-origin-opener-policy'], 'same-origin');
  assert.equal(res.headers['cross-origin-resource-policy'], 'same-origin');
  assert.match(res.headers['content-security-policy'], /default-src 'self'/);
  assert.match(res.headers['content-security-policy'], /script-src 'self'/);
  assert.match(res.headers['content-security-policy'], /object-src 'none'/);
  assert.match(res.headers['content-security-policy'], /style-src 'self' 'unsafe-inline'/);
  assert.match(res.headers['content-security-policy'], /font-src 'self'/);
  assert.doesNotMatch(res.headers['content-security-policy'], /fonts\.(?:googleapis|gstatic)\.com/);
});

test('only sends hsts for secure proxy requests', async () => {
  const plain = await request('/');
  assert.equal(plain.headers['strict-transport-security'], undefined);

  const secure = await request('/', { 'x-forwarded-proto': 'https' });
  assert.equal(secure.headers['strict-transport-security'], 'max-age=31536000; includeSubDomains');
});

test('does not serve the app shell for missing static assets', async () => {
  const res = await request('/missing-app.js');

  assert.equal(res.statusCode, 404);
  assert.match(res.headers['content-type'], /^text\/plain/);
});

test('does not serve the app shell for missing brand configs', async () => {
  const res = await request('/brands/missing.json');

  assert.equal(res.statusCode, 404);
  assert.match(res.headers['content-type'], /^text\/plain/);
});

test('keeps extensionless routes on the app shell fallback', async () => {
  const res = await request('/stallion');

  assert.equal(res.statusCode, 200);
  assert.match(res.headers['content-type'], /^text\/html/);
});

test('does not load third-party font hosts from the app shell', () => {
  const html = fs.readFileSync(path.join(__dirname, '..', 'public', 'index.html'), 'utf8');

  assert.doesNotMatch(html, /fonts\.googleapis\.com/);
  assert.doesNotMatch(html, /fonts\.gstatic\.com/);
});

test('sanitizes brand-provided urls before rendering them into html', () => {
  const js = fs.readFileSync(path.join(__dirname, '..', 'public', 'app.js'), 'utf8');

  assert.match(js, /function safeExternalUrl/);
  assert.match(js, /function safeImageUrl/);
  assert.match(js, /const brandUrl = brand\?\.url \? safeExternalUrl\(brand\.url\) : null;/);
  assert.match(js, /const logoUrl = brand\.logo \? safeImageUrl\(brand\.logo\) : null;/);
  assert.doesNotMatch(js, /href="\$\{escapeHtml\(brand\.url\)\}"/);
  assert.doesNotMatch(js, /src="\$\{escapeHtml\(brand\.logo\)\}"/);
});
