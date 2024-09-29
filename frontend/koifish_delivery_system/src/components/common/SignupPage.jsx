import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/SignupPage.css';

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };
  const handleSignupClick = (e) => {
    e.preventDefault();
  };
  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className='signup-page-container'>
      <div className='brand-container'>
        <img src='/assets/brand.jpg' alt='Brand' className='brand-img' />
      </div>
      <div className='signup-container'>
        <form className='signup-form'>
          <p className='signup-form-title'>
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
          <input
            type='text'
            className='confirm-password-input'
            placeholder='Confirm Your Password'
            value={confirmPassword}
            onChange={handleChangeConfirmPassword}
          />
          <button className='signup-btn' onClick={handleSignupClick}>
            Create Account
          </button>
          <div className='to-login-container'>
            <p className='to-login-text'>Already have an account?</p>
            <button className='to-login-btn' onClick={handleLoginClick}>
              Log In.
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
