import React, { useEffect } from "react";
import Sidebar from "../component/Sidebar";
import Widgets from "../component/Widgets";
import Profile from "../component/Profile";
import useLogin from "../hooks/useLogin";
import { useNavigate, useParams } from "react-router-dom";

const ProfilePage = () => {
  const { userId } = useParams();
  console.log({ userId });

  return (
    <>
      <Sidebar currentPage="profile" />
      <Profile userId={parseInt(userId!)} />
      <Widgets />
    </>
  );
};

export default ProfilePage;
