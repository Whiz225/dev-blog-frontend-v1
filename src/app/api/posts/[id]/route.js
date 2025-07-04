import { getPost } from "@/lib/actions";

export async function GET(request) {
  console.log(request.query);
    try {

      // 1. Parse the request body

      if (!request.query) {
        return Response.json(
          { error: "Please put the current post ID" },
          { status: 400 }
        );
      }

      const data = await getPost(request.query);

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
