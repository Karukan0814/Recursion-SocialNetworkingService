import PostBox from "./PostBox";
import InfiniteScroll from "react-infinite-scroller";
import Post from "./Post";
import usePosts from "../hooks/usePosts";
import "../style/NotificationList.css";

import Loading from "./Loading";
import { PostType } from "../lib/type/PostType";
import { SetStateAction, useEffect, useState } from "react";
import { FollowType } from "../lib/type/UserInfoType";
import useFollow from "../hooks/useFollow";
import UserCard from "./UserCard";
import ConversationCard from "./ConversationCard";
import useConversation from "../hooks/useConversation";
import { IconButton } from "@mui/material";
import { AddIcCallOutlined } from "@mui/icons-material";
import "../style/NotificationList.css";
import ModalPopup from "./ModalPopup";
import SearchUser from "./SearchUser";
import { ConversationInfoType } from "../lib/type/MessageInfoType";
import { useAtom } from "jotai";
import { userInfoAtom } from "../lib/jotai/atoms/user";
import { getRecentNotifications } from "../lib/database/Notification";
import { NotificationInfoType } from "../lib/type/NotificationInfoType";
import NotificationCard from "./NotificationCard";

type Props = {};
const NotificationList = ({}: Props) => {
  const [userInfoJotai, setuserInfoJotai] = useAtom(userInfoAtom); //ユーザー情報のグローバルステート

  const [recentNotices, setRecentNotices] = useState<NotificationInfoType[]>(
    []
  );

  useEffect(() => {
    const handleGetRecentNotifications = async () => {
      const newNotifications = await getRecentNotifications(
        userInfoJotai.authtoken,
        userInfoJotai.userInfo?.id
      );
      if (newNotifications) {
        setRecentNotices(newNotifications);
      }
    };

    handleGetRecentNotifications();
  }, []);

  return (
    <div className="notifications_container">
      <div className="notificationsTitle__container">
        <h2 className="notificationsTitle__text">Notifications</h2>
      </div>
      <div className="notificationList__container">
        {recentNotices.map((notification) => {
          return (
            <NotificationCard
              key={notification.id}
              notification={notification}
            />
          );
        })}
      </div>
    </div>
  );
};

export default NotificationList;
