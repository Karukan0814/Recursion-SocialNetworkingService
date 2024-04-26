import React, { useEffect, useState } from "react";
import PostBox from "./PostBox";
import Post from "./Post";
import "../style/Feed.css";
import { PostInfo } from "../lib/type/PostType";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import usePosts from "../hooks/usePosts";

const Feed = () => {
  // const [posts, setPosts] = useState<PostInfo[]>(testPosts);
  const [activeTab, setActiveTab] = useState("trend");

  const {
    trendPosts,
    getRecentPosts,
    registerPost,
    followingsPosts,
    getFollowingsPosts,
  } = usePosts();
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };

  console.log(trendPosts, followingsPosts);
  return (
    <div className="feed">
      <div className="feed__header">
        <Tabs
          value={activeTab}
          onChange={handleChange}
          centered
          className="feed__tabs"
        >
          <Tab
            label="Trend"
            value="trend"
            className="feed__tab"
            onClick={getRecentPosts}
          />
          <Tab
            label="Followings"
            value="followings"
            className="feed__tab"
            onClick={getFollowingsPosts}
          />
        </Tabs>
      </div>

      <PostBox registerPost={registerPost} />
      {activeTab === "trend" && (
        <div className="feed__content">
          {trendPosts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      )}

      {activeTab === "followings" && (
        <div className="feed__content">
          {followingsPosts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Feed;
