import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { message } from 'antd';
import "../../css/navbar.css";
import 'react-toastify/dist/ReactToastify.css';
import { googleLogout } from '@react-oauth/google';

export default function Navbar() {
  const token = sessionStorage.getItem("token"); // Get token from session storage
  const user = JSON.parse(sessionStorage.getItem("user"));
  const navigate = useNavigate();
  const logout = () => {
    googleLogout()
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
    message.success("Logged out successfully!");
    navigate('/');
  };
  return (
    <header className="header-container">
      <nav className="navbar">
        <div className="nav-left">
          <ul className="nav-list">
            <li className="nav-item"><Link to={"/"}>HOME</Link></li>
            <li className="nav-item"><Link to={"/about"}>ABOUT</Link></li>
            <li className="nav-item"><Link to={"/orderform"}>DELIVERY</Link></li>
            <li className="nav-item">
              <Link to="/feedback">FEEDBACK</Link>
            </li>
            <li className="nav-item"><Link to={"/contact"}>CONTACT US</Link></li>
          </ul>
        </div>

        <div className="navbar-body">
          {/* Add any additional content or structure here */}
        </div>

        {user && token ? (
          <div className="nav-right">
            <ul className="nav-list">
              {user.role === "customer" && <li className="nav-item"><Link to="/profile/Information">VIEW PROFILE</Link></li>}
              {user.role === "delivery" && <li className="nav-item"><Link to="/delivery-staff">TRANSPORT</Link></li>}
              {user.role === "admin" && <li className="nav-item"><Link to="/admin">ADMIN DASHBOARD</Link></li>}
              {user.role === "staff" && <li className="nav-item"><Link to="/staffDashBoard">STAFF DASHBOARD</Link></li>}
              {user.role === "healthcare" && <li className="nav-item"><Link to="/healthcare">HEALTHCARE</Link></li>}

              <li className="nav-item"> Hello, {user.userName}!</li>
              <li className="nav-item"><button className="btn-Logout" onClick={logout}>LOGOUT</button> { }</li>
            </ul>
          </div>
        ) : ( // chưa đăng nhập, hiển thị LOGIN
          <div className="nav-right">
            <div className="nav-item-login">
              <Link className="btn-login" to="/login">LOGIN</Link>
            </div>
          </div>
        )}

      </nav>
    </header>
  );
}
