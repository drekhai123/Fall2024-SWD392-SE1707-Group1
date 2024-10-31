import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../css/NotFound.module.css';

export default function NotFound() {
  const navigate = useNavigate();
  const goBackHome = () => {
    navigate('/');
  };

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        {[1, 2, 3].map((index) => {
          const randomDuration = `${Math.random() * 3 + 2}s`;
          return (
            <img
              key={index}
              style={{ animationDuration: randomDuration }} // Float random speed is more funny :>
              src="images/diedfish.png"
              alt="404"
              className={styles.image}
            />
          );
        })}
      </div>
      <p className={styles.text}>Oops! Page not found.</p>
      <button className={styles.homeButton} onClick={goBackHome}>
        Back to Homepage
      </button>
    </div>
  );
}
