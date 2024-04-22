import React, { useState } from "react";
import "../style/LoginPage.css";
import { Button } from "@mui/material";
import ModalPopup from "../component/ModalPopup";
import LoginForm from "../component/LoginForm";

const LoginPage = () => {
  const [loginFormOpen, setLoginFormOpen] = useState(false);
  const [signUpFlag, setSignUpFlag] = useState(false);

  const handleLoginPopup = (flag: boolean) => {
    setSignUpFlag(flag);
    setLoginFormOpen(true);
  };
  return (
    <div className="login-container">
      <ModalPopup
        open={loginFormOpen}
        handleClose={() => setLoginFormOpen(false)}
      >
        <LoginForm signUpFlag={signUpFlag} />
      </ModalPopup>
      <div className="image-container">
        <img
          src="/assets/karukan_icon.svg"
          className="responsive-img"
          alt="icon"
        />
      </div>
      <div>
        <h1 className="login-title">Happening now</h1>
        <h3 className="login-subtitle">Join today.</h3>
        <Button onClick={() => handleLoginPopup(true)} variant="contained">
          Create Account
        </Button>

        <p className="login-text">Already have an account?</p>

        <Button onClick={() => handleLoginPopup(false)} variant="outlined">
          Sign In
        </Button>
      </div>
    </div>
  );
};

export default LoginPage;
