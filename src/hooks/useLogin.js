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

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Login failed. Please try again.");
      }

      const data = await response.json();

      if (data.status !== "success") {
        throw new Error(data.message || "Login failed");
      }

      return data.data.user;
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
    },
    retry: false,
  });

  return { login, isLoading };
}
