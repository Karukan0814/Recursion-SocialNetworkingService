import { useState } from "react";
import "../style/SearchUser.css";
import InfiniteScroll from "react-infinite-scroller";
import { Avatar } from "@mui/material";
import SearchInput from "./SearchInput";
import useUsers from "../hooks/useUsers";
import Loading from "./Loading";

type Props = {
  handleSelectUser: (userId?: number) => void;
};
const SearchUser = ({ handleSelectUser }: Props) => {
  const [keyword, setKeyword] = useState("");
  const { userList, setNextUser, hasMore, loading } = useUsers(keyword);
  const loadNextList = async (page: number) => {
    setNextUser(page);
  };

  return (
    <div className="searchUser__container">
      <SearchInput keyword={keyword} setKeyword={setKeyword} />
      <div className="searchUser_resultList">
        <InfiniteScroll
          pageStart={1}
          loadMore={loadNextList}
          loader={<Loading />}
          hasMore={hasMore}
          useWindow={false}
          initialLoad={false}
        >
          {userList.map((user, i) => (
            <div
              className="searchUser_result"
              onClick={() => handleSelectUser(user.id)}
              key={user.id}
            >
              <div className="result__avatar">
                <Avatar
                  src={user.userImg || "/assets/default_profile_400x400.png"}
                />
              </div>
              <h3>
                <span className="result__name">{user.name}</span>
              </h3>
            </div>
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default SearchUser;
