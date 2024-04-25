import React, { useEffect } from "react";
import Sidebar from "../component/Sidebar";
import Feed from "../component/Feed";
import Widgets from "../component/Widgets";
import useLogin from "../hooks/useLogin";
import { useAtom } from "jotai";
import { userInfoAtom } from "../lib/jotai/atoms/user";

const HomePage = () => {
  const { blockUnauthorizedUser } = useLogin();
  const [userInfo] = useAtom(userInfoAtom);
  console.log("userInfo", userInfo);
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
