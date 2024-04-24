import { AxiosError, isAxiosError } from "axios";
import { UserInfoType } from "../type/UserInfoType";
import apiClient from "./apiClient";

type ResponseFromAPI = {
  token?: string;
  user?: UserInfoType;
  error?: string;
};

// ユーザー情報取得
export async function loginAPI(email: string, password: string) {
  try {
    console.log("loginAPI");
    console.log("loginAPI", { email, password });

    // クエリパラメータを用意
    const params: { [key: string]: any } = { email, password };
    if (!email || !password) {
      1;
      throw new Error("email and password are necessary.");
    }
    // データを取得する
    const response = await apiClient.post(
      "/user/login",

      params
    );
    // if (response.status !== 200) {
    //   // This will activate the closest `error.js` Error Boundary
    //   //   throw new Error(response.data.errMsg);
    //   throw new Error("Error");
    // }
    console.log(response.data);

    return response.data as ResponseFromAPI;
  } catch (error: any) {
    console.error("Error fetching data:", error);
    if (isAxiosError(error)) {
      return error.response?.data;
    }

    return null;
  }
}
