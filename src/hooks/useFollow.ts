import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { userInfoAtom } from "../lib/jotai/atoms/user";
import { FollowType, UserInfoType } from "../lib/type/UserInfoType";
import { getFollowersList, getFollowingList } from "../lib/database/User";

const useFollow = (tabName: FollowType, userId: number, parentId?: number) => {
  const [userInfoJotai] = useAtom(userInfoAtom); //ユーザー情報のグローバルステート

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [userList, setUserList] = useState<UserInfoType[]>([]);
  const [hasMore, setHasMore] = useState(true); //再読み込み判定
  useEffect(() => {
    setNextUser(1, parentId);
  }, [parentId, tabName]);

  const setNextUser = async (page: number, replyToId?: number) => {
    try {
      const token = userInfoJotai.authtoken;
      if (!userId) {
        throw new Error("userId couldn't be extracted from storage.");
      }
      let newUsers: any[] | null;
      if (tabName === FollowType.follower) {
        // フォロワーリストの取得
        newUsers = await getFollowersList(token, 20, page, userId);
      } else if (tabName === FollowType.following) {
        // フォローしているユーザーのリストの取得

        newUsers = await getFollowingList(token, 20, page, userId);
      } else {
        newUsers = [];
      }
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
      console.error(error);
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

export default useFollow;
