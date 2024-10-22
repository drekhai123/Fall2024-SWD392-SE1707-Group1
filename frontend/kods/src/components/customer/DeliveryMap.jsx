/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet-routing-machine";
import "../../css/Leaflet.css"
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { markerIcon } from "../../utils/data";

const mapURL = "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png";
const defaultPosition = [10.8751292, 106.8006254];

export default function DeliveryMap({ suggestion, autoSetDistance }) {
  const [distance, setDistance] = useState(null);
  const mapRef = useRef();

  const customIcon = new L.Icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  useEffect(() => {
    if (mapRef.current) {
      const routingControl = L.Routing.control({
        waypoints: [
          L.latLng(
            suggestion?.form[0] ? suggestion?.form[0] : defaultPosition[0],
            suggestion?.form[1] ? suggestion?.form[1] : defaultPosition[1]
          ),
          L.latLng(
            suggestion?.to[0] ? suggestion?.to[0] : defaultPosition[0],
            suggestion?.to[1] ? suggestion?.to[1] : defaultPosition[1]
          ),
        ],

        lineOptions: {
          styles: [{ color: "#ff4500", weight: 4 }],
        },
        addWaypoints: false,
        draggableWaypoints: false,
        fitSelectedRoutes: true,
        showAlternatives: false,
      }).addTo(mapRef.current);

      routingControl.on("routesfound", function (e) {
        const routes = e.routes;
        const summary = routes[0].summary;
        autoSetDistance((summary.totalDistance / 1000).toFixed(2))
        setDistance((summary.totalDistance / 1000).toFixed(2));
      });
      return () => mapRef.current.removeControl(routingControl);
    }

  }, [suggestion]);

  return (
    <div style={{ position: "relative" }}>
      <MapContainer
        center={suggestion?.form ? suggestion?.form : defaultPosition}
        zoom={16}
        style={{
          height: "100vh",
          width: "60vw",
        }}
        ref={mapRef}
      >
        <TileLayer url={mapURL} />
        <Marker position={suggestion?.form ? suggestion?.form : defaultPosition} icon={customIcon}>
          {/* <Popup>Chiều đi: {fromAddress}</Popup> */}
        </Marker>
        <Marker position={suggestion?.to ? suggestion?.to : defaultPosition} icon={customIcon}>
          {/* <Popup>Chiều về: {toAddress}</Popup> */}
        </Marker>
      </MapContainer>

      {distance && (
        <p className="distance">Khoảng cách giữa hai điểm: {distance} km</p>
      )}
    </div>
  );
}
