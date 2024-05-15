import { Icon } from "@mui/material";
import React, { useEffect, useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import "../style/NotificationCard.css";
import { NotificationInfoType } from "../lib/type/NotificationInfoType";
import PersonIcon from "@mui/icons-material/Person";
import MessageIcon from "@mui/icons-material/Message";
import ReplyIcon from "@mui/icons-material/Reply";
import { Link } from "react-router-dom";

type Props = {
  notification: NotificationInfoType;
};
const NotificationCard = ({ notification }: Props) => {
  console.log(notification.read);
  const generateNotificationLink = () => {
    let link;
    switch (notification.type) {
      case "Like":
        link = `/post/${notification.postId}`;
        break;
      case "FOLLOW":
        link = `/profile/${notification.triggeredById}`;
        break;
      case "REPLY":
        link = `/post/${notification.postId}`;
        break;
      case "MESSAGE":
        link = `/message/${notification.triggeredById}`;
        break;
      default:
        link = "";
    }

    return link;
  };

  const generateNotificationText = () => {
    let text;
    switch (notification.type) {
      case "Like":
        text = `${notification.triggeredBy.name}さんがあなたのポストをいいねしました。`;
        break;
      case "FOLLOW":
        text = `${notification.triggeredBy.name}さんにフォローされました。`;
        break;
      case "REPLY":
        text = `${notification.triggeredBy.name}さんがあなたのポストにリプライしました。`;
        break;
      case "MESSAGE":
        text = `${notification.triggeredBy.name}さんがあなたにメッセージを送信しました。`;
        break;
      default:
        text = "";
    }

    return text;
  };

  const showNotificationIcon = () => {
    let icon;
    switch (notification.type) {
      case "Like":
        icon = <FavoriteIcon className="iconButton favIcon" />;
        break;
      case "FOLLOW":
        icon = <PersonIcon className="iconButton" color="primary" />;
        break;
      case "REPLY":
        icon = <ReplyIcon className="iconButton" color="primary" />;
        break;
      case "MESSAGE":
        icon = <MessageIcon className="iconButton" color="primary" />;
        break;
      default:
        icon = <div>Unknown Type</div>; // Default fallback
    }

    return icon;
  };

  const truncateText = (text: string): string => {
    return text.length > 100 ? text.substring(0, 100) + "..." : text;
  };

  const [readFlag, setReadFlag] = useState(notification.read);

  useEffect(() => {
    if (!notification.read) {
      setReadFlag(false);
    }
    const timer = setTimeout(() => {
      console.log("time to change!");
      setReadFlag(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, [notification]);
  return (
    <Link to={generateNotificationLink()} style={{ textDecoration: "none" }}>
      <div className={`notificationCard__container ${!readFlag && "unread"}`}>
        <div className="notification__icon">{showNotificationIcon()}</div>
        <div className="notificationCard__text">
          <div>
            <img
              src={notification.triggeredBy.userImg}
              alt="userIcon"
              className="notificationCard__text__icon"
            />
          </div>
          <div className="notificationCard__text__title">
            {generateNotificationText()}
          </div>

          <p>{notification.post && truncateText(notification.post.text)}</p>
        </div>
      </div>
    </Link>
  );
};

export default NotificationCard;
