"use client";
import { TypewriterEffectSmooth } from "./ui/typewriter-effect";
export function TypewriterFeatured() {
  const words = [
    {
      text: "Smarter Traffic, Smoother Commutes",
    },
  ];
  return <TypewriterEffectSmooth words={words} />;
}
