// src/app/posts/page.js

import Link from "next/link";
import { Suspense } from "react";

import Layout from "@/components/Layout";
import Button from "@/components/Button";
import UserPostsList from "@/components/UsersPostsList";
import Spinner from "@/components/Spinner";

export const metadata = {
  title: "MyPosts",
};

export default async function PostsPage({ searchParams }) {
  const sort = (await searchParams?.sortBy) || "all";

  return (
    <Layout title="All Posts">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Developer Blog</h1>
          <Link href="/create">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition duration-200">
              Create Post
            </Button>
          </Link>
        </div>

        <Suspense fallback={<Spinner />}>
          <UserPostsList sort={sort} />
        </Suspense>
      </div>
    </Layout>
  );
}
