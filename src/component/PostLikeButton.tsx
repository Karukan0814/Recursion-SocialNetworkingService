import React from "react";
import "../style/PostLikeButton.css";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useLikeState } from "../hooks/useLikeState";
import { PostInfo } from "../lib/type/PostType";

type Props = {
  postInfo: PostInfo;
};
const PostLikeButton = ({ postInfo }: Props) => {
  // useLikeStateフックを利用していいねの状態を取得
  const {
    likeState,
    setLikeState,
    likeCount,
    setLikeCount,
    registerLikeState,
  } = useLikeState(postInfo);

  const handleLike = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLikeState(!likeState);
    registerLikeState();
  };
  return (
    <div className="postLikeButton__container">
      <IconButton
        className="postLikeButton__iconButton"
        onClick={(e) => handleLike(e)}
      >
        {likeState ? (
          <Favorite
            fontSize="small"
            className="postLikeButton__favIcon_active"
          />
        ) : (
          <FavoriteBorder fontSize="small" />
        )}
      </IconButton>
      <span className="postLikeButton__like__count">{likeCount}</span>
    </div>
  );
};

export default PostLikeButton;
