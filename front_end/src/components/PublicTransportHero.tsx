"use client";
import React from "react";
import { StickyScroll } from "./ui/sticky-scroll-reveal";
import Image from "next/image";
import img from "../../public/20945926.jpg";
import img1 from "../../public/27265.jpg";
import { BackgroundGradient } from "./ui/background-gradient";

const publictransport = [
  {
    title: "Intelligent Route Optimization",
    description:
      "Leverage real-time data and predictive analytics to continuously optimize public transportation routes, frequencies, and schedules, ensuring reliable and efficient service.",
    content: (
      <div className="flex justify-center text-center items-center">
        Intelligent Route Optimization
      </div>
    ),
  },
  {
    title: "Passenger-Centric Experience",
    description:
      "Empower transit users with real-time information, service updates, and personalized recommendations, improving their overall commuting experience and increasing ridership.",
    content: (
      <div className="flex justify-center text-center items-center">
        Passenger-Centric Experience
      </div>
    ),
  },
  {
    title: "Vehicle-to-Infrastructure Integration",
    description:
      "Implement a communication system that allows buses to interact with traffic signals, enabling priority passage and improving the speed and punctuality of public transportation.",
    content: (
      <div className="flex justify-center text-center items-center">
        Vehicle-to-Infrastructure Integration
      </div>
    ),
  },
];
function Whychooseus() {
  return (
    <div>
      <StickyScroll content={publictransport} />
    </div>
  );
}

export default Whychooseus;
