/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://mahalaxmithearena.in',
  generateRobotsTxt: true,
  // optional: exclude paths you don't want indexed
  // exclude: ['/admin/*'],
};
