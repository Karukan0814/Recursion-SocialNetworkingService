import { useParams } from "react-router-dom";
import Sidebar from "../component/Sidebar";
import Message from "../component/Message";

const MessagePage = () => {
  const { id } = useParams();
  const triggeredById = parseInt(id || "");
  return (
    <>
      <Sidebar currentPage="message" />
      <Message triggeredById={triggeredById} />
    </>
  );
};

export default MessagePage;
