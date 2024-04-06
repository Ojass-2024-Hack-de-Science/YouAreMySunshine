// ParkingSpaceDetector.tsx
import React, { useState, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const parkingData: ParkingLocation[] = [
    { lat: 19.0760, lng: 72.8777, available: 0, total: 6 , carCount: 5, bikeCount: 1}, // Bandra
    { lat: 19.0180, lng: 72.8579, available: 5, total: 5, carCount: 0, bikeCount: 0 }, // Chhatrapati Shivaji Terminus
    { lat: 19.1122, lng: 72.8580, available: 3, total: 7, carCount: 3, bikeCount:1 }, // Juhu Beach
    { lat: 19.0748, lng: 72.8348, available: 6, total: 8, carCount: 1, bikeCount:1}, // Worli
  ];
  
interface ParkingLocation {
  lat: number;
  lng: number;
  available: number;
  total: number;
  carCount: number;
  bikeCount: number;
}

const ParkingSpaceDetector: React.FC = () => {
  const [map, setMap] = useState<L.Map | null>(null);
  const [markers, setMarkers] = useState<L.Marker[]>([]);

  useEffect(() => {
    const newMap = L.map('map').setView([19.0760, 72.8777], 12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(newMap);
    setMap(newMap);

    parkingData.forEach((location) => {
      const marker = L.marker([location.lat, location.lng], {
        icon: L.icon({
          iconUrl: location.available ? 'available.png' : 'occupied.png',
          iconSize: [32, 32],
        }),
      }).addTo(newMap);
      setMarkers((prevMarkers) => [...prevMarkers, marker]);
    });
  }, []);

  return (
    <div>
      <div id="map" style={{ height: '500px' }}></div>
    </div>
  );
};

export default ParkingSpaceDetector;