import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useLogin from "../hooks/useLogin";

const VerifyPage = () => {
  const location = useLocation();
  let navigate = useNavigate();

  const { verifiyEmail } = useLogin();
  useEffect(() => {
    const verify = async () => {
      // URLからクエリパラメータを解析
      const searchParams = new URLSearchParams(location.search);
      const token = searchParams.get("id");

      if (token) {
        // バックエンドのAPIを呼び出し
        await verifiyEmail(token);
      } else {
        //トークンがない場合にはログインページに遷移
        navigate("/login");
      }
    };
    verify();
  }, [location]);

  return (
    <div>
      <h1>Verifying your email...</h1>
    </div>
  );
};

export default VerifyPage;
