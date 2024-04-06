"use client";
import React from "react";
import { MapContainer, TileLayer, Polygon, Marker } from "react-leaflet";
// import { Icon } from 'leaflet';
// import { statesData } from './data';
import "leaflet/dist/leaflet.css";
// import fancyMarkerIcon from './pop.png'; // Import your custom marker icon

import { Icon } from "leaflet"; // Import Icon from Leaflet

const center: any = [25.4661412, 81.8840872];
const fancyIcon = new Icon({
  iconUrl:
    "https://w7.pngwing.com/pngs/8/868/png-transparent-google-maps-hd-logo-thumbnail.png",
  iconSize: [16, 16],
  iconAnchor: [16, 32],
});

export default function MyMap({ data }: any) {
  const center: any = [25.4661412, 81.8840872];
  console.log("harshit", data);
  return (
    <MapContainer center={center} zoom={10} className="w-50 h-96 mt-6 ">
      <TileLayer
        url="https://api.maptiler.com/maps/basic/256/{z}/{x}/{y}.png?key=onCCkUs0rMxBBsgJJFlY"
        attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
      />

      {data &&
        data.map((coordinate: any, index: any) => (
          <Marker
            key={index}
            position={{ lat: coordinate[0], lng: coordinate[1] }}
            icon={fancyIcon}
          />
        ))}
      {data &&
        data.map((c: any, index: any) => {
          console.log("heloo" + c[0] + " " + c[1]);
        })}
    </MapContainer>
  );
}
