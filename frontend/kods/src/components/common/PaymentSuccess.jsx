import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../../css/Payment.css";
import { getJwtToken } from '../api/Url';

const PaymentSuccess = () => {
  const navigate = useNavigate(); // Initialize navigate
  const [paymentStatus, setPaymentStatus] = useState(null); // State to manage payment status
  const token = getJwtToken(); // Get JWT token

  useEffect(() => {
    // Get the current URL
    const currentUrl = window.location.href;

    // Create a URL object to parse the query parameters
    const url = new URL(currentUrl);
    const params = new URLSearchParams(url.search);

    // Extract the vnp_TxnRef value
    const txnRef = params.get('vnp_TxnRef');
    const responseCode = params.get('vnp_ResponseCode');
    if (txnRef) {
      // Prepare the data for the POST request
      const data = {
        vnpTxnRef: txnRef, // Changed key to vnpTxnRef
        vnpResponseCode: responseCode
      };

      // Call the API to execute the payment
      const executePayment = async () => {
        try {
          const response = await axios.post('https://kdosdreapiservice.azurewebsites.net/api/VNPay/Execute', data, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          console.log('Payment executed successfully:', response.data); // Log the entire response

          // Check the structure of the response
          console.log('Full response:', response);

          // Extract vnp_ResponseCode and vnp_TxnRef
          const IsSuccess = response.data.success;
          const responseTxnRef = response.data.vnp_TxnRef;
          if (responseCode) {
            console.log('IsSuccess????:', IsSuccess);
            console.log('vnp_TxnRef:', responseTxnRef);

            // Check the response code and set the payment status
            if (IsSuccess === true) {
              setPaymentStatus("Payment successfully completed.");
            } else if (IsSuccess === false) {
              setPaymentStatus("Payment failed.");
            } else {
              setPaymentStatus("Payment status unknown.");
            }
          } else {
            console.warn('vnp_ResponseCode not found in the response.');
            setPaymentStatus("Payment status unknown.");
          }

        } catch (error) {
          console.error('Error executing payment:', error);
          setPaymentStatus("Error executing payment.");
        }
      };

      executePayment();
    } else {
      console.error('Transaction reference not found in the URL.');
      setPaymentStatus("Transaction reference not found.");
    }
  }, [token]); // Added token as a dependency

  const handleBackToHome = () => {
    navigate("/"); // Navigate back to home
  };

  return (
    <div className="payment-page">
      <div className="card">
        <h1 className="title">Payment Status</h1>
        {paymentStatus ? (
          <p className="message">{paymentStatus}</p>
        ) : (
          <p className="message">Processing payment...</p>
        )}
        <button onClick={handleBackToHome} className="button">
          Back to Homepage
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;