import { Search } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import "../style/SearchInput.css";

type Props = {
  keyword: string;
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
};
const SearchInput = ({ keyword, setKeyword }: Props) => {
  const [inputValue, setInputValue] = useState(keyword);

  // デバウンス処理を行うための useEffect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setKeyword(inputValue); // 入力値の停止1秒後に keyword 更新
    }, 1000);

    return () => clearTimeout(timeoutId); // コンポーネントのアンマウント時にタイマーをクリア
  }, [inputValue, setKeyword]);
  return (
    <div className="search__input">
      <Search className="search__searchIcon" />
      <input
        placeholder="Search KarukanSNS"
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        maxLength={200}
      />
    </div>
  );
};

export default SearchInput;
