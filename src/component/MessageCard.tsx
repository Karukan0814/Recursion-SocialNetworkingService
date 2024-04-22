import React from "react";

import "../style/MessageCard.css";

type Props = {
  active?: boolean;
};

const MessageCard = ({ active = false }: Props) => {
  return (
    <div
      className={`messageCard__container  ${
        active && "messageCard__container--active"
      }`}
    >
      <img
        className="messageCard__icon"
        src="/assets/karukanProfile.jpg"
        alt="iconImg"
      />
      <div className="messageCard__text__container">
        <span>username</span>
        <span>firstmessage</span>
      </div>
    </div>
  );
};

export default MessageCard;
