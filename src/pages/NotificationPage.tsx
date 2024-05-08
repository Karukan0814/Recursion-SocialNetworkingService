import Sidebar from "../component/Sidebar";
import Widgets from "../component/Widgets";
import NotificationList from "../component/NotificationList";

const NotificationPage = () => {
  return (
    <>
      <Sidebar currentPage="notification" />
      <NotificationList />
      <Widgets />
    </>
  );
};

export default NotificationPage;
