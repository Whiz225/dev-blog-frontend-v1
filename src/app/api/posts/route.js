import { getAllPosts } from "@/lib/actions";

export async function GET() {
  try {
    const data = await getAllPosts();
    return Response.json(data);
  } catch (error) {
    // console.error("AllPostAPI Error:", {
    //   message: error.message,
    //   statusCode: error.statusCode || 500,
    //   data: error.data,
    // });

    return Response.json(
      {
        error: error.message,
        details: error.data,
      },
      {
        status: error.statusCode || 500,
      }
    );
  }
}
