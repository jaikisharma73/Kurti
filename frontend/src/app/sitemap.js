export default async function sitemap() {
  const baseUrl = 'https://zorryfash.com';

  // Static routes
  const staticRoutes = [
    '',
    '/collection',
    '/about',
    '/contact',
    '/shipping',
    '/returns',
    '/size-guide',
    '/privacy-policy',
    '/terms',
    '/refund',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Fetch product list to build dynamic paths
  let productRoutes = [];
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/product/list`, {
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    const data = await response.json();
    if (data.success && data.products) {
      productRoutes = data.products.map((product) => ({
        url: `${baseUrl}/product/${product._id}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'daily',
        priority: 0.7,
      }));
    }
  } catch (error) {
    console.error("Failed to generate dynamic product sitemaps", error);
  }

  return [...staticRoutes, ...productRoutes];
}
