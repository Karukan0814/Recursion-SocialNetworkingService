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
import { PostInfo } from "../types/PostType";
import { useState } from "react";
import { Link } from "react-router-dom";
import ModalPopup from "./ModalPopup";
import ReplyForm from "./ReplyForm";
type Props = {
  post: PostInfo;
  displayFooter?: boolean;
};
const Post = ({ post, displayFooter = true }: Props) => {
  const formattedTime = post.createDateTime.toLocaleString();
  const [liked, setLiked] = useState(false);
  const [openReply, setOpenReply] = useState(false);

  const handleReply = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("handleReply");
    setOpenReply(true);
  };

  const handleLike = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("handleLike");
    setLiked(!liked);
  };
  return (
    <>
      <Link to={`/post/${post.id}`} style={{ textDecoration: "none" }}>
        <div className="post">
          <div className="post__content">
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
              <IconButton
                className="post__iconButton"
                onClick={(e) => handleReply(e)}
              >
                <ChatBubbleOutline fontSize="small" />
              </IconButton>
              <IconButton
                className="post__iconButton"
                onClick={(e) => handleLike(e)}
              >
                {liked ? (
                  <Favorite fontSize="small" color="secondary" />
                ) : (
                  <FavoriteBorder fontSize="small" />
                )}
              </IconButton>
            </div>
          )}
        </div>
      </Link>
      <ModalPopup open={openReply} handleClose={() => setOpenReply(false)}>
        <ReplyForm post={post} handleClose={() => setOpenReply(false)} />
      </ModalPopup>
    </>
  );
};

export default Post;
