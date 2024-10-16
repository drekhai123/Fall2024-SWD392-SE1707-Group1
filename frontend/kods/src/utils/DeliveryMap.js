import React, { useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import "./Leaflet.css";

const copyRight = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>';
const mapURL = "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png";
const defaultCoor = [10.8751292, 106.8006254];

export default function DeliveryMap() {
  const [markerPosition, setMarkerPosition] = useState(defaultCoor);
  const [address, setAddress] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const mapRef = useRef();

  const customIcon = new L.Icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  const handleAddressChange = async (event) => {
    const value = event.target.value;
    setAddress(value);

    if (value) {
        try {
            const response = await axios.get(`https://api.locationiq.com/v1/autocomplete.php?key=pk.c556e60415cc1a659e686d02e117cf4c&q=${encodeURIComponent(value)}&format=json`);
            setSuggestions(response.data);
            if (response.data.length > 0) {
              const { lat, lon } = response.data[0];
              setMarkerPosition([lat, lon]);
              mapRef.current.setView([lat, lon], 3);
              
          }
        } catch (error) {
            console.error("Error fetching address suggestions:", error);
        }
    } else {
        setSuggestions([]);
    }
};

const handleSuggestionClick = (lat, lon) => {
  if (lat && lon) {
      setMarkerPosition([lat, lon]);
      if (mapRef.current) {
          mapRef.current.setView([lat, lon], 14, { animate: true });
      }
  }
  setSuggestions([]);
};

  return (
    <div style={{ position: 'relative' }}>
      <input
        type="text"
        value={address}
        onChange={handleAddressChange}
        placeholder="Nhập địa chỉ..."
        className="search-input"
      />
 {suggestions.length > 0 && (
                <div className="suggestions">
                    {suggestions.map(suggestion => (
                        <div 
                            key={suggestion.place_id} 
                            onClick={() => handleSuggestionClick(suggestion.lat, suggestion.lon)} 
                            className="suggestion-item"
                        >
                            {suggestion.display_name}
                        </div>
                    ))}
                </div>
            )}
      <MapContainer
        center={markerPosition}
        zoom={14}
        style={{
          height: "100vh",
          width: "60vw",
        }}
      >
        <TileLayer
          url={mapURL}
          attribution={copyRight}
        />
        <Marker position={markerPosition} icon={customIcon}>
          <Popup>
            Vị trí: {address}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
