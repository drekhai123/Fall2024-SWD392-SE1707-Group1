import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../../css/Payment.css";
const PaymentSuccess = () => {
const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    // Get the current URL
    const currentUrl = window.location.href;

    // Create a URL object to parse the query parameters
    const url = new URL(currentUrl);
    const params = new URLSearchParams(url.search);

    // Extract the vnp_TxnRef value
    const txnRef = params.get('vnp_TxnRef');

    if (txnRef) {
      // Prepare the data for the POST request
      const data = {
        vnpTxnRef: txnRef, // Changed key to vnpTxnRef
      };

      // Call the API to execute the payment
      const executePayment = async () => {
        try {
          const response = await axios.post('https://kdosdreapiservice.azurewebsites.net/api/VNPay/Execute', data);
          console.log('Payment executed successfully:', response.data);
          // Handle success (e.g., show a success message or redirect)
        } catch (error) {
          console.error('Error executing payment:', error);
          // Handle error (e.g., show an error message)
        }
      };

      executePayment();
    } else {
      console.error('Transaction reference not found in the URL.');
      // Handle the case where txnRef is not found
    }
  }, []);

  const handleBackToHome = () => {
    navigate("/"); // Navigate back to home
  };

  return (

      <div className="card">
        <h1 className="title">Payment Successful!</h1>
        <p className="message">
          Thank you for your purchase. Your transaction has been completed successfully.
        </p>
        <button onClick={handleBackToHome} className="button">
          Back to Homepage
        </button>
      </div>

  );
};

export default PaymentSuccess;