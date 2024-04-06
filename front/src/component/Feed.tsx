import React, { useEffect, useState } from "react";
import TweetBox from "./TweetBox";
import Post from "./Post";
import "../style/Feed.css";
import { PostInfo } from "../types/PostType";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

const Feed = () => {
  const [posts, setPosts] = useState<PostInfo[]>([]);
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
          <Tab label="Followers" value="followers" className="feed__tab" />
        </Tabs>
      </div>

      <TweetBox />
      {activeTab === "trend" && (
        <div className="feed__content">
          {posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      )}

      {activeTab === "followers" && (
        <div className="feed__content">
          {/* フォロワーのコンテンツをここに表示 */}
        </div>
      )}
    </div>
  );
};

export default Feed;
