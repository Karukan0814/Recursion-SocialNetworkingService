import React, { useEffect, useState } from "react";
import Post from "./Post";
import { PostInfo, PostType } from "../lib/type/PostType";
import { Avatar } from "@mui/material";
import "../style/ReplyForm.css";
import PostBox from "./PostBox";
import usePosts from "../hooks/usePosts";

type Props = {
  post: PostInfo;
  handleClose: () => void;
  setReplyCount: (value: React.SetStateAction<number>) => void;
};
const ReplyForm = ({ post, handleClose, setReplyCount }: Props) => {
  const { registerPost, postList } = usePosts(PostType.reply);
  useEffect(() => {
    if (postList.length > 0) {
      setReplyCount((prev) => prev + 1);
      handleClose();
    }
  }, [postList]);
  return (
    <div className="replyForm__container">
      <Post post={post} displayFooter={false} />
      <PostBox
        registerPost={registerPost}
        postType={PostType.reply}
        replyToId={post.id}
      />
    </div>
  );
};

export default ReplyForm;
