import { loginUser } from "@/lib/actions";
import { cookies } from "next/headers";

export async function POST(request) {
  try {
    // 1. Parse the request body
    const { username, password } = await request.json();

    // 2. Validate required fields
    if (!username || !password) {
      return Response.json(
        { error: "Username and password are required" },
        { status: 400 }
      );
    }

    // 3. Call the login function
    const data = await loginUser({ username, password });

    // 4. Set HTTP-only cookie for authentication
    const response = Response.json(data, { status: 200 });

    const cookieStore = await cookies();

    cookieStore.set({
      name: "token",
      value: data.data.token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
      sameSite: "strict",
    });

    return response;
  } catch (error) {
    // console.error("Login API Error:", {
    //   message: error.message,
    //   statusCode: error.statusCode || 500,
    // });

    return Response.json(
      {
        error: error.message || "Authentication failed",
        ...(error.data && { details: error.data }),
      },
      {
        status: error.statusCode || 500,
      }
    );
  }
}
