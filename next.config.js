/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
    domains: ["cdn.weatherapi.com"],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'sha256-jqiZxOcKsKr0ZT2GYz3fP8tcJd3k4Q7eAPIYCMJvWRg=' 'sha256-OBTN3RiyCV4Bq7dFqZ5a2pAXjnCcCYeTJMO2I/LYKeo=' 'sha256-QraP4ffA8dfGeAcot2+KUXke/YDBBm8mia6e6diV8ZI=' 'sha256-X0mnlJEBzgN8D2MswzyPzcr0ICoiOVsg6ZMqidbYkWs=' 'sha256-1DOyrsWHOrOvJQJ7+1AYX4jYzXD9DQMOoBXTnb/A11I=' 'sha256-UQM/A8/ckK3LLU3SxlplcqrTTKTyjVQCA9GkV7KZnlE=' 'sha256-iYXd8UZaitghZQV6m0eDyAHLJutUoMe39DYpdfU1zQI=' va.vercel-scripts.com; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' data:; connect-src 'self' generativelanguage.googleapis.com va.vercel-scripts.com;"
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
