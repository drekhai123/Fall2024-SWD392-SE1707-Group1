import React, { useState } from 'react'
import DeliveryStaffMenu from './DeliveryStaffMenu'
import MainPage from './MainPage'
import '../../css/DeliveryStaffPage.css'

export default function Dashboard() {
    // State to keep track of the selected menu item
    const [selectedMenu, setSelectedMenu] = useState("transport")
    return (
        <>
            <DeliveryStaffMenu
                setSelectedMenu={setSelectedMenu}
            />
            <MainPage
                currentPage={selectedMenu}
            />
        </>
    )
}
