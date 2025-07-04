import { createNewPost } from "@/lib/actions";

export async function POST(request) {
  try {
    // 1. Parse the request body
    const { content, title } = await request.json();

    // 2. Validate required fields
    if (!content || !title) {
      return Response.json(
        { error: "content and title are required" },
        { status: 400 }
      );
    }

    if (title.length < 3) {
      return Response.json(
        { error: "title must be at least 3 characters" },
        { status: 400 }
      );
    }

    if (content.length < 10) {
      return Response.json(
        { error: "content must be at least 10 characters" },
        { status: 400 }
      );
    }

    const data = await createNewPost({ content, title });

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
