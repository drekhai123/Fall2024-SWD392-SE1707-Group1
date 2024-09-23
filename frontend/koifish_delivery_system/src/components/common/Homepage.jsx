import React from 'react'
import "../../css/Homepage.css"
export default function Homepage() {
  return (
    <div>
        <div className="header">
        <h1>Koi Fish Delivery Systems</h1>
      </div>

      <div className="main-content">
        <img src={".png"} alt="Koi Fish" className="koi-image" />
        <p>Welcome to our Koi Fish Delivery Systems website! We specialize in providing high-quality Koi fish to enthusiasts and aquatic hobbyists around the world. Our mission is to ensure that our customers receive healthy, vibrant fish that will thrive in their aquatic environments.</p>
        <p>Our team of experts has years of experience in breeding and caring for Koi fish, and we are dedicated to providing the best possible service to our customers. We offer a wide variety of Koi fish species, as well as a range of accessories and supplies to help you care for your fish.</p>
        <p>Whether you are a seasoned Koi fish enthusiast or a newcomer to the hobby, we are confident that you will find everything you need right here on our website. Thank you for choosing Koi Fish Delivery Systems for all your aquatic needs!</p>
      </div>

      <div className="footer">
        <p>&copy; 2022 Koi Fish Delivery Systems</p>
      </div>
    </div>
            
  )
}