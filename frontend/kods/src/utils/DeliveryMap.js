import React from 'react'
import { MapContainer,TileLayer,Marker,Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
const copyRight = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>'
const mapURL = "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
const defaultCoor = [10.8751292,106.8006254]
export default function DeliveryMap() {
  const customIcon = new L.Icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41], // Default size for Leaflet icons
    iconAnchor: [12, 41], // Anchor the icon
    popupAnchor: [1, -34], // Adjust popup position
    shadowSize: [41, 41],
  });
  return (
    <div>
   <MapContainer
   center={defaultCoor} // Cordinate for default location
    zoom={14} // Zoom ratio
    style={{ 
        height: "100vh", 
        width: "60vw",
        
    }}
   >
     <TileLayer
     // Providing the map from openstreetmap
       url={mapURL}
       attribution = {copyRight}
     />
     <Marker position={defaultCoor}
      icon={customIcon}
     >
       <Popup 
       >
         PRESS POPUP
       </Popup>
     </Marker>

   </MapContainer>
   </div>
  )
}
