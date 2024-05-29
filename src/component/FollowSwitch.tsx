import { FormControlLabel, Switch } from "@mui/material";
import { useAtom } from "jotai";
import React from "react";
import { userInfoAtom } from "../lib/jotai/atoms/user";
import { changeFollowState } from "../lib/database/User";
import "../style/FollowSwitch.css";

type Props = {
  followFlag: boolean;
  setFollowFlag: React.Dispatch<React.SetStateAction<boolean>>;
  followUserId: number;
};
const FollowSwitch = ({ followFlag, setFollowFlag, followUserId }: Props) => {
  const [userInfoJotai, setUserInfoJotai] = useAtom(userInfoAtom);

  const handleFollowCheck = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFollowFlag = !followFlag;

    //サーバー側にフォローの状態変更を登録する
    const newFollowings = await changeFollowState(
      userInfoJotai.userInfo?.id!,
      followUserId,
      !followFlag
    );

    const { followings, ...userWithoutFollowings } = userInfoJotai.userInfo!;

    setFollowFlag(newFollowFlag);
    setUserInfoJotai({
      userInfo: { ...userWithoutFollowings, followings: newFollowings },
      authtoken: userInfoJotai.authtoken,
    });
    console.log(userInfoJotai);
  };
  return (
    <FormControlLabel
      control={
        <Switch
          checked={followFlag}
          onChange={(e) => handleFollowCheck(e)}
          onClick={(e) => {
            e.stopPropagation();
          }}
        />
      }
      label="Follow"
      className="follow_switch"
    />
  );
};

export default FollowSwitch;
