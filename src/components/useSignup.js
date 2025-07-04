import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import { toast } from "react-hot-toast";

export function useSignup() {
  function errString(err) {
    const errorMsg = err.response.data.message;
    const match = errorMsg.match(/dup key: { email: "(.*?)" }/);
    const name = match ? match[1] : null;

    // console.log(name); // 👉 "copy of 002"
    return name;
  }

  const { mutate: signup, isLoading } = useMutation({
    mutationFn: signupApi,
    onSuccess: (user) => {
      toast.success(
        "Account successfully created! Please verufy the new account from the user's email address."
      );
    },

    onError: (err) => {
      const error = err.response.data.message.includes("duplicate key")
        ? `Duplicate key Email: "${errString(err)}" `
        : err.response.data.message;
      // console.log(err);
      toast.error(error);
    },
  });

  return { signup, isLoading };
}
