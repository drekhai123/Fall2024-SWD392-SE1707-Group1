import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleLoginClick = (e) => {
    e.preventDefault();
  };
  const handleSignupClick = () => {
    navigate('/signup');
  };

  return (
    <div className='login-page-container'>
      <div className='brand-container'>
        <img src='/assets/brand.jpg' alt='Brand' className='brand-img' />
      </div>
      <div className='login-container'>
        <form className='login-form'>
          <p className='login-form-title'>
            Welcome to Koi Transportation Service
          </p>
          <input
            type='text'
            className='username-input'
            placeholder='Enter Your Username'
            value={username}
            onChange={handleChangeUsername}
          />
          <input
            type='text'
            className='password-input'
            placeholder='Enter Your Password'
            value={password}
            onChange={handleChangePassword}
          />
          <button className='login-btn' onClick={handleLoginClick}>
            Login
          </button>
          <div className='to-signup-container'>
            <p className='to-signup-text'>Don't have an account?</p>
            <button className='to-signup-btn' onClick={handleSignupClick}>
              Sign Up.
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
