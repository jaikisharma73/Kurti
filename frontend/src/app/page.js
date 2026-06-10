import Hero from '@/components/Hero'
import EditorialSection from '@/components/EditorialSection'
import SplitImageSection2 from '@/components/SplitImageSection2'
import SummerSection from '@/components/SummerSection'
import LatestTransformations from '@/components/LatestTransformations'
import BestSeller from '@/components/BestSeller'

export const metadata = {
  title: 'ZorryFash | Premium Kurtis & Contemporary Fashion E-Store',
  description: 'Shop premium designer Kurtis, luxury fusion wear, handpicked ethnic sets, and modern streetwear collections with free shipping on ZorryFash.',
  keywords: ['ZorryFash', 'Kurtis', 'Ethnic wear', 'Designer clothing', 'Luxury fashion', 'Indian wear', 'Women clothing'],
}

export default function Home() {
  const schemaJson = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://zorryfash.com/#organization",
        "name": "ZorryFash",
        "url": "https://zorryfash.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://zorryfash.com/logo.png",
          "caption": "ZorryFash Logo"
        },
        "sameAs": [
          "https://www.instagram.com/zorryfash",
          "https://twitter.com/zorryfash"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://zorryfash.com/#website",
        "url": "https://zorryfash.com",
        "name": "ZorryFash",
        "publisher": {
          "@id": "https://zorryfash.com/#organization"
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://zorryfash.com/collection?search={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      }
    ]
  };

  return (
    <div className="-mx-4 sm:-mx-[5vw] md:-mx-[7vw] lg:-mx-[9vw]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }}
      />
      <Hero />
      <EditorialSection />
      <SplitImageSection2 />
      <SummerSection />
      <LatestTransformations />
      <BestSeller />
    </div>
  )
}
