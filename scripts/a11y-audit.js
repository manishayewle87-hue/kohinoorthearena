// a11y-audit.js
// Run after build to check accessibility using axe-core
/* eslint-disable @typescript-eslint/no-require-imports */
const { execSync } = require('child_process');
const { AxeBuilder } = require('@axe-core/webdriverjs');
const webdriver = require('selenium-webdriver');
const webdriver = require('selenium-webdriver');

(async () => {
  console.log('Building production...');
  execSync('npm run build', { stdio: 'inherit' });
  console.log('Starting server...');
  // Starting server in background (placeholder)
  execSync('npm run start', { stdio: 'ignore' });
  const driver = new webdriver.Builder().forBrowser('chrome').build();
  await driver.get('http://localhost:3000');
  const results = await new AxeBuilder(driver).analyze();
  console.log('Accessibility violations:', JSON.stringify(results.violations, null, 2));
  await driver.quit();
})();
