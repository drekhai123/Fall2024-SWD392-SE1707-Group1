import React from "react";
import "../../css/footer.css";

export default function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-column">
        <h3>Our Service Assurance</h3>
        <p>
          We guarantee top-notch services that cater to all your needs, ensuring
          satisfaction and excellence in every aspect. Trust us to deliver the
          best!
        </p>
      </div>

      <div className="footer-column">
        <h3>Related Blog Posts</h3>
        <ul className="blog-links">
          <li><a href="#1">How to maximize your experience</a></li>
          <li><a href="#2">Top tips for our service</a></li>
          <li><a href="#3">Customer success stories</a></li>
          <li><a href="#4">New features and updates</a></li>
        </ul>
      </div>

      <div className="footer-column">
        <h3>Contact Us</h3>
        <p>Email:aduconcachienxu@gmail.com</p>
        <p>Phone: (+84) 456-7890</p>
        <p>Address: 10.87.27.2:3000</p>
      </div>
    </footer>
  );
};
