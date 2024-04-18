import React from "react";
import Sidebar from "../component/Sidebar";
import Widgets from "../component/Widgets";
import NotificationCard from "../component/NotificationCard";
import "../style/NotificationPage.css";

const NotificationPage = () => {
  return (
    <>
      <Sidebar currentPage="notification" />
      <div className="notifications_container">
        <div className="notificationsTitle__container">
          <h2 className="notificationsTitle__text">Notifications</h2>
        </div>
        {Array.from({ length: 5 }, (_, i) => i).map((number) => (
          <NotificationCard />
        ))}
      </div>
      <Widgets />
    </>
  );
};

export default NotificationPage;
