"use client";

import { useQuery } from "@tanstack/react-query";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";

export function useMyPosts() {
  return useQuery({
    queryKey: ["myPosts"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/posts/author");

        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          throw new Error(errorData.message || "Failed to fetch posts");
        }

        const data = await res.json();
        if (data.status !== "success")
          throw new Error(
            `HTTP error! status: ${res.status}`
            // errorData.error || `HTTP error! status: ${res.status}`
          );
        // }

        return data.data.posts;
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
      redirect("/login");
    },
  });
}
