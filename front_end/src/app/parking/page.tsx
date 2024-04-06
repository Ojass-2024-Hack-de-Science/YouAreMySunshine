import MyMap from "@/components/MapComponents";
import { TypewriterEffectParking } from "@/components/ParkingText";

import React from "react";
function page() {
  return (
    <main className="m-10 bg-black/[0.96] bg-grid-white/[0.02]">
      <TypewriterEffectParking/>
      <MyMap />
    </main>
  );
}

export default page;