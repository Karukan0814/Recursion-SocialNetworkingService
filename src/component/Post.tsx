import { Avatar, IconButton } from "@mui/material";
import "../style/Post.css";
import { PostInfo } from "../lib/type/PostType";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ModalPopup from "./ModalPopup";
import ReplyForm from "./ReplyForm";
import PostLikeButton from "./PostLikeButton";
import PostReplyButton from "./PostReplyButton";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useAtom } from "jotai";
import { userInfoAtom } from "../lib/jotai/atoms/user";
import { deletePost } from "../lib/database/Post";
import { getMediaType } from "../lib/utils/utils";

type Props = {
  post: PostInfo;
  displayFooter?: boolean;
  parentPostFlag?: boolean;
  displayDeleteFlag?: boolean;
};
const Post = ({
  post,
  displayFooter = true,
  parentPostFlag = false,
  displayDeleteFlag = false,
}: Props) => {
  const [userInfoJotai, setuserInfoJotai] = useAtom(userInfoAtom); //ユーザー情報のグローバルステート

  const navigate = useNavigate();

  const formattedTime = post.sentAt
    ? post.sentAt.toLocaleString()
    : `This post is scheduled at ${post.scheduledAt?.toLocaleString()}`;

  const [openReply, setOpenReply] = useState(false);
  const [replyCount, setReplyCount] = useState(post.replies.length);
  const handlePostDelete = async (postId: number) => {
    // サーバー側にポストの削除
    await deletePost(
      userInfoJotai.authtoken,
      userInfoJotai.userInfo?.id,
      postId
    );
    // 一つ前の画面に戻る
    navigate(-1);
  };

  return (
    <>
      <Link to={`/post/${post.id}`} style={{ textDecoration: "none" }}>
        <div className={parentPostFlag ? "post_withoutBorder" : "post"}>
          <div className="post__content">
            <div className="post__header">
              <div className="post__avatar">
                <Link to={`/profile/${post.user.id}`}>
                  <Avatar
                    src={
                      post.user.userImg ?? "/assets/default_profile_400x400.png"
                    }
                  />
                </Link>
              </div>
              {parentPostFlag && (
                <div className="post__header__replyLine"></div>
              )}
            </div>
            <div className="post__body">
              <div className="post__body__content">
                <div className="post__body__header">
                  <div className="post__headerText">
                    <h3>
                      <span className="post__headerSpecial">
                        {post.user.name}
                      </span>
                    </h3>
                    <h3>
                      <span className="post__headerSpecial time">
                        {formattedTime}
                      </span>
                    </h3>
                  </div>
                  <div>
                    {
                      // ポストの投稿者IDとログインしているユーザーのIDが一致していたときのみ+displayDeleteFlag=trueのとき
                      post.user.id === userInfoJotai.userInfo?.id &&
                        displayDeleteFlag && (
                          <IconButton
                            className="post__delete__button"
                            onClick={async () =>
                              await handlePostDelete(post.id)
                            }
                          >
                            <HighlightOffIcon className="post__delete__icon" />
                          </IconButton>
                        )
                    }
                  </div>
                </div>
                <div className="post__headerDescription">
                  <p>{post.text}</p>
                </div>
              </div>
              {post.img && (
                <div className="post__img__container">
                  {/* post.imgのurlの先にあるファイルが画像であればimg、videoであればvideo表示 */}
                  {getMediaType() === "image" && (
                    <img
                      src={post.img}
                      alt={`${post.id}_photo_img`}
                      className="post__img"
                    />
                  )}
                  {getMediaType() === "video" && (
                    <video controls src={post.img} className="post__img" />
                  )}
                </div>
              )}
            </div>
          </div>
          {displayFooter && (
            <div className="post__footer">
              <PostReplyButton
                // postInfo={post}
                replyCount={replyCount}
                setOpenReply={setOpenReply}
                key={`${post.id}_reply`}
              />

              <PostLikeButton postInfo={post} key={`${post.id}_like`} />
            </div>
          )}
        </div>
      </Link>
      <ModalPopup open={openReply} handleClose={() => setOpenReply(false)}>
        <ReplyForm
          post={post}
          handleClose={() => setOpenReply(false)}
          setReplyCount={setReplyCount}
        />
      </ModalPopup>
    </>
  );
};

export default Post;
