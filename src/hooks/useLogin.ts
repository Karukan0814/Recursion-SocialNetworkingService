import { useAtom } from "jotai";
import { useState } from "react";
import { jotaiInitialValue, userInfoAtom } from "../lib/jotai/atoms/user";
import { useNavigate } from "react-router-dom";
import { loginAPI } from "../lib/database/User";

const useLogin = () => {
  const [userInfoJotai, setuserInfoJotai] = useAtom(userInfoAtom); //ユーザー情報のグローバルステート

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  let navigate = useNavigate();

  const signUp = (
    name: string,
    email: string,
    password: string,
    confirmPass: string
  ) => {
    //TODO 引数のバリデーション
    //TODO　サーバー側に登録処理
    //TODO　サーバーからトークンとユーザー情報受け取り
    //TODO　トークンをlocalStorageに格納
    //TODO　ユーザー情報をjotaiに格納
    //TODO　エラー時の処理
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
      console.log({ loading });

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
  };

  //TODO トークンの有効期限を確認する処理
  const validateToken = async (token: string | undefined | null) => {
    //TODO トークンの有効期限確認処理←サーバー
    // const isValid = await checkToken(token);
    const isValid = true; //TODO　サーバー側作成後、消す

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
  };
};

export default useLogin;
