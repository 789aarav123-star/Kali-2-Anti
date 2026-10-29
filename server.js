require('dotenv').config();
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const restaurantData = require('./data/restaurantData');

const app = express();
const PORT = process.env.PORT || 3000;

// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Security & SEO Headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

// Serve static assets from 'public' directory
const isProd = process.env.NODE_ENV === 'production';
app.use(express.static(path.join(__dirname, 'public'), {
  maxAge: isProd ? '1d' : 0
}));

app.use(express.static(path.join(__dirname, 'public/images'), {
  maxAge: isProd ? '1d' : 0
}));

// ==========================================
// 🚀 SEO & SITEMAP ROUTES (PLACED AT THE TOP)
// ==========================================

// 1. Google Verification File Backup Route
app.get('/google6ce7fb0b091d1d88.html', (req, res) => {
  res.send('google-site-verification: google6ce7fb0b091d1d88.html');
});

// 2. Dynamic XML Sitemap Route (Forces HTTPS on Vercel)
app.get('/sitemap.xml', (req, res) => {
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

// ==========================================
// SEO Structured Data (Schema.org JSON-LD)
// Dynamic Host Matching for Vercel/Custom Domain
// ==========================================
const generateSchemaJsonLd = (baseUrl) => {
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": `${baseUrl}/#restaurant`,
    "name": restaurantData.name,
    "image": [
      `${baseUrl}/images/logo_kali.jpg`,
      `${baseUrl}/images/counter.jpg`,
      `${baseUrl}/images/chi_biryani-1.jpg`
    ],
    "description": restaurantData.description,
    "telephone": restaurantData.phoneRaw,
    "priceRange": restaurantData.priceRange,
    "servesCuisine": [
      "Nepali",
      "Mithila Special",
      "Tandoori",
      "Indian",
      "Chinese",
      "Continental",
      "Thai"
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "PWRG+3JF, Ring Rd",
      "addressLocality": "Janakpur",
      "addressRegion": "Madhesh Province",
      "postalCode": "45600",
      "addressCountry": "NP"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 26.7401841,
      "longitude": 85.926555
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ],
        "opens": "10:00",
        "closes": "20:00"
      }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": restaurantData.rating.toString(),
      "reviewCount": restaurantData.reviewCount.toString(),
      "bestRating": "5",
      "worstRating": "1"
    },
    "hasMap": restaurantData.googleMapsUrl,
    "sameAs": [
      restaurantData.facebookUrl,
      restaurantData.googleMapsUrl
    ],
    "review": restaurantData.testimonials.map(item => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": item.name
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": item.rating.toString(),
        "bestRating": "5"
      },
      "reviewBody": item.text
    }))
  };
};

// Main Route
app.get('/', (req, res) => {
  const protocol = req.headers['x-forwarded-proto'] || req.protocol;
  const baseUrl = `${protocol}://${req.get('host')}`;
  const canonicalUrl = `${baseUrl}/`;
  const schemaData = JSON.stringify(generateSchemaJsonLd(baseUrl));

  res.render('index', {
    restaurant: restaurantData,
    schemaData,
    currentYear: new Date().getFullYear(),
    canonicalUrl
  });
});

// Privacy Policy Route
app.get('/privacy-policy', (req, res) => {
  const protocol = req.headers['x-forwarded-proto'] || req.protocol;
  const baseUrl = `${protocol}://${req.get('host')}`;
  const canonicalUrl = `${baseUrl}/privacy-policy`;

  res.render('privacy', {
    restaurant: restaurantData,
    currentYear: new Date().getFullYear(),
    canonicalUrl,
    pageTitle: 'Privacy Policy & Tracker Disclosures | Kali Hotel & Restaurant Janakpur',
    pageDescription: 'Official Privacy Policy & Tracker Disclosures for Kali Hotel & Restaurant Janakpur Dham.'
  });
});

// JSON API for restaurant details
app.get('/api/restaurant', (req, res) => {
  res.json({
    success: true,
    data: restaurantData
  });
});

// JSON API for dishes
app.get('/api/dishes', (req, res) => {
  const { category } = req.query;
  let dishes = restaurantData.dishes;

  if (category && category !== 'all') {
    dishes = dishes.filter(d => d.category.toLowerCase() === category.toLowerCase());
  }

  res.json({
    success: true,
    count: dishes.length,
    data: dishes
  });
});

// WhatsApp Quick Link Generator API
app.get('/api/whatsapp-url', (req, res) => {
  const { type, guestCount, date, message } = req.query;

  let text = `Hello Kali Hotel & Restaurant Janakpur Dham!`;
  if (type === 'table') {
    text = `Hello Kali Hotel! I would like to reserve a table for ${guestCount || '2'} guests on ${date || 'today/tomorrow'}.`;
  } else if (type === 'celebration') {
    text = `Hello Kali Hotel! I want to inquire about booking a private cabin for a celebration.`;
  } else if (type === 'takeaway') {
    text = `Hello Kali Hotel! I'd like to place a food takeaway order.`;
  } else if (message) {
    const cleanMsg = String(message).replace(/[<>]/g, '').trim().slice(0, 300);
    text = `Hello Kali Hotel! ${cleanMsg}`;
  }

  const encoded = encodeURIComponent(text);
  const waUrl = `https://wa.me/${restaurantData.whatsappNumber}?text=${encoded}`;

  res.json({
    success: true,
    whatsappUrl: waUrl,
    messageText: text
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'Kali Hotel & Restaurant Web App'
  });
});

// 404 Handler (Must remain at the very bottom)
app.use((req, res) => {
  res.status(404).render('404', {
    restaurant: restaurantData,
    currentYear: new Date().getFullYear()
  });
});

// 500 Error Handler
app.use((err, req, res, next) => {
  console.error('Server Error:', err.stack);
  res.status(500).send(`
    <div style="background:#0b1329; color:#f7d774; font-family:sans-serif; min-height:100vh; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; padding:20px;">
      <h1 style="font-size:2rem; margin-bottom:10px;">Kali Hotel & Restaurant</h1>
      <p style="color:#e2e8f0;">Something went wrong on our end. Please reach us directly at <a style="color:#d4af37;" href="tel:+9779854025213">+977 9854025213</a></p>
    </div>
  `);
});

// Start Server (Local) & Export for Vercel
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`=======================================================`);
    console.log(`🏨 Kali Hotel & Restaurant Server Running on port ${PORT}`);
    console.log(`=======================================================`);
  });
}

module.exports = app;
