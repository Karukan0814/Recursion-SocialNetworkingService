import { AxiosError, isAxiosError } from "axios";
import { UserInfoType } from "../type/UserInfoType";
import apiClient from "./apiClient";

type ResponseFromAPI = {
  token?: string;
  user?: UserInfoType;
  error?: string;
};

export async function signUpAPI(
  userName: string,
  email: string,
  password: string
) {
  try {
    // クエリパラメータを用意
    const params: { [key: string]: any } = { userName, email, password };
    if (!userName || !email || !password) {
      throw new Error("userName, email and password are necessary.");
    }
    // データを送信する
    const response = await apiClient.post("/user/register", params);

    return response.data as ResponseFromAPI;
  } catch (error: any) {
    console.error("Error fetching data:", error);
    if (isAxiosError(error)) {
      return error.response?.data;
    }

    return null;
  }
}

// ユーザー情報取得
export async function loginAPI(email: string, password: string) {
  try {
    // クエリパラメータを用意
    const params: { [key: string]: any } = { email, password };
    if (!email || !password) {
      throw new Error("email and password are necessary.");
    }
    // データを取得する
    const response = await apiClient.post("/user/login", params);
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

export async function verifyEmailAPI(token: string) {
  try {
    console.log("verifyEmailAPI");
    // クエリパラメータを用意
    const params: { [key: string]: any } = { token };
    if (!token) {
      throw new Error("token is necessary.");
    }
    // データを送信する
    const response = await apiClient.post("/user/verify", params);

    return response.data as ResponseFromAPI;
  } catch (error: any) {
    console.error("Error fetching data:", error);
    if (isAxiosError(error)) {
      return error.response?.data;
    }

    return null;
  }
}

export async function updateUserInfoAPI(
  id: number,
  name: string,
  email: string,
  introduction: string,
  userImg: string,
  token: string | undefined | null
) {
  try {
    // クエリパラメータを用意
    const params: { [key: string]: any } = {
      id,
      name,
      email,
      introduction,
      userImg,
    };
    console.log(params);
    if (!token) {
      throw new Error("token is required");
    }
    if (!name) {
      throw new Error("userName is required.");
    }

    // リクエストヘッダーにJWTを含める
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    // データを送信する
    const response = await apiClient.put("/user/update", params, { headers });

    return response.data as UserInfoType;
  } catch (error: any) {
    console.error("Error fetching data:", error);
    if (isAxiosError(error)) {
      return error.response?.data;
    }

    return null;
  }
}

export async function getFollowersList(
  token: string | undefined | null,
  count: number = 6,
  page: number = 1,
  userId: number
) {
  try {
    if (!token) {
      throw new Error("token is required");
    }

    if (!userId) {
      throw new Error("userId is required");
    }

    // クエリパラメータを用意
    const params: { [key: string]: any } = { count, userId };

    // ページ番号が指定されていればパラメータに設定
    if (page) {
      params.page = page;
    }

    // リクエストヘッダーにJWTを含める
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    // データを取得する
    const response = await apiClient.get("/user/follower", {
      headers,
      params,
    });
    if (response.status !== 200) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error("Failed to fetch data");
    }
    return response.data as UserInfoType[];
  } catch (error) {
    console.error("Error fetching data:", error);

    return null;
  }
}

export async function getFollowingList(
  token: string | undefined | null,
  count: number = 6,
  page: number = 1,
  userId: number
) {
  try {
    if (!token) {
      throw new Error("token is required");
    }

    if (!userId) {
      throw new Error("userId is required");
    }

    // クエリパラメータを用意
    const params: { [key: string]: any } = { count, userId };

    // ページ番号が指定されていればパラメータに設定
    if (page) {
      params.page = page;
    }

    // リクエストヘッダーにJWTを含める
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    // データを取得する
    const response = await apiClient.get("/user/following", {
      headers,
      params,
    });
    if (response.status !== 200) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error("Failed to fetch data");
    }
    return response.data as UserInfoType[];
  } catch (error) {
    console.error("Error fetching data:", error);

    return null;
  }
}

// ユーザー情報取得

export async function getUserInfoById(
  token: string | undefined | null,
  userId: number
) {
  try {
    // クエリパラメータを用意
    if (!userId) {
      throw new Error("userId is required");
    }
    const params: { [key: string]: any } = { userId };
    // リクエストヘッダーにJWTを含める
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    // データを取得する
    const response = await apiClient.get("/user/getUserInfoById", {
      headers,
      params,
    });

    return response.data as UserInfoType;
  } catch (error: any) {
    if (isAxiosError(error)) {
      console.error("Error fetching data:", error.response?.data);
    }
    console.error("Error fetching data:", error);

    return null;
  }
}

export async function changeFollowState(
  userId: number,
  followUserId: number,
  followState: boolean
) {
  try {
    // クエリパラメータを用意
    if (!userId || !followUserId) {
      throw new Error("userId, and followUserId are necessary.");
    }
    const params: { [key: string]: any } = {
      userId,
      followUserId,
      followState,
    };
    // データを送信する
    const response = await apiClient.post("/user/follow", params);

    return response.data as number[];
  } catch (error: any) {
    console.error("Error fetching data:", error);
    if (isAxiosError(error)) {
      return error.response?.data;
    }

    return null;
  }
}

export async function getUserListByKeyword(
  token: string | undefined | null,
  count: number = 20,
  page: number = 1,
  keyword: string
) {
  try {
    console.log("getUserListByKeyword");
    // クエリパラメータを用意
    const params: { [key: string]: any } = { count };

    if (!token) {
      throw new Error("token is required");
    }
    //  各パラメータを設定
    if (!keyword) {
      throw new Error("keyword is required");
    } else {
      params.keyword = keyword;
    }

    if (page) {
      params.page = page;
    }

    if (count) {
      params.count = count;
    }

    // リクエストヘッダーにJWTを含める
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    console.log("getUserListByKeyword", params);
    // データを取得する
    const response = await apiClient.get("/user/search/keyword", {
      headers,
      params,
    });
    if (response.status !== 200) {
      throw new Error("Failed to fetch data");
    }

    return response.data as UserInfoType[];
  } catch (error) {
    console.error("Error fetching data:", error);

    return null;
  }
}
