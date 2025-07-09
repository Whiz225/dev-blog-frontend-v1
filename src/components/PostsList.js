// src/components/PostsList.js
import PostCard from "@/components/PostCard";
import { getAllPosts } from "@/lib/data-service";

const PostsList = async ({ sort }) => {
  const res = await getAllPosts();
  const posts = res.data.data;

  let filteredPosts = posts;

  if (sort === "recent")
    filteredPosts = posts.sort(
      (a, b) =>
        new Date(b.createdAt)?.getTime() - new Date(a.createdAt)?.getTime()
    );

  if (sort && sort !== "all" && sort !== "recent")
    filteredPosts = posts.filter((post) =>
      post.category?.toLowerCase()?.includes(sort)
    );

  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default PostsList;
