import React from "react";
import PostBox from "./PostBox";
import InfiniteScroll from "react-infinite-scroller";
import { CircularProgress } from "@mui/material";
import Post from "./Post";
import usePosts from "../hooks/usePosts";
import "../style/PostListTab.css";
import Loading from "./Loading";

type Props = {
  tabName: string;
};
const PostListTab = ({ tabName }: Props) => {
  const {
    postList,
    registerPost,

    setNextPost,
    hasMore,
  } = usePosts(tabName);

  const loadNextList = async (page: number) => {
    setNextPost(page);
  };

  return (
    <>
      <PostBox registerPost={registerPost} />
      <div className="tab__content">
        <InfiniteScroll
          pageStart={0}
          loadMore={loadNextList}
          loader={<Loading />}
          hasMore={hasMore}
          useWindow={false}
        >
          {/* {hasMore ? "true" : "false"} */}
          {postList.map((post) => (
            <Post key={`trend_${post.id}`} post={post} />
          ))}
        </InfiniteScroll>
      </div>
    </>
  );
};

export default PostListTab;
