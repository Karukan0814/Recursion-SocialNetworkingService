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
import { UserInfoType } from "../lib/type/UserInfoType";
type Props = {
  user: UserInfoType;
};
const UserCard = ({ user }: Props) => {
  const handleFollow = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("handleReply");
  };

  return (
    <>
      <Link to={`/profile/${user.name}`} style={{ textDecoration: "none" }}>
        <div className="post">
          <div className="post__content">
            <div className="post__avatar">
              <Avatar
                src={user.userImg || "/assets/default_profile_400x400.png"}
              />
            </div>
            <div className="post__body">
              <div className="post__header">
                <div className="post__headerText">
                  <h3>
                    <span className="post__headerSpecial">{user.name}</span>
                  </h3>
                </div>
                <div className="post__headerDescription">
                  <p>{user.introduction}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default UserCard;
