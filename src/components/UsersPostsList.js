import Link from "next/link";

import PostCard from "@/components/PostCard";
import Button from "./Button";

async function UserPostsList({ posts }) {
  return (
    <>
      {posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No posts yet. Be the first to create one!
          </p>
        </div>
      ) : (
        posts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
          >
            <PostCard post={post}>
              <div className="space-x-2">
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
        ))
      )}
    </>
  );
}

export default UserPostsList;
