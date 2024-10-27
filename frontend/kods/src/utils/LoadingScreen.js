import React from 'react'
import "../css/loadingScreen.css"
export default function LoadingScreen() {
  return (
    <div className="loading-screen-overlay">
    <img src="/images/loading.gif" alt="Loading..."/>
    </div>
  )
}
