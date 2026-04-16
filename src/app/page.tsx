import Hero from '@/components/Hero';
import WelcomeMarquee from '@/components/WelcomeMarquee';
import FeatureCards from '@/components/FeatureCards';
import PopularProducts from '@/components/PopularProducts';
import ComboOffers from '@/components/ComboOffers';
import Testimonials from '@/components/Testimonials';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Bubble Liquid | Master Your Home's Cleanliness",
  description: "Experience the ultimate clean with Bubble Liquid's premium range of detergents, dishwashers, and floor cleaners.",
  alternates: {
    canonical: "/"
  }
};

const Index = () => {
  return (
    <main>
      {/* GEO/SEO: WebSite schema with Search Action */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Bubble Liquids",
            "url": "https://bubbleliquids.com",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://bubbleliquids.com/products?search={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })
        }}
      />
      <Hero />
      <WelcomeMarquee />
      <FeatureCards />
      <PopularProducts />
      <ComboOffers variant="carousel" />
      <Testimonials />
    </main>
  );
};

export default Index;
