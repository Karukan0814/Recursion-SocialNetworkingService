import { useParams } from "react-router-dom";
import Sidebar from "../component/Sidebar";
import Widgets from "../component/Widgets";
import Follow from "../component/Follow";

const FollowPage = () => {
  const { id } = useParams();
  const userId = parseInt(id || "");
  return (
    <>
      <Sidebar currentPage="follow" />
      <Follow userId={userId} />
      <Widgets />
    </>
  );
};

export default FollowPage;
