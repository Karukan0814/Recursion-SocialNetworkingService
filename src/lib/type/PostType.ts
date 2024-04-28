export type PostInfo = {
  id: number;
  username: string;
  text: string;
  image?: string;
  avatar: string;
  createdAt: Date;
  updatedAt: Date;
};

export enum PostType {
  "trend",
  "followings",
  "detail",
}
