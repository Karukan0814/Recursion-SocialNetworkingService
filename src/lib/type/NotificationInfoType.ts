import { PostInfo } from "./PostType";
import { UserInfoType } from "./UserInfoType";

export type NotificationTriggerType = "Like" | "FOLLOW" | "REPLY" | "MESSAGE";

export type NotificationInfoType = {
  id: number;
  createdAt: Date;
  type: NotificationTriggerType;
  userId: number;
  user: UserInfoType;
  triggeredById: number;
  triggeredBy: UserInfoType;

  postId?: number;
  post?: PostInfo;
  read: boolean;
};
