import React, { useEffect, useState } from "react";
import PostBox from "./PostBox";
import Post from "./Post";
import "../style/Profile.css";
import { PostInfo, PostType } from "../lib/type/PostType";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Button } from "@mui/material";
import ModalPopup from "./ModalPopup";
import LoginForm from "./LoginForm";
import { Place } from "@mui/icons-material";
import { useAtom } from "jotai";
import { userInfoAtom } from "../lib/jotai/atoms/user";
import PostListTab from "./PostListTab";
import { Link } from "react-router-dom";

const Profile = () => {
  const [userInfoJotai] = useAtom(userInfoAtom);

  const [activeTab, setActiveTab] = useState("posts");

  const [updateFormOpen, setUpdateFormOpen] = useState(false);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };

  const handleUpdateProfilePopup = (flag: boolean) => {
    setUpdateFormOpen(true);
  };

  return (
    <div className="profile">
      <ModalPopup
        open={updateFormOpen}
        handleClose={() => setUpdateFormOpen(false)}
      >
        <div>updateForm</div>
        {/* <LoginForm signUpFlag={true} /> */}
      </ModalPopup>
      <div className="profile__info__container">
        <div className="profilePhoto__container">
          <span className="profile__bg"></span>
          <img
            className="profile__photo"
            src="/assets/karukanProfile.jpg"
            alt="profilePhoto"
          />
          <Button
            onClick={() => handleUpdateProfilePopup(false)}
            variant="outlined"
            className="updateProfile_button"
          >
            Update
          </Button>
        </div>
        <div className="profile__info">
          <h3 className="profile__info__username">
            {userInfoJotai.userInfo?.name}
          </h3>
          <p className="profile__info__introduction">
            {userInfoJotai.userInfo?.introduction}
          </p>
          {/* <div className="profile__info__location">
            <Place className="placeIcon" />
            Location
          </div> */}
          <div className="profile__info__follow">
            <Link to={`/profile/${userInfoJotai.userInfo?.name}/following`}>
              <span>
                following:{userInfoJotai.userInfo?.followings?.length}
              </span>
            </Link>
            <Link to={`/profile/${userInfoJotai.userInfo?.name}/follower`}>
              <span>follower:{userInfoJotai.userInfo?.followers?.length}</span>
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

      {activeTab === "posts" && <PostListTab tabName={PostType.self} />}

      {activeTab === "replies" && (
        <PostListTab tabName={PostType.selfReplies} />
      )}
      {activeTab === "likes" && <PostListTab tabName={PostType.likes} />}
    </div>
  );
};

export default Profile;
