/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet-routing-machine";
import "../../css/Leaflet.css"
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { markerIcon } from "../../utils/data";

const DeliveryMap = ({ suggestion, autoSetDistance }) => {
  const mapURL = "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png";
  const defaultPosition = [10.8751292, 106.8006254];
  const [distance, setDistance] = useState(null);
  const [userPosition, setUserPosition] = useState(defaultPosition);
  const [error, setError] = useState(null);
  const mapRef = useRef();


  const customIcon = new L.Icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  // Geolocation API 
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setUserPosition([latitude, longitude]);

          
          if (mapRef.current) {
            const map = mapRef.current;
            map.flyTo([latitude, longitude], 16);  
          }
        },
        (err) => {
          setError(err.message);
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  }, []);

  // Hàm tính toán distances
  useEffect(() => {
    if (mapRef.current) {
      const routingControl = L.Routing.control({
        waypoints: [
          L.latLng(
            suggestion?.form?.[0] || defaultPosition[0],
            suggestion?.form?.[1] || defaultPosition[1]
          ),
          L.latLng(
            suggestion?.to?.[0] || defaultPosition[0],
            suggestion?.to?.[1] || defaultPosition[1]
          ),
        ],
        lineOptions: {
          styles: [{ color: "#0a850f", weight: 4 }],
        },
        addWaypoints: false,
        draggableWaypoints: false,
        fitSelectedRoutes: true,
        showAlternatives: false,
      }).addTo(mapRef.current);
  
      routingControl.on("routesfound", function (e) {
        const routes = e.routes;
        const summary = routes[0].summary;
        const distanceInKm = (summary.totalDistance / 1000).toFixed(2);
        autoSetDistance(distanceInKm);
        setDistance(distanceInKm);
      });
  
      return () => {
        if (mapRef.current && routingControl) {
          mapRef.current.removeControl(routingControl);
        }
      };
    }
  }, [suggestion]);
  

  return (
    <div style={{ position: "relative",zIndex:"0" }}>
      <MapContainer
        center={defaultPosition} // Ban đầu đặt defaultPosition để nếu người dùng không allow vị trí thì vẫn chạy bth
        zoom={16}
        style={{
          height: "100vh",
          width: "60vw",
        }}
        ref={mapRef}
      >
        <TileLayer url={mapURL} />

        {/* Lấy vị trí ban đầu */}
        <Marker
          position={userPosition}
          icon={customIcon}
          zIndexOffset={1000}
          eventHandlers={{
            add: (e) => {
              e.target.bindPopup("You are here!!!").openPopup();
            }
          }}
        >
          {/* Popup sẽ mở ngay khi marker được thêm */}
        </Marker>
        {/* Chiều đi */}
        <Marker position={suggestion?.form || userPosition} icon={customIcon} zIndexOffset={1000}>
          {/* <Popup>Chiều đi: {fromAddress}</Popup> */}
        </Marker>

        {/* Chiều về */}
        <Marker position={suggestion?.to || userPosition} icon={customIcon} zIndexOffset={1000}>
          {/* <Popup>Chiều về: {toAddress}</Popup> */}
        </Marker>
      </MapContainer>

      {distance && (
        <p className="distance">Khoảng cách giữa hai điểm: {distance} km</p>
      )}

      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default DeliveryMap;