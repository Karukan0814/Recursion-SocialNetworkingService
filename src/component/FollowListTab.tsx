import InfiniteScroll from "react-infinite-scroller";
import Post from "./Post";
import usePosts from "../hooks/usePosts";
import "../style/PostListTab.css";
import Loading from "./Loading";
import { PostType } from "../lib/type/PostType";
import { useEffect, useState } from "react";
import { FollowType } from "../lib/type/UserInfoType";
import useFollow from "../hooks/useFollow";
import UserCard from "./UserCard";

type Props = {
  tabName: FollowType;
  userId: number;
};
const FollowListTab = ({ tabName, userId }: Props) => {
  const { userList, setNextUser, hasMore } = useFollow(tabName, userId);
  console.log(userList);
  const loadNextList = async (page: number) => {
    console.log("loadNextList", page);
    setNextUser(page);
  };

  return (
    <>
      <div className="tab__content">
        <InfiniteScroll
          pageStart={1}
          loadMore={loadNextList}
          // loader={}
          hasMore={hasMore}
          useWindow={false}
          initialLoad={false}
        >
          {userList.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </InfiniteScroll>
      </div>
    </>
  );
};

export default FollowListTab;
