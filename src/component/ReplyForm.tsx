import React, { useEffect } from "react";
import "../style/ReplyForm.css";
import { Avatar } from "@mui/material";
import { PostInfo, PostType } from "../lib/type/PostType";
import PostBox from "./PostBox";
import usePosts from "../hooks/usePosts";
import { getMediaType } from "../lib/utils/utils";

type Props = {
  post: PostInfo;
  handleClose: () => void;
  setReplyCount: (value: React.SetStateAction<number>) => void;
};
const ReplyForm = ({ post, handleClose, setReplyCount }: Props) => {
  const { registerPost, postList, loading } = usePosts(PostType.reply);
  useEffect(() => {
    if (postList.length > 0) {
      setReplyCount((prev) => prev + 1);
      handleClose();
    }
  }, [postList]);
  return (
    <div className="replyForm__container">
      <div className="replyToPost">
        <div className="replyToPost__content">
          <div className="replyToPost__header">
            <div className="replyToPost__avatar">
              <Avatar
                src={post.user.userImg ?? "/assets/default_profile_400x400.png"}
              />
            </div>
          </div>
          <div className="replyToPost__body">
            <div className="replyToPost__body__content">
              <div className="replyToPost__body__header">
                <div className="replyToPost__headerText">
                  <h3>
                    <span className="replyToPost__headerSpecial">
                      {post.user.name}
                    </span>
                  </h3>
                  <h3>
                    <span className="replyToPost__headerSpecial time">
                      {post.sentAt?.toLocaleString()}
                    </span>
                  </h3>
                </div>
              </div>
              <div className="replyToPost__headerDescription">
                <p>{post.text}</p>
              </div>
            </div>
            {post.img && (
              <div className="replyToPost__img__container">
                {/* post.imgのurlの先にあるファイルが画像であればimg、videoであればvideo表示 */}
                {getMediaType() === "image" && (
                  <img
                    src={post.img}
                    alt={`${post.id}_photo_img`}
                    className="replyToPost__img"
                  />
                )}
                {getMediaType() === "video" && (
                  <video controls src={post.img} className="replyToPost__img" />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <PostBox
        registerPost={registerPost}
        registerLoading={loading}
        postType={PostType.reply}
        replyToId={post.id}
      />
    </div>
  );
};

export default ReplyForm;
