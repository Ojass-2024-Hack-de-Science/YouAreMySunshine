"use client";
import { TypewriterEffectSmooth } from "./ui/typewriter-effect";
export function TypewriterEffectYourRoute() {
  const words = [
    {
      text: "Your Route.",
      className: "text-3xl text-white-500 dark:text-white-500",
    },
  ];
  return <TypewriterEffectSmooth words={words} />;
}