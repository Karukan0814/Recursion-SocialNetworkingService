import React, { useEffect, useState } from "react";
import PostBox from "./PostBox";
import Post from "./Post";
import "../style/Feed.css";
import { PostInfo } from "../lib/type/PostType";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import usePosts from "../hooks/usePosts";
import TrendListTab from "./TrendListTab";
import {
  getFollowingsPostList,
  getTrendPostList,
  registerPostAPI,
} from "../lib/database/Post";
import { CircularProgress } from "@mui/material";
import InfiniteScroll from "react-infinite-scroller";
import { useAtom } from "jotai";
import { userInfoAtom } from "../lib/jotai/atoms/user";

const Feed = () => {
  // const [posts, setPosts] = useState<PostInfo[]>(testPosts);
  const [activeTab, setActiveTab] = useState("trend");
  const [userInfoJotai, setuserInfoJotai] = useAtom(userInfoAtom); //ユーザー情報のグローバルステート

  const {
    // trendPosts,
    // getRecentPosts,
    // registerPost,
    // followingsPosts,
    getFollowingsPosts,
  } = usePosts();
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [trendPosts, setTrendPosts] = useState<PostInfo[]>([]);
  const [hasMoreTrend, setHasMoreTrend] = useState(true); //再読み込み判定

  const [followingsPosts, setFollowingsPosts] = useState<PostInfo[]>([]);
  const [hasMoreFollowing, setHasMoreFollowing] = useState(true); //再読み込み判定

  // useEffect(() => {
  //   if (activeTab === "trend") {
  //     setTrendPosts([]);
  //     setHasMoreTrend(true);
  //     loadTrend(1);
  //   } else {
  //     setFollowingsPosts([]);
  //     setHasMoreFollowing(true);
  //     loadFollowings(1);
  //   }
  // }, [activeTab]);

  const registerPost = async (text: string, img: File | null) => {
    try {
      setLoading(true);

      if (!text || text.length === 0 || text.length > 200) {
        throw new Error("text should be less than 200");
      }
      const testImg = "/assets/food_fruit_sandwich_ichigo.png";
      const newPost = await registerPostAPI(userInfoJotai.id!, testImg, text);
      if (!newPost) {
        throw new Error("Something wrong with registering new post");
      }
      if (activeTab === "trend") {
        setTrendPosts([newPost, ...trendPosts]);
      } else {
        setFollowingsPosts([newPost, ...followingsPosts]);
      }
    } catch (error: any) {
      setErrorMsg(error.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const setNextPosts = async (page: number) => {
    try {
      console.log(page);
      const token = localStorage.getItem("authToken");
      const userId = userInfoJotai.id;
      if (!userId) {
        throw new Error("userId couldn't be extracted from storage.");
      }
      if (activeTab === "trend") {
        let recentPosts = await getTrendPostList(token, 20, page);
        console.log(recentPosts);
        if (!recentPosts) {
          recentPosts = [];
        }

        setHasMoreTrend(recentPosts.length > 0);
        setTrendPosts([...trendPosts, ...recentPosts]);
      } else {
        let followingsPostsList = await getFollowingsPostList(
          token,
          userId,
          20,
          page
        );

        console.log(followingsPostsList);
        if (!followingsPostsList) {
          followingsPostsList = [];
        }

        setHasMoreFollowing(followingsPostsList.length > 0);
        setFollowingsPosts([...followingsPosts, ...followingsPostsList]);
      }
    } catch (error: any) {
      setHasMoreTrend(false);
      setTrendPosts([]);
      setFollowingsPosts([]);
      setErrorMsg("loading error");
    }
  };
  const loadTrend = async (page: number) => {
    setNextPosts(page);
  };

  const loadFollowings = async (page: number) => {
    setNextPosts(page);
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
          <Tab
            label="Trend"
            value="trend"
            className="feed__tab"
            // onClick={getRecentPosts}
          />
          <Tab
            label="Followings"
            value="followings"
            className="feed__tab"
            // onClick={getFollowingsPosts}
          />
        </Tabs>
      </div>

      <PostBox registerPost={registerPost} />
      {activeTab === "trend" && (
        <div className="feed__content">
          <InfiniteScroll // ← ⑨
            pageStart={0} // ← ⑩
            loadMore={loadTrend} // ← ⑪
            loader={
              <div className="posts_loading_container">
                <CircularProgress className="posts_loading_icon" />
              </div>
            }
            hasMore={hasMoreTrend} // ← ⑬
            useWindow={false}
          >
            {hasMoreTrend ? "true" : "false"}
            {trendPosts.map((post) => (
              <Post key={`trend_${post.id}`} post={post} />
            ))}
          </InfiniteScroll>
        </div>
      )}

      {activeTab === "followings" && (
        <div className="feed__content">
          <InfiniteScroll // ← ⑨
            pageStart={0} // ← ⑩
            loadMore={loadFollowings} // ← ⑪
            loader={
              <div className="posts_loading_container">
                <CircularProgress className="posts_loading_icon" />
              </div>
            }
            hasMore={hasMoreFollowing} // ← ⑬
            useWindow={false}
          >
            {hasMoreFollowing ? "true" : "false"}
            <div>
              {followingsPosts.map((post) => (
                <Post key={`following_${post.id}`} post={post} />
              ))}
            </div>
          </InfiniteScroll>
        </div>
      )}
    </div>
  );
};

export default Feed;
