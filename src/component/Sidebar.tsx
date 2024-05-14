import React, { useEffect, useState } from "react";
import "../style/Sidebar.css";
import SidebarOption from "./SidebarOption";
import { Button, IconButton } from "@mui/material";
import {
  BookmarkBorder,
  Home,
  ListAlt,
  MailOutline,
  MoreHoriz,
  NotificationsNone,
  PermIdentity,
  Search,
  Twitter,
} from "@mui/icons-material";
import LogoutIcon from "@mui/icons-material/Logout";
import useLogin from "../hooks/useLogin";
import SiderBarUserInfo from "./SiderBarUserInfo";
import { useAtom } from "jotai";
import { userInfoAtom } from "../lib/jotai/atoms/user";
import { Link } from "react-router-dom";
import { io } from "socket.io-client";

type Props = {
  currentPage: string;
};
function Sidebar({ currentPage }: Props) {
  const [userInfoJotai] = useAtom(userInfoAtom);

  const [unreadNoticeCount, setUnreadNoticeCount] = useState(0);
  useEffect(() => {
    const socket = io(import.meta.env.VITE_SOCKET_URL, {
      auth: {
        token: userInfoJotai.authtoken, // トークンをauthオブジェクト内に設定
      },
    });

    socket.on("connection", () => {
      console.log("Connected to server.");
    });

    socket.on("connect_error", (err: { message: any }) => {
      console.log("Connection failed:", err.message); // 接続エラーの取り扱い
    });
    // ユーザーIDをサーバーに送信
    socket.emit("userConnected", userInfoJotai.userInfo?.id);
    socket.emit("requestUnreadNotifications");
    // 定期的に未読通知数をリクエスト
    const intervalId = setInterval(() => {
      console.log("requestUnreadNotifications");
      socket.emit("requestUnreadNotifications");
    }, 60000 * 3); // 60秒毎にリクエスト→後で３分に変更

    // 未読通知数を受信
    socket.on("unreadNotificationsCount", (count) => {
      setUnreadNoticeCount(count);
    });

    // クリーンアップ
    return () => {
      clearInterval(intervalId);
      socket.disconnect();
    };
  }, [userInfoJotai.authtoken]);
  return (
    <div className="sidebar">
      <Link to={"/"} style={{ textDecoration: "none", color: "inherit" }}>
        <div className="sidebar__icon">
          <img src="/assets/karukan_icon.svg" alt="icon" />
          <h1>Karukan SNS</h1>
        </div>
      </Link>

      <SidebarOption
        Icon={Home}
        text="Home"
        active={currentPage === "home" ? true : false}
        path="/"
      />
      <SidebarOption
        Icon={Search}
        text="Explore"
        path="/search"
        active={currentPage === "search" ? true : false}
      />
      <SidebarOption
        Icon={NotificationsNone}
        text="Notifications"
        path="/notification"
        active={currentPage === "notification" ? true : false}
        notificationCount={unreadNoticeCount}
      />
      <SidebarOption
        Icon={MailOutline}
        text="Messages"
        path="/message"
        active={currentPage === "message" ? true : false}
      />
      <SidebarOption
        Icon={PermIdentity}
        text="Profile"
        path={`/profile/${userInfoJotai.userInfo?.id}`}
        active={
          currentPage === `profile/${userInfoJotai.userInfo?.id}` ? true : false
        }
      />
      <SiderBarUserInfo />
    </div>
  );
}

export default Sidebar;
