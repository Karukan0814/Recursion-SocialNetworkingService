import Sidebar from "../component/Sidebar";

import Message from "../component/Message";

const MessagePage = () => {
  return (
    <>
      <Sidebar currentPage="message" />
      <Message />
    </>
  );
};

export default MessagePage;
