// 2. Dynamic XML Sitemap Route
app.get('/sitemap.xml', (req, res) => {
  // Enforce https on production/Vercel
  const protocol = req.headers['x-forwarded-proto'] || req.protocol;
  const baseUrl = `${protocol}://${req.get('host')}`;
  
  res.header('Content-Type', 'application/xml');
  res.send(`<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${baseUrl}/</loc>
        <priority>1.0</priority>
        <changefreq>weekly</changefreq>
      </url>
      <url>
        <loc>${baseUrl}/privacy-policy</loc>
        <priority>0.5</priority>
        <changefreq>monthly</changefreq>
      </url>
    </urlset>`);
});
