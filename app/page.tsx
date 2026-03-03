import AdBannerFull from "@/components/adbanner";
import Hero from "@/components/herosection";
import LearningDomainsSection from "@/components/learningdomainsection";
import MentorSection from "@/components/mentor";

export default function HomePage() {
  return (
    <>
      <Hero />
      <LearningDomainsSection />
      <MentorSection />
    </>
  );
}
