import React, { useState } from "react";
import "../style/Message.css";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ConversationCard from "./ConversationCard";
import Conversation from "./Conversation";
import ConversationList from "./ConversationList";
import { ConversationInfoType } from "../lib/type/MessageInfoType";

const Message = () => {
  // const [activeConversationId, setActiveConversationId] = useState<number>(0);
  const [activeConversationInfo, setActiveConversationInfo] =
    useState<ConversationInfoType>();

  return (
    <div className="message_container">
      <div className="messageList_container">
        <ConversationList
          activeConversationInfo={activeConversationInfo}
          setActiveConversationInfo={setActiveConversationInfo}
        />
      </div>
      <div className="sectionMessages_conversation">
        <Conversation activeConversationInfo={activeConversationInfo} />
      </div>
    </div>
  );
};

export default Message;