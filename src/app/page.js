import Link from "next/link";

import PostsList from "../components/PostsList";
import Button from "@/components/Button";
import { getAllPosts } from "@/lib/actions";

export default async function Home({ searchParams }) {
  const res = await getAllPosts();
  const posts = res.data.data;

  let filteredPosts;
  const sort = await searchParams?.sortBy;

  if (!sort) filteredPosts = posts;
  // if (!sort || sort === "all") filteredPosts = posts;

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
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dev-Blog</h1>

        <Link href="/create">
          <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Create Post
          </Button>
        </Link>
      </div>

      <div className="space-y-6">
        <PostsList filteredPosts={filteredPosts} />
      </div>
    </div>
  );
}
