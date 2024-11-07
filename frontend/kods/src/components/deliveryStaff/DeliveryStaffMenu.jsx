
import { useRef, useState } from 'react';
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import "../../css/DeliveryStaffMenu.css"
import { ExitToAppSharp, NoteAdd, Person } from '@mui/icons-material';
import { googleLogout } from '@react-oauth/google';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { useNavigate } from 'react-router-dom';
        
export default function DeliveryStaffMenu({ setSelectedMenu }) {
    const navigate = useNavigate()
    const toast = useRef(false);

    const accept = () => {
        toast.current.show({ severity: 'complete', summary: 'Confirmed', detail: 'You have logged out', life: 3000 });
        logout()
    }

    const reject = () => {
        toast.current.show({ severity: 'warn', summary: 'Canceled', detail: 'You stay logged in', life: 3000 });
       
    }

    const confirmLogout = () => {
        confirmDialog({
            message: 'Do you want to Log Out',
            header: 'Log Out Confirmation',
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
        navigate('/');
      };
    const leaveHover=()=>{
            setHoveredItem(null);
        }
    const [hoveredItem, setHoveredItem] = useState(null);
    return (
        <div className="deliveryNavbar">
            <Toast ref={toast} />
            <ConfirmDialog 
            defaultFocus
            style={{ width: '30vw' }}
            breakpoints={{ '1100px': '75vw', '960px': '100vw' }}
            
            />
            <h2 className="deliveryNavHeader">Delivery Staff</h2>
            <a
                className="deliveryNavItem"
                onMouseEnter={() => setHoveredItem("transport")}
                onClick={() => setSelectedMenu("transport")}
                onMouseLeave={() => leaveHover()}
            >
                <LocalShippingIcon />
                {hoveredItem === "transport" && (
                    <span className="nav-description">View Current Transport</span>
                )}
            </a>

            <a
                className="deliveryNavItem"
                onMouseEnter={() => setHoveredItem("log")}
                onClick={() => setSelectedMenu("log")}
                onMouseLeave={() => leaveHover()}
            >
                <NoteAdd />
                {hoveredItem === "log" && (
                    <span className="nav-description">Record Your Transport Log</span>
                )}
            </a>
            <a
                className="deliveryNavItem"
                onMouseEnter={() => setHoveredItem("profile")}
                onClick={() => setSelectedMenu("profile")}
                onMouseLeave={() => leaveHover()}
            >
                <Person />
                {hoveredItem === "profile" && (
                    <span className="nav-description">View Your Profile</span>
                )}
            </a>
            <a
                onClick={()=>confirmLogout()}
                className="deliveryNavItem"
                onMouseEnter={() => setHoveredItem("exist")}
                onMouseLeave={() => leaveHover()}
            >
                <ExitToAppSharp />
                {hoveredItem === "exist" && (
                    <span className="nav-description">Logging Off The System! Have A Nice Day!</span>
                )}
            </a>
        </div>
       
    )
}
