import { useNavigate } from "react-router-dom"

export default function PaymentSuccess() {
    const navigate = useNavigate();

    const handleBackToHome = () => {
      navigate("/");
    }

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
      icon: {
        width: '100px',
        height: '100px',
        marginBottom: '24px',
        animation: 'scaleIn 0.5s ease-out',
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
      buttonHover: {
        backgroundColor: '#2980b9',
      },
      buttonActive: {
        transform: 'scale(0.98)',
      },
    }

    // Animations
    const keyframes = `
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes scaleIn {
        from { transform: scale(0); }
        to { transform: scale(1); }
      }
    `

    return (
      <div style={styles.container}>
        <style>{keyframes}</style>
        <div style={styles.card}>
          <svg
            style={styles.icon}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="12" r="10" stroke="#4CAF50" strokeWidth="2" />
            <path
              d="M8 12L11 15L16 9"
              stroke="#4CAF50"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <h1 style={styles.title}>Payment Successful!</h1>
          <p style={styles.message}>
            Thank you for your purchase. Your transaction has been completed
            successfully.
          </p>
          <button
            onClick={handleBackToHome}
            style={styles.button}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = styles.buttonHover.backgroundColor
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = styles.button.backgroundColor
            }}
            onMouseDown={(e) => {
              e.target.style.transform = styles.buttonActive.transform
            }}
            onMouseUp={(e) => {
              e.target.style.transform = 'scale(1)'
            }}
          >
            Back to Homepage
          </button>
        </div>
      </div>
    )
  }