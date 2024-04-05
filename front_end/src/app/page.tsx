import FeautredCourses from "@/components/TrafficHero";
import HeroSection from "@/components/HeroSection";
import Testimonial from "@/components/Testimonial";
import Whychooseus from "@/components/PublicTransportHero";
import MeetOurTeam from "@/components/MeetOurTeam"
export default function Home() {
  return (
    <main className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02]">
      <HeroSection />
      <FeautredCourses />
      <Whychooseus />
      <Testimonial />
      <MeetOurTeam />
    </main>
  );
}
