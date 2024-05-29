import React from "react";
import "../style/PostReplyButton.css";
import { ChatBubbleOutline } from "@mui/icons-material";
import { IconButton } from "@mui/material";
type Props = {
  replyCount: number;

  setOpenReply: (value: React.SetStateAction<boolean>) => void;
};
const PostReplyButton = ({ replyCount, setOpenReply }: Props) => {
  const handleReply = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setOpenReply(true);
  };
  return (
    <div className="replyButton__container">
      <IconButton className="reply__iconButton" onClick={(e) => handleReply(e)}>
        <ChatBubbleOutline fontSize="small" />
      </IconButton>
      <span className="reply__count">{replyCount}</span>
    </div>
  );
};

export default PostReplyButton;
