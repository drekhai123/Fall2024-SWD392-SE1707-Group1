
import { useState } from 'react';
import HistoryIcon from '@mui/icons-material/History';
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import "../../css/DeliveryStaffMenu.css"
import { ExitToAppSharp, Person } from '@mui/icons-material';
import { Panel } from 'primereact/panel';
import { Divider } from 'primereact/divider';
import { googleLogout } from '@react-oauth/google';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
        
export default function DeliveryStaffMenu({ setSelectedMenu }) {
    const navigate = useNavigate()
    const logout = () => {
        googleLogout()
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("token");
        toast.success("Logged out successfully!");
        navigate('/');
      };
    const [hoveredItem, setHoveredItem] = useState(null);
    return (
        <div class="deliveryNavbar">
            <h2 className="deliveryNavHeader">Delivery Staff</h2>
            <a
                className="deliveryNavItem"
                onMouseEnter={() => setHoveredItem("transport")}
                onClick={() => setSelectedMenu("transport")}
            >
                <LocalShippingIcon />
                {hoveredItem === "transport" && (
                    <span className="nav-description">View Current Transport</span>
                )}
            </a>

            <a
                className="deliveryNavItem"
                onMouseEnter={() => setHoveredItem("history")}
                onClick={() => setSelectedMenu("history")}
            >
                <HistoryIcon />
                {hoveredItem === "history" && (
                    <span className="nav-description">View All Of Your Transport </span>
                )}
            </a>
            <a
                className="deliveryNavItem"
                onMouseEnter={() => setHoveredItem("profile")}
                onClick={() => setSelectedMenu("profile")}
            >
                <Person />
                {hoveredItem === "profile" && (
                    <span className="nav-description">View Your Profile</span>
                )}
            </a>
            <a
                onClick={()=>logout()}
                className="deliveryNavItem"
                onMouseEnter={() => setHoveredItem("exist")}
            >
                <ExitToAppSharp />
                {hoveredItem === "exist" && (
                    <span className="nav-description">Logging Off The System! Have A Nice Day!</span>
                )}
            </a>
        </div>
       
    )
}
