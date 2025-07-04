"use client";

import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function usePosts() {
  return useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/posts"); // Note: singular "posts"

        if (!res.ok) {
          // Try to get error message from response
          let errorData;
          try {
            errorData = await res.json();
          } catch (e) {
            errorData = { error: await res.text() };
          }
          throw new Error(
            // `HTTP error! status: ${res.status}`
            errorData.error || `HTTP error! status: ${res.status}`
          );
        }
        const data = await res.json();

        if (data.status !== "success") {
          throw new Error(data.message || "Failed to fetch");
        }

        return data.data.data;
      } catch (error) {
        console.error("Fetch error:", error);
        throw error; // Re-throw to trigger onError
      }
    },
    onSuccess: (data) => {
      toast.success(`Loaded ${data.length} posts successfully!`);
    },
    onError: (error) => {
      console.error("Posts fetch error:", error);
      toast.error(error.message || "Failed to load posts");
    },
  });
}
/*
"use client";

import { getAllPosts } from "@/lib/actions";
import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function usePosts() {
  const {
    isLoading,
    data: posts,
    error,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      console.log("usePost");
      const res = await api.get("/posts");
      if (!res.ok) throw new Error("Failed to fetch posts");
      return res.json();
    },
    onSuccess: () => {
      toast.success("Logged in successfully!");
    },

    onError: (error) => {
      console.log("Login error", error.message);
      toast.error(error.message);
    },
  });

  console.log(posts);

  return { isLoading, posts, error };
}
*/
