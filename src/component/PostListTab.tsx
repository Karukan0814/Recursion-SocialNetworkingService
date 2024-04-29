import PostBox from "./PostBox";
import InfiniteScroll from "react-infinite-scroller";
import Post from "./Post";
import usePosts from "../hooks/usePosts";
import "../style/PostListTab.css";
import Loading from "./Loading";
import { PostType } from "../lib/type/PostType";
import { useEffect, useState } from "react";

type Props = {
  tabName: PostType;
  replyToId?: number;
};
const PostListTab = ({ tabName, replyToId }: Props) => {
  console.log(replyToId);
  const {
    postList,
    registerPost,
    // initializePosts,
    setNextPost,
    hasMore,
  } = usePosts(tabName, replyToId);
  console.log(postList);
  const loadNextList = async (page: number) => {
    console.log("loadNextList", page, replyToId);
    setNextPost(page, replyToId);
  };

  // useEffect(() => {
  //   console.log("useEffect__postlisttab");
  //   // setInitialLoad(true);
  //   setNextPost(0, replyToId);
  // }, [replyToId]);

  return (
    <>
      <PostBox
        registerPost={registerPost}
        replyToId={replyToId}
        postType={tabName}
      />
      <div className="tab__content">
        <InfiniteScroll
          pageStart={1}
          loadMore={loadNextList}
          // loader={}
          hasMore={hasMore}
          useWindow={false}
          initialLoad={false}
        >
          {postList.map((post) => (
            <Post key={`${tabName}_${post.id}`} post={post} />
          ))}
        </InfiniteScroll>
      </div>
    </>
  );
};

export default PostListTab;
