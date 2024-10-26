import React from 'react'
import { useNavigate } from 'react-router-dom';
import "../../css/CardHeader.css"
export default function CardHeader() {
    const navigate1 = useNavigate();
    const gotoOderForm = () => {
        navigate1('/OrderForm'); 
      };
  return (
    <header className="header-container">
    <div className="header-content">
        <img
          src="images/header.png"
          alt="Service"
          className="service-image"
        />
        <h1 className="service-name">Koi <br></br>Delivery<br></br>
        <button onClick={gotoOderForm} className="oders-button">Delivery Now ⮕ </button>
        </h1>       
      </div>
      </header>
  )
}
