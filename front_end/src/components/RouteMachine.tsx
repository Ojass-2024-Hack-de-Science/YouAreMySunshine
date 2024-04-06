import L, { Icon } from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import { Marker } from "react-leaflet";

const createRoutineMachineLayer = ({ props }: any) => {
  const fancyIcon = new Icon({
    iconUrl:
      "https://w7.pngwing.com/pngs/8/868/png-transparent-google-maps-hd-logo-thumbnail.png",
    iconSize: [16, 16],
    iconAnchor: [16, 32],
  });

  const instance = L.Routing.control({
    waypoints: [L.latLng(25, 82), L.latLng(20, 85)],
    lineOptions: {
      styles: [{ color: "#6FA1EC", weight: 4 }],
    },
    show: true,
    addWaypoints: true,
    routeWhileDragging: true,
    draggableWaypoints: true,
    fitSelectedRoutes: true,
    showAlternatives: false,
  });

  return instance;
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;
