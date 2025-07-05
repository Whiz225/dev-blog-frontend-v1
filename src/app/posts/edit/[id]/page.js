import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";

import { updatePost } from "@/lib/actions";
import { getPost } from "@/lib/actions";
import Layout from "@/components/Layout";
import PostForm from "@/components/PostForm";

export async function generateMetadata({ params }) {
  const data = await getPost(params.id);
  const { category } = data.data.data;

  return { title: `Edit ${category} post` };
}

export default async function EditPostPage({ params }) {
  // Get headers
  const headersList = await headers();
  // Get user info from headers
  const user = headersList.get("x-user-username");
  // const userId = headersList.get("x-user-id");
  const data = await getPost(params.id);
  const post = data.data.data;

  async function handleSubmit(formData) {
    "use server";
    const res = await updatePost(formData);

    redirect(`/posts/${res.data.post.id}`);
  }

  return (
    <Layout title={`Edit: ${post.title || "Post"}`} user={user}>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <PostForm
              btnText="Update Post"
              text="Edit Post"
              post={post}
              handler={handleSubmit}
            >
              <Link href="/posts">Cancel</Link>
            </PostForm>
          </div>
        </div>
      </div>
    </Layout>
  );
}
