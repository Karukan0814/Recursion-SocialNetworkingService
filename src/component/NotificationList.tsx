import { useEffect, useState } from "react";
import "../style/NotificationList.css";
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
    <div className="notificationList_container">
      <div className="notificationList_title_container">
        <h2 className="notificationList_title_text">Notifications</h2>
      </div>
      <div className="notificationList_card_container">
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
