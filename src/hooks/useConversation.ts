import { useEffect, useState } from "react";
import { registerPostAPI } from "../lib/database/Post";
import { useAtom } from "jotai";
import { userInfoAtom } from "../lib/jotai/atoms/user";
import { PostInfo, PostType } from "../lib/type/PostType";
import { FollowType, UserInfoType } from "../lib/type/UserInfoType";
import { getFollowersList, getFollowingList } from "../lib/database/User";
import { ConversationInfoType } from "../lib/type/MessageInfoType";
import {
  getConversationsListByUserId,
  registerConversationAPI,
} from "../lib/database/Message";

const useConversation = () => {
  const [userInfoJotai, setuserInfoJotai] = useAtom(userInfoAtom); //ユーザー情報のグローバルステート

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [conversationList, setConversationList] = useState<
    ConversationInfoType[]
  >([]);
  const [hasMore, setHasMore] = useState(true); //再読み込み判定
  useEffect(() => {
    console.log("useEffect___usePosts");
    setNextConversation(1);
  }, []);

  const startNewConversation = async (
    toUserId: number
    // firstmessage: string
  ) => {
    try {
      setLoading(true);

      const fromUserId = userInfoJotai.userInfo?.id;
      // const toUserId=
      const newConversation = await registerConversationAPI(
        userInfoJotai.userInfo?.id!,
        toUserId,
        userInfoJotai.authtoken
        // firstmessage
      );

      if (newConversation) {
        setConversationList([newConversation, ...conversationList]);
      }

      return newConversation;
    } catch (error: any) {
      setErrorMsg(error.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const setNextConversation = async (page: number) => {
    try {
      const token = userInfoJotai.authtoken;
      const userId = userInfoJotai.userInfo?.id;
      let newConversations: any[] | null = [];
      //TODO サーバーから会話リストを取得
      newConversations = await getConversationsListByUserId(
        token,
        userId,
        20,
        page
      );

      console.log(newConversations);
      if (!newConversations) {
        newConversations = [];
      }

      setHasMore(newConversations.length > 0);
      if (page > 1) {
        setConversationList([...conversationList, ...newConversations]);
      } else {
        setConversationList(newConversations);
      }
    } catch (error: any) {
      setErrorMsg(error.message);
      console.log(error);
    }
  };

  return {
    loading,
    errorMsg,
    startNewConversation,
    conversationList,
    setNextConversation,
    hasMore,
  };
};

export default useConversation;
