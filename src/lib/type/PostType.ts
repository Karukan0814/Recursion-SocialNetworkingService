import { UserInfoType } from "./UserInfoType";

export type PostInfo = {
  id: number;
  username: string;
  text: string;
  img?: string;
  createdAt: Date;
  scheduledAt?: Date;
  sentAt?: Date;

  updatedAt: Date;
  likes: LikesInfo[];
  replies: PostInfo[];
  user: UserInfoType;
  post: PostInfo; //リプライの場合の親ポスト
};

export enum PostType {
  "trend",
  "followings",
  "detail",
  "reply",
  "profilePosts",
  "profileReplies",
  "profileLikes",
  "search",
}

export type LikesInfo = {
  id: number;
  userId: number;
  postId: number;
};
