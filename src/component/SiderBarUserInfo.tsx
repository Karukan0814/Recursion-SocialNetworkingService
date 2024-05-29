import "../style/SiderBarUserInfo.css";
import { Link } from "react-router-dom";
import { useAtom } from "jotai";
import { Avatar, IconButton } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import useLogin from "../hooks/useLogin";
import { userInfoAtom } from "../lib/jotai/atoms/user";

const SiderBarUserInfo = () => {
  const { logout } = useLogin();
  const [userInfoJotai] = useAtom(userInfoAtom); //ユーザー情報のグローバルステート

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
