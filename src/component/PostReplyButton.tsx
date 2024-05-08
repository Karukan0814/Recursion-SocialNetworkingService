import { ChatBubbleOutline } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React, { useState } from "react";
import { PostInfo } from "../lib/type/PostType";
import "../style/PostReplyButton.css";
type Props = {
  replyCount: number;
  // postInfo: PostInfo;

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
      {/* <span className="reply__count">{postInfo.replies.length}</span> */}
      <span className="reply__count">{replyCount}</span>
    </div>
  );
};

export default PostReplyButton;
