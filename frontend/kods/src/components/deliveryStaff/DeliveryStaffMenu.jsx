
import { useRef, useState } from 'react';
import HistoryIcon from '@mui/icons-material/History';
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import "../../css/DeliveryStaffMenu.css"
import { ExitToAppSharp, Person } from '@mui/icons-material';
import { googleLogout } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { Toast } from 'primereact/toast';
import { confirmDialog, ConfirmDialog } from 'primereact/confirmdialog';

export default function DeliveryStaffMenu({ setSelectedMenu }) {
    const navigate = useNavigate()
    const toast = useRef(null);

    const accept = () => {
        toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'You have logged out', life: 3000 });
        logout()
    }

    const reject = () => {
        toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You stay logged in', life: 3000 });

    }

    const confirmLogout = () => {
        confirmDialog({
            message: 'Do you want to Log Out',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            defaultFocus: 'reject',
            acceptClassName: 'p-button-danger',
            accept,
            reject
        });
    };

    const logout = () => {
        googleLogout()
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("token");
        toast.success("Logged out successfully!");
        navigate('/');
    };
    const [hoveredItem, setHoveredItem] = useState(null);
    return (
        <div className="deliveryNavbar">
            <Toast ref={toast} />
            <div className="no-tailwind">
                <ConfirmDialog />
            </div>
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
                onClick={() => confirmLogout()}
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
