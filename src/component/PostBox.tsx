import { Avatar, Button, Icon, IconButton } from "@mui/material";
import { useState } from "react";
import "../style/PostBox.css";
import { PhotoCamera } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import PrimaryButton from "./PrimaryButton";
import { useForm } from "react-hook-form";
import usePosts from "../hooks/usePosts";

type FormData = {
  postMessage: string;
  postImage: File | null;
};
type Props = {
  registerPost: (text: string, img: File | null) => void;
};

const PostBox = ({ registerPost }: Props) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm<FormData>();
  const tweetImage = watch("postImage");

  const [imagePreviewUrl, setImagePreviewUrl] = useState("");

  const onSubmit = async (data: FormData) => {
    registerPost(data.postMessage, data.postImage);
    reset();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setValue("postImage", file); // react-hook-formにファイルを設定
      const reader = new FileReader();
      reader.onload = () => {
        const previewUrl = reader.result as string;
        setImagePreviewUrl(previewUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setValue("postImage", null);
    setImagePreviewUrl(""); // 画像URLをクリアしてプレビューを削除
  };
  return (
    <div className="postBox">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="postBox__input">
          <Avatar src="https://scontent-bom1-1.xx.fbcdn.net/v/t1.0-1/c0.33.200.200a/p200x200/51099653_766820610355014_8315780769297465344_o.jpg?_nc_cat=101&_nc_sid=7206a8&_nc_ohc=c1qBHkwAgVsAX8KynKU&_nc_ht=scontent-bom1-1.xx&oh=340b05bea693dd1671296e0c2d004bb3&oe=5F84CA62" />

          <TextareaAutosize
            {...register("postMessage", { required: true, maxLength: 200 })}
            maxRows={10}
            placeholder="What's happening?"
            style={{
              width: "100%",
              border: "none",
              outline: "none",
              padding: "10px",
              boxSizing: "border-box",
              resize: "none",
            }}
          />
          {errors.postMessage && <p>Your message is required</p>}
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
              {...register("postImage")}
              type="file"
              hidden // ファイル入力を隠す
              accept="image/*" // 画像ファイルのみ受け入れる
              onChange={handleFileChange} // ファイル選択時の処理
            />
            Upload
          </Button>

          <PrimaryButton
            loading={false} //todo loadingの変数作成
            text={"Post"}
            onClick={handleSubmit(onSubmit)}
          />
          <div className="loginButton_container"></div>
        </div>
      </form>
    </div>
  );
};

export default PostBox;
