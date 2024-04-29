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
};

export enum PostType {
  "trend",
  "followings",
  "detail",
  "reply",
}

export type LikesInfo = {
  id: number;
  userId: number;
  postId: number;
};
