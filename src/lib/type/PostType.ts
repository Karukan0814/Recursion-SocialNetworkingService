import { UserInfoType } from "./UserInfoType";

export type PostInfo = {
  id: number;
  username: string;
  text: string;
  image?: string;
  createdAt: Date;
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
  "self",
  "selfReplies",
  "likes",
}

export type LikesInfo = {
  id: number;
  userId: number;
  postId: number;
};
