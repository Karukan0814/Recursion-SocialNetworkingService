import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../component/Sidebar";
import { PostInfo, PostType } from "../lib/type/PostType";
import Post from "../component/Post";
import Widgets from "../component/Widgets";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton } from "@mui/material";
import "../style/PostDetail.css";
import { useNavigate } from "react-router-dom";
import useLogin from "../hooks/useLogin";
import { getPostInfo } from "../lib/database/Post";
import Loading from "../component/Loading";
import PostBox from "../component/PostBox";
import usePosts from "../hooks/usePosts";
import PostListTab from "../component/PostListTab";

type FormData = {
  replyMessage: string;
  replyImage: File | null;
};

const PostDetailPage = () => {
  const { blockUnauthorizedUser } = useLogin();
  const navigate = useNavigate();
  const { postId } = useParams();
  const [parentPost, setParentPost] = useState<PostInfo | null>(null);

  let replyToId = 0;
  const { registerPost, postList } = usePosts(PostType.detail);

  const token = localStorage.getItem("authToken"); // トークンをローカルストレージに保存

  useEffect(() => {
    blockUnauthorizedUser();
    if (!postId) {
      navigate("/notfound");
      return;
    } else {
      replyToId = parseInt(postId);
    }

    const fetchPostInfo = async () => {
      const token = localStorage.getItem("authToken");
      const postInfo = await getPostInfo(postId, token);
      setParentPost(postInfo);
    };

    fetchPostInfo();
  }, []);
  const handleBack = () => {
    navigate(-1); // 一つ前のページに戻る
  };

  return (
    <>
      <Sidebar currentPage="post" />
      <div className="postDetail__container">
        <div className="postDetail__header">
          <IconButton className="iconButton" onClick={handleBack}>
            <ArrowBackIcon />
          </IconButton>
        </div>
        <div className="parentPost__conatiner">
          {parentPost ? <Post post={parentPost} /> : <Loading />}
        </div>

        <PostListTab tabName={PostType.detail} replyToId={replyToId} />
      </div>
      <Widgets />
    </>
  );
};

export default PostDetailPage;
