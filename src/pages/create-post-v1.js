import { useQuery } from "react-query";
import { useRouter } from "next/router";
import api from "../../../services/api";
// import { useAuth } from "../../../contexts/AuthContext";
import Layout from "../../../components/Layout";
import LoadingSpinner from "../../../components/LoadingSpinner";
import ErrorMessage from "../../../components/ErrorMessage";
import Link from "next/link";

const fetchPost = async (id) => {
  const { data } = await api.get(`/posts/${id}`);
  return data;
};

export default function PostPage() {
  const router = useRouter();
  const { id } = router.query;
  // const { user } = useAuth();

  const {
    data: post,
    isLoading,
    error,
  } = useQuery(["post", id], () => fetchPost(id), { enabled: !!id });

  if (isLoading) return <LoadingSpinner fullPage />;
  if (error) return <ErrorMessage message="Failed to load post" fullPage />;

  return (
    <Layout title={post?.title || "Post"}>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-2xl font-bold text-gray-900">{post.title}</h1>
              // {user && user._id === post.author._id && (
              //   <div className="space-x-3">
              //     <Link href={`/posts/edit/${post._id}`}>
              //       <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              //         Edit
              //       </button>
              //     </Link>
              //     <button className="text-red-600 hover:text-red-800 text-sm font-medium">
              //       Delete
              //     </button>
              //   </div>
              // )}

                <div className="space-x-3">
                  <Link href={`/posts/edit/${post._id}`}>
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      Edit
                    </button>
                  </Link>
                  <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                    Delete
                  </button>
                </div>
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
            <a className="text-blue-600 hover:text-blue-800 font-medium">
              ← Back to all posts
            </a>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
