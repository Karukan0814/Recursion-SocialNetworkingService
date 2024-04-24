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

    return response.data as ResponseFromAPI;
  } catch (error: any) {
    console.error("Error fetching data:", error);
    if (isAxiosError(error)) {
      return error.response?.data;
    }

    return null;
  }
}
// トークン有効確認機能
export async function checkTokenAPI(token: string | undefined | null) {
  try {
    if (!token) {
      throw new Error("トークンがありません");
    }

    // リクエストヘッダーにJWTを含める
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    // トークンを登録する
    const response = await apiClient.post("/user/checkToken", {}, { headers });

    if (response.status === 200) {
      // トークン有効
      console.log("トークン有効");
      return true;
    } else {
      //トークン無効
      console.log("トークン無効");

      return false;
    }
  } catch (error: any) {
    console.error("Error check token:", error);
    if (isAxiosError(error)) {
      console.error("Error check token:", error.response?.data);
    }
    return false;
  }
}
