import { useEffect, useState } from "react";
import "../style/PostBox.css";
import { Avatar, Button, IconButton } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import PrimaryButton from "./PrimaryButton";
import { useForm } from "react-hook-form";
import { useAtom } from "jotai";
import { userInfoAtom } from "../lib/jotai/atoms/user";
import { PostType, validPostImgTypes } from "../lib/type/PostType";
import ModalPopup from "./ModalPopup";
import SchedulePostForm from "./SchedulePostForm";

type FormData = {
  postMessage: string;
  postImage: File | null;
};
type Props = {
  registerPost: (
    text: string,
    img: File | null,
    replyToId?: number,
    scheduledAt?: Date
  ) => void;
  registerLoading: boolean;
  replyToId?: number;
  postType?: PostType;
  displayScheduledAt?: boolean;
};

const PostBox = ({
  registerPost,
  registerLoading,
  replyToId,
  postType,
  displayScheduledAt = false,
}: Props) => {
  const [userInfoJotai, setuserInfoJotai] = useAtom(userInfoAtom); //ユーザー情報のグローバルステート
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
    setError,
    clearErrors,
  } = useForm<FormData>();
  const tweetImage = watch("postImage");

  const [postSchedule, setPostSchedule] = useState<Date>();
  const [openSchedule, setOpenSchedule] = useState(false);

  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [videoPreviewUrl, setVideoPreviewUrl] = useState("");

  const onSubmit = async (data: FormData) => {
    console.log("data.postImage", data.postImage);
    registerPost(data.postMessage, data.postImage, replyToId, postSchedule);
    setImagePreviewUrl("");
    setVideoPreviewUrl("");
    setPostSchedule(undefined);

    reset();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];

      if (!Object.keys(validPostImgTypes).includes(file.type)) {
        setError("postImage", {
          type: "format",
          message: "File must be a JPEG, PNG, GIF, MP4 or WebM image.",
        });
        return; // ファイルが許可された形式でない場合は処理を中止
      }

      clearErrors("postImage");
      console.log("attachedFile", file);
      setValue("postImage", file); // react-hook-formにファイルを設定
      const reader = new FileReader();

      if (file.type.startsWith("video")) {
        console.log("filetype", file.type);
        reader.onload = () => {
          console.log("filetype", reader.result as string);

          setVideoPreviewUrl(reader.result as string);
          setImagePreviewUrl("");
        };
        reader.readAsDataURL(file);
      } else {
        reader.onload = () => {
          console.log("filetype", reader.result as string);

          const previewUrl = reader.result as string;
          setImagePreviewUrl(previewUrl);
          setVideoPreviewUrl("");
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleRemoveImage = () => {
    setValue("postImage", null);
    setImagePreviewUrl(""); // 画像URLをクリアしてプレビューを削除
  };

  useEffect(() => {
    setValue("postImage", null); // ファイルが選択されていない場合はnullを設定
  }, []);
  return (
    <div className="postBox">
      <ModalPopup
        open={openSchedule}
        handleClose={() => setOpenSchedule(false)}
      >
        <SchedulePostForm
          postSchedule={postSchedule}
          handleClose={() => setOpenSchedule(false)}
          setPostSchedule={setPostSchedule}
        />
      </ModalPopup>
      <form onSubmit={handleSubmit(onSubmit)}>
        {errors.postMessage && <p className="errMsg"> message is required</p>}
        {/* {errors.postMessage && (
          <p className="errMsg">{errors.postMessage.message}</p>
        )} */}
        {errors.postImage && (
          <p className="errMsg">{errors.postImage.message}</p>
        )}

        <div className="postBox__input">
          <Avatar
            src={
              userInfoJotai.userInfo?.userImg ||
              "/assets/default_profile_400x400.png"
            }
          />

          <TextareaAutosize
            {...register("postMessage", { required: true, maxLength: 200 })}
            maxRows={10}
            maxLength={200}
            placeholder={`${
              postType === PostType.detail || postType === PostType.reply
                ? "Reply to this message"
                : "What's happening?"
            }`}
            style={{
              width: "100%",
              border: "none",
              outline: "none",
              padding: "10px",
              boxSizing: "border-box",
              resize: "none",
              fontFamily: "inherit",
            }}
          />
        </div>
        <div className="photo__preview__container">
          {(imagePreviewUrl || videoPreviewUrl) && (
            <>
              <span className="photo__preview__close">
                <IconButton onClick={handleRemoveImage} aria-label="delete">
                  <CloseIcon />
                </IconButton>
              </span>
              <span>
                <IconButton />
              </span>

              {imagePreviewUrl && (
                <img
                  src={imagePreviewUrl}
                  alt="Preview"
                  className="img__preview"
                />
              )}
              {videoPreviewUrl && (
                <video controls src={videoPreviewUrl} className="img__preview">
                  Video preview not available
                </video>
              )}
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
              // {...register("postImage")}
              type="file"
              hidden // ファイル入力を隠す
              accept="image/*,video/*" // 画像と動画ファイルのみ受け入れる
              onChange={handleFileChange} // ファイル選択時の処理
            />
            Upload
          </Button>
          {displayScheduledAt && (
            <>
              <IconButton
                className="calender__button"
                aria-label=""
                onClick={() => setOpenSchedule(true)}
              >
                <EditCalendarIcon className="calender__icon" />
                <span className="postBox_scheduledAt">
                  {postSchedule && postSchedule.toLocaleString()}
                </span>
              </IconButton>
              {postSchedule && (
                <IconButton
                  className="postBox_scheduledAt__delete__button"
                  onClick={() => setPostSchedule(undefined)}
                >
                  <HighlightOffIcon className="postBox_scheduledAt__delete__icon" />
                </IconButton>
              )}
            </>
          )}

          <PrimaryButton
            loading={registerLoading}
            text={`${
              postType === PostType.detail || postType === PostType.reply
                ? "Reply"
                : "Post"
            }`}
            onClick={handleSubmit(onSubmit)}
          />
          <div className="loginButton_container"></div>
        </div>
      </form>
    </div>
  );
};

export default PostBox;
