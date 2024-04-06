"use client";
import { TypewriterEffectSmooth } from "./ui/typewriter-effect";
function TypewriterEffectParking() {
  const words = [
    {
      text: "Parking Near You.",
      className: "text-3xl text-white-500 dark:text-white-500",
    },
  ];
  return <TypewriterEffectSmooth words={words} />;
}
export {TypewriterEffectParking};

