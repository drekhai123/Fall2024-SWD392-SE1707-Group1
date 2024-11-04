import React from 'react'
import TransportPage from './TransportPage';
import Profile from './Profile';
import LogPage from './LogPage';

export default function MainPage({currentPage,userData}) {
    switch(currentPage){
        case "log":
            return <LogPage
                userData={userData}
            />
        case "transport":
            return <TransportPage
                userData={userData}
            />
        case "profile":
            return <Profile
                userData={userData}
            />
    }
}
