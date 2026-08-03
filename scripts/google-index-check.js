// scripts/google-index-check.js
// Placeholder script for Google Search Console URL Inspection API.
// If you provide a GSC_API_TOKEN env variable, this script can query the API.
// For now it just reports presence of robots.txt and noindex meta tags.

// eslint-disable-next-line @typescript-eslint/no-require-imports
const fs = require('fs');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const path = require('path');

function checkRobots() {
  const robotsPath = path.join(process.cwd(), 'public', 'robots.txt');
  if (fs.existsSync(robotsPath)) {
    const content = fs.readFileSync(robotsPath, 'utf8');
    console.log('Robots.txt found. Contents:');
    console.log(content);
  } else {
    console.warn('Robots.txt not found.');
  }
}

function checkNoindexMeta() {
  // Simple scan of built HTML files for <meta name="robots" content="noindex">
  const buildDir = path.join(process.cwd(), '.next', 'server', 'pages');
  if (!fs.existsSync(buildDir)) {
    console.warn('.next build not found. Run `npm run build` first.');
    return;
  }
  const files = fs.readdirSync(buildDir).filter(f => f.endsWith('.html'));
  files.forEach(f => {
    const filePath = path.join(buildDir, f);
    const content = fs.readFileSync(filePath, 'utf8');
    if (/meta[^>]*name=["']robots["'][^>]*content=["']noindex["']/i.test(content)) {
      console.log(`Noindex meta found in ${f}`);
    }
  });
}

function main() {
  console.log('--- Google Index Check ---');
  checkRobots();
  checkNoindexMeta();
  // If you have a token, you could add API calls here.
}

main();
