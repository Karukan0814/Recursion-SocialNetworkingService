import React, { useState } from "react";
import "../style/LoginForm.css";
import useLogin from "../hooks/useLogin";
import { Button } from "@mui/material";
import PrimaryButton from "./PrimaryButton";
import { useForm } from "react-hook-form";
import { signUpAPI } from "../lib/database/User";

type Props = {
  signUpFlag: boolean;
  handleClose: () => void;
};
type FormData = {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
};
const LoginForm = ({ signUpFlag, handleClose }: Props) => {
  const { login, signUp, loading, errorMsg } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>();
  const password = watch("password"); // パスワードの値を監視

  const onSubmit = async (data: FormData) => {
    console.log({ data });
    if (signUpFlag) {
      await signUp(data.name, data.email, data.password, data.confirmPassword);
      handleClose();
    } else {
      await login(data.email, data.password);
    }
  };

  return (
    <>
      <div className="login-form">
        {signUpFlag ? (
          <h1>Create your account</h1>
        ) : (
          <h1>Log in to KarukanSNS</h1>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          {signUpFlag ? (
            <>
              {errorMsg && <p className="errMsg">{errorMsg}</p>}

              <div className="input-group">
                <input
                  id="email"
                  type="email"
                  placeholder="email"
                  {...register("email", {
                    required: "Email is required",
                    maxLength: {
                      value: 255,
                      message: "Email must be less than 255 characters long",
                    },
                  })}
                />
                {errors.email && (
                  <p className="errMsg">{errors.email.message}</p>
                )}
              </div>

              <div className="input-group">
                <input
                  id="name"
                  type="text"
                  placeholder="name"
                  {...register("name", {
                    required: "Username is required",
                    maxLength: {
                      value: 25,
                      message: "username must be less than 25 characters long",
                    },
                  })}
                />
                {errors.name && <p className="errMsg">{errors.name.message}</p>}
              </div>
              <div className="input-group">
                <input
                  id="password"
                  type="password"
                  placeholder="password"
                  {...register("password", {
                    required: "password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters long",
                    },
                    maxLength: {
                      value: 30,
                      message: "Password must be less than 30 characters long",
                    },
                  })}
                />
                {errors.password && (
                  <p className="errMsg">{errors.password.message}</p>
                )}
              </div>
              <div className="input-group">
                <input
                  id="confirmPassword"
                  type="password"
                  placeholder="confirmPassword"
                  {...register("confirmPassword", {
                    required: "confirmPassword is required",
                    validate: (value) =>
                      value === password || "The passwords do not match",
                  })}
                />
                {errors.confirmPassword && (
                  <p className="errMsg">{errors.confirmPassword.message}</p>
                )}
              </div>
            </>
          ) : (
            <>
              {errorMsg && <p className="errMsg">{errorMsg}</p>}
              <div className="input-group">
                <input
                  id="email"
                  type="email"
                  placeholder="email"
                  {...register("email", { required: "Email is required" })}
                />
                {errors.email && (
                  <p className="errMsg">{errors.email.message}</p>
                )}
              </div>
              <div className="input-group">
                <input
                  id="password"
                  type="password"
                  placeholder="password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
                {errors.password && (
                  <p className="errMsg">{errors.password.message}</p>
                )}
              </div>
            </>
          )}

          <div className="loginButton_container">
            <PrimaryButton
              loading={loading}
              text={signUpFlag ? "Sign Up" : "Log in"}
              onClick={handleSubmit(onSubmit)}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginForm;
