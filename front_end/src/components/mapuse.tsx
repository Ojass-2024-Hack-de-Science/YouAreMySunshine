"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
function Mapuse() {
  const [lat, setlat] = useState(null);
  const [lon, setlon] = useState(null);
  useEffect(() => {
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
  }, []);
  useEffect(() => {
    axios.post("http://localhost:3030/api/incidentAlert", {
      locationCoordinates: [lat, lon],
    });
  }, [lat, lon]);

  return (
    <div>
      <h1>{lat}</h1>
      <h1>{lon}</h1>
    </div>
  );
}

export default Mapuse;
