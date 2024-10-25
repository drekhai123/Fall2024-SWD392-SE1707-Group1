import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../../css/navbar.css";

export default function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("user");
    navigate('/');
    window.location.reload();
  };

  return (
    <header className="header-container">
      <nav className="navbar">
        <div className="nav-left">
          <ul className="nav-list">
            <li className="nav-item">HOME</li>
            <li className="nav-item">ABOUT</li>
            <li className="nav-item"><Link to={"/orderform"}>ODERS</Link></li>
            <li className="nav-item">
              <Link to="/feedback">FEEDBACK</Link>
            </li>
            <li className="nav-item">
              <Link to="/ordertracking">ORDERTRACKING</Link>
            </li>

            <li className="nav-item">CONTACT</li>
          </ul>
        </div>

        {user ? (
          <div className="nav-right">
            <div className="nav-item">
              <Link to="/profile">Hello {user.userName}!   </Link> {}
              <button className="btn-Logout" onClick={logout}>LOGOUT</button> {}
            </div>
          </div>
        ) : ( // chưa đăng nhập, hiển thị LOGIN
          <div className="nav-right">
            <div className="nav-item-login">
              <Link className="btn-login" to="/login">LOGIN</Link> {}
            </div>
          </div>
        )}

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
