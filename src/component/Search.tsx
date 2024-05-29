import { useState } from "react";
import PostListTab from "./PostListTab";
import { PostType } from "../lib/type/PostType";

import "../style/Search.css";
import SearchInput from "./SearchInput";
type Props = {};
const Search = ({}: Props) => {
  //TODO User検索機能の追加

  const [keyword, setKeyword] = useState("");

  return (
    <div className="search">
      <SearchInput keyword={keyword} setKeyword={setKeyword} />

      <PostListTab tabName={PostType.search} keyWord={keyword} />
    </div>
  );
};

export default Search;
