// export const dynamic = "force-dynamic";

import { headers } from "next/headers";
import Layout from "@/components/Layout";
import Button from "@/components/Button";
import Link from "next/link";
import { getPost } from "@/lib/actions";

// export async function generateMetaData({ params }) {
//   const { name } = await getCabin(params.cabinId);
//   return { title: `cabin ${name}` };
// }

// export async function generateStaticParams() {
//   const cabins = await getCabins();

//   const ids = cabins.map((cabin) => ({
//     cabinId: `${cabin.id}`,
//   }));
//   return ids;
// }

export default async function PostPage({ params }) {
  // 1. Properly access dynamic params
  const { id } = params;

  // Get headers and cookies
  const headersList = await headers();

  // Try to get user info from headers first, then fallback to cookies
  const username = headersList.get("x-user-username");
  const userId = headersList.get("x-user-id");
  console.log("User info:", { username, userId });
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
            {/* <a className="text-blue-600 hover:text-blue-800 font-medium"> */}
            ← Back to all posts
            {/* </a> */}
          </Link>
        </div>
      </div>
    </Layout>
  );
}
