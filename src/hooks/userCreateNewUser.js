import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";

export function useCreateNewUser() {
  // const searchParams = useSearchParams();
  // const redirectTo = searchParams.get("from") || "/posts";
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate: createUser, isPending: isLoading } = useMutation({
    mutationFn: async ({ username, password, email }) => {
      try {
        const response = await fetch("/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
            email,
          }),
        }); // Note: singular "posts"

        if (!response.ok) {
          let errorData;
          try {
            errorData = await response.json();
          } catch (e) {
            errorData = { error: await response.text() };
          }
          throw new Error(errorData.error || "Failed to create user");
        }

        const data = await response.json();

        if (data.status !== "success") {
          throw new Error(data.message || "Failed to create user");
        }

        return data.data.user;
      } catch (error) {
        console.error("Create user error:", error);
        throw error; // Re-throw to trigger onError
      }
    },

    onSuccess: (data) => {
      if (!data) return;

      queryClient.setQueryData(["user"], data.username);

      // Show success message
      toast.success(`Welcome ${data.username} !`);

      // Redirect to myPosts
      router.push("/posts");
    },
    onError: (error) => {
      // console.error("Create user error:", error);

      // Show appropriate error message
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Provide correct email, username or password are incorrect";

      toast.error(errorMessage);
    },
    // Optional: Reset mutation state after 3 seconds
    retry: false,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
  return { createUser, isLoading };
}
