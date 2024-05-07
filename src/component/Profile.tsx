import { useEffect, useState } from "react";
import "../style/Profile.css";
import { PostType } from "../lib/type/PostType";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Button } from "@mui/material";
import ModalPopup from "./ModalPopup";
import { Place } from "@mui/icons-material";
import { useAtom } from "jotai";
import { userInfoAtom } from "../lib/jotai/atoms/user";
import PostListTab from "./PostListTab";
import { Link, useNavigate } from "react-router-dom";
import UpdateProfileForm from "./UpdateProfileForm";
import { UserInfoType } from "../lib/type/UserInfoType";
import { getUserInfoById } from "../lib/database/User";
import FollowSwitch from "./FollowSwitch";

type Props = {
  userId?: number;
};

const Profile = ({ userId }: Props) => {
  console.log(userId);
  const [userInfoJotai, setUserInfoJotai] = useAtom(userInfoAtom);
  const navigate = useNavigate();
  // const [id, setId] = useState(userId);
  const [userInfo, setUserInfo] = useState<UserInfoType | null>(null);

  const [activeTab, setActiveTab] = useState("posts");

  const [updateFormOpen, setUpdateFormOpen] = useState(false);

  const [followFlag, setFollowFlag] = useState(false);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };

  const handleUpdateProfilePopup = (flag: boolean) => {
    setUpdateFormOpen(true);
  };

  useEffect(() => {
    if (!userId) {
      navigate("/notfound");
    }

    const handleUserInfo = async () => {
      console.log("handleUserInfo");
      const res = await getUserInfoById(userInfoJotai.authtoken, userId!);
      console.log(res);
      if (!res || !res.id) {
        navigate("/notfound");
      }

      //取得したユーザーがフォロー済みかどうかを確認する
      const followingList = userInfoJotai.userInfo?.followings;
      console.log("followingList", followingList);
      if (!followingList) {
        setFollowFlag(false);
      } else {
        const followed = followingList?.includes(res!.id!);

        console.log(followed);
        setFollowFlag(followed);
      }

      setUserInfo(res);
    };
    //ユーザー名をキーにユーザー情報を取得
    handleUserInfo();
  }, [userId]);

  return (
    <div className="profile">
      <ModalPopup
        open={updateFormOpen}
        handleClose={() => setUpdateFormOpen(false)}
      >
        <UpdateProfileForm
          handleClose={() => setUpdateFormOpen(false)}
          setUserInfo={setUserInfo}
        />
      </ModalPopup>
      <div className="profile__info__container">
        <div className="profilePhoto__container">
          <span className="profile__bg"></span>
          <img
            className="profile__photo"
            src={userInfo?.userImg || "/assets/default_profile_400x400.png"}
            alt="profilePhoto"
          />
          {userInfoJotai.userInfo?.id === userId ? (
            <Button
              onClick={() => handleUpdateProfilePopup(false)}
              variant="outlined"
              className="updateProfile_button"
            >
              Update
            </Button>
          ) : (
            // <FormControlLabel
            //   control={
            //     <Switch checked={followFlag} onChange={handleFollowCheck} />
            //   }
            //   label="Follow"
            // />
            <FollowSwitch
              followFlag={followFlag}
              setFollowFlag={setFollowFlag}
              followUserId={userInfo?.id!}
            />
          )}
        </div>
        <div className="profile__info">
          <h3 className="profile__info__username">{userInfo?.name}</h3>
          <p className="profile__info__introduction">
            {userInfo?.introduction}
          </p>
          {/* <div className="profile__info__location">
            <Place className="placeIcon" />
            Location
          </div> */}
          <div className="profile__info__follow">
            <Link to={`/follow/${userInfo?.id}`}>
              <span>following:{userInfo?.followings?.length}</span>
              <span>follower:{userInfo?.followers?.length}</span>
            </Link>
          </div>
        </div>
      </div>
      <div className="profile__header">
        <Tabs
          value={activeTab}
          onChange={handleChange}
          centered
          className="profile__tabs"
        >
          <Tab label="Posts" value="posts" className="profile__tab" />
          <Tab label="Replies" value="replies" className="profile__tab" />
          <Tab label="Likes" value="likes" className="profile__tab" />
        </Tabs>
      </div>

      {activeTab === "posts" && (
        <PostListTab tabName={PostType.profilePosts} profileUserId={userId} />
      )}

      {activeTab === "replies" && (
        <PostListTab tabName={PostType.profileReplies} profileUserId={userId} />
      )}
      {activeTab === "likes" && (
        <PostListTab tabName={PostType.profileLikes} profileUserId={userId} />
      )}
    </div>
  );
};

export default Profile;
