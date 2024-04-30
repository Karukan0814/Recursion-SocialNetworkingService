import React, { useEffect } from "react";
import Sidebar from "../component/Sidebar";
import Widgets from "../component/Widgets";
import Profile from "../component/Profile";
import useLogin from "../hooks/useLogin";

const ProfilePage = () => {
  return (
    <>
      <Sidebar currentPage="profile" />
      <Profile />
      <Widgets />
    </>
  );
};

export default ProfilePage;
