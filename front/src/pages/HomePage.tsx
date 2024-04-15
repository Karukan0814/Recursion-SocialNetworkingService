import React from "react";
import Sidebar from "../component/Sidebar";
import Feed from "../component/Feed";
import Widgets from "../component/Widgets";

const HomePage = () => {
  return (
    <>
      <Sidebar />
      <Feed />
      <Widgets />
    </>
  );
};

export default HomePage;
