import { useEffect, useState } from "react";
import "../style/PostDetail.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useAtom } from "jotai";
import Sidebar from "../component/Sidebar";
import { PostInfo, PostType } from "../lib/type/PostType";
import Post from "../component/Post";
import Widgets from "../component/Widgets";
import { getPostInfo } from "../lib/database/Post";
import Loading from "../component/Loading";
import PostListTab from "../component/PostListTab";
import { userInfoAtom } from "../lib/jotai/atoms/user";

type FormData = {
  replyMessage: string;
  replyImage: File | null;
};

const PostDetailPage = () => {
  const [userInfoJotai, setuserInfoJotai] = useAtom(userInfoAtom); //ユーザー情報のグローバルステート

  const navigate = useNavigate();
  const { postId } = useParams();
  const [parentPost, setParentPost] = useState<PostInfo | null>(null);

  if (!postId) {
    navigate("/notfound");
  }

  useEffect(() => {
    const fetchPostInfo = async () => {
      const token = userInfoJotai.authtoken;
      const postInfo = await getPostInfo(postId!, token);
      setParentPost(postInfo);
    };

    fetchPostInfo();
    // setReplyToId(parseInt(postId!));
  }, [postId]);
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
        <div className="postDetail_parentPost__conatiner">
          {parentPost ? (
            <>
              {parentPost.post && (
                <Post
                  post={parentPost.post}
                  displayFooter={false}
                  parentPostFlag={true}
                />
              )}

              <Post post={parentPost} displayDeleteFlag={true} />
            </>
          ) : (
            <Loading />
          )}
        </div>

        <PostListTab tabName={PostType.detail} replyToId={parseInt(postId!)} />
      </div>
      <Widgets />
    </>
  );
};

export default PostDetailPage;
