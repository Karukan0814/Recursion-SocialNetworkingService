import { Search } from "@mui/icons-material";
import React from "react";
import "../style/SearchInput.css";

const SearchInput = () => {
  return (
    <div className="search__input">
      <Search className="search__searchIcon" />
      <input placeholder="Search Twitter" type="text" />
    </div>
  );
};

export default SearchInput;
