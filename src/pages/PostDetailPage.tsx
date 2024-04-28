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
  // const [replies, setReplies] = useState<PostInfo[]>([]);
  console.log(postId);
  if (!postId) {
    navigate("/notfound");
  }
  let replyToId = parseInt(postId!);
  const { registerPost, postList } = usePosts(PostType.detail);

  const token = localStorage.getItem("authToken"); // トークンをローカルストレージに保存

  useEffect(() => {
    //初回表示時、ログインしていないユーザーをブロックする
    blockUnauthorizedUser();

    const searchPostInfo = async (postId: string) => {
      const postInfo = await getPostInfo(postId, token);
      console.log(postInfo);
      setParentPost(postInfo);
    };

    if (!postId) {
      navigate("/notfound");
    } else {
      replyToId = parseInt(postId);
      searchPostInfo(postId);
    }
  }, [postId]);
  //TODO postIdから当該ポストの最新情報を取得
  const [reply, setReply] = useState("");
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
