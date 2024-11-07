import React, { useState } from 'react'
import TransportPage from './TransportPage';
import Profile from './Profile';
import LogPage from './LogPage';

export default function MainPage({currentPage,userData}) {
    const [currentOrder,setCurrentOrder] = useState();
    switch(currentPage){
        case "log":
            return <LogPage
                selectOrder={currentOrder}
                userData={userData}
            />
        case "transport":
            return <TransportPage
                userData={userData}
                setCurrentOrder={setCurrentOrder}
            />
        case "profile":
            return <Profile
                userData={userData}
            />
    }
}
