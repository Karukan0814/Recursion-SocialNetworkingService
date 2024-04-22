import { atom, useAtom } from "jotai";
import { atomWithStorage, createJSONStorage } from "jotai/utils";
import { UserInfoType } from "../../type/UserInfoType";

export const jotaiInitialValue: UserInfoType = {};
const userInfoAtom = atomWithStorage("userInfo", jotaiInitialValue);
export { userInfoAtom };
