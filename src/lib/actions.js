"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

import api from "@/lib/api";

export async function loginUser({ username, password }) {
  const res = await api.post(`/auth/login`, { username, password });

  if (res.data.status !== "success") {
    throw new Error(res.data.response?.message || "Invalid credentials");
  }

  return res.data;
}

export async function registerUser({ email, username, password }) {
  // Make API request
  const res = await api.post("/auth/register", {
    email,
    username,
    password,
  });

  // Handle API response
  if (res.data?.status !== "success") {
    throw new Error(
      res.data?.message || res.data?.response?.message || "Registration failed"
    );
  }

  return res.data;
}

export async function deletePost(id) {
  const cookieStore = await cookies();
  const jwt = cookieStore.get("token");

  const res = await api.delete(`/posts/author/${id}`, {
    credentials: "include",
    headers: {
      Cookie: `jwt=${jwt?.value}`,
      "Content-Type": "application/json",
    },
  });

  if (res.data.length >= 1) {
    const error = res.data.response?.message;

    if (process.env.NODE_ENV === "development") {
      console.error("Unable to delete Post", {
        message: error.message,
        stack: error.stack,
        response: error.response?.data,
      });
    }

    throw new Error(
      process.env.NODE_ENV === "development" ||
      error.message === "No response from server. Please check your connection."
        ? error.message
        : "Unable to delete Post. Please try again."
    );
  }

  revalidatePath("/posts");

  return null;
}

export async function userLogout() {
  const res = await api.get("/auth/logout", {
    credentials: "include",
    headers: {
      Cookie: `jwt=Logged-out`,
      "Content-Type": "application/json",
    },
  });

  if (res.data.status !== "success") {
    const error = res.data.response?.message;

    if (process.env.NODE_ENV === "development") {
      console.error("Logging out failed", {
        message: error.message,
        stack: error.stack,
        response: error.response?.data,
      });
    }

    throw new Error(
      process.env.NODE_ENV === "development" ||
      error.message === "No response from server. Please check your connection."
        ? error.message
        : "Logging out failed. Please try again."
    );
  }

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

  cookieStore.set("username", "", {
    httpOnly: false,
    maxAge: 0,
    path: "/",
  });

  cookieStore.set("userId", "", {
    httpOnly: false,
    maxAge: 0,
    path: "/",
  });

  revalidatePath("/posts");

  return { status: "success" };
}
