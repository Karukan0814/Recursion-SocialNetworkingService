// export async function getArticleCount(type: ArticleType) {
//   try {
//     // クエリパラメータを用意
//     const params: { [key: string]: any } = {};

import { PostInfo } from "../type/PostType";
import apiClient from "./apiClient";

//     // 記事種類が指定されていればパラメータに設定
//     if (type) {
//       params.type = type;
//     }

//     // データを取得する
//     const response = await apiClient.get("/article/articleCount", { params });
//     if (response.status !== 200) {
//       // This will activate the closest `error.js` Error Boundary
//       throw new Error("Failed to fetch data");
//     }

//     return response.data as ArticleCount;
//   } catch (error) {
//     console.error("Error fetching data:", error);

//     return { totalArticlesCount: 0 };
//   }
// }

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

    console.log("getReplyPostList", params);
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
    console.log("getPostInfo", { postId, token });
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

    // console.log("getPostListByUserId", params);
    // データを取得する
    const response = await apiClient.get("/post/search/userPosts", {
      headers,
      params,
    });
    if (response.status !== 200) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error("Failed to fetch data");
    }

    // console.log(response.data);
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

    console.log("getPostListByUserId", params);
    // データを取得する
    const response = await apiClient.get("/post/search/userReplies", {
      headers,
      params,
    });
    if (response.status !== 200) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error("Failed to fetch data");
    }

    console.log(response.data);
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

    console.log("getLikeListByUserId", params);
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
    console.log(likePosts);
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
    console.log("getPostListByKeyword");
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

    console.log("getPostListByKeyword", params);
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

// export async function getArticleByCategoryId(categoryId: number) {
//   try {
//     // クエリパラメータを用意
//     const params = { categoryId }; // クエリパラメータをオブジェクトとして設定

//     // データを取得する
//     const response = await apiClient.get("/article/searchByCategory", {
//       params, // クエリパラメータを追加
//     });

//     if (response.status !== 200) {
//       throw new Error("Failed to fetch data");
//     }

//     return response.data as BasicCategorizedArticles;
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     return null;
//   }
// }

// export async function registerLike(
//   articleId: number,
//   userId: number,
//   like: boolean
// ) {
//   try {
//     // クエリパラメータを用意
//     const params: { [key: string]: any } = { articleId, userId, like };

//     // リクエストヘッダーにJWTを含める
//     const jwtToken = getCookie("userInfo");
//     const headers = {
//       Authorization: `Bearer ${jwtToken}`,
//     };
//     // データを取得する
//     const response = await apiClient.post(
//       "/userActions/like/register",
//       params,
//       { headers }
//     );
//     if (response.status !== 200) {
//       // This will activate the closest `error.js` Error Boundary
//       throw new Error("いいね情報登録失敗");
//     }
//     return response.data as number;
//   } catch (error) {
//     console.error("Error registering data:", error);

//     return null;
//   }
// }

// export async function getComments(articleId: number) {
//   try {
//     // クエリパラメータを用意
//     const params: { [key: string]: any } = { articleId };

//     // データを取得する
//     const response = await apiClient.get("/userActions/comment/search", {
//       params,
//     });
//     if (response.status !== 200) {
//       // This will activate the closest `error.js` Error Boundary
//       throw new Error("Failed to fetch data");
//     }

//     return response.data as CommentInfo[];
//   } catch (error) {
//     console.error("Error fetching data:", error);

//     return null;
//   }
// }

// export async function registerComment(
//   articleId: number,
//   userId: number,
//   comment: string
// ) {
//   try {
//     // クエリパラメータを用意
//     const params: { [key: string]: any } = { articleId, userId, comment };

//     // リクエストヘッダーにJWTを含める
//     const jwtToken = getCookie("userInfo");
//     const headers = {
//       Authorization: `Bearer ${jwtToken}`,
//     };
//     // データを取得する
//     const response = await apiClient.post(
//       "/userActions/comment/register",
//       params,
//       { headers }
//     );
//     if (response.status !== 200) {
//       // This will activate the closest `error.js` Error Boundary
//       throw new Error("コメント登録失敗");
//     }
//     return response.data as CommentInfo;
//   } catch (error) {
//     console.error("Error registering data:", error);
//     return null;
//   }
// }

// export async function getArticleByUserId(userId: number, token: string) {
//   try {
//     // クエリパラメータを用意
//     const params: { [key: string]: any } = {};

//     params.userId = userId;
//     // リクエストヘッダーにJWTを含める※サーバー側から呼び出す場合もあるので、getCookieしない
//     const headers = {
//       Authorization: `Bearer ${token}`,
//     };
//     // データを取得する
//     const response = await apiClient.post(
//       "/article/searchByUser",
//       params, // クエリパラメータを data プロパティに移動
//       { headers }
//     );

//     if (response.status !== 200) {
//       throw new Error("Failed to fetch data");
//     }

//     return response.data as ArticlesCategorizedByActions;
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     return null;
//   }
// }

export async function registerPostAPI(
  userId: number,
  jwtToken: string,
  img: string,
  text: string,
  replyToId?: number,
  scheduledAt?: Date
) {
  try {
    console.log("registerPost", {
      userId,
      text,
      img,
      replyToId,
      jwtToken,
      scheduledAt,
    });

    // TODO Postの画像データをどこに保存するか問題

    // クエリパラメータを用意
    const params: { [key: string]: any } = {
      text,
      img: "/assets/food_sushi_pack.png",

      userId,
      replyToId,
      scheduledAt,
    };

    // リクエストヘッダーにJWTを含める
    const headers = {
      Authorization: `Bearer ${jwtToken}`,
    };
    // データを取得する
    const response = await apiClient.post("/post/register", params, {
      headers,
    });
    if (response.status !== 200) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error(response.data);
    }
    return response.data as PostInfo;
  } catch (error) {
    console.error("Error registering data:", error);
    return null;
  }
}

// export async function deleteArticle(userId: number, articleInfo: ArticleInfo) {
//   try {
//     // クエリパラメータを用意
//     const params: { [key: string]: any } = {
//       userId,
//       articleId: articleInfo.id,
//     };

//     // リクエストヘッダーにJWTを含める
//     const jwtToken = getCookie("userInfo");
//     const headers = {
//       Authorization: `Bearer ${jwtToken}`,
//     };
//     // データを取得する
//     const response = await apiClient.delete("/article/delete", {
//       params,
//       headers,
//     });
//     if (response.status !== 200) {
//       // This will activate the closest `error.js` Error Boundary
//       throw new Error("記事削除失敗");
//     }

//     //firebaseから記事のimgを削除
//     if (articleInfo.img.startsWith("http")) {
//       const imageRef = ref(storage, articleInfo.img);

//       // 画像をFirebase Storageから削除
//       await deleteObject(imageRef);
//     }

//     return true;
//   } catch (error) {
//     console.error("Error registering data:", error);
//     return false;
//   }
// }
