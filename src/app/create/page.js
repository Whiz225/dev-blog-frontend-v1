import PostForm from "@/components/PostForm";
import { createNewPost } from "@/lib/actions";
import { redirect } from "next/navigation";

export default async function CreatePost() {
  async function handleSubmit(formData) {
    "use server";
    const res = await createNewPost(formData);

    redirect(`/posts/${res.data.data.id}`);
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <PostForm
        handler={handleSubmit}
        text="Create New Post"
        btnText={"Create Post"}
      />
    </div>
  );
}
