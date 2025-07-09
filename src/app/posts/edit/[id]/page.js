// import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";

import { updatePost } from "@/lib/data-service";
import { getPost } from "@/lib/data-service";
import Layout from "@/components/Layout";
import PostForm from "@/components/PostForm";
import { revalidatePath } from "next/cache";

export async function generateMetadata({ params }) {
  const data = await getPost(params.id);
  const { category } = data.data.data;

  return { title: `Edit ${category} post` };
}

export default async function EditPostPage({ params }) {
  const data = await getPost(params.id);
  const post = data.data.data;

  async function handleSubmit(formData) {
    "use server";
    const res = await updatePost(formData);

    revalidatePath(`/posts/edit/${res.data.post.id}`);
    revalidatePath("/posts");

    redirect(`/posts/${res.data.post.id}`);
  }

  return (
    <Layout title={`Edit: ${post.title || "Post"}`}>
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
