import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/SignupPage.css';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gender, setGender] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const navigate = useNavigate();

  
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };
  const handleChangeGender = (e) => {
    setGender(e.target.value);
  };
  const handleChangePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
  };
  const handleChangeAddress = (e) => {
    setAddress(e.target.value);
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
      <img src='/images/coco.jpg' alt='Brand' className='brand-img' />
      </div>
      <div className='signup-container'>
        <form className='signup-form'>
          <p className='signup-form-title'>
            Welcome to Koi Transportation Service
          </p>

          {/* Email field */}
          <input
            type='email'
            className='email-input'
            placeholder='Enter Your Email'
            value={email}
            onChange={handleChangeEmail}
          />

          {/* Username field */}
          <input
            type='text'
            className='username-input'
            placeholder='Enter Your Username'
            value={username}
            onChange={handleChangeUsername}
          />

          {/* Password field */}
          <input
            type='password'
            className='password-input'
            placeholder='Enter Your Password'
            value={password}
            onChange={handleChangePassword}
          />

          {/* Confirm Password field */}
          <input
            type='password'
            className='confirm-password-input'
            placeholder='Confirm Your Password'
            value={confirmPassword}
            onChange={handleChangeConfirmPassword}
          />

          {/* Gender field */}
          <select className='gender-input' value={gender} onChange={handleChangeGender}>
            <option value='' disabled>
              Select Your Gender
            </option>
            <option value='male'>Male</option>
            <option value='female'>Female</option>
            <option value='other'>Other</option>
          </select>

          {/* Phone Number field */}
          <input
            type='tel'
            className='phone-number-input'
            placeholder='Enter Your Phone Number'
            value={phoneNumber}
            onChange={handleChangePhoneNumber}
          />

          {/* Address field */}
          <input
            type='text'
            className='address-input'
            placeholder='Enter Your Address'
            value={address}
            onChange={handleChangeAddress}
          />

          {/* Signup button */}
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
