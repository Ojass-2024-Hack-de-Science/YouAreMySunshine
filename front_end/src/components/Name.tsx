"use client";
import { TypewriterEffectSmooth } from "./ui/typewriter-effect";
export function TypewriterEffectSmoothDemo() {
  const words = [
    {
      text: "RoadMaster.",
      className: "text-blue-500 dark:text-blue-500",
    },
    // {
    //   text: "Master",
    // },
    // {
    //   text: ".",
    // },
  ];
  return <TypewriterEffectSmooth words={words} />;
}
