import { FormControlLabel, Switch } from "@mui/material";
import { useAtom } from "jotai";
import React from "react";
import { userInfoAtom } from "../lib/jotai/atoms/user";
import { changeFollowState } from "../lib/database/User";

type Props = {
  followFlag: boolean;
  setFollowFlag: React.Dispatch<React.SetStateAction<boolean>>;
  followUserId: number;
};
const FollowSwitch = ({ followFlag, setFollowFlag, followUserId }: Props) => {
  const [userInfoJotai, setUserInfoJotai] = useAtom(userInfoAtom);

  const handleFollowCheck = async () => {
    console.log("handleFollowCheck");
    const newFollowFlag = !followFlag;

    //サーバー側にフォローの状態変更を登録する
    const newFollowings = await changeFollowState(
      userInfoJotai.userInfo?.id!,
      followUserId,
      !followFlag
    );

    // const newFollowingList=
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
      control={<Switch checked={followFlag} onChange={handleFollowCheck} />}
      label="Follow"
    />
  );
};

export default FollowSwitch;
