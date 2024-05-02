import { Avatar, IconButton } from "@mui/material";
import React from "react";
import useLogin from "../hooks/useLogin";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAtom } from "jotai";
import { userInfoAtom } from "../lib/jotai/atoms/user";
import "../style/SiderBarUserInfo.css";
import { Link } from "react-router-dom";

const SiderBarUserInfo = () => {
  const { logout } = useLogin();
  const [userInfoJotai, setuserInfoJotai] = useAtom(userInfoAtom); //ユーザー情報のグローバルステート

  return (
    <div className="sidebar_userInfo__container">
      <Link to={`/profile/${userInfoJotai.userInfo?.id}`}>
        <div className="sidebar_userInfoLink__container">
          <Avatar
            src={
              userInfoJotai.userInfo?.userImg ||
              "/assets/default_profile_400x400.png"
            }
          />
          <div className="sidebar_userInfo__name">
            {userInfoJotai.userInfo?.name}
          </div>
        </div>
      </Link>
      <div className="logoutButton_container">
        <IconButton className="iconButton" onClick={logout}>
          <LogoutIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default SiderBarUserInfo;
