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
    <div className="postReplyButton__container">
      <IconButton
        className="postReplyButton__iconButton"
        onClick={(e) => handleReply(e)}
      >
        <ChatBubbleOutline fontSize="small" />
      </IconButton>
      <span className="postReplyButton__count">{replyCount}</span>
    </div>
  );
};

export default PostReplyButton;
