import { useEffect, useState } from "react";
import ConversationCard from "./ConversationCard";
import { IconButton } from "@mui/material";
import { AddIcCallOutlined } from "@mui/icons-material";
import "../style/ConversationList.css";
import ModalPopup from "./ModalPopup";
import SearchUser from "./SearchUser";
import { ConversationInfoType } from "../lib/type/MessageInfoType";
import {
  getAllConversationsListByUserId,
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
  const [userInfoJotai] = useAtom(userInfoAtom); //ユーザー情報のグローバルステート

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

      setConversationList(allConversations);

      if (selectedUserId) {
        // 既にあるConversationの中で対象ユーザーが参加しているものがあるか確認
        const exist = allConversations?.find((conv) => {
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
          handleStartNewConversation(selectedUserId);
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
