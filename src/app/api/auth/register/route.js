import { registerUser } from "@/lib/actions";
import { cookies } from "next/headers";

export async function POST(request) {
  try {
    const { username, email, password } = await request.json();

    // Basic validation
    if (!username || !email || !password) {
      return Response.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json({ error: "Invalid email format" }, { status: 400 });
    }

    // Validate password strength
    if (password.length < 8) {
      return Response.json(
        { error: "Password must be at least 8 characters" },
        { status: 400 }
      );
    }

    const data = await registerUser({ username, email, password });

    const response = Response.json(data, { status: 201 });

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

    if (data.token) {
      // Add user info to request headers
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set("x-user-id", data.data.user.id);
      requestHeaders.set("x-user-username", data.data.user.username);

      revalidatePath("/");
    }

    return response;
  } catch (error) {
    // Development logging
    if (process.env.NODE_ENV === "development") {
      console.error("Registration Error:", {
        message: error.message,
        stack: error.stack,
      });
    }

    // Production-safe response
    return Response.json(
      {
        error:
          error.message === "Username already exist" ||
          error.message === "Email is already in use by another user" ||
          error.message ===
            "No response from server. Please check your connection."
            ? error.message
            : "Registration failed. Please check your details and try again.",
        ...(process.env.NODE_ENV === "development" && {
          details: error.message,
        }),
      },
      {
        status: error.statusCode || 500,
      }
    );
  }
}
