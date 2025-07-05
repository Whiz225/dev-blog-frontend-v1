import PostCard from "@/components/PostCard";

const PostsList = async ({ filteredPosts }) => {

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {filteredPosts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
        />
      ))}
    </div>
  );
};

export default PostsList;
