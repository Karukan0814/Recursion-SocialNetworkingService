import { atomWithStorage } from "jotai/utils";
import { UserInfoType, UserInfoTypeJotai } from "../../type/UserInfoType";
import { atom } from "jotai";

const atomWithLocalStorage = (key: string, initialValue: UserInfoTypeJotai) => {
  const getInitialValue = () => {
    const item = localStorage.getItem(key);
    if (item !== null) {
      return JSON.parse(item);
    }
    return initialValue;
  };
  const baseAtom = atom(getInitialValue());
  const derivedAtom = atom(
    (get) => get(baseAtom),
    (get, set, update) => {
      const nextValue =
        typeof update === "function" ? update(get(baseAtom)) : update;
      set(baseAtom, nextValue);
      localStorage.setItem(key, JSON.stringify(nextValue));
    }
  );
  return derivedAtom;
};

export const jotaiInitialValue: UserInfoTypeJotai = {};
const userInfoAtom = atomWithLocalStorage("userInfo", jotaiInitialValue);
export { userInfoAtom };
