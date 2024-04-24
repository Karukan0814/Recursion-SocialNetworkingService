import React from "react";
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

type Props = {
  currentPage: string;
};
function Sidebar({ currentPage }: Props) {
  return (
    <div className="sidebar">
      <div className="sidebar__icon">
        <img src="/assets/karukan_icon.svg" alt="icon" />
        <h1>Karukan SNS</h1>
      </div>

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
        path="/profile"
        active={currentPage === "profile" ? true : false}
      />
      <IconButton>
        <LogoutIcon />
      </IconButton>
      {/* 
      <Button variant="outlined" className="sidebar__tweet">
        Tweet
      </Button> */}
    </div>
  );
}

export default Sidebar;
