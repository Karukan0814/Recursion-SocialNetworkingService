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
      <div className="loginPage_contents_container">
        <div className="loginPage_titles_container">
          <h1 className="loginPage_title">Happening now</h1>
          <h3 className="loginPage_subtitle">Join today.</h3>
        </div>
        <div className="loginPage_caution_container">
          <p className="loginPage_caution">
            ※こちらは
            <a
              className="loginPage_caution_link"
              href="https://karukan0814.github.io/Recursion-ResumeWebsite/"
              target="_blank"
            >
              Karukan
            </a>
            が作成した疑似SNSアプリです。
            <br />
            Web開発の勉強目的のため、予告なく変更・サーバーの停止を行うことがあります。
            <br />
            ご了承ください。
          </p>
        </div>
        <div className="loginPage_buttons_container">
          <div className="loginPage_button_container">
            <Button
              className="loginPage_signup_button"
              onClick={() => handleLoginPopup(true)}
              variant="contained"
            >
              Create Account
            </Button>
          </div>
          <div className="loginPage_text_container">
            <p className="loginPage_text">Already have an account?</p>
          </div>
          <div className="loginPage_button_container">
            <Button
              className="loginPage_signin_button"
              onClick={() => handleLoginPopup(false)}
              variant="outlined"
            >
              Sign In
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
