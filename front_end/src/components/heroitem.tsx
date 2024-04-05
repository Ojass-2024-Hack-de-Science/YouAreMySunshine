"use client";
import { TypewriterEffectSmooth } from "./ui/typewriter-effect";
export function TypewriterEffectonHero() {
  const words = [
    {
      text: "Master",
      className: "text-blue-500 dark:text-blue-500",
    },
    {
      text: "The",
    },
    {
      text: "Art",
    },
  ];
  return <TypewriterEffectSmooth words={words} />;
}
