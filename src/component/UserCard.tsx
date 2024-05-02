import {
  ChatBubbleOutline,
  Favorite,
  FavoriteBorder,
  Publish,
  Repeat,
  VerifiedUser,
} from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";
import "../style/UserCard.css";
import { PostInfo } from "../lib/type/PostType";
import { SetStateAction, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ModalPopup from "./ModalPopup";
import ReplyForm from "./ReplyForm";
import PostLikeButton from "./PostLikeButton";
import PostReplyButton from "./PostReplyButton";
import { UserInfoType } from "../lib/type/UserInfoType";
import Follow from "./Follow";
import FollowSwitch from "./FollowSwitch";
import { useAtom } from "jotai";
import { userInfoAtom } from "../lib/jotai/atoms/user";
type Props = {
  user: UserInfoType;
};
const UserCard = ({ user }: Props) => {
  const [userInfoJotai, setUserInfoJotai] = useAtom(userInfoAtom);

  const [followFlag, setFollowFlag] = useState(
    userInfoJotai.userInfo?.followings?.includes(user.id!) || false
  );

  return (
    <>
      <Link to={`/profile/${user.id}`} style={{ textDecoration: "none" }}>
        <div className="userCard">
          <div className="userCard__content">
            <div className="userCard__avatar">
              <Avatar
                src={user.userImg || "/assets/default_profile_400x400.png"}
              />
            </div>
            <div className="userCard__body">
              <div className="userCard__header">
                <div className="userCard__headerText">
                  <h3>
                    <span className="userCard__headerSpecial">{user.name}</span>
                  </h3>
                </div>
                {userInfoJotai.userInfo?.id !== user.id && (
                  <FollowSwitch
                    followFlag={followFlag}
                    setFollowFlag={setFollowFlag}
                    followUserId={user.id!}
                  />
                )}
              </div>
              <div className="userCard__headerDescription">
                <p>{user.introduction}</p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default UserCard;
