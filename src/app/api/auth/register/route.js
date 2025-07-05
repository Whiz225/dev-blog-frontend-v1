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
    // console.error("Api Registration Error:", {
    //   message: error.message,
    //   statusCode: error.statusCode || 500,
    // });

    return Response.json(
      {
        error: error.message || "Registration failed",
        ...(error.data && { details: error.data }),
      },
      {
        status: error.statusCode || 500,
      }
    );
  }
}
