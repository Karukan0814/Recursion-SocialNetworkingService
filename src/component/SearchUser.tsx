import { useState } from "react";
import "../style/SearchUser.css";
import InfiniteScroll from "react-infinite-scroller";
import { Avatar } from "@mui/material";
import SearchInput from "./SearchInput";
import useUsers from "../hooks/useUsers";

type Props = {
  // setSelectedUserId: React.Dispatch<React.SetStateAction<number>>;
  handleSelectUser: (userId?: number) => void;
};
const SearchUser = ({ handleSelectUser }: Props) => {
  const [keyword, setKeyword] = useState("");
  const { userList, setNextUser, hasMore } = useUsers(keyword);
  console.log(userList);
  const loadNextList = async (page: number) => {
    console.log("loadNextList", page);
    setNextUser(page);
  };

  return (
    <div className="searchUser__container">
      <SearchInput keyword={keyword} setKeyword={setKeyword} />
      <div className="searchUser_resultList">
        <InfiniteScroll
          pageStart={1}
          loadMore={loadNextList}
          // loader={}
          hasMore={hasMore}
          useWindow={false}
          initialLoad={false}
        >
          {userList.map((user, i) => (
            // <UserCard user={user} key={user.id} />

            <div
              className="searchUser_result"
              onClick={() => handleSelectUser(user.id)}
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
