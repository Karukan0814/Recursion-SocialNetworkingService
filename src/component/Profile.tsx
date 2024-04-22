import React, { useEffect, useState } from "react";
import PostBox from "./PostBox";
import Post from "./Post";
import "../style/Profile.css";
import { PostInfo } from "../types/PostType";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Button } from "@mui/material";
import ModalPopup from "./ModalPopup";
import LoginForm from "./LoginForm";
import { Place } from "@mui/icons-material";

const Profile = () => {
  const [posts, setPosts] = useState<PostInfo[]>([]);
  const [activeTab, setActiveTab] = useState("trend");

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
        <LoginForm signUpFlag={true} />
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
            Update Profile
          </Button>
        </div>
        <div className="profile__info">
          <h3 className="profile__info__username">UserName</h3>
          <p className="profile__info__introduction">Introduction</p>
          <div className="profile__info__location">
            <Place className="placeIcon" />
            Location
          </div>
          <div className="profile__info__follow">
            <span>followee:20</span>
            <span>follower:30</span>
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
          <Tab label="Likes" value="Likes" className="profile__tab" />
        </Tabs>
      </div>

      {activeTab === "posts" && (
        <div className="profile__content">
          {posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      )}

      {activeTab === "replies" && (
        <div className="profile__content">
          {/* フォロワーのコンテンツをここに表示 */}
        </div>
      )}
      {activeTab === "likes" && (
        <div className="profile__content">
          {/* フォロワーのコンテンツをここに表示 */}
        </div>
      )}
    </div>
  );
};

export default Profile;
