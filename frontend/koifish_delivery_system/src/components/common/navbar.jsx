
import React from 'react';
import { Link } from 'react-router-dom';
import "../../css/navbar.css";

export default function Navbar() {
  return (
    <header className="header-container">
      <nav className="navbar">
        <div className="nav-left">
          <ul className="nav-list">
            <li className="nav-item">HOME</li>
            <li className="nav-item">ABOUT</li>
            <li className="nav-item">SERVICE</li>
            <li className="nav-item">
              <Link to="/feedback">FEEDBACK</Link>
            </li>
            <li className="nav-item">
              <Link to="/ordertracking">ORDERTRACKING</Link>
            </li>

            <li className="nav-item">CONTACT</li>
          </ul>
        </div>
        <div className="nav-right">
          <div className="nav-item-login">LOGIN</div>
        </div>
      </nav>

      <div className="header-content">
        <img
          src="images/header.png"
          alt="Service"
          className="service-image"
        />
        <h1 className="service-name">Koi <br></br>Delivery</h1>
      </div>
    </header>
  );
}
