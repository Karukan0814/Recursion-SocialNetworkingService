import {
  ChatBubbleOutline,
  Favorite,
  FavoriteBorder,
  Publish,
  Repeat,
  VerifiedUser,
} from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";
import "../style/Post.css";
import { PostInfo } from "../lib/type/PostType";
import { useState } from "react";
import { Link } from "react-router-dom";
import ModalPopup from "./ModalPopup";
import ReplyForm from "./ReplyForm";
import PostLikeButton from "./PostLikeButton";
import PostReplyButton from "./PostReplyButton";
type Props = {
  post: PostInfo;
  displayFooter?: boolean;
};
const Post = ({ post, displayFooter = true }: Props) => {
  const formattedTime = post.createdAt.toLocaleString();
  const [openReply, setOpenReply] = useState(false);
  const [replyCount, setReplyCount] = useState(post.replies.length);

  return (
    <>
      <Link to={`/post/${post.id}`} style={{ textDecoration: "none" }}>
        <div className="post">
          <div className="post__content">
            <div className="post__avatar">
              <Link to={`/profile/${post.user.id}`}>
                <Avatar
                  src={
                    post.user.userImg ?? "/assets/default_profile_400x400.png"
                  }
                />
              </Link>
            </div>
            <div className="post__body">
              <div className="post__header">
                <div className="post__headerText">
                  <h3>
                    <span className="post__headerSpecial">{post.username}</span>
                  </h3>
                  <h3>
                    <span className="post__headerSpecial time">
                      {formattedTime}
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
          {displayFooter && (
            <div className="post__footer">
              <PostReplyButton
                replyCount={replyCount}
                setOpenReply={setOpenReply}
              />
              <PostLikeButton postInfo={post} />
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
