import { useState } from "react";
import "../style/Feed.css";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import PostListTab from "./PostListTab";

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

      {activeTab === "trend" && <PostListTab tabName="trend" />}

      {activeTab === "followings" && <PostListTab tabName="followings" />}
    </div>
  );
};

export default Feed;
