import { useState } from "react";
import "../style/Feed.css";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import PostListTab from "./PostListTab";
import { PostType } from "../lib/type/PostType";

const Feed = () => {
  const [activeTab, setActiveTab] = useState("trend");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };

  return (
    <div className="feed">
      <div className="feed__header">
        <Tabs
          value={activeTab}
          onChange={handleChange}
          centered
          className="feed__tabs"
        >
          <Tab label="Trend" value="trend" className="feed__tab" />
          <Tab label="Followings" value="followings" className="feed__tab" />
        </Tabs>
      </div>

      {activeTab === "trend" && (
        <PostListTab tabName={PostType.trend} displayScheduledAt={true} />
      )}

      {activeTab === "followings" && (
        <PostListTab tabName={PostType.followings} displayScheduledAt={true} />
      )}
    </div>
  );
};

export default Feed;
