import { memo, Suspense, lazy } from 'react';
import { useSEO } from '../hooks/useSEO';
import HeroSection from '../components/landing/HeroSection';
import FeaturesSection from '../components/landing/FeaturesSection';

// Lazy load sections that are below the fold
const ModulesSection = lazy(() => import('../components/landing/ModulesSection'));
const IntegrationsSection = lazy(() => import('../components/landing/IntegrationsSection'));
const TestimonialsSection = lazy(() => import('../components/landing/TestimonialsSection'));
const PricingSection = lazy(() => import('../components/landing/PricingSection'));
const CTASection = lazy(() => import('../components/landing/CTASection'));

// Loading component for lazy sections
const SectionLoader = memo(() => (
  <div className="py-24 flex justify-center items-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" aria-label="Loading"></div>
  </div>
));

SectionLoader.displayName = 'SectionLoader';

const LandingPage = memo(() => {
  // SEO optimization
  useSEO({
    title: 'BlueHooper - Complete Construction Management Platform | Project Planning & Financial Control',
    description: 'Streamline your construction business with BlueHooper\'s comprehensive platform. Project management, financial control, field operations, and safety compliance in one solution.',
    keywords: 'construction management software, project management, construction planning, field management, construction finance, safety compliance, construction technology',
    ogTitle: 'BlueHooper - The Complete Construction Management Platform',
    ogDescription: 'Transform your construction business with our all-in-one platform. 40% efficiency increase, 500+ companies trust us.',
    canonical: window.location.origin
  });

  return (
    <main className="bg-white" role="main">
      {/* Above the fold content - loaded immediately */}
      <HeroSection />
      <FeaturesSection />
      
      {/* Below the fold content - lazy loaded for better performance */}
      <Suspense fallback={<SectionLoader />}>
        <ModulesSection />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <IntegrationsSection />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <TestimonialsSection />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <PricingSection />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <CTASection />
      </Suspense>
      
      {/* Demo section placeholder */}
      <div id="demo" className="sr-only" aria-hidden="true"></div>
    </main>
  );
});

LandingPage.displayName = 'LandingPage';

export default LandingPage;