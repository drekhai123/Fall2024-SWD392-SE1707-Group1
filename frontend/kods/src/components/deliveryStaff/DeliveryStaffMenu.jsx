
import { useRef, useState } from 'react';
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import "../../css/DeliveryStaffMenu.css"
import { ExitToAppSharp, NoteAdd, Person } from '@mui/icons-material';
import { googleLogout } from '@react-oauth/google';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
        
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
            group="headless"
            content={({ headerRef, contentRef, footerRef, hide, message }) => (
                <div className="flex flex-column align-items-center p-5 surface-overlay border-round">
                    <div className="border-circle bg-primary inline-flex justify-content-center align-items-center h-6rem w-6rem -mt-8">
                        <i className="pi pi-question text-5xl"></i>
                    </div>
                    <span className="font-bold text-2xl block mb-2 mt-4" ref={headerRef}>
                        {message.header}
                    </span>
                    <p className="mb-0" ref={contentRef}>
                        {message.message}
                    </p>
                    <div className="flex align-items-center gap-2 mt-4" ref={footerRef}>
                        <Button
                            label="Save"
                            onClick={(event) => {
                                hide(event);
                                accept();
                            }}
                            className="w-8rem"
                        ></Button>
                        <Button
                            label="Cancel"
                            outlined
                            onClick={(event) => {
                                hide(event);
                                reject();
                            }}
                            className="w-8rem"
                        ></Button>
                    </div>
                </div>
            )}

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
