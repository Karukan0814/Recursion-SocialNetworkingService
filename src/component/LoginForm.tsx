import React, { useState } from "react";
import "../style/LoginForm.css";
import useLogin from "../hooks/useLogin";
import { Button } from "@mui/material";
import PrimaryButton from "./PrimaryButton";

type Props = {
  signUpFlag: boolean;
};
const LoginForm = ({ signUpFlag }: Props) => {
  const { login, loading, errorMsg } = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    console.log("handleLogin", loading);
    e.preventDefault();
    await login(email, password);
    console.log(loading);
  };
  return (
    <>
      <div className="login-form">
        {signUpFlag ? (
          <>
            <h1>Create your account</h1>
            {errorMsg && <p className="errMsg">{errorMsg}</p>}

            <form>
              <div className="input-group">
                <input type="email" placeholder="email" />
              </div>

              <div className="input-group">
                <input type="text" placeholder="name" />
              </div>
              <div className="input-group">
                <input type="password" placeholder="Password" />
              </div>
              <div className="input-group">
                <input type="password" placeholder="Confirm Password" />
              </div>
              <button type="submit">Sign up</button>
            </form>
          </>
        ) : (
          <>
            <h1>Log in to KarukanSNS</h1>
            {errorMsg && <p className="errMsg">{errorMsg}</p>}
            {loading}
            <form>
              <div className="input-group">
                <input
                  type="text"
                  placeholder="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="input-group">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="loginButton_container">
                <PrimaryButton
                  loading={loading}
                  text="Log in"
                  onClick={handleLogin}
                />
              </div>
            </form>
          </>
        )}
      </div>
    </>
  );
};

export default LoginForm;
