import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";

export function useCreateNewUser() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate: createUser, isPending: isLoading } = useMutation({
    mutationFn: async ({ username, password, email }) => {
      // try {
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
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.error || "Registration failed. Please try again."
        );
      }

      const data = await response.json();

      if (data.status !== "success") {
        throw new Error(
          data.message || "Registration failed. Please try again."
        );
      }

      return data.data.user;
      // } catch (error) {
      //   console.error("Create user error:", error);
      //   throw error; // Re-throw to trigger onError
      // }
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
      toast.error(
        process.env.NODE_ENV !== "development"
          ? error.message
          : "Registration failed. Please check your details and try again."
      );

      if (process.env.NODE_ENV !== "development") {
        console.error("Registration Error:", error);
      }
    },
    // Optional: Reset mutation state after 3 seconds
    retry: false,
    // onSettled: () => {
    //   queryClient.invalidateQueries({ queryKey: ["user"] });
    // },
  });
  return { createUser, isLoading };
}
