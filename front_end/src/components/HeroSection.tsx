import Link from "next/link";
import { Spotlight } from "./ui/Spotlight";
import { Button } from "./ui/moving-border";

function HeroSection() {
  return (
    <div className="flex flex-start">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      <div
        className="h-auto md:h-[40rem] w-full rounded-md flex flex-col item-center justify-center py-10 md:py-0
    relative overflow-hidden"
      >
        <div className="p-4 relative z-10 w-full text-center">
          <h1 className="mt-20 md:mt-0 text-4xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
            Real-Time Traffic Optimization Solution
          </h1>

          <p className="mt-4 font-normal text-base md:text-lg text-neutral-300 max-w-lg mx-auto">
            Introducing RoadMaster, your Real-Time Traffic Optimization
            Solution. Say goodbye to traffic jams and hello to
            stress-free journeys with RoadMaster. 
            Download our app now and optimize
            your journeys instantly.
          </p>
          <div className="mt-4">
            <Link href={"/courses"}>
              <Button
                borderRadius="1.75rem"
                className="bg-black text-black dark:text-white border-neutral-200 dark:border-blue-800"
              >
                Explore Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
