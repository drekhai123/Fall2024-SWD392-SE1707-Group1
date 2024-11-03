import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import "../../css/navbar.css";
import 'react-toastify/dist/ReactToastify.css';
import { googleLogout } from '@react-oauth/google';

export default function Navbar() {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const navigate = useNavigate();
  const logout = () => {
    googleLogout()
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
    toast.success("Logged out successfully!");
    navigate('/');
    window.location.reload();
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

        {user ? (
          <div className="nav-right">
            <ul className="nav-list">
              <li className="nav-item"><Link to="/profile">VIEW PROFILE</Link></li>
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
      <ToastContainer />
    </header>
  );
}
