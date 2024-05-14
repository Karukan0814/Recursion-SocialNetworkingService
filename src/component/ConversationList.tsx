import InfiniteScroll from "react-infinite-scroller";
import Post from "./Post";
import usePosts from "../hooks/usePosts";
import "../style/PostListTab.css";
import Loading from "./Loading";
import { PostType } from "../lib/type/PostType";
import { SetStateAction, useEffect, useState } from "react";
import { FollowType } from "../lib/type/UserInfoType";
import useFollow from "../hooks/useFollow";
import UserCard from "./UserCard";
import ConversationCard from "./ConversationCard";
import useConversation from "../hooks/useConversation";
import { IconButton } from "@mui/material";
import { AddIcCallOutlined } from "@mui/icons-material";
import "../style/ConversationList.css";
import ModalPopup from "./ModalPopup";
import SearchUser from "./SearchUser";
import { ConversationInfoType } from "../lib/type/MessageInfoType";
import {
  getAllConversationsListByUserId,
  getConversationsListByUserId,
  registerConversationAPI,
} from "../lib/database/Message";
import { useAtom } from "jotai";
import { userInfoAtom } from "../lib/jotai/atoms/user";

type Props = {
  activeConversationInfo: ConversationInfoType | undefined;
  setActiveConversationInfo: React.Dispatch<
    React.SetStateAction<ConversationInfoType | undefined>
  >;
  triggeredById?: number;
};
const ConversationList = ({
  activeConversationInfo,
  setActiveConversationInfo,
  triggeredById,
}: Props) => {
  const [userInfoJotai, setuserInfoJotai] = useAtom(userInfoAtom); //ユーザー情報のグローバルステート

  const [openUserSearch, setOpenUserSearch] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number>(
    triggeredById || 0
  );
  const [conversationList, setConversationList] = useState<
    ConversationInfoType[]
  >([]);
  console.log(conversationList);

  const handleStartNewConversation = async (toUserId: number) => {
    const newConversation = await registerConversationAPI(
      userInfoJotai.userInfo?.id!,
      toUserId,
      userInfoJotai.authtoken
    );
    if (newConversation) {
      setActiveConversationInfo(newConversation);
      setConversationList([newConversation, ...conversationList]);
    }
  };
  useEffect(() => {
    console.log("useEffect__selectedUserId");

    const getConversationList = async () => {
      const allConversations = await getAllConversationsListByUserId(
        userInfoJotai.authtoken,
        userInfoJotai.userInfo?.id
      );

      console.log("allConversations", allConversations);
      setConversationList(allConversations);
      console.log("selectedUserId", selectedUserId);
      // if (triggeredById) {
      //   setSelectedUserId(triggeredById);
      // }

      if (selectedUserId) {
        console.log("selectedUserId", selectedUserId);
        // 既にあるConversationの中で対象ユーザーが参加しているものがあるか確認
        const exist = allConversations?.find((conv) => {
          // 参加者のIDのリストにselectedUserIdが含まれているか確認
          return conv.participants.some(
            (participant) => participant.userId === selectedUserId
          );
        });
        console.log("exist", exist);

        if (exist) {
          // 既存のConversationをactive状態にする
          setActiveConversationInfo(exist);
        } else {
          // なければ新しいConversationを作成
          // 作成した上で、そのConversationをactive状態にする
          handleStartNewConversation(selectedUserId);

          console.log("startNewConversation!");
        }
      }
    };
    getConversationList();
  }, [selectedUserId]);

  const handleAddConversation = () => {
    setOpenUserSearch(true);
  };

  const handleSelectUser = (userId?: number) => {
    if (userId) {
      setSelectedUserId(userId);
      setOpenUserSearch(false);
    }
  };

  return (
    <>
      <ModalPopup
        open={openUserSearch}
        handleClose={() => setOpenUserSearch(false)}
      >
        <SearchUser handleSelectUser={handleSelectUser} />
      </ModalPopup>
      <div className="sectionTitle__container">
        <h2 className="sectionTitle__text">Messages</h2>
        <IconButton
          className="add__messageButton"
          aria-label="add message"
          onClick={handleAddConversation}
        >
          <AddIcCallOutlined className="add__messageIcon" />
        </IconButton>
      </div>
      <div className="tab__content">
        {conversationList.map((conversation) => {
          const isActive = conversation.id === activeConversationInfo?.id;

          return (
            <ConversationCard
              key={conversation.id}
              active={isActive}
              conversation={conversation}
              // setActiveConversationId={setActiveConversationId}
              setActiveConversation={setActiveConversationInfo}
            />
          );
        })}
      </div>
    </>
  );
};

export default ConversationList;
