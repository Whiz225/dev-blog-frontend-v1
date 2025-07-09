import { useRouter, useSearchParams } from "next/navigation";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

export function useLogin() {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("from") || "/posts";
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate: login, isPending: isLoading } = useMutation({
    mutationFn: async ({ username, password }) => {
      // try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      // const response = await fetch("/api/auth/login", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     username,
      //     password,
      //   }),
      // });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Login failed. Please try again.");
      }

      const data = await response.json();

      if (data.status !== "success") {
        throw new Error(data.message || "Login failed");
      }

      return data.data.user;
      // } catch (error) {
      //   console.error("User login error:", error);
      //   throw error; // Re-throw to trigger onError
      // }
    },

    onSuccess: (data) => {
      if (!data) return;

      queryClient.setQueryData(["user"], data.username);
      // Show success message
      toast.success("Logged in successfully!");
      // Redirect to dashboard
      router.push(redirectTo);
    },
    onError: (error) => {
      toast.error(error.message);

      // toast.error(
      //   process.env.NODE_ENV === "development" ||
      //     error.message ===
      //       "No response from server. Please check your connection."
      //     ? error.message
      //     : "Invalid credentials. Please try again."
      // );

      // if (process.env.NODE_ENV === "development") {
      //   console.error("Login Error:", error);
      // }
    },
    // Reset mutation state after 3 seconds
    retry: false,
    // onSettled: () => {
    //   queryClient.invalidateQueries({ queryKey: ["user"] });
    // },
  });

  return { login, isLoading };
}
