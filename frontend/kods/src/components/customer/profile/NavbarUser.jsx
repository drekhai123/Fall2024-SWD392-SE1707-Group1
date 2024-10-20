import React from "react";
import { Link } from "react-router-dom";

export default function NavbarUser() {
  const user = JSON.parse(localStorage.getItem("user")); // Lấy thông tin người dùng từ localStorage

  const logout = () => { // Hàm đăng xuất
    localStorage.removeItem("user");
    window.location.reload(); // Tải lại trang
  };

  return (
    <header className="relative w-full h-16 mb-5 z-50">
      <nav className="fixed flex justify-between top-0 w-full py-4 bg-black bg-opacity-80 transition-opacity duration-300 ease-in-out z-1000 opacity-50 hover:opacity-100">
        <div className="flex">
          <ul className="flex gap-10 pl-4 list-none">
            <li className="text-white cursor-pointer transition-all duration-300 ease-in-out text-lg hover:text-[#ff7700]">
              <Link to="/">HOME</Link> {/* Thêm liên kết cho HOME */}
            </li>
            <li className="text-white cursor-pointer transition-all duration-300 ease-in-out text-lg hover:text-[#ff7700]">
              <Link to="/about">ABOUT</Link> {/* Thêm liên kết cho ABOUT */}
            </li>
            <li className="text-white cursor-pointer transition-all duration-300 ease-in-out text-lg hover:text-[#ff7700]">
              <Link to="/orderform">Make An Order</Link> {/* Thêm liên kết cho Make An Order */}
            </li>
            <li className="text-white cursor-pointer transition-all duration-300 ease-in-out text-lg">
              <Link to="/feedback">FEEDBACK</Link>
            </li>
            <li className="text-white cursor-pointer transition-all duration-300 ease-in-out text-lg">
              <Link to="/ordertracking">ORDERTRACKING</Link>
            </li>
            <li className="text-white cursor-pointer transition-all duration-300 ease-in-out text-lg">
              <Link to="/contact">CONTACT</Link> {/* Thêm liên kết cho CONTACT */}
            </li>
          </ul>
        </div>
        <div className="flex items-center pr-4">
          {user ? ( // Nếu người dùng đã đăng nhập
            <div className="text-white cursor-pointer transition-all duration-300 ease-in-out text-lg">
              <Link to="/profile">Hello {user.userName}!</Link> {/* Hiển thị tên người dùng */}
              <button className="btn-Logout" onClick={logout}>LOGOUT</button> {/* Nút đăng xuất */}
            </div>
          ) : ( // Nếu chưa đăng nhập
            <div className="text-white cursor-pointer transition-all duration-300 ease-in-out text-lg hover:text-[#ff7700]">
              <Link to="/login">LOGIN</Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
