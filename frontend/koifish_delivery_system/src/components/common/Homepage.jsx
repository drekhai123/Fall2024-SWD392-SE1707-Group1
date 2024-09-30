import React, { useEffect, useRef } from "react";
import Navbar from './navbar'
import "../../css/Homepage.css"
import Footer from "./footer";
import Blogcarousel from "./blogcarousel";
import Customerdashboard from "../admin/customerdashboard";
import OrderNoti from './OrderNoti'; // Import the OrderNoti component
export default function Homepage() {
    const rowsRef = useRef([]);
    const imageList = [
      "/images/homepage1.png",
      "/images/homepage2.png",
      "/images/homepage3.png"
    ];
    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible"); // Add visible class when in view
            } else {
              entry.target.classList.remove("visible"); // Remove visible class when out of view
            }
          });
        },
        { threshold: 0.1 } // Trigger when 10% of the row is visible
      );
  
      // Copy the current ref values to a local variable
      const rows = rowsRef.current;
  
      // Observe each row
      rows.forEach((row) => {
        if (row) {
          observer.observe(row);
        }
      });
      return () => {
        // Cleanup: unobserve all rows when component unmounts
        rows.forEach((row) => {
          if (row) observer.unobserve(row);
        });
      };
    }, []); // Empty dependency array so this runs only on mount
  return (
    <>
    <div>
        <Navbar/>
        <OrderNoti /> {/* Add the OrderNoti component here */}

        <section className="content-section">
      <div className="row" ref={(el) => (rowsRef.current[0] = el)}>
        <img
          src={imageList[0]}
          alt="Feature 1"
          className="content-image"
        />
        <div className="content-text">
          <h2>Our Services</h2>
          <p>
          With a carefully curated selection of high-quality koi, we ensure each delivery meets the highest standards in terms of health, vitality, and aesthetic appeal. Whether you're a first-time pond owner or an experienced enthusiast, our koi fish delivery service allows you to enjoy these magnificent creatures without the hassle of visiting a physical store. Experience the convenience of having your dream koi delivered safely and professionally.
          </p>
        </div>
      </div>
      <div className="divider"></div>
      <div className="row reverse" ref={(el) => (rowsRef.current[1] = el)}>
        <img
          src={imageList[1]}
          alt="Feature 2"
          className="content-image"
        />
         <div className="content-text">
          <h2>Health Care</h2>
          <p>
        We understand how crucial it is to maintain the well-being of koi fish during transit. That’s why we take extra precautions to ensure that each fish is carefully handled from the moment it leaves our facility to its arrival at your home. Our koi are transported in oxygenated, temperature-controlled environments to minimize stress and ensure their safety. Upon arrival, we provide you with easy-to-follow guidelines on how to acclimate your koi to their new pond, ensuring they thrive in their new surroundings with minimal stress.
        </p>
        </div>
      </div>
      <div className="divider"></div>
      <div className="row" ref={(el) => (rowsRef.current[2] = el)}>
        <img
          src={imageList[2]}
          alt="Feature 1"
          className="content-image"
        />
        <div className="content-text">
          <h2>Our Team</h2>
          <p>
          Our team is comprised of koi fish experts with years of experience in aquatic care and transport. From certified fish health professionals to experienced handlers, we take pride in the care and attention we give to every step of the delivery process. Our professionals are not only passionate about koi but are also dedicated to providing excellent customer service. You can trust our team to guide you through every aspect of your koi ownership journey, from selecting the perfect fish to ensuring its long-term health.
          </p>
        </div>
      </div>
      <div className="divider"></div>
      <Blogcarousel/>
      <div className="divider"></div>
      <Customerdashboard/>
    </section>
    </div>
    <Footer/>
    </>   

  )
}
