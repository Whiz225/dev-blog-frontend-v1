"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

import api from "@/lib/api";

export async function loginUser({ username, password }) {
  try {
    const res = await api.post(`/auth/login`, { username, password });

    if (res.data.status !== "success") {
      throw new Error(res.data.response?.message || "Invalid credentials");
    }

    // return {
    //   status: "success",
    //   data: {
    //     user: {
    //       id: res.data.data.user.id,
    //       username: res.data.data.user.username,
    //       role: res.data.data.user.role,
    //     },
    //     token: res.data.token,
    //   },
    // };

    return res.data;
  } catch (error) {
    if (process.env.NODE_ENV !== "development") {
      console.error("Login Action Error:", {
        message: error.message,
        stack: error.stack,
        response: error.response?.data,
      });
    }

    throw new Error(
      process.env.NODE_ENV !== "development"
        ? error.message
        : "Login failed. Please try again."
    );
  }
}

export async function registerUser({ email, username, password }) {
  try {
    // Make API request
    const res = await api.post("/auth/register", {
      email,
      username,
      password,
    });

    // Handle API response
    if (res.data?.status !== "success") {
      throw new Error(
        res.data?.message ||
          res.data?.response?.message ||
          "Registration failed"
      );
    }

    // Return data (though redirect will prevent this from being reached)
    return res.data;
  } catch (error) {
    if (process.env.NODE_ENV !== "development") {
      console.error("Registration Error:", {
        message: error.message,
        stack: error.stack,
        response: error.response?.data,
      });
    }

    throw new Error(
      process.env.NODE_ENV !== "development"
        ? error.message
        : "Registration Error. Please try again."
    );
  }
}

export async function getAllPosts() {
  try {
    const res = await api.get(`/posts/allPosts`);

    if (res.data.status !== "success")
      throw new Error(res.data.response?.message || "Unable to load Posts");

    return res.data;
  } catch (error) {
    // const message =
    //   error.response?.data?.message || error.message || "Unable to load Posts";
    // throw new Error(message);

    if (process.env.NODE_ENV !== "development") {
      console.error("Unable to load Posts", {
        message: error.message,
        stack: error.stack,
        response: error.response?.data,
      });
    }

    throw new Error(
      process.env.NODE_ENV !== "development"
        ? error.message
        : "Unable to load Posts. Please try again."
    );
  }
}

export async function getMyPosts() {
  try {
    const cookieStore = await cookies();
    const jwt = cookieStore.get("token");

    const res = await api.get(`/posts/author`, {
      credentials: "include",
      headers: {
        Cookie: `jwt=${jwt?.value}`,
        "Content-Type": "application/json",
      },
    });

    if (res.data.status !== "success")
      throw new Error(res.data.response?.message || "Unable to load Posts");

    return res.data;
  } catch (error) {
    // const message =
    //   error.response?.data?.message || error.message || "Unable to load Posts";
    // throw new Error(message);

    if (process.env.NODE_ENV !== "development") {
      console.error("Unable to load Posts", {
        message: error.message,
        stack: error.stack,
        response: error.response?.data,
      });
    }

    throw new Error(
      process.env.NODE_ENV !== "development"
        ? error.message
        : "Unable to load Posts. Please try again."
    );
  }
}

export async function getPost(id) {
  try {
    const cookieStore = await cookies();
    const jwt = cookieStore.get("token");

    const res = await api.get(`/posts/allPosts/${id}`, {
      credentials: "include",
      headers: {
        Cookie: `jwt=${jwt?.value}`,
        "Content-Type": "application/json",
      },
    });

    if (res.data.status !== "success")
      throw new Error(res.data.response?.message || "Unable to load Post");

    return res.data;
  } catch (error) {
    // const message =
    //   error.response?.data?.message || error.message || "Unable to load Post";
    // throw new Error(message);

    if (process.env.NODE_ENV !== "development") {
      console.error("Unable to load Post", {
        message: error.message,
        stack: error.stack,
        response: error.response?.data,
      });
    }

    throw new Error(
      process.env.NODE_ENV !== "development"
        ? error.message
        : "Unable to load Post. Please try again."
    );
  }
}

export async function createNewPost(formData) {
  try {
    const content = formData.get("content");
    const title = formData.get("title");
    const category = formData.get("category");

    if (!content || !title) throw new Error("content and title are required");

    if (title.length < 3)
      throw new Error("title must be at least 3 characters");

    const cookieStore = await cookies();
    const jwt = cookieStore.get("token");

    const res = await api.post(
      `/posts/author`,
      { content, title, category },
      {
        credentials: "include",
        headers: {
          Cookie: `jwt=${jwt?.value}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (res.data.status !== "success")
      throw new Error(res.data.response?.message || "Unable to create Posts");

    return res.data;
  } catch (error) {
    // const message =
    //   error.response?.data?.message ||
    //   error.message ||
    //   "Unable to create Posts";
    // throw new Error(message);

    if (process.env.NODE_ENV !== "development") {
      console.error("Unable to create Post", {
        message: error.message,
        stack: error.stack,
        response: error.response?.data,
      });
    }

    throw new Error(
      process.env.NODE_ENV !== "development"
        ? error.message
        : "Unable to create Post. Please try again."
    );
  }
}

export async function updatePost(formData) {
  try {
    const id = formData.get("postId");
    const content = formData.get("content");
    const title = formData.get("title");
    const category = formData.get("category");

    if (!content || !title || !id)
      throw new Error("content and title are required");

    if (title.length < 3)
      throw new Error("title must be at least 3 characters");

    const cookieStore = await cookies();
    const jwt = cookieStore.get("token");

    const res = await api.patch(
      `/posts/author/${id}`,
      { content, title, category },
      {
        credentials: "include",
        headers: {
          Cookie: `jwt=${jwt?.value}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (res.data.status !== "success") {
      throw new Error(res.data.response?.message || "Unable to update Posts");
    }

    revalidatePath(`/posts/edit/${id}`);
    revalidatePath("/posts");

    return res.data;
  } catch (error) {
    // const message =
    //   error.response?.data?.message ||
    //   error.message ||
    //   "Unable to update Posts";
    // throw new Error(message);

    if (process.env.NODE_ENV !== "development") {
      console.error("Unable to update Post", {
        message: error.message,
        stack: error.stack,
        response: error.response?.data,
      });
    }

    throw new Error(
      process.env.NODE_ENV !== "development"
        ? error.message
        : "Unable to update Post. Please try again."
    );
  }
}

export async function getCurrentUser() {
  try {
    const cookieStore = await cookies();
    const jwt = cookieStore.get("token");

    const res = await api.get("/user/me", {
      credentials: "include",
      headers: {
        Cookie: `jwt=${jwt?.value}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.data) {
      throw new Error("No data received from server");
    }

    return res.data;
  } catch (error) {
    // // Preserve the original error response
    // const backendError = {
    //   message: error.response?.data?.message || error.message,
    //   statusCode: error.response?.status || 500,
    //   // data: error.response?.data
    // };

    // // Create a new error with all the details
    // const err = new Error(backendError.message);
    // err.statusCode = backendError.statusCode;
    // // err.data = backendError.data;

    // throw err;

    if (process.env.NODE_ENV !== "development") {
      console.error("Unable to fetch current user", {
        message: error.message,
        stack: error.stack,
        response: error.response?.data,
      });
    }

    throw new Error(
      process.env.NODE_ENV !== "development"
        ? error.message
        : "Unable to fetch current user. Please try again."
    );
  }
}

export async function deletePost(id) {
  try {
    const cookieStore = await cookies();
    const jwt = cookieStore.get("token");

    const res = await api.delete(`/posts/author/${id}`, {
      credentials: "include",
      headers: {
        Cookie: `jwt=${jwt?.value}`,
        "Content-Type": "application/json",
      },
    });

    if (res.data.length >= 1)
      throw new Error(res.data.response?.message || "Unable to delete Post");

    revalidatePath("/posts");

    return null;
  } catch (error) {
    // const message =
    //   error.response?.data?.message || error.message || "Unable to delete Post";
    // throw new Error(message);

    if (process.env.NODE_ENV !== "development") {
      console.error("Unable to delete Post", {
        message: error.message,
        stack: error.stack,
        response: error.response?.data,
      });
    }

    throw new Error(
      process.env.NODE_ENV !== "development"
        ? error.message
        : "Unable to delete Post. Please try again."
    );
  }
}

export async function userLogout() {
  try {
    const res = await api.get("/auth/logout", {
      credentials: "include",
      headers: {
        Cookie: `jwt=Logged-out`,
        "Content-Type": "application/json",
      },
    });

    if (res.data.status !== "success")
      throw new Error(
        res.data.response?.message || "Logout failed! Please try again"
      );

    const cookieStore = await cookies();

    cookieStore.set({
      name: "token",
      value: "Logged out",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
      sameSite: "strict",
    });

    revalidatePath("/posts");

    return { status: "success" };
  } catch (error) {
    // const message =
    //   error.response?.data?.message || error.message || "Unable to delete Post";
    // throw new Error(message);

    if (process.env.NODE_ENV !== "development") {
      console.error("Logging out failed", {
        message: error.message,
        stack: error.stack,
        response: error.response?.data,
      });
    }

    throw new Error(
      process.env.NODE_ENV !== "development"
        ? error.message
        : "Logging out failed. Please try again."
    );
  }
}
