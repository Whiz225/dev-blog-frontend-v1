// src/app/page.js
import Link from "next/link";
import { Suspense } from "react";

import PostsList from "../components/PostsList";
import Button from "@/components/Button";
import Spinner from "@/components/Spinner";

export default async function Home({ searchParams }) {

  const sort = await searchParams?.sortBy  || "all";

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

      <div className="flex justify-center">
        <div className="space-y-6 max-w-7xl w-full">
          <Suspense fallback={<Spinner />}>
          <PostsList sort={sort} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
