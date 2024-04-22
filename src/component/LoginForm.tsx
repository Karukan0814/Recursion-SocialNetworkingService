import React from "react";
import "../style/LoginForm.css";

type Props = {
  signUpFlag: boolean;
};
const LoginForm = ({ signUpFlag }: Props) => {
  return (
    <>
      <div className="login-form">
        {signUpFlag ? (
          <>
            <h1>Create your account</h1>
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
            <form>
              <div className="input-group">
                <input type="text" placeholder="email" />
              </div>
              <div className="input-group">
                <input type="password" placeholder="Password" />
              </div>
              <button type="submit">Log in</button>
            </form>
          </>
        )}
      </div>
    </>
  );
};

export default LoginForm;
