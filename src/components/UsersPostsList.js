// src/components/UsersPostsList.js
import Link from "next/link";
import PostCard from "@/components/PostCard";
import Button from "./Button";
import { getMyPosts } from "@/lib/data-service";
import { unstable_noStore as noStore } from "next/cache";

async function UserPostsList({ sort }) {
  // to show upto date anytime
  noStore();

  const data = await getMyPosts();
  const { posts } = data.data;

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
    <div className="flex justify-center w-full">
      {/* Centering container */}
      {posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No posts yet. Be the first to create one!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl">
          {/* Grid with max width */}
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
            >
              <PostCard post={post}>
                <div className="space-x-2 pt-3">
                  <Link href={`/posts/edit/${post._id}`}>
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      Edit
                    </button>
                  </Link>
                  <Button id={post.id} variation="danger">
                    Delete
                  </Button>
                </div>
              </PostCard>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserPostsList;
