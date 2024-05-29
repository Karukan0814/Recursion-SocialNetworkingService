import { useState } from "react";
import "../style/UserCard.css";

import { useAtom } from "jotai";
import { Link } from "react-router-dom";
import { Avatar } from "@mui/material";
import { UserInfoType } from "../lib/type/UserInfoType";
import FollowSwitch from "./FollowSwitch";
import { userInfoAtom } from "../lib/jotai/atoms/user";
type Props = {
  user: UserInfoType;
};
const UserCard = ({ user }: Props) => {
  const [userInfoJotai] = useAtom(userInfoAtom);

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
