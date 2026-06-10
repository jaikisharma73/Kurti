export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/cart', '/place-order', '/orders', '/profile', '/verify'],
    },
    sitemap: 'https://zorryfash.com/sitemap.xml',
  }
}
