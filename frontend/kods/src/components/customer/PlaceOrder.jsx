import React, {useState} from 'react'
import OrderForm from './OrderForm'
import DeliveryMap from './DeliveryMap';

export default function PlaceOrder() {
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);
  const [distance, setDistance] = useState(null);

  const handleSuggestionClick = (suggestion) => {
    setSelectedSuggestion(suggestion); 
  };

  const handleDistanceAuto = (distance) => {
    setDistance(distance); 
  };
  return (
    <div className=''
        style={{
            display: 'flex',
            height: '100vh',
        }}
    >
     <OrderForm onSuggestionClick={handleSuggestionClick} distance={distance}/>
     <DeliveryMap suggestion={selectedSuggestion} autoSetDistance={handleDistanceAuto}/>
    </div>
  )
}