import AdBannerFull from "@/components/adbanner";
import CourseSection from "@/components/coursesection/page";
import FreeModulesSection from "@/components/freemodulesection";
import Hero from "@/components/herosection";
import LearningDomainsSection from "@/components/learningdomainsection";
import MentorSection from "@/components/mentor";

export default function HomePage() {
  return (
    <>
      <Hero />
      <LearningDomainsSection />
      <FreeModulesSection />
      <MentorSection />
      <CourseSection />
    </>
  );
}
