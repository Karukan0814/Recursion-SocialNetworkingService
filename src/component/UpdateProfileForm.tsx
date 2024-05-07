import React, { useState } from "react";
import useLogin from "../hooks/useLogin";
import { Button, TextareaAutosize } from "@mui/material";
import PrimaryButton from "./PrimaryButton";
import { useForm } from "react-hook-form";
import "../style/UpdateProfileForm.css";
import { PhotoCamera } from "@mui/icons-material";
import { userInfoAtom } from "../lib/jotai/atoms/user";
import { useAtom } from "jotai";
import { UserInfoType } from "../lib/type/UserInfoType";
type Props = {
  handleClose: () => void;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfoType | null>>;
};
type FormData = {
  name: string;
  introduction: string;
  userImage: File | null;
};
const UpdateProfileForm = ({ handleClose, setUserInfo }: Props) => {
  const [userInfoJotai] = useAtom(userInfoAtom);

  const { login, signUp, loading, errorMsg } = useLogin();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues: {
      name: userInfoJotai.userInfo?.name || "",
      introduction: userInfoJotai.userInfo?.introduction || "",
      userImage: null,
    },
  });
  const tweetImage = watch("userImage");

  const [imagePreviewUrl, setImagePreviewUrl] = useState(
    userInfoJotai.userInfo?.userImg || "/assets/default_profile_400x400.png"
  );

  const { updateUserInfo } = useLogin();
  const onSubmit = async (data: FormData) => {
    console.log({ data });

    const updatedUserInfo = await updateUserInfo(
      data.name,
      data.introduction,
      data.userImage
    );
    if (updatedUserInfo) {
      setUserInfo(updatedUserInfo);
    }
    // await signUp(data.name, data.email, data.password, data.confirmPassword);
    handleClose();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setValue("userImage", file); // react-hook-formにファイルを設定
      const reader = new FileReader();
      reader.onload = () => {
        const previewUrl = reader.result as string;
        setImagePreviewUrl(previewUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div className="login-form">
        <form onSubmit={handleSubmit(onSubmit)}>
          {errorMsg && <p className="errMsg">{errorMsg}</p>}

          <div className="input-group">
            <img
              className="profile__photo"
              src={imagePreviewUrl}
              alt="profilePhoto"
            />
            <Button
              component="label" // Buttonをlabelタグとして機能させる
              className="photo__button"
            >
              <PhotoCamera />
              <input
                {...register("userImage")}
                type="file"
                hidden // ファイル入力を隠す
                accept="image/*" // 画像ファイルのみ受け入れる
                onChange={handleFileChange} // ファイル選択時の処理
              />
              Upload
            </Button>{" "}
          </div>

          <div className="input-group">
            <input
              id="name"
              type="text"
              placeholder="name"
              maxLength={25}
              {...register("name", {
                required: "Username is required",
                maxLength: {
                  value: 25,
                  message: "username must be less than 25 characters long",
                },
              })}
            />
            {errors.name && <p className="errMsg">{errors.name.message}</p>}
          </div>
          <div className="input-group">
            <TextareaAutosize
              maxLength={200}
              {...register("introduction", {
                required: true,
                maxLength: {
                  value: 200,
                  message: "introduction must be less than 25 characters long",
                },
              })}
              maxRows={10}
              placeholder={"introduction"}
              style={{
                width: "100%",
                padding: "10px",
                boxSizing: "border-box",
                resize: "none",
                color: "inherit",
                border: "1px solid #ccd6dd",
                borderRadius: "5px",
              }}
            />
            {errors.introduction && (
              <p className="errMsg">{errors.introduction.message}</p>
            )}
          </div>
          {/* TODO　パスワード変更フロー */}

          <div className="loginButton_container">
            <PrimaryButton
              loading={loading}
              text={"Update"}
              onClick={handleSubmit(onSubmit)}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateProfileForm;
