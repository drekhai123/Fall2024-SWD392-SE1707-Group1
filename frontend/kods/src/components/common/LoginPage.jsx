import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../../css/LoginPage.css";
import { LoginApi } from "../api/LoginApi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {
  const [usernameoremail, setUsernameoremail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Thêm state để điều khiển ẩn/hiện mật khẩu
  const navigate = useNavigate();

  const handleChangeUsername = (e) => {
    setUsernameoremail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLoginClick = async (e) => {
    e.preventDefault();
    const login = {
      usernameoremail: usernameoremail,
      password: password,
    };
    const account = await LoginApi(login);
    console.log(account)
    if (account !== null && account.verified===true) {
      sessionStorage.setItem('user', JSON.stringify(account));
      if (account.accessToken) {
        sessionStorage.setItem('accessToken', account.accessToken);
      }
      toast.success("Login successful!", { autoClose: 2000 }); // Show toast for 2 seconds
      setTimeout(() => navigate('/'), 2000); // Navigate after 2 seconds
    } else {
      alert("Invalid credentials");
    }
  };

  const handleSignupClick = () => {
    navigate("/signup");
  };

  const handleGoogleLoginClick = () => {
    alert("Login with Google account is not implemented yet.");
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword); // Chuyển đổi trạng thái ẩn/hiện mật khẩu
  };

  const handleForgotPasswordClick = () => {
    // Điều hướng tới trang quên mật khẩu hoặc hiển thị thông báo
    alert("Forgot password functionality not implemented yet.");
  };
  // const handleBackToHomeClick = () => {
  //   navigate("/"); // Điều hướng về trang chủ
  // };

  return (
    <div className="login-page-container">
      <div className="brand-container">
        <img src="/images/coco.jpg" alt="Brand" className="brand-img" />
      </div>
      <div className="login-container">
        <form className="login-form">
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
          <button className="login-btn" onClick={handleLoginClick}>
            Login
          </button>
          <div className="forgot-password-container">
            <button
              className="forgot-password-btn"
              onClick={handleForgotPasswordClick}
            >
              Forgot password?
            </button>
          </div>
          <div className="or-separator">
            <p>OR</p>
          </div>
          <button className="google-login-btn" onClick={handleGoogleLoginClick}>
            Login with Google
          </button>
          <div className="to-signup-container">
            <p className="to-signup-text">Don't have an account?</p>
            <button className="to-signup-btn" onClick={handleSignupClick}>
              Sign Up.
            </button>
          </div>
          {/* Nút Back to Home */}
          <div className='back-to-home-container'>
            <Link to='/' className='back-to-home-link'>
              Back to Home
            </Link>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginPage;
