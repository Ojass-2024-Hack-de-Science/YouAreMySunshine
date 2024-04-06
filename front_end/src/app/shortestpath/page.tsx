"use client";
import MyMap from "@/components/MapComponents";
import MyMap2 from "@/components/MapComponents2";
import { TypewriterEffectParking } from "@/components/ParkingText";
import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import React from "react";
function page() {
  return (
    <main className="m-10 bg-black/[0.96] bg-grid-white/[0.02]">
      <MyMap2 />
    </main>
  );
}

export default page;
