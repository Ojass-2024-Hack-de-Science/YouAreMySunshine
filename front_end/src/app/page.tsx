import FeautredCourses from "@/components/FeautredCourses";
import { ThreeDCardDemo } from "@/components/HeroImage";
import HeroSection from "@/components/HeroSection";
import MeetOurInstructors from "@/components/MeetOurInstructors";
import Testimonial from "@/components/Testimonial";
import Whychooseus from "@/components/Whychooseus";
import { Spotlight } from "@/components/ui/Spotlight";

export default function Home() {
  return (
    <main className="bg-black/[0.96] bg-grid-white/[0.02]">
      <div className="flex justify-between py-12 px-12">
        <div className="mr-8">
          <HeroSection />
        </div>
        <div className="ml-8">
          <ThreeDCardDemo />
        </div>
      </div>
      <FeautredCourses />
      <Whychooseus />
      <Testimonial />
      <MeetOurInstructors />
    </main>
  );
}
