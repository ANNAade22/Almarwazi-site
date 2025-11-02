"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState } from "react";

// Fix for default icon issue in Next.js
const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Branch data (latitude, longitude, name)
interface Branch {
  id: number;
  name: string;
  position: [number, number];
}

const branches: Branch[] = [
  { id: 1, name: "فرع الصومال - Somalia Branch", position: [2.0469, 45.3182] }, // Mogadishu, Somalia
  {
    id: 2,
    name: "فرع جنوب أفريقيا - South Africa Branch",
    position: [-25.7479, 28.2293],
  }, // Pretoria, South Africa
  { id: 3, name: "فرع الكويت - Kuwait Branch", position: [29.3759, 47.9774] }, // Kuwait City, Kuwait
];

export default function BranchMap() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Center map in Middle East/Africa region
  const center: [number, number] = [10, 30];
  const zoom = 3;

  if (!isMounted) {
    return (
      <div className="w-full h-[500px] bg-gray-200 rounded-2xl flex items-center justify-center">
        <p className="text-gray-500">Loading map...</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={true}
        style={{
          height: "500px",
          width: "100%",
          borderRadius: "16px",
          zIndex: 0,
        }}
        className="leaflet-container"
      >
        {/* Map background (OpenStreetMap) */}
        <TileLayer
          attribution=""
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Branch markers */}
        {branches.map((branch) => (
          <Marker key={branch.id} position={branch.position} icon={icon}>
            <Popup>{branch.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
