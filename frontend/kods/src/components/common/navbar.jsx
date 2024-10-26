import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../../css/navbar.css";

export default function Navbar() {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const navigate = useNavigate();
  const logout = () => {
    sessionStorage.removeItem("user");
    navigate('/');
    window.location.reload();
  };
  const navigate1 = useNavigate();
  const gotoOderForm = () => {
    navigate1('/OrderForm'); 
  };

  return (
    <header className="header-container">
      <nav className="navbar">
        <div className="nav-left">
          <ul className="nav-list">
            <li className="nav-item"><Link to={"/"}>HOME</Link></li>
            <li className="nav-item">ABOUT</li>
            <li className="nav-item"><Link to={"/orderform"}>DELIVERY</Link></li>
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
            <ul className="nav-list">
            <li className="nav-item"><Link to="/profile">VIEW PROFILE</Link> {}</li>
            <li className="nav-item"> Hello, {user.userName}!</li>
            <li className="nav-item"><button className="btn-Logout" onClick={logout}>LOGOUT</button> {}</li>
            </ul>
          </div>
        ) : ( // chưa đăng nhập, hiển thị LOGIN
          <div className="nav-right">
            <div className="nav-item-login">
              <Link className="btn-login" to="/login">LOGIN</Link> {}
            </div>
          </div>
        )}

      </nav>
    </header>
  );
}
