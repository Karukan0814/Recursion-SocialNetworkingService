// src/components/ProtectedRoute.js
import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { Navigate } from "react-router-dom";
import { userInfoAtom } from "../lib/jotai/atoms/user";
import useLogin from "../hooks/useLogin";

type Props = {
  children: React.ReactNode;
};

const ProtectedRoute = ({ children }: Props) => {
  const [userInfo] = useAtom(userInfoAtom);
  const { checkLogin } = useLogin();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const handleCheckLogin = async () => {
      const login = await checkLogin();
      setIsAuthenticated(login);
      setIsChecking(false);
    };

    if (!userInfo) {
      handleCheckLogin();
    } else {
      setIsAuthenticated(true);
      setIsChecking(false);
    }
  }, [userInfo, checkLogin]);

  if (isChecking) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
