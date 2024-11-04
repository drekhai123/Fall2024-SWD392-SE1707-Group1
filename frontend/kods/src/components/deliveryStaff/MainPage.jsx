import React from 'react'
import HistoryPage from './HistoryPage';
import TransportPage from './TransportPage';
import Profile from './Profile';

export default function MainPage({currentPage}) {
    switch(currentPage){
        case "history":
            return <HistoryPage/>
        case "transport":
            return <TransportPage/>
        case "profile":
            return <Profile/>
    }
}
