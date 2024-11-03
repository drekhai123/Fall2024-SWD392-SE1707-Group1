import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CustomersList } from "./CustomersList";
import { PendingOrders } from "./PendingOrders";
import { Transports } from "./Transports";

export function StaffDashBoard() {
  const navigation = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("user"));
  const [selectedMenu, setSelectedMenu] = useState("Pending Orders");

  useEffect(()=>{
    if(!user){
      alert("Please login to continue...");
      navigation("/login");
    }
  },[user])
  
  // Function to render the selected component
  const renderComponent = () => {
    switch (selectedMenu) {
      case "Pending Orders":
        return <PendingOrders />;
      case "Transports":
        return <Transports />;
      case "Customers List":
        return <CustomersList />;
      default:
        return <PendingOrders />;
    }
  };

  return (
    <div className="flex">
      {/* Sidebar Menu */}
      <div className="w-1/4 h-screen bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold mb-6">Staff Menu</h2>
        <ul className="space-y-4">
          <li
            className="hover:bg-gray-700 p-2 rounded cursor-pointer"
            onClick={() => setSelectedMenu("Pending Orders")}
          >
            Pending Orders
          </li>
          <li
            className="hover:bg-gray-700 p-2 rounded cursor-pointer"
            onClick={() => setSelectedMenu("Transports")}
          >
            Transports
          </li>
          <li
            className="hover:bg-gray-700 p-2 rounded cursor-pointer"
            onClick={() => setSelectedMenu("Customers List")}
          >
            Customers List
          </li>
        </ul>
      </div>

      {/* Main Dashboard Content */}
      <div className="w-3/4 p-6">
        <h1 className="text-3xl font-bold mb-4">{selectedMenu}</h1>
        {/* Render selected component based on the menu */}
        {renderComponent()}
      </div>
    </div>
  );
}
