import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/SignupPage.css";
import { regCus, signUp } from "../api/Auth.api";
import { toast } from "react-toastify";
import { AddNewAccount, VerifyAccount } from "../api/AccountApi";
import { AddNewCustomer } from "../api/CustomerApi";

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
  const [age, setAge] = useState("");
  const [registerEmail, setRegisterEmail] = useState(false);
  // Trạng thái cho lỗi bỏ trống
  const [emailError, setEmailError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [genderError, setGenderError] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [ageError, setAgeError] = useState(false);

  const navigate = useNavigate();

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^09\d-\d{7}$/;
    return phoneRegex.test(phone);
  };

  const handleChangePassword = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordError(!validatePassword(newPassword));
  };

  const handleChangePhoneNumber = (e) => {
    const newPhoneNumber = e.target.value;
    setPhoneNumber(newPhoneNumber);
    setPhoneError(!validatePhoneNumber(newPhoneNumber));
  };

  const handleSignupClick = async (e) => {
    e.preventDefault();
    // Kiểm tra xem các field nào đang trống và đặt trạng thái lỗi tương ứng
    setEmailError(!email);
    setUsernameError(!username);
    setConfirmPasswordError(!confirmPassword);
    setGenderError(!gender);
    setAddressError(!address);
    setNameError(!name);
    setAgeError(!age)

    // Kiểm tra điều kiện khi có lỗi
    // if (passwordError || phoneError || !email || !username || !confirmPassword || !gender || !address) {
    // alert('Please fix the errors before signing up.');
    // return;
    // }

    const data = {
      email: email,
      userName: username,
      password: password,
    };
    // Implement signup logic here
    const res = await AddNewAccount(data);
    if (res) {
      var account = await res.data
      if (account.accountId != null) {
        const verification = await VerifyAccount(account.accountId) //send verification email and notify
        if (verification) {
          setRegisterEmail(true)
          alert("Check Your Email For Verification Code")
          const data = {
            customerName: name,
            age: age,
            accountId: res.data.accountId,
            gender: gender,
            phoneNumber: phoneNumber,
            address: address,
            createdAt: "2024-10-16T16:20:36.482Z",
            updatedAt: "2024-10-16T16:20:36.482Z",
          };
          const response = await AddNewCustomer(data);
          if (response) {
            toast.success("Success");
          } else {
            toast.error("fail");
          }
        }else{
          toast.error("Error Adding User Data");
        }
      }else{
        toast.error("Error Sending Verification Code");
      }
    } else {
      toast.error("Error Adding Account Data");
    }
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <div className="signup-page-container">
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
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && <p className="error-text">Email is required</p>}
          </div>

          {/* Username field */}
          <div className="input-wrapper">
            <input
              type="text"
              className="username-input"
              placeholder="Enter Your Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {usernameError && (
              <p className="error-text">Username is required</p>
            )}
          </div>

          {/* Password field */}
          <div className="input-wrapper">
            <input
              type="password"
              className="password-input"
              placeholder="Enter Your Password"
              value={password}
              onChange={handleChangePassword}
            />
            <div className="icon-container">
              <span className="tooltip-icon">?</span>
              {passwordError && (
                <span className="tooltip-text">
                  Password must be at least 8 characters long, include 1
                  uppercase, 1 lowercase, 1 number, and 1 special character.
                </span>
              )}
            </div>
          </div>

          {/* Confirm Password field */}
          <div className="input-wrapper">
            <input
              type="password"
              className="confirm-password-input"
              placeholder="Confirm Your Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {confirmPasswordError && (
              <p className="error-text">Confirm Password is required</p>
            )}
          </div>
          {/* Customer Name field */}
          <div className="input-wrapper">
            <input
              type="text"
              className="address-input"
              placeholder="Enter Your Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {nameError && <p className="error-text">Name is required</p>}
          </div>
          <div className="input-wrapper">
            <input
              type="number"
              className="address-input"
              placeholder="Enter Your Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
            {ageError && <p className="error-text">Age is required</p>}
          </div>
          {/* Gender field */}
          <div className="input-wrapper">
            <select
              className="gender-input"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
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
            <div className="icon-container">
              <span className="tooltip-icon">?</span>
              {phoneError && (
                <span className="tooltip-text">
                  Phone number must be in format: 09x-xxxxxxx.
                </span>
              )}
            </div>
          </div>

          {/* Address field */}
          <div className="input-wrapper">
            <input
              type="text"
              className="address-input"
              placeholder="Enter Your Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            {addressError && <p className="error-text">Address is required</p>}
          </div>

          {/* Signup button */}
          <button className="signup-btn" onClick={handleSignupClick}>
            Create Account
          </button>
          {registerEmail ?
            <h3 style={{color:"yellow"}}>Check Your Email For Verification Code</h3> : ""
          }
          <div className="to-login-container">
            <p className="to-login-text">Already have an account?</p>
            <button className="to-login-btn" onClick={handleLoginClick}>
              Log In.
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
