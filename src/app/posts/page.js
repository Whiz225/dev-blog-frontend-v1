import { headers } from "next/headers";
import Link from "next/link";
import { Suspense } from "react";

import Layout from "@/components/Layout";
import Button from "@/components/Button";
import UserPostsList from "@/components/UsersPostsList";
import { getMyPosts } from "@/lib/actions";

export const metadata = {
  title: "MyPosts",
};

export default async function PostsPage({ searchParams }) {
  // Get headers
  const headersList = await headers();
  // Get user info from headers
  const username = headersList.get("x-user-username");
  // const userId = headersList.get("x-user-id");
  const data = await getMyPosts();
  const { posts } = data.data;

  let filteredPosts;
  const sort = (await searchParams?.sortBy) || "all";

  if (!sort || sort === "all") filteredPosts = posts;

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
    <Layout title="All Posts" user={username}>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Developer Blog</h1>
          <Link href="/create">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition duration-200">
              Create Post
            </Button>
          </Link>
        </div>

        <div className="space-y-6">
          <Suspense fallback={<p>Loading....</p>}>
            <UserPostsList posts={filteredPosts} />
          </Suspense>
        </div>
      </div>
    </Layout>
  );
}
