import { UserInfoType } from "./UserInfoType";

export type ConversationInfoType = {
  id: number;

  messages: MessageInfoType[];
  participants: ConversationParticipant[];
};

export type ConversationParticipant = {
  conversationId?: number;
  userId?: number;
  user?: UserInfoType;
};

export type MessageInfoType = {
  id: number;
  text: string;
  conversationId: number;
  senderId: number;

  sender: UserInfoType;

  createdAt: Date;
  isMine: boolean;
};
