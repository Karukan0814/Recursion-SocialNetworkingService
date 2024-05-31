import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { userInfoAtom } from "../lib/jotai/atoms/user";
import { ConversationInfoType } from "../lib/type/MessageInfoType";
import {
  getConversationsListByUserId,
  registerConversationAPI,
} from "../lib/database/Message";

const useConversation = () => {
  const [userInfoJotai] = useAtom(userInfoAtom); //ユーザー情報のグローバルステート

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [conversationList, setConversationList] = useState<
    ConversationInfoType[]
  >([]);
  const [hasMore, setHasMore] = useState(true); //再読み込み判定
  useEffect(() => {
    setNextConversation(1);
  }, []);

  const startNewConversation = async (toUserId: number) => {
    try {
      setLoading(true);

      const newConversation = await registerConversationAPI(
        userInfoJotai.userInfo?.id!,
        toUserId,
        userInfoJotai.authtoken
      );

      if (newConversation) {
        setConversationList([newConversation, ...conversationList]);
      }

      return newConversation;
    } catch (error: any) {
      setErrorMsg(error.message);
    } finally {
      setLoading(false);
    }
  };

  const setNextConversation = async (page: number) => {
    try {
      const token = userInfoJotai.authtoken;
      const userId = userInfoJotai.userInfo?.id;
      let newConversations: any[] | null = [];
      //サーバーから会話リストを取得
      newConversations = await getConversationsListByUserId(
        token,
        userId,
        20,
        page
      );

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
