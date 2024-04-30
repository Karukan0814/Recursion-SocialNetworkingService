import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  checkTokenAPI,
  loginAPI,
  signUpAPI,
  verifyEmailAPI,
} from "../lib/database/User";
import { useAtom } from "jotai";
import { jotaiInitialValue, userInfoAtom } from "../lib/jotai/atoms/user";
import { UserInfoType } from "../lib/type/UserInfoType";

const useLogin = () => {
  const [userInfoJotai, setuserInfoJotai] = useAtom(userInfoAtom); //ユーザー情報のグローバルステート
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  let navigate = useNavigate();

  const signUp = async (
    name: string,
    email: string,
    password: string,
    confirmPass: string
  ) => {
    try {
      setLoading(true);
      //引数のバリデーション
      if (!email) {
        throw new Error("email is necessary to log in.");
      }
      if (!name) {
        throw new Error("name is necessary to log in.");
      }
      if (!password) {
        throw new Error("password is necessary to log in.");
      }
      if (!confirmPass) {
        throw new Error("confirmPass is necessary to log in.");
      }
      if (email.length > 255) {
        throw new Error("email should be less than 255");
      }
      if (name.length > 25) {
        throw new Error("name should be less than 25");
      }
      if (password.length < 8 || password.length > 30) {
        throw new Error("password should be less than 30 and more than 8");
      }

      if (password !== confirmPass) {
        throw new Error("password and confirmPass should be the same");
      }
      //サーバー側で登録処理

      await signUpAPI(name, email, password);

      //メール送信した旨、画面に表示
      alert(
        "Verification Mail was sent to your email. Please click the link in the mail."
      );
    } catch (e: any) {
    } finally {
      setLoading(false);
    }
  };

  const verifiyEmail = async (token: string) => {
    try {
      if (!token) {
        throw new Error("token is necessary to verify.");
      }

      const data = await verifyEmailAPI(token);
      if (data?.error) {
        console.log(data.error);
        throw new Error(data.error);
      }

      if (!data || !data.token || !data.user) {
        throw new Error("Something wrong with login API");
      }

      //認証成功時はユーザー情報をjotaiに入れる
      setuserInfoJotai({ userInfo: data.user, authtoken: data.token });

      alert("Verification Success!");

      //home画面に移動
      navigate("/");
    } catch (error: any) {
      setErrorMsg(error.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    setErrorMsg("");
    try {
      if (!email || !password) {
        throw new Error("email and password are necessary to log in.");
      }
      const data = await loginAPI(email, password);

      if (data?.error) {
        console.log(data.error);
        throw new Error(data.error);
      }

      if (!data || !data.token || !data.user) {
        throw new Error("Something wrong with login API");
      }
      const loginUser: UserInfoType = data.user;
      //ログイン成功時はユーザー情報をjotaiに入れる
      console.log("login", { userInfo: loginUser, authtoken: data.token });
      setuserInfoJotai({ userInfo: loginUser, authtoken: data.token });

      //home画面に移動
      navigate("/");
    } catch (error: any) {
      setErrorMsg(error.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const resetJotai = () => setuserInfoJotai(jotaiInitialValue);
  const logout = () => {
    setLoading(true);
    resetJotai(); //グローバルステート初期化
    setLoading(false);

    //login画面に移動
    navigate("/login");
  };

  const validateToken = async (token: string | undefined | null) => {
    const isValid = await checkTokenAPI(token);
    console.log({ isValid });
    if (token && !isValid) {
      return false;
    }
    return isValid;
  };
  const checkLogin = async () => {
    const token = userInfoJotai.authtoken;
    const isValidToken = await validateToken(token);

    if (
      !isValidToken ||
      !userInfoJotai ||
      !userInfoJotai.userInfo ||
      userInfoJotai.userInfo.id
    ) {
      resetJotai(); //グローバルステート初期化

      return false;
    } else {
      return true;
    }
  };

  return {
    loading,
    signUp,
    errorMsg,
    login,
    logout,
    verifiyEmail,
    checkLogin,
  };
};

export default useLogin;
