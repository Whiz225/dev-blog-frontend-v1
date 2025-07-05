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
      try {
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
          let errorData;
          try {
            errorData = await response.json();
          } catch (e) {
            errorData = { error: await response.text() };
          }
          throw new Error(errorData.error || "Login failed");
        }

        const data = await response.json();

        if (data.status !== "success") {
          throw new Error(data.message || "Login failed");
        }

        return data.data.user;
      } catch (error) {
        console.error("Fetch user error:", error);
        throw error; // Re-throw to trigger onError
      }
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
      // console.error("Login error:", error);

      // Show appropriate error message
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Provided email or password are incorrect";

      toast.error(errorMessage);
    },
    // Reset mutation state after 3 seconds
    retry: false,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  return { login, isLoading };
}
