import MyMap from "@/components/MapComponents";
import { TypewriterEffectParking } from "@/components/ParkingText";

import React from "react";
function page() {
  const geojsonData = {
    incidents: [
      {
        type: "Feature",
        properties: {
          iconCategory: 8,
        },
        geometry: {
          type: "LineString",
          coordinates: [
            [4.8905266414, 52.3725919469],
            [4.8905306647, 52.372535656],
            [4.8905360291, 52.3724806443],
            [4.8905387113, 52.3724028603],
            [4.8905440757, 52.3723505607],
            [4.8905467579, 52.3722754886],
            [4.8905574868, 52.3721722195],
            [4.8905762622, 52.3719066767],
            [4.8905963788, 52.371663905],
            [4.8905936966, 52.371524454],
            [4.8905749211, 52.3714278871],
            [4.8905440757, 52.3713393544],
            [4.8905065248, 52.3712669418],
            [4.8904555628, 52.3711703743],
            [4.8904166708, 52.3711100387],
            [4.8903268168, 52.3709759593],
            [4.8901725898, 52.370765372],
            [4.8900062928, 52.370581651],
            [4.8899472842, 52.3705320104],
            [25.4661412, 81.8840872],
          ],
        },
      },
    ],
  };
  return (
    <main className="m-10 bg-black/[0.96] bg-grid-white/[0.02]">
      <TypewriterEffectParking />
      <MyMap
        data={{
          data1: geojsonData.incidents[0].geometry.coordinates,
          data2: [25, 80],
        }}
      />
    </main>
  );
}

export default page;
