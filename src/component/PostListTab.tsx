import PostBox from "./PostBox";
import InfiniteScroll from "react-infinite-scroller";
import Post from "./Post";
import usePosts from "../hooks/usePosts";
import "../style/PostListTab.css";
import Loading from "./Loading";
import { PostType } from "../lib/type/PostType";

type Props = {
  tabName: PostType;
  replyToId?: number;
};
const PostListTab = ({ tabName, replyToId }: Props) => {
  const {
    postList,
    registerPost,

    setNextPost,
    hasMore,
  } = usePosts(tabName);

  const loadNextList = async (page: number) => {
    setNextPost(page, replyToId);
  };

  return (
    <>
      <PostBox registerPost={registerPost} replyToId={replyToId} />
      <div className="tab__content">
        <InfiniteScroll
          pageStart={0}
          loadMore={loadNextList}
          loader={<Loading />}
          hasMore={hasMore}
          useWindow={false}
        >
          {/* {hasMore ? "true" : "false"} */}
          {postList.map((post) => (
            <Post key={`${tabName}_${post.id}`} post={post} />
          ))}
        </InfiniteScroll>
      </div>
    </>
  );
};

export default PostListTab;
