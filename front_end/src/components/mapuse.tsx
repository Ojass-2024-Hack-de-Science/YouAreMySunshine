"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import MyMap from "./MapComponents";
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
        ],
      },
    },
  ],
};
function Mapuse() {
  const [lat, setlat] = useState(null);
  const [lon, setlon] = useState(null);
  const [data, setdata] = useState(null);
  const callapi = async () => {
    const geo = navigator.geolocation;
    geo.getCurrentPosition(success, errorCallback);
    function success(position: any) {
      setlat(position.coords.latitude);
      setlon(position.coords.longitude);
      console.log(position.coords.latitude);
      console.log(position.coords.longitude);
    }
    function errorCallback(err: any) {
      console.log(err);
    }
    const res = await axios.post("http://localhost:3030/api/incidentAlert", {
      locationCoordinates: [lat, lon],
    });
    console.log(res);
    setdata(res.data.incidentData.incidents[0].geometry.coordinates);
    console.log(res);
  };

  useEffect(() => {
    callapi();
  }, [lat, lon]);
  setInterval(callapi, 1200000);
  return (
    <div>
      <h1>{lat}</h1>
      <h1>{lon}</h1>
      <MyMap data={geojsonData.incidents[0].geometry.coordinates} />
    </div>
  );
}

export default Mapuse;
