const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

// Brand routes — serve index.html for any valid brand slug
app.get('/:slug', (req, res) => {
  const slug = req.params.slug.toLowerCase().replace(/[^a-z0-9-]/g, '');
  const brandFile = path.join(__dirname, 'public', 'brands', `${slug}.json`);

  if (fs.existsSync(brandFile)) {
    return res.sendFile(path.join(__dirname, 'public', 'index.html'));
  }

  // Not a brand — fall back to index.html (SPA routing)
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`ResetBrowser running at http://localhost:${PORT}`);
});
