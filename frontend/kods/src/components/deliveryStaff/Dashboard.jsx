import React, { useEffect, useState } from 'react'
import DeliveryStaffMenu from './DeliveryStaffMenu'
import MainPage from './MainPage'
import { useNavigate } from 'react-router-dom'


export default function Dashboard() {
    // State to keep track of the selected menu item
    const [selectedMenu, setSelectedMenu] = useState("transport")
    const [userData, setUserData] = useState(null)
    useEffect(() => {
        const checkAuthen = () => {
            const userData = JSON.parse(sessionStorage.getItem('user'));
            console.log(userData)
            if (userData === null || userData.role !== "delivery") {
                alert("You are not authorize for this page")
                navigate("/")
            } else {
                setUserData(userData)
            }
        }
        checkAuthen()
    }, [])
    const navigate = useNavigate()

    return (
        <>
            {userData ?
                <>
                    <DeliveryStaffMenu
                        setSelectedMenu={setSelectedMenu}
                    />
                    <MainPage
                        currentPage={selectedMenu}
                        userData={userData}
                    />
                </>
                :
                ""
            }
        </>
    )
}
