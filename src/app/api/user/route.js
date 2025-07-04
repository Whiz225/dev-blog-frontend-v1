import { getCurrentUser } from "@/lib/actions";

export async function GET() {
  try {
    const data = await getCurrentUser();
    return Response.json(data);
  } catch (error) {
    console.error("UserAPI Error:", {
      message: error.message,
      statusCode: error.statusCode || 500,
      data: error.data,
    });

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
