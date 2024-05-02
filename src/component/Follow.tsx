import { IconButton, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import PostListTab from "./PostListTab";
import { PostType } from "../lib/type/PostType";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FollowListTab from "./FollowListTab";
import { FollowType } from "../lib/type/UserInfoType";
import "../style/Follow.css";
type Props = {
  userId: number;
};
const Follow = ({ userId }: Props) => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("follower");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };
  const handleBack = () => {
    navigate(-1); // 一つ前のページに戻る
  };
  return (
    <div className="follow">
      <div className="follow__header">
        <IconButton className="iconButton" onClick={handleBack}>
          <ArrowBackIcon />
        </IconButton>
      </div>
      <div className="follow__header">
        <Tabs
          value={activeTab}
          onChange={handleChange}
          centered
          className="follow__tabs"
        >
          <Tab label="Followers" value="follower" className="follow__tab" />
          <Tab label="Followings" value="following" className="follow__tab" />
        </Tabs>
      </div>

      {activeTab === "follower" && (
        <FollowListTab tabName={FollowType.follower} userId={userId} />
      )}

      {activeTab === "following" && (
        <FollowListTab tabName={FollowType.following} userId={userId} />
      )}
    </div>
  );
};

export default Follow;
