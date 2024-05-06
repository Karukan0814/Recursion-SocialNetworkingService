import { useEffect, useState } from "react";
import { registerPostAPI } from "../lib/database/Post";
import { useAtom } from "jotai";
import { userInfoAtom } from "../lib/jotai/atoms/user";
import { PostInfo, PostType } from "../lib/type/PostType";
import { FollowType, UserInfoType } from "../lib/type/UserInfoType";
import {
  getFollowersList,
  getFollowingList,
  getUserListByKeyword,
} from "../lib/database/User";

const useUsers = (keyword: string) => {
  const [userInfoJotai, setuserInfoJotai] = useAtom(userInfoAtom); //ユーザー情報のグローバルステート

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [userList, setUserList] = useState<UserInfoType[]>([]);
  const [hasMore, setHasMore] = useState(true); //再読み込み判定
  useEffect(() => {
    console.log("useEffect___usePosts");
    setNextUser(1);
  }, [keyword]);

  const setNextUser = async (page: number) => {
    try {
      const token = userInfoJotai.authtoken;
      // const userId = userInfoJotai.userInfo?.id;
      // if (!keyword) {
      //   throw new Error("userId couldn't be extracted from storage.");
      // }
      let newUsers: any[] | null = [];
      //TODO フォロワーリストの取得
      if (keyword) {
        newUsers = await getUserListByKeyword(token, 20, page, keyword);
      }

      console.log(newUsers);
      if (!newUsers) {
        newUsers = [];
      }

      setHasMore(newUsers.length > 0);
      if (page > 1) {
        setUserList([...userList, ...newUsers]);
      } else {
        setUserList(newUsers);
      }
    } catch (error: any) {
      setErrorMsg(error.message);
      console.log(error);
    }
  };

  return {
    loading,
    errorMsg,
    userList,
    setNextUser,
    hasMore,
  };
};

export default useUsers;
