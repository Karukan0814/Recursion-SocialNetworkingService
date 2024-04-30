export type UserInfoType = {
  id?: number;
  name?: string;
  userImg?: string;
  email?: string;
  isAdmin?: boolean;
  introduction?: string;
};

export type UserInfoTypeJotai = {
  userInfo?: UserInfoType;
  authtoken?: string;
};
