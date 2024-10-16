import React from "react";
import { Link } from "react-router-dom";

export default function NavbarUser() {
  return (
    <header className="relative w-full h-16 mb-5 z-50">
      <nav className="fixed flex justify-between top-0 w-full py-4 bg-black bg-opacity-80 transition-opacity duration-300 ease-in-out z-1000 opacity-50 hover:opacity-100">
        <div className="flex">
          <ul className="flex gap-10 pl-4 list-none">
            <li className="text-white cursor-pointer transition-all duration-300 ease-in-out text-lg hover:text-[#ff7700]">
              HOME
            </li>
            <li className="text-white cursor-pointer transition-all duration-300 ease-in-out text-lg hover:text-[#ff7700]">
              ABOUT
            </li>
            <li className="text-white cursor-pointer transition-all duration-300 ease-in-out text-lg hover:text-[#ff7700]">
              SERVICE
            </li>
            <li className="text-white cursor-pointer transition-all duration-300 ease-in-out text-lg">
              <Link to="/feedback">FEEDBACK</Link>
            </li>
            <li className="text-white cursor-pointer transition-all duration-300 ease-in-out text-lg">
              <Link to="/ordertracking">ORDERTRACKING</Link>
            </li>
            <li className="text-white cursor-pointer transition-all duration-300 ease-in-out text-lg">
              CONTACT
            </li>
          </ul>
        </div>
        <div className="flex items-center pr-4">
          <div className="text-white cursor-pointer transition-all duration-300 ease-in-out text-lg hover:text-[#ff7700]">
            <Link to="/login">LOGIN</Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
