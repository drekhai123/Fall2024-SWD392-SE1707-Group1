import { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../../css/LoginPage.css";
import { GoogleLoginApi, LoginApi } from "../api/LoginApi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingScreen from "../../utils/LoadingScreen";
import { useGoogleLogin, useGoogleOneTapLogin } from "@react-oauth/google";
import axios from "axios";


const LoginPage = () => {
  const [usernameoremail, setUsernameoremail] = useState("");
  const [password, setPassword] = useState("");
  const [loadingScreen, setLoadingScreen] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Thêm state để điều khiển ẩn/hiện mật khẩu
  const navigate = useNavigate();
  const lastToastTimeRef = useRef(0); // Ref to store the last toast time

  const handleChangeUsername = (e) => {
    setUsernameoremail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const showToast = (type, message) => {
    const now = Date.now();
    if (now - lastToastTimeRef.current > 5000) { // 2 seconds interval
      lastToastTimeRef.current = now;
      if (type === 'success') {
        toast.success(message, { autoClose: 5000 });
      } else if (type === 'error') {
        toast.error(message);
      }
    }
  };

  const handleLoginClick = async (e) => {
    debugger
    setLoadingScreen(true);
    const login = {
      usernameoremail: usernameoremail,
      password: password,
    };
    const response = await LoginApi(login);
    if (response.status <= 300) {
      sessionStorage.setItem('user', JSON.stringify(response.data.account));
      sessionStorage.setItem('token', response.data.token);
      showToast('success', "Login successful!");
      if(response.data.account.role === "staff" ){
        setTimeout(() => navigate('/staffDashboard'), 2000);

      }
      setTimeout(() => navigate('/'), 2000);
    } else if (response.status === 400) {
      showToast('error', "Your account has been banned. Please contact support.");
    } else {
      showToast('error', "Check your username or password.");
    }
    setLoadingScreen(false);
  };

  const handleSignupClick = () => {
    navigate("/signup");
  };
  // Using Google Login API
  useGoogleOneTapLogin({
    onSuccess: credentialResponse => {
      console.log(credentialResponse);
    },
    onError: () => {
      console.log('Login Failed');
    },
  });
  // Login with Google API
  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async tokenResponse => {
      setLoadingScreen(true);
      const googleResponse = await axios.get(
        'https://www.googleapis.com/oauth2/v3/userinfo',
        { headers: { Authorization: `Bearer ${tokenResponse.access_token}` } })
      var userInfo = await googleResponse.data
      const login = {
        usernameoremail: userInfo.email,
        password: "",
      };
      const response = await GoogleLoginApi(login)
      if (response.status === 200) {
        sessionStorage.setItem('user', JSON.stringify(response.data.account));
        sessionStorage.setItem('token', response.data.token);
        showToast('success', "Login successful!");
        setTimeout(() => navigate('/'), 2000);
      } else {
        showToast('error', "Can't Login With Google");
      }
      setLoadingScreen(false);
    },
    onError: (error) => {
      console.log('Login Failed');
      showToast('error', `Can't Login With Google: ${error}`);
    },
  });

  const toggleShowPassword = () => {
    setShowPassword(!showPassword); // Chuyển đổi trạng thái ẩn/hiện mật khẩu
  };

  const handleForgotPasswordClick = () => {
    navigate("/forgot-password"); // Navigate to the Forgot Password page
  };
  // const handleBackToHomeClick = () => {
  //   navigate("/"); // Điều hướng về trang chủ
  // };

  return (
    <div className="login-page-container">
      {loadingScreen ? <LoadingScreen /> : ""}
      <div className="brand-container">
        <img src="/images/coco.jpg" alt="Brand" className="brand-img" />
      </div>
      <div className="login-container">
        <div className="login-form">
          <p className="login-form-title">
            Welcome to Koi Transportation Service
          </p>
          <input
            type="text"
            className="username-input"
            placeholder="Enter Your Username or Email"
            value={usernameoremail}
            onChange={handleChangeUsername}
          />
          <div className="password-field">
            <input
              type={showPassword ? "text" : "password"} // Điều khiển loại input dựa trên showPassword
              className="password-input"
              placeholder="Enter Your Password"
              value={password}
              onChange={handleChangePassword}
            />
            <button
              type="button"
              className="toggle-password-btn"
              onClick={toggleShowPassword}
            >
              <i
                className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"}
              ></i>{" "}
              {/* Thay đổi icon */}
            </button>
          </div>
          <button className="login-btn" onClick={() => handleLoginClick()}>
            Login
          </button>
          <div className="forgot-password-container">
            <button
              className="forgot-password-btn"
              onClick={() => handleForgotPasswordClick()}
            >
              Forgot password?
            </button>
          </div>
          <div className="or-separator">
            <p>OR</p>
          </div>
          <button className="google-login-btn" onClick={() => handleGoogleLogin()}>
            Login with Google
          </button>

          <div className="to-signup-container">
            <p className="to-signup-text">Don't have an account?</p>
            <button className="to-signup-btn" onClick={() => handleSignupClick()}>
              Sign Up.
            </button>
          </div>
          {/* Nút Back to Home */}
          <div className='back-to-home-container'>
            <Link to='/' className='back-to-home-link'>
              Back to Home
            </Link>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginPage;
