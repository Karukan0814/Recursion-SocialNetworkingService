import { NotificationInfoType } from "../type/NotificationInfoType";
import apiClient from "./apiClient";

export async function getRecentNotifications(
  token: string | undefined | null,
  userId: number | undefined | null
) {
  try {
    // クエリパラメータを用意
    const params: { [key: string]: any } = {};

    if (!token) {
      throw new Error("token is required");
    }
    //  各パラメータを設定
    if (!userId) {
      throw new Error("userId is required");
    } else {
      params.userId = userId;
    }

    //取得するnotificarionは直近１週間以内とする
    params.backDate = 7 * 24 * 3600 * 1000;

    // リクエストヘッダーにJWTを含める
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    // console.log("getPostListByUserId", params);
    // データを取得する
    const response = await apiClient.get("/notification/getRecentNotices", {
      headers,
      params,
    });
    if (response.status !== 200) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error("Failed to fetch data");
    }

    // console.log(response.data);
    return response.data as NotificationInfoType[];
  } catch (error) {
    console.error("Error fetching data:", error);

    return null;
  }
}
