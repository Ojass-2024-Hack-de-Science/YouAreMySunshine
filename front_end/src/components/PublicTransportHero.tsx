"use client";
import React from "react";
import { StickyScroll } from "./ui/sticky-scroll-reveal";
import Image from "next/image";
import img from "../../public/Screenshot (1).png";
const publictransport = [
  {
    title: "Intelligent Route Optimization",
    description:
      "Leverage real-time data and predictive analytics to continuously optimize public transportation routes, frequencies, and schedules, ensuring reliable and efficient service."
  },
  {
    title: "Passenger-Centric Experience",
    description:
      "Empower transit users with real-time information, service updates, and personalized recommendations, improving their overall commuting experience and increasing ridership."
  },
  {
    title: "Vehicle-to-Infrastructure Integration",
    description:
      "Implement a communication system that allows buses to interact with traffic signals, enabling priority passage and improving the speed and punctuality of public transportation.",
  
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
