import AdBannerFull from "@/components/adbanner";
import CourseSection from "@/components/coursesection/page";
import FreeModulesSection from "@/components/freemodulesection";
import Hero from "@/components/herosection";
import LearningDomainsSection from "@/components/learningdomainsection";
import MentorSection from "@/components/mentor";
import Testimonial from "@/components/testimonial";

export default function HomePage() {
  return (
    <>
      <Hero />
      <AdBannerFull />
      <LearningDomainsSection />
      <FreeModulesSection />
      <MentorSection />
      <CourseSection />
      <Testimonial />
    </>
  );
}
