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
  profileUserId?: number;
  keyWord?: string;
};
const PostListTab = ({ tabName, replyToId, profileUserId, keyWord }: Props) => {
  console.log(replyToId);
  const { postList, registerPost, setNextPost, hasMore } = usePosts(
    tabName,
    replyToId,
    profileUserId,
    keyWord
  );
  console.log(postList);
  const loadNextList = async (page: number) => {
    console.log("loadNextList", page, replyToId);
    setNextPost(page, replyToId);
  };

  // 表示するタブ名を配列で定義
  const validTabs = [
    PostType.trend,
    PostType.detail,
    PostType.followings,
    PostType.reply,
  ];

  // tabNameがvalidTabs配列に含まれているかチェック
  const shouldDisplayPostBox = validTabs.includes(tabName);

  return (
    <>
      {shouldDisplayPostBox && (
        <PostBox
          registerPost={registerPost}
          replyToId={replyToId}
          postType={tabName}
        />
      )}
      <div className="tab__content">
        <InfiniteScroll
          pageStart={1}
          loadMore={loadNextList}
          // loader={}
          hasMore={hasMore}
          useWindow={false}
          initialLoad={false}
        >
          {postList.map((post, i) => (
            // <Post key={`${tabName}_${post.id}`} post={post} />
            <Post key={post.id} post={post} />
          ))}
        </InfiniteScroll>
      </div>
    </>
  );
};

export default PostListTab;
