import React, { useEffect } from "react";
import Sidebar from "../component/Sidebar";
import Feed from "../component/Feed";
import Widgets from "../component/Widgets";
import useLogin from "../hooks/useLogin";

const HomePage = () => {
  const { blockUnauthorizedUser } = useLogin();
  useEffect(() => {
    //初回表示時、ログインしていないユーザーをブロックする
    blockUnauthorizedUser();
  }, []);
  return (
    <>
      <Sidebar currentPage="home" />
      <Feed />
      <Widgets />
    </>
  );
};

export default HomePage;
