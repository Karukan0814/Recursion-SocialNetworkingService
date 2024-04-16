import React from "react";
import "../style/Sidebar.css";
import SidebarOption from "./SidebarOption";
import { Button } from "@mui/material";
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

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar__icon">
        <img src="/assets/karukan_icon.svg" alt="icon" />
        <h1>Karukan SNS</h1>
      </div>
      <SidebarOption Icon={Home} text="Home" active={true} path="/" />
      <SidebarOption Icon={Search} text="Explore" path="/search" />
      <SidebarOption
        Icon={NotificationsNone}
        text="Notifications"
        path="/notification"
      />
      <SidebarOption Icon={MailOutline} text="Messages" path="/message" />
      <SidebarOption Icon={PermIdentity} text="Profile" path="/profile" />
      {/* 
      <Button variant="outlined" className="sidebar__tweet">
        Tweet
      </Button> */}
    </div>
  );
}

export default Sidebar;
