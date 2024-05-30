import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import {
  getFollowingsPostList,
  getLikeListByUserId,
  getPostListByKeyword,
  getPostListByUserId,
  getReplyListByUserId,
  getReplyPostList,
  getTrendPostList,
  registerPostAPI,
} from "../lib/database/Post";
import { userInfoAtom } from "../lib/jotai/atoms/user";
import { PostInfo, PostType, validPostImgTypes } from "../lib/type/PostType";
import { loadNumPerPage } from "../lib/constants";

const usePosts = (
  tabName: PostType,
  parentId?: number,
  profileUserId?: number,
  keyword?: string
) => {
  const [userInfoJotai, setuserInfoJotai] = useAtom(userInfoAtom); //ユーザー情報のグローバルステート

  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");
  const [postList, setPostList] = useState<PostInfo[]>([]);
  const [hasMore, setHasMore] = useState(true); //再読み込み判定
  useEffect(() => {
    console.log("useEffect___usePosts");
    setNextPost(1, parentId);
  }, [parentId, tabName, profileUserId, keyword]);
  const registerPost = async (
    text: string,
    img: File | null,
    replyToId?: number,
    scheduledAt?: Date
  ) => {
    try {
      setLoading(true);

      if (!text || text.length === 0 || text.length > 200) {
        throw new Error("text should be less than 200");
      }

      // 画像ファイルが添付されている場合はvalidationチェックの上、圧縮し、フォルダに格納する
      // ファイルが画像ファイルであることを確認する
      // ファイルサイズをチェック
      // 動画ファイルである場合にはファイルを圧縮
      // ファイル名をハッシュ化したもの＋保存日時＋拡張子でファイル名を作成→public/img/ファイル名の頭２文字のフォルダに格納

      // 以下、ファイルが添付されている場合のvalidation
      console.log(img);
      if (img) {
        // 画像ファイルかチェック
        if (!Object.keys(validPostImgTypes).includes(img.type)) {
          throw new Error("File must be a JPEG, PNG, GIF, MP4 or WebM image.");
        }
        if (img.type.startsWith("image")) {
          // ファイルサイズチェック
          if (img.size > 5000000) {
            // 5MBを超える場合はエラー
            throw new Error("Image must be less than 5MB");
          }
        }
        if (img.type.startsWith("video")) {
          // ファイルサイズチェック
          if (img.size > 50000000) {
            // 50MBを超える場合はエラー
            throw new Error("Video must be less than 50MB");
          }
        }
      } else {
        img = null;
      }

      const newPost = await registerPostAPI(
        userInfoJotai.userInfo?.id!,
        userInfoJotai.authtoken!,
        img,
        text,
        replyToId,
        scheduledAt
      );
      console.log(newPost);
      if (!newPost) {
        throw new Error("Something wrong with registering new post");
      }

      if (!scheduledAt) {
        //投稿予約日時が設定されていない場合のみ、リストに追加※予約されている場合は表示しない
        setPostList([newPost, ...postList]);
      } else {
        alert(`Your post is scheduled at ${scheduledAt.toLocaleString()}`);
      }
    } catch (error: any) {
      setErrorMsg(error.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const setNextPost = async (page: number, replyToId?: number) => {
    setSearchLoading(true);
    try {
      const token = userInfoJotai.authtoken;
      const userId = userInfoJotai.userInfo?.id;
      if (!userId) {
        throw new Error("userId couldn't be extracted from storage.");
      }
      let newPosts: any[] | null;
      if (tabName === PostType.trend) {
        // トレンドのポストリストの取得
        newPosts = await getTrendPostList(token, loadNumPerPage, page);
      } else if (tabName === PostType.followings) {
        // フォローしているユーザーのポストリストの取得

        newPosts = await getFollowingsPostList(
          token,
          userId,
          loadNumPerPage,
          page
        );
      } else if (tabName === PostType.detail) {
        // 選択したポストのリプライポストリストの取得

        newPosts = await getReplyPostList(
          token,
          userId,
          loadNumPerPage,
          page,
          replyToId
        );
      } else if (tabName === PostType.profilePosts) {
        //ユーザーの親ポストリストの取得
        if (!profileUserId) {
          throw new Error("profileUserId couldn't be extracted from storage.");
        }

        console.log("getPostListByUserId", {
          token,
          profileUserId,
          page,
          replyToId,
        });
        newPosts = await getPostListByUserId(
          token,
          profileUserId,
          loadNumPerPage,
          page
        );
      } else if (tabName === PostType.profileReplies) {
        //ユーザーのリプライポストリストの取得
        if (!profileUserId) {
          throw new Error("profileUserId couldn't be extracted from storage.");
        }
        console.log("getReplyListByUserId", { token, profileUserId, page });
        newPosts = await getReplyListByUserId(
          token,
          profileUserId,
          loadNumPerPage,
          page
        );
      } else if (tabName === PostType.profileLikes) {
        //ユーザーがLikeしたポストリストの取得
        if (!profileUserId) {
          throw new Error("profileUserId couldn't be extracted from storage.");
        }
        console.log("getLikeListByUserId", { token, profileUserId, page });
        newPosts = await getLikeListByUserId(
          token,
          profileUserId,
          loadNumPerPage,
          page
        );
      } else if (tabName === PostType.search) {
        //ユーザーが入力したキーワードに関連するポストリストの取得
        if (!keyword) {
          newPosts = [];
        }
        // else if (keyword[0] === "@") {
        //   // 検索単語の頭に@が付いている場合、ユーザー名の検索
        // }
        else {
          // それ以外の場合、Postのtextから検索
          console.log("getPostListByKeyword", { token, profileUserId, page });
          newPosts = await getPostListByKeyword(
            token,
            loadNumPerPage,
            page,
            keyword
          );
        }
      } else {
        newPosts = [];
      }
      console.log(newPosts);
      if (!newPosts) {
        newPosts = [];
      }

      setHasMore(newPosts.length > 0);
      if (page === 1 && newPosts.length < loadNumPerPage) {
        setHasMore(false);
        console.log("setHasMore", false);
      }
      if (page > 1) {
        setPostList([...postList, ...newPosts]);
      } else {
        setPostList(newPosts);
      }
    } catch (error: any) {
      setErrorMsg(error.message);
      console.log(error);
    } finally {
      setSearchLoading(false);
    }
  };

  return {
    loading,
    searchLoading,
    errorMsg,
    registerPost,
    postList,
    setNextPost,
    hasMore,
  };
};

export default usePosts;
