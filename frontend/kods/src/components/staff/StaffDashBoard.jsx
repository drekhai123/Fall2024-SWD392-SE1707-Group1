import { useState } from "react";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Menu } from "primereact/menu";
import { CustomersList } from "./CustomersList";
import { PendingOrders } from "./PendingOrders";
import { Transports } from "./Transports";
import { useNavigate } from "react-router-dom";

export function StaffDashBoard() {
  const [selectedMenu, setSelectedMenu] = useState("Pending Orders");
  const navigate = useNavigate();

  // Function to handle logout
  const handleLogout = () => {
    console.log("Logged out");
    sessionStorage.removeItem("staff");
    sessionStorage.removeItem("token");
    navigate("/");
  };

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
        <Menu model={[
          { label: 'Pending Orders', command: () => setSelectedMenu("Pending Orders") },
          { label: 'Transports', command: () => setSelectedMenu("Transports") },
          { label: 'Customers List', command: () => setSelectedMenu("Customers List") }
        ]} />
        <Button
          label="Logout"
          icon="pi pi-sign-out"
          className="mt-6 w-full"
          onClick={handleLogout}
        />
      </div>

      {/* Main Dashboard Content */}
      <div className="w-3/4 p-6 relative flex flex-col ">
        <Card title={selectedMenu} className="mb-4 ">
          {/* Render selected component based on the menu */}
          {renderComponent()}
        </Card>
      </div>
    </div>
  );
}
