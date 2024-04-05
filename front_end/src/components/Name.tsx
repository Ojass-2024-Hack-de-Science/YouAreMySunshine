"use client";
import { TypewriterEffectSmooth } from "./ui/typewriter-effect";
export function TypewriterEffectSmoothDemo() {
  const words = [
    {
      text: "RoadMaster.",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];
  return <TypewriterEffectSmooth words={words} />;
}
