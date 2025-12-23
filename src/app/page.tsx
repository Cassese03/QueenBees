import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroCarousel from '@/components/home/HeroCarousel';
import StatsSection from '@/components/home/StatsSection';
import ServicesPreview from '@/components/home/ServicesPreview';
import AboutPreview from '@/components/home/AboutPreview';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import ContactCTA from '@/components/home/ContactCTA';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroCarousel />
        <StatsSection />
        <ServicesPreview />
        <AboutPreview />
        <TestimonialsSection />
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}
