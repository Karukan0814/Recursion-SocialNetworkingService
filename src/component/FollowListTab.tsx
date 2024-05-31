import InfiniteScroll from "react-infinite-scroller";

import { FollowType } from "../lib/type/UserInfoType";
import useFollow from "../hooks/useFollow";
import UserCard from "./UserCard";
import Loading from "./Loading";

type Props = {
  tabName: FollowType;
  userId: number;
};
const FollowListTab = ({ tabName, userId }: Props) => {
  const { userList, setNextUser, hasMore } = useFollow(tabName, userId);
  const loadNextList = async (page: number) => {
    setNextUser(page);
  };

  return (
    <>
      <div className="tab__content">
        <InfiniteScroll
          pageStart={1}
          loadMore={loadNextList}
          loader={<Loading />}
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
