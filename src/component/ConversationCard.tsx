import React from "react";

import "../style/ConversationCard.css";
import { ConversationInfoType } from "../lib/type/MessageInfoType";
import { useAtom } from "jotai";
import { userInfoAtom } from "../lib/jotai/atoms/user";
type Props = {
  active?: boolean;
  conversation: ConversationInfoType;
  // setActiveConversationId: React.Dispatch<React.SetStateAction<number>>;
  setActiveConversation: React.Dispatch<
    React.SetStateAction<ConversationInfoType | undefined>
  >;
};

const ConversationCard = ({
  active = false,
  conversation,
  // setActiveConversationId,
  setActiveConversation,
}: Props) => {
  console.log("conversation", conversation);

  const [userInfoJotai, setuserInfoJotai] = useAtom(userInfoAtom); //ユーザー情報のグローバルステート

  const participantList = conversation.participants.filter(
    (val) => val.userId !== userInfoJotai.userInfo?.id
  );

  const participant = participantList[0];
  return (
    <div
      className={`conversationCard__container  ${
        active && "conversationCard__container--active"
      }`}
      onClick={() => {
        // setActiveConversationId(conversation.id);
        setActiveConversation(conversation);
      }}
    >
      <img
        className="conversationCard__icon"
        src={participant.user?.userImg}
        alt="iconImg"
      />
      <div className="conversationCard__text__container">
        <span>{participant.user?.name}</span>
      </div>
    </div>
  );
};

export default ConversationCard;
