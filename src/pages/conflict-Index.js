// pages/index.js
import { useQuery } from "react-query";
import api from "../services/api";
import PostCard from "../components/PostCard";
import { useAuth } from "../contexts/AuthContext";
import Link from "next/link";

async function fetchPosts() {
  const { data } = await api.get("/posts");
  return data;
}

export default function Home() {
  const { user } = useAuth();
  const { data: posts, isLoading, error } = useQuery("posts", fetchPosts);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading posts</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dev-Blog</h1>
        {user && (
          <Link href="/create-post">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Create Post
            </button>
          </Link>
        )}
      </div>

      <div className="space-y-6">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            isOwner={user && user.id === post.author.id}
          />
        ))}
      </div>
    </div>
  );
}
