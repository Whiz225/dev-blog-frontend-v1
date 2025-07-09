import { cookies } from "next/headers";

import api from "@/lib/api";

export async function getAllPosts() {
  const res = await api.get(`/posts/allPosts`);

  if (res.data.status !== "success") {
    const error = res.data.response?.message;

    if (process.env.NODE_ENV === "development") {
      console.error("Unable to load Posts", {
        message: error.message,
        stack: error.stack,
        response: error.response?.data,
      });
    }

    throw new Error(
      process.env.NODE_ENV === "development" ||
      error.message === "No response from server. Please check your connection."
        ? error.message
        : "Unable to load Posts. Please try again."
    );
  }

  return res.data;
}

export async function getMyPosts() {
  const cookieStore = await cookies();
  const jwt = cookieStore.get("token");

  const res = await api.get(`/posts/author`, {
    credentials: "include",
    headers: {
      Cookie: `jwt=${jwt?.value}`,
      "Content-Type": "application/json",
    },
  });

  if (res.data.status !== "success") {
    const error = res.data.response?.message;

    if (process.env.NODE_ENV === "development") {
      console.error("Unable to load Posts", {
        message: error.message,
        stack: error.stack,
        response: error.response?.data,
      });
    }

    throw new Error(
      process.env.NODE_ENV === "development" ||
      error.message === "No response from server. Please check your connection."
        ? error.message
        : "Unable to load Posts. Please try again."
    );
  }

  return res.data;
}

export async function getPost(id) {
  //   try {
  const cookieStore = await cookies();
  const jwt = cookieStore.get("token");

  const res = await api.get(`/posts/allPosts/${id}`, {
    credentials: "include",
    headers: {
      Cookie: `jwt=${jwt?.value}`,
      "Content-Type": "application/json",
    },
  });

  if (res.data.status !== "success") {
    const error = res.data.response?.message;

    if (process.env.NODE_ENV === "development") {
      console.error("Unable to load Post", {
        message: error.message,
        stack: error.stack,
        response: error.response?.data,
      });
    }

    throw new Error(
      process.env.NODE_ENV === "development" ||
      error.message === "No response from server. Please check your connection."
        ? error.message
        : "Unable to load Post. Please try again."
    );
  }

  return res.data;
}

export async function createNewPost(formData) {
  const content = formData.get("content");
  const title = formData.get("title");
  const category = formData.get("category");

  if (!content || !title) throw new Error("content and title are required");

  if (title.length < 3) throw new Error("title must be at least 3 characters");

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

  if (res.data.status !== "success") {
    const error = res.data.response?.message;

    if (process.env.NODE_ENV === "development") {
      console.error("Unable to create Post", {
        message: error.message,
        stack: error.stack,
        response: error.response?.data,
      });
    }

    throw new Error(
      process.env.NODE_ENV === "development" ||
      error.message === "No response from server. Please check your connection."
        ? error.message
        : "Unable to create Post. Please try again."
    );
  }

  return res.data;
}

export async function updatePost(formData) {
  const id = formData.get("postId");
  const content = formData.get("content");
  const title = formData.get("title");
  const category = formData.get("category");

  if (!content || !title || !id)
    throw new Error("content and title are required");

  if (title.length < 3) throw new Error("title must be at least 3 characters");

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
    const error = res.data.response?.message;

    if (process.env.NODE_ENV === "development") {
      console.error("Unable to update Post", {
        message: error.message,
        stack: error.stack,
        response: error.response?.data,
      });
    }

    throw new Error(
      process.env.NODE_ENV === "development" ||
      error.message === "No response from server. Please check your connection."
        ? error.message
        : "Unable to update Post. Please try again."
    );
  }

  return res.data;
}
