import { useState } from "react";
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
    <div className="loginPage_container">
      <ModalPopup
        open={loginFormOpen}
        handleClose={() => setLoginFormOpen(false)}
      >
        <LoginForm
          signUpFlag={signUpFlag}
          handleClose={() => setLoginFormOpen(false)}
        />
      </ModalPopup>
      <div className="loginPage_image_container">
        <img
          src="/assets/karukan_icon.svg"
          className="responsive-img"
          alt="icon"
        />
      </div>
      <div>
        <h1 className="loginPage_title">Happening now</h1>
        <h3 className="loginPage_subtitle">Join today.</h3>
        <Button onClick={() => handleLoginPopup(true)} variant="contained">
          Create Account
        </Button>

        <p className="loginPage_text">Already have an account?</p>

        <Button onClick={() => handleLoginPopup(false)} variant="outlined">
          Sign In
        </Button>
      </div>
    </div>
  );
};

export default LoginPage;
