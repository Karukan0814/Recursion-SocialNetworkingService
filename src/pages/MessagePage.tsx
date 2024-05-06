import React, { useEffect, useState } from "react";
import Sidebar from "../component/Sidebar";
import ConversationCard from "../component/ConversationCard";
import Conversation from "../component/Conversation";
import { IconButton } from "@mui/material";
import useLogin from "../hooks/useLogin";
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
