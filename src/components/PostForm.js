import Link from "next/link";
import Button from "./Button";
import Input from "./Input";
import FormButton from "./FormButton";

function PostForm({ handler, post, btnText, text, children }) {
  let id = "";
  let title = "";
  let content = "";
  if (post) {
    id = post.id;
    title = post.title;
    content = post.content;
  }
  return (
    <>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">{text}</h1>

      <form action={handler} className="space-y-6">
        <Input type="hidden" name="postId" defaultValue={id} />
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Title
          </label>
          <Input
            id="title"
            type="text"
            name="title"
            min={3}
            max={30}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            defaultValue={title}
            required
          />
        </div>

        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Content
          </label>
          <textarea
            id="content"
            name="content"
            rows={12}
            defaultValue={content}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div className="flex justify-end space-x-3">
          {/* <Link href="/posts">Cancel</Link> */}
          {children}
          <FormButton>{btnText} </FormButton>
        </div>
      </form>
    </>
  );
}

export default PostForm;
