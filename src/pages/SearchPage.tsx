import React, { useEffect } from "react";
import Sidebar from "../component/Sidebar";
import SearchInput from "../component/SearchInput";
import "../style/SearchPage.css";
import Widgets from "../component/Widgets";
import useLogin from "../hooks/useLogin";

const SearchPage = () => {
  return (
    <>
      <Sidebar currentPage="search" />
      <div className="search__container">
        <SearchInput />
        <div className="search__results">
          <ul>
            <li>post1</li>

            <li>post2</li>
          </ul>
        </div>
      </div>
      <Widgets searchFlag={false} />
    </>
  );
};

export default SearchPage;
