import { ConversationInfoType, MessageInfoType } from "../type/MessageInfoType";
import apiClient from "./apiClient";

export async function getAllConversationsListByUserId(
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

    // リクエストヘッダーにJWTを含める
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    // console.log("getPostListByUserId", params);
    // データを取得する
    const response = await apiClient.get("/message/search/conversationsAll", {
      headers,
      params,
    });
    if (response.status !== 200) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error("Failed to fetch data");
    }

    // console.log(response.data);
    return response.data as ConversationInfoType[];
  } catch (error) {
    console.error("Error fetching data:", error);

    return [];
  }
}

export async function getConversationsListByUserId(
  token: string | undefined | null,
  userId: number | undefined | null,
  count: number = 20,
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

    // console.log("getPostListByUserId", params);
    // データを取得する
    const response = await apiClient.get("/message/search/conversations", {
      headers,
      params,
    });
    if (response.status !== 200) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error("Failed to fetch data");
    }

    // console.log(response.data);
    return response.data as ConversationInfoType[];
  } catch (error) {
    console.error("Error fetching data:", error);

    return null;
  }
}

export async function getMessagesByConversationId(
  token: string | undefined | null,
  conversationId: number | undefined | null,
  myId: number
) {
  try {
    // クエリパラメータを用意
    const params: { [key: string]: any } = {};

    if (!token) {
      throw new Error("token is required");
    }
    //  各パラメータを設定
    if (!conversationId) {
      throw new Error("conversationId is required");
    } else {
      params.conversationId = conversationId;
    }

    // リクエストヘッダーにJWTを含める
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    // データを取得する
    const response = await apiClient.get("/message/search/meesageList", {
      headers,
      params,
    });
    if (response.status !== 200) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error("Failed to fetch data");
    }

    console.log(response.data);

    //senderIdが自分のユーザーIDと同じメッセージにはisMineフラグをたてる
    const messages: MessageInfoType[] = response.data.map((data: any) => {
      const message: MessageInfoType = {
        id: data.id,
        text: data.text,
        conversationId: data.conversationId,
        senderId: data.send,
        // sender: data.sender,

        createdAt: data.createdAt,
        isMine: data.senderId === myId,
      };
      return message;
    });

    console.log(messages);

    return messages;
  } catch (error) {
    console.error("Error fetching data:", error);

    return null;
  }
}

export async function registerConversationAPI(
  fromUserId: number,
  toUserId: number,
  token: string | undefined | null
  // firstmessage: string
) {
  try {
    console.log("registerConversationAPI", {
      fromUserId,
      toUserId,

      token,
    });

    // クエリパラメータを用意
    const params: { [key: string]: any } = {};

    if (!token) {
      throw new Error("token is required");
    }
    //  各パラメータを設定
    if (!fromUserId) {
      throw new Error("fromUserId is required");
    } else {
      params.fromUserId = fromUserId;
    }

    if (!toUserId) {
      throw new Error("toUserId is required");
    } else {
      params.toUserId = toUserId;
    }

    // リクエストヘッダーにJWTを含める
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    // データを取得する
    const response = await apiClient.post(
      "/message/register/conversation",
      params,
      {
        headers,
      }
    );
    if (response.status !== 200) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error(response.data);
    }
    return response.data as ConversationInfoType;
  } catch (error) {
    console.error("Error registering data:", error);
    return null;
  }
}

export async function registerMessageAPI(
  token: string | undefined | null,

  conversationId: number,
  senderId: number,
  text: string
) {
  try {
    console.log("registerMessageAPI", {
      conversationId,
      senderId,

      text,
    });

    // クエリパラメータを用意
    const params: { [key: string]: any } = {};

    if (!token) {
      throw new Error("token is required");
    }
    //  各パラメータを設定
    if (!conversationId) {
      throw new Error("conversationId is required");
    } else {
      params.conversationId = conversationId;
    }

    if (!senderId) {
      throw new Error("senderId is required");
    } else {
      params.senderId = senderId;
    }

    if (!text) {
      throw new Error("text is required");
    } else {
      params.text = text;
    }

    // リクエストヘッダーにJWTを含める
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    // データを取得する
    //TODO　全体的にパス名見直し
    const response = await apiClient.post("/message/register/message", params, {
      headers,
    });
    if (response.status !== 200) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error(response.data);
    }
    return response.data as MessageInfoType;
  } catch (error) {
    console.error("Error registering data:", error);
    return null;
  }
}
