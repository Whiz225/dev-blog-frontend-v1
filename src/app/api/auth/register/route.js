import { registerUser } from "@/lib/actions";

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

    return response;
  } catch (error) {
    // Development logging
    if (process.env.NODE_ENV !== "development") {
      console.error("Registration Error:", {
        message: error.message,
        stack: error.stack,
      });
    }

    // Production-safe response
    return Response.json(
      {
        error: "Registration failed",
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
