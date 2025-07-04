import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";

export function useLogin() {
  // In your login page
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
        }); // Note: singular "posts"

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

      // // Store token in cookies (if using cookie-based auth)
      // cookies().set("token", data.token, {
      //   httpOnly: true,
      //   secure: process.env.NODE_ENV === "production",
      //   maxAge: 60 * 60 * 24 * 7, // 1 week
      //   path: "/",
      // });

      // Show success message
      toast.success("Logged in successfully!");

      // Redirect to dashboard
      router.push(redirectTo);
    },
    onError: (error) => {
      console.error("Login error:", error);

      // Show appropriate error message
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Provided email or password are incorrect";

      toast.error(errorMessage);
    },
    // Optional: Reset mutation state after 3 seconds
    retry: false,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  return { login, isLoading };
}
