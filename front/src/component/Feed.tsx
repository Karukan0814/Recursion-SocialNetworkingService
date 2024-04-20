import React, { useEffect, useState } from "react";
import PostBox from "./PostBox";
import Post from "./Post";
import "../style/Feed.css";
import { PostInfo } from "../types/PostType";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

const testPosts: PostInfo[] = [
  {
    id: "1",
    username: "testuser1",
    text: "testposttestposttestposttestposttestposttestpost",
    avatar: "/assets/default_profile_400x400.png",
    createDateTime: new Date(),
    updateDateTime: new Date(),
  },
  {
    id: "2",
    username: "testuser2",
    text: "testposttestposttestposttestposttestposttestpost",
    avatar: "/assets/default_profile_400x400.png",
    createDateTime: new Date("2024-04-016T12:34:56Z"),
    updateDateTime: new Date("2024-04-019T12:34:56Z"),
  },
  {
    id: "3",
    username: "testuser3",
    text: "testposttestposttestposttestposttestposttestpost",
    avatar: "/assets/default_profile_400x400.png",
    createDateTime: new Date("2024-04-017T12:34:56Z"),
    updateDateTime: new Date("2024-04-019T12:34:56Z"),
  },
];

const Feed = () => {
  const [posts, setPosts] = useState<PostInfo[]>(testPosts);
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

      <PostBox />
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
