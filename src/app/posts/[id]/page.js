// export const dynamic = "force-dynamic";

import Link from "next/link";
import { headers } from "next/headers";

import Layout from "@/components/Layout";
import Button from "@/components/Button";
import { getPost } from "@/lib/actions";

export async function generateMetadata({ params }) {
  const data = await getPost(params.id);
  const { category } = data.data.data;

  return { title: `${category} post` };
}

export default async function PostPage({ params }) {
  const { id } = params;
  // Get headers 
  const headersList = await headers();
  // Get user info from headers
  const username = headersList.get("x-user-username");
  const userId = headersList.get("x-user-id");
  // 3. Fetch post data
  const postResponse = await getPost(id);
  const post = postResponse.data.data;

  return (
    <Layout title={post?.title || "Post"} user={username}>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-2xl font-bold text-gray-900">{post.title}</h1>
              {userId && userId === post.author._id && (
                <div className="space-x-3">
                  <Link href={`/posts/edit/${post._id}`}>
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      Edit
                    </button>
                  </Link>
                  <Button variation="danger" id={post.id} path="/posts">
                    Delete
                  </Button>
                </div>
              )}
            </div>

            <div className="prose max-w-none text-gray-700 mb-6">
              {post.content.split("\n").map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            <div className="border-t pt-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-gray-500">
                    <span className="text-sm font-medium leading-none text-white">
                      {post.author.username.charAt(0).toUpperCase()}
                    </span>
                  </span>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">
                    {post.author.username}
                  </p>
                  <p className="text-sm text-gray-500">
                    Posted on {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <Link href="/posts">
            ← Back to all posts
          </Link>
        </div>
      </div>
    </Layout>
  );
}
