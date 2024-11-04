import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom"; // Import useNavigate

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

  // Styles
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#f0f8ff', // Light blue background
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      transition: 'background-color 0.5s ease',
    },
    card: {
      backgroundColor: 'white',
      borderRadius: '16px',
      padding: '40px',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
      textAlign: 'center',
      maxWidth: '400px',
      width: '90%',
      animation: 'fadeIn 0.5s ease-out',
    },
    title: {
      fontSize: '28px',
      color: '#2c3e50',
      marginBottom: '16px',
      fontWeight: 'bold',
    },
    message: {
      fontSize: '18px',
      color: '#34495e',
      marginBottom: '32px',
      lineHeight: '1.5',
    },
    button: {
      backgroundColor: '#3498db',
      color: 'white',
      border: 'none',
      borderRadius: '30px',
      padding: '12px 30px',
      fontSize: '18px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease, transform 0.1s ease',
      outline: 'none',
    },
  };

  const handleBackToHome = () => {
    navigate("/"); // Navigate back to home
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Payment Successful!</h1>
        <p style={styles.message}>
          Thank you for your purchase. Your transaction has been completed successfully.
        </p>
        <button onClick={handleBackToHome} style={styles.button}>
          Back to Homepage
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;