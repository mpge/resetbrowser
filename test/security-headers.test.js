const assert = require('node:assert/strict');
const http = require('node:http');
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
});

test('only sends hsts for secure proxy requests', async () => {
  const plain = await request('/');
  assert.equal(plain.headers['strict-transport-security'], undefined);

  const secure = await request('/', { 'x-forwarded-proto': 'https' });
  assert.equal(secure.headers['strict-transport-security'], 'max-age=31536000; includeSubDomains');
});
