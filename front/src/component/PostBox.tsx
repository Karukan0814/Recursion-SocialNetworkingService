import { Avatar, Button, Icon, IconButton } from "@mui/material";
import { useState } from "react";
import "../style/PostBox.css";
import { PhotoCamera } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";

const PostBox = () => {
  const [tweetMessage, setTweetMessage] = useState("");
  const [tweetImage, setTweetImage] = useState<File | null>(null);

  const [imagePreviewUrl, setImagePreviewUrl] = useState("");

  const sendTweet = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    //サーバーにtweetを送信する処理

    setTweetMessage("");
    setTweetImage(null);
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImagePreviewUrl(""); // 画像URLをクリアしてプレビューを削除
  };
  return (
    <div className="postBox">
      <form>
        <div className="postBox__input">
          <Avatar src="https://scontent-bom1-1.xx.fbcdn.net/v/t1.0-1/c0.33.200.200a/p200x200/51099653_766820610355014_8315780769297465344_o.jpg?_nc_cat=101&_nc_sid=7206a8&_nc_ohc=c1qBHkwAgVsAX8KynKU&_nc_ht=scontent-bom1-1.xx&oh=340b05bea693dd1671296e0c2d004bb3&oe=5F84CA62" />
          <input
            value={tweetMessage}
            onChange={(e) => setTweetMessage(e.target.value)}
            placeholder="What's happening?"
            type="text"
            accept="image/*"
          />
        </div>
        <div className="photo__preview__container">
          {imagePreviewUrl && (
            <>
              <span className="photo__preview__close">
                <IconButton onClick={handleRemoveImage} aria-label="delete">
                  <CloseIcon />
                </IconButton>
              </span>
              <span>
                <IconButton />
              </span>
              <img
                src={imagePreviewUrl}
                alt="Preview"
                className="photo__preview"
              />
            </>
          )}
        </div>
        <div className="postButton__container">
          <Button
            component="label" // Buttonをlabelタグとして機能させる
            className="photo__button"
          >
            <PhotoCamera />
            <input
              type="file"
              hidden // ファイル入力を隠す
              accept="image/*" // 画像ファイルのみ受け入れる
              onChange={handleFileChange} // ファイル選択時の処理
            />
            Upload
          </Button>
          <Button
            onClick={(e) => sendTweet(e)}
            type="submit"
            className="postBox__button"
          >
            Post
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PostBox;
