import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/SignupPage.css";
import "../../css/LoginPage.css";
// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from 'date-fns';

import { AddNewAccount, VerifyAccount } from "../api/AccountApi";
import { AddNewCustomer } from "../api/CustomerApi";
import LoadingScreen from "../../utils/LoadingScreen";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [name, setName] = useState("");
  const [dob, setDob] = useState(null);
  const [registerEmail, setRegisterEmail] = useState(false);

  const [loadingScreen, setLoadingScreen] = useState(false);

  const [emailError, setEmailError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  // const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [genderError, setGenderError] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [dobError, setDobError] = useState(false);
  const [passwordMismatchError, setPasswordMismatchError] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [dobErrorText, setDobErrorText] = useState("");

  const navigate = useNavigate();

  const lastToastRef = useRef({ message: '', timestamp: 0 });
  const toastCooldown = 3000; // 3 seconds cooldown

  const showToast = (message) => {
    const now = Date.now();
    const { message: lastMessage, timestamp: lastTimestamp } = lastToastRef.current;

    if (lastMessage !== message || (now - lastTimestamp) > toastCooldown) {
      toast.error(message);
      lastToastRef.current = { message, timestamp: now };
    }
  };

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^(0\d{9}|84\d{9})$/; // Starts with 0 and has 10 digits or starts with 84 and has 11 digits
    return phoneRegex.test(phone) && (phone.startsWith('0') || (phone.startsWith('84') && phone.length === 11));
  };

  const handleChangePassword = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordError(!newPassword || !validatePassword(newPassword));
    setPasswordMismatchError(newPassword !== confirmPassword);
  };

  const handleChangeConfirmPassword = (e) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);
    setConfirmPasswordError(!newConfirmPassword);
    setPasswordMismatchError(password !== newConfirmPassword);
  };

  const handleChangePhoneNumber = (e) => {
    let newPhoneNumber = e.target.value;

    // Automatically prepend '+' if the number starts with '84'
    if (newPhoneNumber.startsWith('84') && !newPhoneNumber.startsWith('+84 ')) {
      newPhoneNumber = `+${newPhoneNumber}`;
    }

    setPhoneNumber(newPhoneNumber);
    setPhoneError(!newPhoneNumber || !validatePhoneNumber(newPhoneNumber.replace('+', '')));
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChangeEmail = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    const isValidEmail = validateEmail(newEmail);
    setEmailError(!isValidEmail);
  };

  const handleChangeUsername = (e) => {
    const newUsername = e.target.value;
    setUsername(newUsername);
    setUsernameError(newUsername.length < 5);
  };

  const handleChangeGender = (e) => {
    const newGender = e.target.value;
    setGender(newGender);
    setGenderError(!newGender);
  };

  const handleChangeAddress = (e) => {
    const newAddress = e.target.value;
    setAddress(newAddress);
    setAddressError(!newAddress);
  };

  const handleChangeName = (e) => {
    const newName = e.target.value;
    setName(newName);
    setNameError(!newName);
  };

  const validateDob = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age >= 18 && age <= 100;
  };

  const handleChangeDob = (e) => {
    const newDob = e.target.value;
    const isValidDate = /^\d{4}-\d{2}-\d{2}$/.test(newDob);
    if (!isValidDate) {
      setDobErrorText("Invalid date format. Please use YYYY-MM-DD.");
      setDobError(true);
      return;
    }

    setDob(newDob);
    const isValidDob = validateDob(newDob);
    setDobError(!isValidDob);
    setDobErrorText(isValidDob ? "" : "Date of birth must be greater than 18");
  };

  const handleSignupClick = async (e) => {
    setLoadingScreen(true);

    e.preventDefault();
    setEmailError(!email);
    setUsernameError(!username);
    setConfirmPasswordError(!confirmPassword);
    setGenderError(!gender);
    setAddressError(!address);
    setNameError(!name);
    setDobError(!dob);
    setPasswordMismatchError(password !== confirmPassword);

    if (passwordMismatchError) {
      setLoadingScreen(false);
      return;
    }

    const formattedDob = dob && validateDob(dob) ? format(new Date(dob), 'yyyy-MM-dd') : null;

    const signupData = {
      email,
      username,
      password,
      confirmPassword,
      gender,
      phoneNumber,
      address,
      name,
      dob: formattedDob
    };

    console.log('Signup Data:', signupData);

    sessionStorage.setItem('signupData', JSON.stringify(signupData));

    const data = {
      email: email,
      userName: username,
      password: password,
      dob: formattedDob,
    };

    try {
      const res = await AddNewAccount(data);
      if (res.status >= 200 && res.status < 300) {
        var account = await res.data;
        if (account.accountId != null) {
          sessionStorage.setItem('accountId', account.accountId);

          const verification = await VerifyAccount(account.accountId);
          if (verification.status >= 200 && verification.status < 300) {
            setRegisterEmail(true);
            const customerData = {
              customerName: name,
              dob: formattedDob,
              accountId: res.data.accountId,
              gender: gender,
              phoneNumber: phoneNumber,
              address: address,
            };
            await AddNewCustomer(customerData);
            navigate("/email-confirmation-waiting");
          }
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        showToast('Email or username already in use.');
      } else {
        console.error("Unexpected error:", error);
      }
    } finally {
      setLoadingScreen(false);
    }
  };

  const handleLoginClick = () => {
    navigate("/login");
  };
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleDisabledSignupClick = (e) => {
    e.preventDefault();
    showToast('Please fill in all fields correctly.');
  };

  return (
    <div className="signup-page-container">

      {loadingScreen ? <LoadingScreen /> : ""}

      <div className="brand-container">
        <img src="/images/coco.jpg" alt="Brand" className="brand-img" />
      </div>
      <div className="signup-container">
        <form className="signup-form">
          <p className="signup-form-title">
            Welcome to Koi Transportation Service
          </p>

          {/* Email field */}
          <div className="input-wrapper">
            <input
              type="email"
              className="email-input"
              placeholder="Enter Your Email"
              value={email}
              onChange={handleChangeEmail}
            />
            {emailError && <p className="error-text">Invalid email format</p>}
          </div>

          {/* Username field */}
          <div className="input-wrapper">
            <input
              type="text"
              className="username-input"
              placeholder="Enter Your Username"
              value={username}
              onChange={handleChangeUsername}
            />
            {usernameError && <p className="error-text">Username must be at least 5 characters long</p>}
          </div>

          {/* Password field */}
          <div className="input-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              className="password-input"
              placeholder="Enter Your Password"
              value={password}
              onChange={handleChangePassword}
            />
            <div className="icon-container  ">
              <button
                type="button"
                className="toggle-password-btn"
                onClick={toggleShowPassword}
              >
                <i className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"}></i>
              </button>
              <span className="tooltip-icon">?</span>
              <span className="tooltip-text">
                Password must be at least 8 characters long, include 1 uppercase, 1 lowercase, 1 number, and 1 special character.
              </span>
            </div>
            {passwordError && <p className="error-text">Password is required</p>}
          </div>

          {/* Confirm Password field */}
          <div className="input-wrapper">
            <input
              type={showConfirmPassword ? "text" : "password"}
              className="confirm-password-input"
              placeholder="Confirm Your Password"
              value={confirmPassword}
              onChange={handleChangeConfirmPassword}
            />
            {passwordMismatchError && (
              <p className="error-text">Passwords do not match</p>
            )}
          </div>

          {/* Customer Name field */}
          <div className="input-wrapper">
            <input
              type="text"
              className="address-input"
              placeholder="Enter Your Full Name"
              value={name}
              onChange={handleChangeName}
            />
            {nameError && <p className="error-text">Name is required</p>}
          </div>

          {/* Date of Birth field */}
          <div className="input-wrapper">
            <input
              type="date"
              value={dob || ''}
              onChange={handleChangeDob}
              className="dob-input"
              placeholder="Enter Your Date of Birth"
              min="1924-01-01"
            />
            {dobErrorText && <p className="error-text">{dobErrorText}</p>}
          </div>

          {/* Gender field */}
          <div className="input-wrapper">
            <select
              className="gender-input"
              value={gender}
              onChange={handleChangeGender}
            >
              <option value="" disabled>
                Select Your Gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Others">Other</option>
            </select>
            {genderError && <p className="error-text">Gender is required</p>}
          </div>

          {/* Phone Number field */}
          <div className="input-wrapper">
            <input
              type="tel"
              className="phone-number-input"
              placeholder="Enter Your Phone Number (09x-xxxxxxx)"
              value={phoneNumber}
              onChange={handleChangePhoneNumber}
            />

            {phoneError && <p className="error-text">Phone number is required</p>}

          </div>

          {/* Address field */}
          <div className="input-wrapper">
            <input
              type="text"
              className="address-input"
              placeholder="Enter Your Address"
              value={address}
              onChange={handleChangeAddress}
            />
            {addressError && <p className="error-text">Address is required</p>}
          </div>

          {/* Signup button */}
          <button
            className="signup-btn"
            onClick={handleSignupClick}
            onMouseDown={(e) => {
              if (e.currentTarget.disabled) {
                handleDisabledSignupClick(e);
              }
            }}
            disabled={
              !email ||
              !username ||
              !password ||
              !confirmPassword ||
              !gender ||
              !phoneNumber ||
              !address ||
              !name ||
              !dob ||
              emailError ||
              usernameError ||
              passwordError ||
              confirmPasswordError ||
              genderError ||
              phoneError ||
              addressError ||
              nameError ||
              dobError ||
              passwordMismatchError
            }
          >
            Create Account
          </button>
          {registerEmail ? (
            <h3 style={{ color: "yellow" }}>Check Your Email For Verification Code</h3>
          ) : ""}
          <div className="to-login-container">
            <p className="to-login-text">Already have an account? </p>
            <a href="/login" className="to-login-btn">
              Log In.
            </a>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignupPage;
