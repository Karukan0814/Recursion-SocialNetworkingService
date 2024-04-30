import Sidebar from "../component/Sidebar";
import Feed from "../component/Feed";
import Widgets from "../component/Widgets";

const HomePage = () => {
  return (
    <>
      <Sidebar currentPage="home" />
      <Feed />
      <Widgets />
    </>
  );
};

export default HomePage;
