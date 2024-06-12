import { UserInfoType } from "./UserInfoType";

export type PostInfo = {
  id: number;
  username: string;
  text: string;
  img?: string;
  imgFileType?: string;
  createdAt: Date;
  scheduledAt?: Date;
  sentAt?: Date;

  updatedAt: Date;
  likes: LikesInfo[];
  replies: PostInfo[];
  user: UserInfoType;
  post: PostInfo; //リプライの場合の親ポスト
};

export enum validPostImgTypes {
  "image/jpeg",
  "image/png",
  "image/gif",
  // "video/mp4",
  // "video/webm",　サーバに負荷をかけるため本番環境では停止
}

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
