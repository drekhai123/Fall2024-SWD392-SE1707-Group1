import React from 'react'
import { MapContainer,TileLayer,Marker,Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

const copyRight = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>'
const mapURL = "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
const defaultCoor = [10.8231,106.6297]
export default function DeliveryMap() {
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
     <Marker position={defaultCoor}>
       <Popup>
         PRESS POPUP
       </Popup>
     </Marker>

   </MapContainer>
   </div>
  )
}
