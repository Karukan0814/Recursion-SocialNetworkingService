import { Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import PostListTab from "../component/PostListTab";
import { PostType } from "../lib/type/PostType";
import Sidebar from "../component/Sidebar";
import Widgets from "../component/Widgets";
import Follow from "../component/Follow";
import { useParams } from "react-router-dom";

const FollowPage = () => {
  const { id } = useParams();
  console.log("FollowPage", id);
  const userId = parseInt(id || "");
  return (
    <>
      <Sidebar currentPage="follow" />
      <Follow userId={userId} />
      <Widgets />
    </>
  );
};

export default FollowPage;
