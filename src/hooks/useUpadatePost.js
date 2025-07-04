"use client";

import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function usePost(post) {
  return useQuery({
    queryKey: ["post", post.id],
    queryFn: async () => {
      try {
        const res = await fetch(`/api/posts/${post.id}`); // Note: singular "posts"
        const data = await res.json();

        console.log(data);
        if (data.status !== "success")
          //  {
          // Try to get error message from response
          // let errorData;
          // try {
          //   errorData = await res.json();
          // } catch (e) {
          //   errorData = { error: await res.text() };
          // }
          throw new Error(
            `HTTP error! status: ${res.status}`
            // errorData.error || `HTTP error! status: ${res.status}`
          );
        // }

        return data.data.data;
      } catch (error) {
        console.error("Fetch error:", error);
        throw error; // Re-throw to trigger onError
      }
    },
    // onSuccess: (data) => {
    //   toast.success(`Loaded ${data.length} posts successfully!`);
    // },
    onError: (error) => {
      console.error("Posts fetch error:", error);
      toast.error(error.message || "Failed to load posts");
    },
  });
}
