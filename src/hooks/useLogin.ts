import { useAtom } from "jotai";
import { useState } from "react";
import { jotaiInitialValue, userInfoAtom } from "../lib/jotai/atoms/user";
import { useNavigate } from "react-router-dom";
import {
  checkTokenAPI,
  loginAPI,
  signUpAPI,
  verifyEmailAPI,
} from "../lib/database/User";

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
      setuserInfoJotai(data.user);
      localStorage.setItem("authToken", data.token); // トークンをローカルストレージに保存

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
    console.log("useLogin_login", { loading });
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

      //ログイン成功時はユーザー情報をjotaiに入れる
      setuserInfoJotai(data.user);
      localStorage.setItem("authToken", data.token); // トークンをローカルストレージに保存

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
    localStorage.removeItem("authToken"); // トークンをローカルストレージから削除
    setLoading(false);

    //login画面に移動
    navigate("/login");
  };

  const validateToken = async (token: string | undefined | null) => {
    const isValid = await checkTokenAPI(token);

    if (token && !isValid) {
      //クッキーにトークンがあり、かつ無効の場合、ログアウト処理する
      resetJotai(); //グローバルステート初期化
      localStorage.removeItem("authToken"); // トークンをローカルストレージから削除
    }
    return isValid;
  };
  const checkLogin = async () => {
    const token = localStorage.getItem("authToken");
    const isValidToken = await validateToken(token);
    const userInfo = userInfoJotai;
    if (!isValidToken || !userInfo || !userInfo.id) {
      return false;
    } else {
      return true;
    }
  };

  const blockUnauthorizedUser = async () => {
    if (!(await checkLogin())) {
      navigate("/login");
    }
  };

  return {
    loading,
    signUp,
    errorMsg,
    login,
    logout,
    blockUnauthorizedUser,
    verifiyEmail,
  };
};

export default useLogin;
