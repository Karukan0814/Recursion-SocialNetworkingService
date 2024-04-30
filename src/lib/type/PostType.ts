export type PostInfo = {
  id: number;
  username: string;
  text: string;
  image?: string;
  avatar: string;
  createdAt: Date;
  updatedAt: Date;
  likes: LikesInfo[];
  replies: PostInfo[];
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
