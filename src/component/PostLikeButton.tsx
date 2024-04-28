import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React from "react";
import { useLikeState } from "../hooks/useLikeState";
import { PostInfo } from "../lib/type/PostType";
import "../style/PostLikeButton.css";

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
    console.log("handleLike");
    setLikeState(!likeState);
    registerLikeState();
  };
  return (
    <div className="likeButton__container">
      <IconButton className="like__iconButton" onClick={(e) => handleLike(e)}>
        {likeState ? (
          <Favorite fontSize="small" color="secondary" />
        ) : (
          <FavoriteBorder fontSize="small" />
        )}
      </IconButton>
      <span className="like__count">{likeCount}</span>
    </div>
  );
};

export default PostLikeButton;
