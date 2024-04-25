import React, { useState } from "react";
import Post from "./Post";
import { PostInfo } from "../lib/type/PostType";
import { Avatar } from "@mui/material";
import "../style/ReplyForm.css";

type Props = {
  post: PostInfo;
  handleClose: () => void;
};
const ReplyForm = ({ post, handleClose }: Props) => {
  const [reply, setReply] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // ページの再読み込みを防ぐ
    setReply(""); // 入力フィールドをクリア
    handleClose();
  };
  return (
    <div className="replyForm__container">
      <div className="post">
        <div className="post__avatar">
          <Avatar src={post.avatar} />
        </div>
        <div className="post__body">
          <div className="post__header">
            <div className="post__headerText">
              <h3>
                <span className="post__headerSpecial">{post.username}</span>
              </h3>
              <h3>
                <span className="post__headerSpecial time">
                  {post.createDateTime.toLocaleString()}
                </span>
              </h3>
            </div>
            <div className="post__headerDescription">
              <p>{post.text}</p>
            </div>
          </div>
          <img src={post.image} alt="" />
        </div>
      </div>
      <form onSubmit={(e) => handleSubmit(e)} className="replyForm">
        <textarea
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          placeholder="Tweet your reply..."
          className="replyForm__textArea"
          style={{ flexGrow: 1, marginRight: "10px", height: "50px" }}
        />
        <div className="replyForm__Button__container">
          <button
            type="submit"
            disabled={!reply.trim()}
            className="replyForm__Button"
          >
            Reply
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReplyForm;
