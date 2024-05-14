import Sidebar from "../component/Sidebar";

import Message from "../component/Message";
import { useParams } from "react-router-dom";

const MessagePage = () => {
  const { id } = useParams();
  console.log("FollowPage", id);
  const triggeredById = parseInt(id || "");
  return (
    <>
      <Sidebar currentPage="message" />
      <Message triggeredById={triggeredById} />
    </>
  );
};

export default MessagePage;
