import React, { useState } from "react";
import SpeechBubble from "./SpeechBubble";
import "../style/Conversation.css";
import SendIcon from "@mui/icons-material/Send";
import { Button, IconButton } from "@mui/material";

type Message = {
  text: string;
  isMine: boolean;
};

const testMessages: Message[] = [
  { text: "test1", isMine: true },
  { text: "test2", isMine: false },
  { text: "test3", isMine: true },
];
const Conversation = () => {
  const [messages, setMessages] = useState<Message[]>(testMessages);
  const [input, setInput] = useState("");

  const sendMessage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // TODO サーバーにメッセージを送信する＋リアルタイム受信
    if (input.trim()) {
      setMessages([...messages, { text: input, isMine: true }]);
      setInput("");
    }
  };

  return (
    <div className="conversation">
      <div className="conversation__userInfo">
        <img
          src="/assets/default_profile_400x400.png"
          alt="defaultImg"
          className="conversation__userInfo__img"
        />
        <div className="conversation__userInfo__name">
          <span>Username</span>
        </div>
      </div>
      <div className="conversation-messages">
        {messages.map((msg, index) => (
          <SpeechBubble key={index} text={msg.text} isMine={msg.isMine} />
        ))}
      </div>
      <form className="conversation-form" onSubmit={sendMessage}>
        <input
          placeholder="Input your message"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <IconButton
          type="submit"
          className="conversation__sendIconButton"
          aria-label="send message"
        >
          <SendIcon className="conversation__sendIcon" />
        </IconButton>
      </form>
    </div>
  );
};

export default Conversation;
