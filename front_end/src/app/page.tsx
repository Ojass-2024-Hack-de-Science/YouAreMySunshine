import FeautredCourses from "@/components/TrafficHero";
import HeroSection from "@/components/HeroSection";
import MeetOurInstructors from "@/components/MeetOurInstructors";
import Testimonial from "@/components/Testimonial";
import Whychooseus from "@/components/Whychooseus";

export default function Home() {
  return (
    <main className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02]">
      <HeroSection />
      <FeautredCourses />
      <Whychooseus />
      <Testimonial />
      <MeetOurInstructors />
    </main>
  );
}
