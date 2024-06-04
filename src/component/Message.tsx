import { useEffect, useState } from "react";
import "../style/Message.css";

import Conversation from "./Conversation";
import ConversationList from "./ConversationList";
import { ConversationInfoType } from "../lib/type/MessageInfoType";
import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

type Props = { triggeredById?: number };

const Message = ({ triggeredById }: Props) => {
  const [activeConversationInfo, setActiveConversationInfo] =
    useState<ConversationInfoType>();

  const [isScreenSmall, setIsScreenSmall] = useState(window.innerWidth <= 1066);

  useEffect(() => {
    const handleResize = () => {
      setIsScreenSmall(window.innerWidth <= 1066);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleBack = () => {
    setActiveConversationInfo(undefined);
  };

  return (
    <div className="message_container">
      {isScreenSmall ? (
        <>
          {!activeConversationInfo ? (
            <div
              className={`messageList_container ${
                isScreenSmall && "message__isSmall"
              }`}
            >
              <ConversationList
                activeConversationInfo={activeConversationInfo}
                setActiveConversationInfo={setActiveConversationInfo}
                triggeredById={triggeredById}
              />
            </div>
          ) : (
            <div
              className={`sectionMessages_conversation ${
                isScreenSmall && "message__isSmall"
              }`}
            >
              <div className="sectionMessages_header">
                <IconButton className="iconButton" onClick={handleBack}>
                  <ArrowBackIcon />
                </IconButton>
              </div>
              <Conversation activeConversationInfo={activeConversationInfo} />
            </div>
          )}
        </>
      ) : (
        <>
          <div className="messageList_container">
            <ConversationList
              activeConversationInfo={activeConversationInfo}
              setActiveConversationInfo={setActiveConversationInfo}
              triggeredById={triggeredById}
            />
          </div>

          <div className="sectionMessages_conversation">
            <Conversation activeConversationInfo={activeConversationInfo} />
          </div>
        </>
      )}
    </div>
  );
};

export default Message;
