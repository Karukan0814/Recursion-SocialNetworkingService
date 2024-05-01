import { Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import PostListTab from "../component/PostListTab";
import { PostType } from "../lib/type/PostType";
import Sidebar from "../component/Sidebar";
import Widgets from "../component/Widgets";
import Follow from "../component/Follow";

const FollowPage = () => {
  return (
    <>
      <Sidebar currentPage="follow" />
      <Follow />
      <Widgets />
    </>
  );
};

export default FollowPage;
