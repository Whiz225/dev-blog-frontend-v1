// "use client";

// import { usePosts } from "@/hooks/usePosts";
import PostCard from "@/components/PostCard";
import { getAllPosts } from "@/lib/actions";

const PostsList = async ({ filteredPosts }) => {
  // console.log(filteredPosts);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {filteredPosts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          // isOwner={user && user.id === post.author.id}
        />
      ))}
    </div>
  );
};

export default PostsList;
