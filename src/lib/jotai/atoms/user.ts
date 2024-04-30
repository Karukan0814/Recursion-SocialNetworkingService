import { atomWithStorage } from "jotai/utils";
import { UserInfoType, UserInfoTypeJotai } from "../../type/UserInfoType";

export const jotaiInitialValue: UserInfoTypeJotai = {};
const userInfoAtom = atomWithStorage("userInfo", jotaiInitialValue);
export { userInfoAtom };
