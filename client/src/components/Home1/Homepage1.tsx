import { useRef } from 'react';
import FeatureShowcase from '../homepage/FeatureShowcase';
import MockTest from '../homepage/MockTest';
import CoursesLearningPrograms from '../homepage/CoursesLearningPrograms';
import AppPromotion from '../homepage/AppPromotion';
import WhyChooseUs from '../homepage/WhyChooseUs';
import RecruitmentProcesses from '../homepage/RecruitmentProcesses';
import CTA from '../homepage/CTA';
import FAQSection from '../homepage/FAQSection';
import SuccessStories from '../homepage/SuccessStories';
import HeroSection from './HeroSection1';
import Services from './Services';
import PublicationsShowcase from './PublicationsShowcase';

export default function BankPrepHomepage() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen overflow-x-hidden bg-[#09090B] text-white"
    >
      <HeroSection />

      {/* <Services /> */}

      {/* Feature Showcase */}
      <FeatureShowcase />
      <PublicationsShowcase />
      {/* Popular Mock Tests Slider */}
      <MockTest />

      {/* Courses & Learning Programs */}
      <CoursesLearningPrograms />

      {/* App Promotion Section */}
      <AppPromotion />

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Bank Recruitment Processes */}
      <RecruitmentProcesses />

      {/* Footer CTA Strip */}
      <CTA />

      {/* FAQ Section */}
      <FAQSection />

      {/* Success Stories / Testimonials */}
      <SuccessStories />
    </div>
  );
}
