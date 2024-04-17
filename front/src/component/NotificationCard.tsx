import { Icon } from "@mui/material";
import React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import "../style/NotificationCard.css";

const NotificationCard = () => {
  return (
    <div className="notificationCard__container">
      <div className="notification__icon">
        <FavoriteIcon className="favIcon" />
      </div>
      <div className="notificationCard__text">
        <div>
          <img
            src="/assets/karukanProfile.jpg"
            alt="userIcon"
            className="notificationCard__text__icon"
          />
        </div>
        <div className="notificationCard__text__title">
          Judithさんがあなたのポストをいいねしました
        </div>
        <p>texttexttexttexttexttexttexttexttexttexttexttexttexttext</p>
      </div>
    </div>
  );
};

export default NotificationCard;
