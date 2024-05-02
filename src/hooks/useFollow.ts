import { useEffect, useState } from "react";
import { registerPostAPI } from "../lib/database/Post";
import { useAtom } from "jotai";
import { userInfoAtom } from "../lib/jotai/atoms/user";
import { PostInfo, PostType } from "../lib/type/PostType";
import { FollowType, UserInfoType } from "../lib/type/UserInfoType";
import { getFollowersList, getFollowingList } from "../lib/database/User";

const useFollow = (tabName: FollowType, userId: number, parentId?: number) => {
  const [userInfoJotai, setuserInfoJotai] = useAtom(userInfoAtom); //ユーザー情報のグローバルステート

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [userList, setUserList] = useState<UserInfoType[]>([]);
  const [hasMore, setHasMore] = useState(true); //再読み込み判定
  useEffect(() => {
    console.log("useEffect___usePosts");
    setNextUser(1, parentId);
  }, [parentId, tabName]);

  const followUser = async (text: string, replyToId?: number) => {
    try {
      setLoading(true);
      console.log({ replyToId });

      if (!text || text.length === 0 || text.length > 200) {
        throw new Error("text should be less than 200");
      }
      const testImg = "/assets/food_fruit_sandwich_ichigo.png";
      const newPost = await registerPostAPI(
        userId,
        userInfoJotai.authtoken!,
        testImg,
        text,
        replyToId
      );
      console.log(newPost);
      if (!newPost) {
        throw new Error("Something wrong with registering new post");
      }

      setUserList([newPost, ...userList]);
    } catch (error: any) {
      setErrorMsg(error.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const setNextUser = async (page: number, replyToId?: number) => {
    try {
      const token = userInfoJotai.authtoken;
      // const userId = userInfoJotai.userInfo?.id;
      if (!userId) {
        throw new Error("userId couldn't be extracted from storage.");
      }
      let newUsers: any[] | null;
      if (tabName === FollowType.follower) {
        //TODO フォロワーリストの取得
        newUsers = await getFollowersList(token, 20, page, userId);
      } else if (tabName === FollowType.following) {
        //TODO フォローしているユーザーのリストの取得

        newUsers = await getFollowingList(token, 20, page, userId);
      } else {
        newUsers = [];
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
    followUser,
    userList,
    setNextUser,
    hasMore,
  };
};

export default useFollow;
