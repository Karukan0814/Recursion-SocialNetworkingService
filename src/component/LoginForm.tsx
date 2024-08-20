import "../style/LoginForm.css";
import useLogin from "../hooks/useLogin";
import PrimaryButton from "./PrimaryButton";
import { useForm } from "react-hook-form";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";

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
    if (signUpFlag) {
      await signUp(data.name, data.email, data.password, data.confirmPassword);
      handleClose();
    } else {
      await login(data.email, data.password);
    }
  };

  return (
    <>
      <div className="loginForm_container">
        <span className="loginForm__close">
          <IconButton onClick={handleClose} aria-label="delete">
            <CloseIcon />
          </IconButton>
        </span>
        <div className="loginForm_image_container">
          <img
            src="/assets/karukan_icon.svg"
            className="responsive-img"
            alt="icon"
          />
        </div>
        <div className="loginForm_title_container">
          {signUpFlag ? (
            <h1>Create your account</h1>
          ) : (
            <h1>Log in to KarukanSNS</h1>
          )}
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="loginForm_input_container"
        >
          {signUpFlag ? (
            <>
              {errorMsg && (
                <p className="errMsg loginForm_errMsg">{errorMsg}</p>
              )}

              <div className="loginForm_input-group">
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
                  <p className="errMsg loginForm_errMsg">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="loginForm_input-group">
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
                {errors.name && (
                  <p className="errMsg loginForm_errMsg">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div className="loginForm_input-group">
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
                  <p className="errMsg loginForm_errMsg">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className="loginForm_input-group">
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
                  <p className="errMsg loginForm_errMsg">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </>
          ) : (
            <>
              {errorMsg && (
                <p className="errMsg loginForm_errMsg">{errorMsg}</p>
              )}
              <div className="loginForm_input-group">
                <input
                  id="email"
                  type="email"
                  placeholder="email"
                  {...register("email", { required: "Email is required" })}
                />
                {errors.email && (
                  <p className="errMsg loginForm_errMsg">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className="loginForm_input-group">
                <input
                  id="password"
                  type="password"
                  placeholder="password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
                {errors.password && (
                  <p className="errMsg loginForm_errMsg">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </>
          )}

          <div className="loginForm_loginButton_container">
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
