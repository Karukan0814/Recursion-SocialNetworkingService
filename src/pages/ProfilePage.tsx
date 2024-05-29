import { useParams } from "react-router-dom";
import Sidebar from "../component/Sidebar";
import Widgets from "../component/Widgets";
import Profile from "../component/Profile";

const ProfilePage = () => {
  const { userId } = useParams();
  console.log({ userId });

  return (
    <>
      <Sidebar currentPage={`profile/${userId}`} />
      <Profile userId={parseInt(userId!)} />
      <Widgets />
    </>
  );
};

export default ProfilePage;
