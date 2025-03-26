module.exports = {
  siteUrl: "https://asadqureshi.tech",
  generateRobotsTxt: true, // Automatically generate robots.txt
  sitemapSize: 5000, // Avoid multiple sitemap files
  exclude: ["/panel", "/login"], // Exclude private pages
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/panel", "/login"], // Block these in robots.txt
      },
    ],
  },
};
