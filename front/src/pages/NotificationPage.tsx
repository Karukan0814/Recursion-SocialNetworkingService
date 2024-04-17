import React from "react";
import Sidebar from "../component/Sidebar";
import Widgets from "../component/Widgets";
import NotificationCard from "../component/NotificationCard";

const NotificationPage = () => {
  return (
    <>
      <Sidebar />
      <div className="notifications_container">
        {Array.from({ length: 5 }, (_, i) => i).map((number) => (
          <NotificationCard />
        ))}
      </div>
      <Widgets />
    </>
  );
};

export default NotificationPage;
