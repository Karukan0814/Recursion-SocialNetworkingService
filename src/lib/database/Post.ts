import axios from "axios";
import apiClient from "./apiClient";
import { PostInfo } from "../type/PostType";

export async function getTrendPostList(
  token: string | undefined | null,
  count: number = 6,
  page: number = 1
) {
  try {
    if (!token) {
      throw new Error("トークンがありません");
    }

    // クエリパラメータを用意
    const params: { [key: string]: any } = { count };

    // ページ番号が指定されていればパラメータに設定
    if (page) {
      params.page = page;
    }

    // リクエストヘッダーにJWTを含める
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    // データを取得する
    const response = await apiClient.get("/post/search/trend", {
      headers,
      params,
    });
    if (response.status !== 200) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error("Failed to fetch data");
    }
    return response.data as PostInfo[];
  } catch (error) {
    console.error("Error fetching data:", error);

    return null;
  }
}

export async function getFollowingsPostList(
  token: string | undefined | null,
  userId: number,
  count: number = 6,
  page: number = 1
) {
  try {
    // クエリパラメータを用意
    const params: { [key: string]: any } = { count };

    if (!token) {
      throw new Error("token is required");
    }
    //  各パラメータを設定
    if (!userId) {
      throw new Error("userId is required");
    } else {
      params.userId = userId;
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
    // データを取得する
    const response = await apiClient.get("/post/search/followings", {
      headers,
      params,
    });
    if (response.status !== 200) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error("Failed to fetch data");
    }

    return response.data as PostInfo[];
  } catch (error) {
    console.error("Error fetching data:", error);

    return null;
  }
}

export async function getReplyPostList(
  token: string | undefined | null,
  userId: number,
  count: number = 20,
  page: number = 1,
  replyToId?: number
) {
  try {
    // クエリパラメータを用意
    const params: { [key: string]: any } = { count };

    if (!token) {
      throw new Error("token is required");
    }
    //  各パラメータを設定
    if (!userId) {
      throw new Error("userId is required");
    } else {
      params.userId = userId;
    }

    if (!replyToId) {
      throw new Error("replyToId is required");
    } else {
      params.replyToId = replyToId;
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

    // データを取得する
    const response = await apiClient.get("/post/search/replies", {
      headers,
      params,
    });
    if (response.status !== 200) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error("Failed to fetch data");
    }

    return response.data as PostInfo[];
  } catch (error) {
    console.error("Error fetching data:", error);

    return null;
  }
}
export async function getPostInfo(
  postId: string,
  token: string | undefined | null
) {
  try {
    // クエリパラメータを用意
    const params: { [key: string]: any } = {};

    if (!token) {
      throw new Error("token is required");
    }

    if (postId) {
      params.postId = postId;
    } else {
      throw new Error("postId is required.");
    }

    // リクエストヘッダーにJWTを含める
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    // データを取得する
    const response = await apiClient.get("/post/search/postById", {
      headers,
      params,
    });
    if (response.status !== 200) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error("Failed to fetch data");
    }

    return response.data as PostInfo;
  } catch (error) {
    console.error("Error fetching data:", error);

    return null;
  }
}

export async function registerLike(
  postId: number,
  userId: number,
  like: boolean,
  token: string | undefined | null
) {
  try {
    // クエリパラメータを用意
    const params: { [key: string]: any } = { postId, userId, like };

    if (!token) {
      throw new Error("token is required");
    }

    if (postId) {
      params.postId = postId;
    } else {
      throw new Error("postId is required.");
    }

    if (userId) {
      params.userId = userId;
    } else {
      throw new Error("userId is required.");
    }

    params.like = like;

    // リクエストヘッダーにJWTを含める
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    // データを取得する
    const response = await apiClient.post("/post/like/register", params, {
      headers,
    });
    if (response.status !== 200) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error("Something wrong with registering like state");
    }
    return response.data as number;
  } catch (error) {
    console.error("Error registering data:", error);

    return null;
  }
}

export async function getPostListByUserId(
  token: string | undefined | null,
  userId: number,
  count: number = 20,
  page: number = 1,
  replyToId?: number
) {
  try {
    // クエリパラメータを用意
    const params: { [key: string]: any } = { count };

    if (!token) {
      throw new Error("token is required");
    }
    //  各パラメータを設定
    if (!userId) {
      throw new Error("userId is required");
    } else {
      params.userId = userId;
    }

    if (replyToId) {
      params.replyToId = replyToId;
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

    // データを取得する
    const response = await apiClient.get("/post/search/userPosts", {
      headers,
      params,
    });
    if (response.status !== 200) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error("Failed to fetch data");
    }

    return response.data as PostInfo[];
  } catch (error) {
    console.error("Error fetching data:", error);

    return null;
  }
}

export async function getReplyListByUserId(
  token: string | undefined | null,
  userId: number,
  count: number = 20,
  page: number = 1,
  replyToId?: number
) {
  try {
    // クエリパラメータを用意
    const params: { [key: string]: any } = { count };

    if (!token) {
      throw new Error("token is required");
    }
    //  各パラメータを設定
    if (!userId) {
      throw new Error("userId is required");
    } else {
      params.userId = userId;
    }

    if (replyToId) {
      params.replyToId = replyToId;
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

    // データを取得する
    const response = await apiClient.get("/post/search/userReplies", {
      headers,
      params,
    });
    if (response.status !== 200) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error("Failed to fetch data");
    }

    return response.data as PostInfo[];
  } catch (error) {
    console.error("Error fetching data:", error);

    return null;
  }
}

export async function getLikeListByUserId(
  token: string | undefined | null,
  userId: number,
  count: number = 20,
  page: number = 1,
  replyToId?: number
) {
  try {
    // クエリパラメータを用意
    const params: { [key: string]: any } = { count };

    if (!token) {
      throw new Error("token is required");
    }
    //  各パラメータを設定
    if (!userId) {
      throw new Error("userId is required");
    } else {
      params.userId = userId;
    }

    if (replyToId) {
      params.replyToId = replyToId;
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

    // データを取得する
    const response = await apiClient.get("/post/search/userLikes", {
      headers,
      params,
    });
    if (response.status !== 200) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error("Failed to fetch data");
    }

    const likePosts = response.data.map((res: { post: PostInfo }) => {
      return res.post;
    });
    return likePosts as PostInfo[];
  } catch (error) {
    console.error("Error fetching data:", error);

    return null;
  }
}

export async function getPostListByKeyword(
  token: string | undefined | null,
  count: number = 20,
  page: number = 1,
  keyword: string
) {
  try {
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

    // データを取得する
    const response = await apiClient.get("/post/search/keyword", {
      headers,
      params,
    });
    if (response.status !== 200) {
      throw new Error("Failed to fetch data");
    }

    return response.data as PostInfo[];
  } catch (error) {
    console.error("Error fetching data:", error);

    return null;
  }
}
export async function registerPostAPI(
  userId: number,
  jwtToken: string,
  img: File | null,
  text: string,
  replyToId?: number,
  scheduledAt?: Date
) {
  try {
    // クエリパラメータを用意
    const params: { [key: string]: any } = {
      text,
      img,
      userId,
      replyToId,
      scheduledAt,
    };

    const formData = new FormData();

    formData.append("text", text);
    formData.append("userId", userId.toString());
    if (img) formData.append("img", img);
    if (replyToId) formData.append("replyToId", replyToId.toString());
    if (scheduledAt) formData.append("scheduledAt", scheduledAt.toISOString());

    const config = {
      data: formData,
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        "content-type": "multipart/form-data",
      },
    };
    // データを取得する
    const response = await axios.post(
      import.meta.env.VITE_API_URL + "/post/register",
      formData,
      config
    );

    if (response.status !== 200) {
      throw new Error(response.data);
    }

    return response.data as PostInfo;
  } catch (error) {
    console.error("Error registering data:", error);
    return null;
  }
}

export async function deletePost(
  token: string | undefined | null,

  userId: number | undefined | null,

  postId: number
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

    if (!postId) {
      throw new Error("postId is required");
    } else {
      params.postId = postId;
    }

    // リクエストヘッダーにJWTを含める
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    // データを取得する
    const response = await apiClient.delete("/post/delete", {
      params,
      headers,
    });
    if (response.status !== 200) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error("deleting post failed");
    }

    //TODO ポストに画像が添付されていた場合は、それを削除
    return true;
  } catch (error) {
    console.error("Error registering data:", error);
    return false;
  }
}
