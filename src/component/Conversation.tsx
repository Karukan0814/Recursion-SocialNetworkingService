import React, { useEffect, useState } from "react";
import SpeechBubble from "./SpeechBubble";
import "../style/Conversation.css";
import SendIcon from "@mui/icons-material/Send";
import { Button, IconButton } from "@mui/material";
import {
  getMessagesByConversationId,
  registerMessageAPI,
} from "../lib/database/Message";
import { useAtom } from "jotai";
import { userInfoAtom } from "../lib/jotai/atoms/user";
import {
  ConversationInfoType,
  MessageInfoType,
} from "../lib/type/MessageInfoType";
import { UserInfoType } from "../lib/type/UserInfoType";
import { useForm } from "react-hook-form";

type Message = {
  text: string;
  isMine: boolean;
};

type FormData = {
  text: string;
};

const testMessages: Message[] = [
  { text: "test1", isMine: true },
  { text: "test2", isMine: false },
  { text: "test3", isMine: true },
];

type Props = {
  // conversationId: number;
  activeConversationInfo: ConversationInfoType | undefined;
};
const Conversation = ({ activeConversationInfo }: Props) => {
  const [userInfoJotai, setuserInfoJotai] = useAtom(userInfoAtom); //ユーザー情報のグローバルステート

  const [messages, setMessages] = useState<MessageInfoType[]>([]);
  const [input, setInput] = useState("");
  const [participant, setParticipant] = useState<UserInfoType>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>();

  const sendMessage = async (data: FormData) => {
    // TODO サーバーにメッセージを送信する＋リアルタイム受信
    console.log({ data });
    await registerMessageAPI(
      userInfoJotai.authtoken,
      activeConversationInfo?.id!,
      userInfoJotai.userInfo?.id!,
      data.text
    );
  };

  const handleGetConversationInfo = async () => {
    const newMessages = await getMessagesByConversationId(
      userInfoJotai.authtoken,
      activeConversationInfo?.id,
      userInfoJotai.userInfo?.id!
    );
    if (newMessages) {
      setMessages(newMessages);
    }
  };

  useEffect(() => {
    //指定されたconversationIdの最新情報を取得
    if (activeConversationInfo) {
      handleGetConversationInfo();
      const participantList = activeConversationInfo.participants.filter(
        (val) => val.userId !== userInfoJotai.userInfo?.id
      );

      const participant = participantList[0];
      if (participant && participant.user) {
        setParticipant(participant.user);
      }
    }
  }, [activeConversationInfo]);

  return (
    <div className="conversation">
      {activeConversationInfo && (
        <>
          <div className="conversation__userInfo">
            <img
              src={
                participant?.userImg || "/assets/default_profile_400x400.png"
              }
              alt="defaultImg"
              className="conversation__userInfo__img"
            />
            <div className="conversation__userInfo__name">
              <span>{participant?.name}</span>
            </div>
          </div>
          <div className="conversation-messages">
            {messages.map((msg, index) => (
              <SpeechBubble
                key={index}
                text={msg.text ? msg.text : ""}
                isMine={msg.isMine}
              />
            ))}
          </div>
          <form
            className="conversation-form"
            onSubmit={handleSubmit(sendMessage)}
          >
            <input
              id="text"
              type="text"
              placeholder="Input your message"
              {...register("text", {
                required: "message is required",
                maxLength: {
                  value: 200,
                  message: "message must be less than 200 characters long",
                },
              })}
            />
            <IconButton
              type="submit"
              className="conversation__sendIconButton"
              aria-label="send message"
            >
              <SendIcon className="conversation__sendIcon" />
            </IconButton>
          </form>
        </>
      )}
    </div>
  );
};
export default Conversation;
