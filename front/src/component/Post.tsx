import {
  ChatBubbleOutline,
  FavoriteBorder,
  Publish,
  Repeat,
  VerifiedUser,
} from "@mui/icons-material";
import { Avatar } from "@mui/material";
import "../style/Post.css";
import { PostInfo } from "../types/PostType";
type Props = {
  post: PostInfo;
};
const Post = ({ post }: Props) => {
  return (
    <div className="post">
      <div className="post__avatar">
        <Avatar src={post.avatar} />
      </div>
      <div className="post__body">
        <div className="post__header">
          <div className="post__headerText">
            <h3>
              {post.displayName}{" "}
              <span className="post__headerSpecial">
                {post.verified && <VerifiedUser className="post__badge" />} @
                {post.username}
              </span>
            </h3>
          </div>
          <div className="post__headerDescription">
            <p>{post.text}</p>
          </div>
        </div>
        <img src={post.image} alt="" />
        <div className="post__footer">
          <ChatBubbleOutline fontSize="small" />
          <Repeat fontSize="small" />
          <FavoriteBorder fontSize="small" />
          <Publish fontSize="small" />
        </div>
      </div>
    </div>
  );
};

export default Post;
