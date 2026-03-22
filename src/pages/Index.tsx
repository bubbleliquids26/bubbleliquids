import Hero from '@/components/Hero';
import WelcomeMarquee from '@/components/WelcomeMarquee';
import FeatureCards from '@/components/FeatureCards';
import PopularProducts from '@/components/PopularProducts';
import ComboOffers from '@/components/ComboOffers';
import Testimonials from '@/components/Testimonials';

const Index = () => {
  return (
    <main>
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
