"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState } from "react";
import { universityContent } from "@/lib/universityContent";

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

type BranchMapVariant = "global" | "campuses";

const mapConfig: Record<
  BranchMapVariant,
  { center: [number, number]; zoom: number }
> = {
  global: { center: [10, 30], zoom: 3 },
  campuses: { center: [5.15, 46.2], zoom: 6 },
};

export default function BranchMap({
  variant = "campuses",
}: {
  variant?: BranchMapVariant;
}) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const branches =
    variant === "global"
      ? universityContent.globalBranches
      : universityContent.branches;
  const { center, zoom } = mapConfig[variant];

  if (!isMounted) {
    return (
      <div className="w-full h-[500px] bg-gray-200 rounded-2xl flex items-center justify-center">
        <p className="text-gray-500">جارٍ تحميل الخريطة...</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={false}
        dragging={false}
        doubleClickZoom={false}
        zoomControl={false}
        style={{
          height: "500px",
          width: "100%",
          borderRadius: "16px",
          zIndex: 0,
        }}
        className="leaflet-container"
      >
        <TileLayer
          attribution=""
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {branches.map((branch) => (
          <Marker key={branch.id} position={branch.position} icon={icon}>
            <Popup>
              <strong>{branch.name}</strong>
              <br />
              {branch.location}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
