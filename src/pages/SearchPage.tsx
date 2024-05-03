import Sidebar from "../component/Sidebar";
import "../style/SearchPage.css";
import Widgets from "../component/Widgets";
import Search from "../component/Search";

const SearchPage = () => {
  return (
    <>
      <Sidebar currentPage="search" />
      <Search />
      <Widgets />
    </>
  );
};

export default SearchPage;
