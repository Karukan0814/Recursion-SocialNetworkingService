import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../component/Sidebar";
import { PostInfo } from "../types/PostType";
import Post from "../component/Post";
import Widgets from "../component/Widgets";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton } from "@mui/material";
import "../style/PostDetail.css";
const testPosts: PostInfo[] = [
  {
    id: "1",
    username: "testuser1",
    text: "testposttestposttestposttestposttestposttestpost",
    avatar: "/assets/default_profile_400x400.png",
    createDateTime: new Date(),
    updateDateTime: new Date(),
  },
  {
    id: "2",
    username: "testuser2",
    text: "testposttestposttestposttestposttestposttestpost",
    avatar: "/assets/default_profile_400x400.png",
    createDateTime: new Date("2024-04-016T12:34:56Z"),
    updateDateTime: new Date("2024-04-019T12:34:56Z"),
  },
  {
    id: "3",
    username: "testuser3",
    text: "testposttestposttestposttestposttestposttestpost",
    avatar: "/assets/default_profile_400x400.png",
    createDateTime: new Date("2024-04-017T12:34:56Z"),
    updateDateTime: new Date("2024-04-019T12:34:56Z"),
  },
];

const parentPost = {
  id: "100",
  username: "testuser1",
  text: "testposttestposttestposttestposttestposttestpost",
  avatar: "/assets/default_profile_400x400.png",
  createDateTime: new Date(),
  updateDateTime: new Date(),
};

const PostDetailPage = () => {
  const { postId } = useParams();
  const [reply, setReply] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // ページの再読み込みを防ぐ
    setReply(""); // 入力フィールドをクリア
  };
  const [post, setPost] = useState<PostInfo>(parentPost);

  const [replies, setReplies] = useState<PostInfo[]>(testPosts);

  return (
    <>
      <Sidebar currentPage="post" />
      <div className="postDetail__container">
        <div className="postDetail__header">
          <IconButton className="iconButton">
            <ArrowBackIcon />
          </IconButton>
        </div>
        <div className="parentPost__conatiner">
          <Post post={post} />
        </div>
        <div>
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
        <div className="replies__container">
          {replies.map((reply) => (
            <Post post={reply} displayFooter={false} />
          ))}
        </div>
      </div>
      <Widgets />
    </>
  );
};

export default PostDetailPage;
