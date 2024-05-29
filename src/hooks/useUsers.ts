import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { userInfoAtom } from "../lib/jotai/atoms/user";
import { UserInfoType } from "../lib/type/UserInfoType";
import { getUserListByKeyword } from "../lib/database/User";

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

      let newUsers: any[] | null = [];
      // ユーザーリストの取得
      if (keyword) {
        newUsers = await getUserListByKeyword(token, 20, page, keyword);
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
