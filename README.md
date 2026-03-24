# ResetBrowser

Fix login or loading issues in 30 seconds. Clear cookies & cache for your browser — step-by-step.

## What it does

ResetBrowser is a simple, fast tool that helps users fix common browser issues by guiding them through clearing cookies, cache, and local storage. It detects the user's browser and shows tailored instructions.

**Features:**
- Auto-detects Chrome, Safari, Firefox, Edge
- Step-by-step clearing instructions per browser
- "Quick Reset" button clears local data instantly
- Copy-to-clipboard console script for deep cleaning
- URL personalization (`/?app=YourApp` shows branded experience)
- Zero tracking, no database, no build step
- Mobile-friendly, < 50KB total

## Quick Start

```bash
git clone https://github.com/mpge/resetbrowser.git
cd resetbrowser
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000)

## URL Personalization

Add `?app=` to customize the experience:

```
https://resetbrowser.com/?app=Stallion
```

Displays: "Fixing issues for: Stallion"

Useful for linking from your app's support pages.

## Deploy

**Vercel:**
```bash
npx vercel
```

**Railway:**
```bash
railway up
```

**Any Node.js host:**
```bash
npm install
PORT=8080 npm start
```

## Project Structure

```
resetbrowser/
  public/
    index.html    # Single page app
    styles.css    # Clean, minimal styles
    app.js        # Browser detection, instructions, quick reset
  server.js       # Express static server (~15 lines)
  package.json
  README.md
```

## Contributing

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/amazing`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing`)
5. Open a Pull Request

## License

MIT
