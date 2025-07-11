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

    const response = Response.json(data, { status: 200 });

    // 4. Set HTTP-only cookie for authentication
    const cookieStore = await cookies();

    cookieStore.set({
      name: "token",
      value: data.token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 1, // 1 day
      path: "/",
      sameSite: "strict",
    });

    return response;
  } catch (error) {
    // Development logging
    if (process.env.NODE_ENV !== "development") {
      console.error("Login Error:", {
        message: error.message,
        stack: error.stack,
      });
    }

    // Production-safe response
    return Response.json(
      {
        error:
          error.message === "Incorrect username or password" ||
          error.message ===
            "No response from server. Please check your connection."
            ? error.message
            : "Log in failed: Please Try again",
        // error: "Log in failed: Please Try again",
        ...(process.env.NODE_ENV !== "development" && {
          details: error.message,
        }),
      },
      {
        status: error.statusCode || 500,
      }
    );
  }
}
