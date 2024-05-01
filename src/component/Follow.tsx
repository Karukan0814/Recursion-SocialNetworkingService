import { IconButton, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import PostListTab from "./PostListTab";
import { PostType } from "../lib/type/PostType";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FollowListTab from "./FollowListTab";
import { FollowType } from "../lib/type/UserInfoType";

const Follow = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("trend");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };
  const handleBack = () => {
    navigate(-1); // 一つ前のページに戻る
  };
  return (
    <div className="feed">
      <div className="postDetail__header">
        <IconButton className="iconButton" onClick={handleBack}>
          <ArrowBackIcon />
        </IconButton>
      </div>
      <div className="feed__header">
        <Tabs
          value={activeTab}
          onChange={handleChange}
          centered
          className="feed__tabs"
        >
          <Tab label="Followers" value="follower" className="feed__tab" />
          <Tab label="Followings" value="following" className="feed__tab" />
        </Tabs>
      </div>

      {activeTab === "follower" && (
        <FollowListTab tabName={FollowType.follower} />
      )}

      {activeTab === "following" && (
        <FollowListTab tabName={FollowType.following} />
      )}
    </div>
  );
};

export default Follow;
