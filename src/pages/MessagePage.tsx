import React, { useEffect, useState } from "react";
import Sidebar from "../component/Sidebar";
import "../style/MessagePage.css";
import MessageCard from "../component/MessageCard";
import Conversation from "../component/Conversation";
import AddIcon from "@mui/icons-material/Add";
import { IconButton } from "@mui/material";
import useLogin from "../hooks/useLogin";

const MessagePage = () => {
  //TODO クリックしたメッセージカードの内容をConversationコンポーネントに表示する
  const [acctiveMessage, setActiveMessage] = useState(null);

  const handleAddMessage = () => {
    //TODO 新たなメッセージの作成機能作成
  };

  return (
    <>
      <Sidebar currentPage="message" />
      <div className="message_container">
        <div className="messageList_container">
          <div className="sectionTitle__container">
            <h2 className="sectionTitle__text">Messages</h2>
            <IconButton
              className="add__messageButton"
              aria-label="add message"
              onClick={handleAddMessage}
            >
              <AddIcon className="add__messageIcon" />
            </IconButton>
          </div>
          <div className="sectionMessages_container">
            <div className="sectionMessages_list">
              {Array.from({ length: 5 }, (_, i) => i).map((number) => (
                <MessageCard />
              ))}
            </div>
          </div>
        </div>
        <div className="sectionMessages_conversation">
          <Conversation />
        </div>
      </div>
    </>
  );
};

export default MessagePage;
