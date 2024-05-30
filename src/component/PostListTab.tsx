import "../style/PostListTab.css";
import InfiniteScroll from "react-infinite-scroller";
import PostBox from "./PostBox";
import Post from "./Post";
import usePosts from "../hooks/usePosts";
import { PostType } from "../lib/type/PostType";
import Loading from "./Loading";

type Props = {
  tabName: PostType;
  replyToId?: number;
  profileUserId?: number;
  keyWord?: string;
  displayScheduledAt?: boolean;
};
const PostListTab = ({
  tabName,
  replyToId,
  profileUserId,
  keyWord,
  displayScheduledAt = false,
}: Props) => {
  const {
    postList,
    registerPost,
    setNextPost,
    hasMore,
    loading,
    searchLoading,
  } = usePosts(tabName, replyToId, profileUserId, keyWord);

  const loadNextList = async (page: number) => {
    setNextPost(page, replyToId);
  };

  // 表示するタブ名を配列で定義
  const validTabs = [
    PostType.trend,
    PostType.detail,
    PostType.followings,
    PostType.reply,
  ];

  // tabNameがvalidTabs配列に含まれているかチェック
  const shouldDisplayPostBox = validTabs.includes(tabName);

  const displayResult = () => {
    // if (searchLoading) {
    //   return <Loading />;
    // } else {
    if (!searchLoading && postList.length < 1) {
      if (tabName === PostType.search) {
        return <div className="tab__content_noResult">No results</div>;
      }
      return <div className="tab__content_noResult">No posts</div>;
    } else {
      return postList.map((post, i) => <Post key={post.id} post={post} />);
    }
    // }
  };

  return (
    <>
      {shouldDisplayPostBox && (
        <PostBox
          registerPost={registerPost}
          registerLoading={loading}
          replyToId={replyToId}
          postType={tabName}
          displayScheduledAt={displayScheduledAt}
        />
      )}
      <div className="tab__content">
        <InfiniteScroll
          pageStart={1}
          loadMore={loadNextList}
          loader={<Loading />}
          hasMore={hasMore}
          useWindow={false}
          initialLoad={false}
        >
          {displayResult()}
        </InfiniteScroll>
      </div>
    </>
  );
};

export default PostListTab;
