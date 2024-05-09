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

type Props = {
  // activeConversationId: number;
  activeConversationInfo: ConversationInfoType | undefined;
  // setActiveConversationId: React.Dispatch<React.SetStateAction<number>>;
  setActiveConversationInfo: React.Dispatch<
    React.SetStateAction<ConversationInfoType | undefined>
  >;
};
const ConversationList = ({
  activeConversationInfo,
  setActiveConversationInfo,
}: Props) => {
  const [openUserSearch, setOpenUserSearch] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number>(0);
  // const [activeConversationId, setActiveConversationId] = useState<number>(0);
  // const [activeConversation, setActiveConversation] =
  //   useState<ConversationInfoType>();

  const {
    loading,
    errorMsg,
    startNewConversation,
    conversationList,
    setNextConversation,
    hasMore,
  } = useConversation();
  console.log(conversationList);
  const loadNextList = async (page: number) => {
    console.log("loadNextList", page);
    setNextConversation(page);
  };

  useEffect(() => {
    console.log("useEffect__selectedUserId");

    const handleStartNewConversation = async () => {
      const newConversation = await startNewConversation(selectedUserId);
      if (newConversation) {
        // setActiveConversationId(newConversation?.id);
        setActiveConversationInfo(newConversation);
      }
    };
    if (selectedUserId) {
      // 既にあるConversationの中で対象ユーザーが参加しているものがあるか確認
      const exist = conversationList.find((conv) => {
        // 参加者のIDのリストにselectedUserIdが含まれているか確認
        return conv.participants.some(
          (participant) => participant.userId === selectedUserId
        );
      });

      if (exist) {
        // 既存のConversationをactive状態にする
        setActiveConversationInfo(exist);
      } else {
        // なければ新しいConversationを作成
        // 作成した上で、そのConversationをactive状態にする
        const newConversation = handleStartNewConversation();

        console.log("startNewConversation!");
      }
    }
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
        <InfiniteScroll
          pageStart={1}
          loadMore={loadNextList}
          // loader={}
          hasMore={hasMore}
          useWindow={false}
          initialLoad={false}
        >
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
        </InfiniteScroll>
      </div>
    </>
  );
};

export default ConversationList;
