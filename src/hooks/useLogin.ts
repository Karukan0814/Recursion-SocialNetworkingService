import { useAtom } from "jotai";
import { useState } from "react";
import { jotaiInitialValue, userInfoAtom } from "../lib/jotai/atoms/user";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
  const [userInfoJotai, setuserInfoJotai] = useAtom(userInfoAtom); //ユーザー情報のグローバルステート

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
    setError(null);
    try {
      // APIエンドポイントにログインリクエストを送信
      const response = await fetch("https://yourapi.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();

      //登録結果をjotaiに入れる
      setuserInfoJotai(data.userInfo);
      localStorage.setItem("authToken", data.token); // トークンをローカルストレージに保存
    } catch (error: any) {
      setError(error.message);
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
    error,
    login,
    logout,
    blockUnauthorizedUser,
  };
};

export default useLogin;
