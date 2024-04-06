"use client";
import React from "react";
// import { L } from "leaflet";
import { MapContainer, TileLayer, Polygon, Marker } from "react-leaflet";
import { Icon } from "leaflet";
// import { statesData } from './data';
import "leaflet/dist/leaflet.css";
import fancyMarkerIcon from "../../public/pngwing.com.png"; // Import your custom marker icon
import "leaflet-routing-machine";
import RoutingMachine from "./RouteMachine";
// import React from "react";
// import { Icon } from "leaflet"; // Import Icon from Leaflet

const center: any = [25.4661412, 81.8840872];
const fancyIcon = new Icon({
  iconUrl:
    "https://w7.pngwing.com/pngs/8/868/png-transparent-google-maps-hd-logo-thumbnail.png",
  iconSize: [16, 16],
  iconAnchor: [16, 32],
});

export default function MyMap2(props: any) {
  let center: any = [25, 82];

  // console.log("data.center[0]", center[0]);

  //   console.log("harshit", data);
  return (
    <MapContainer center={center} zoom={30} className="w-50 h-96 mt-6 ">
      <TileLayer
        url="https://api.maptiler.com/maps/basic/256/{z}/{x}/{y}.png?key=onCCkUs0rMxBBsgJJFlY"
        attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
      />
      <Marker position={{ lat: 25, lng: 82 }} icon={fancyIcon} />
      <Marker position={{ lat: 20, lng: 85 }} icon={fancyIcon} />;
      <RoutingMachine />
    </MapContainer>
  );
}
