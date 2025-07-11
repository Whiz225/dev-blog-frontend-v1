"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { deletePost, userLogout } from "@/lib/actions";

const sizeClasses = {
  large: "text-[1.2rem] p-[0.4rem_0.8rem] uppercase font-semibold text-center",
  medium: "text-sm px-4 py-3 font-medium",
  small: "text-[1.2rem] px-6 py-3 font-medium",
};

const variantClasses = {
  primary: "text-brand-50 bg-brand-600 hover:bg-brand-700",
  secondary:
    "text-gray-600 bg-brand-200 border border-gray-200 hover:bg-gray-300",
  danger: "text-red-100 bg-red-700 hover:bg-red-800",
};

export default function Button({
  children,
  back,
  logout,
  id,
  path,
  isLoading,
  pendingLabel,
  size = "medium",
  variation = "primary",
  onClick,
}) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await userLogout();

      if (res.status === "success") {
        router.push("/login");
        router.refresh();
      } // Refresh the page to update auth state
    } catch (err) {
      console.error("Logout failed:", err);
      toast.error("Logout failed:", err);
    }
  };

  async function handleDelete(id) {
    try {
      const ok = confirm("Do you really want to delete this post?");
      if (ok) {
        await deletePost(id);

        toast.success("Successfully Deleted!");
        if (path) router.push(path);
      }
    } catch (err) {
      console.error("Failed to delete:", err);
      toast.error("Failed to delete:", err);
    }
  }

  const baseClasses =
    "border-none rounded-sm shadow-sm disabled:opacity-75 disabled:cursor-not-allowed transition-colors";

  if (logout || back)
    return (
      <button
        className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variation]}`}
        // disabled={isLoading}
        onClick={() => (logout ? handleLogout() : router.back())}
      >
        {children}
      </button>
    );

  if (id || onClick)
    return (
      <button
        className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variation]}`}
        // disabled={isLoading}
        onClick={() =>
          id
            ? handleDelete(id)
            : typeof onClick === "String"
            ? router.push(onClick)
            : onClick()
        }
      >
        {children}
      </button>
    );

  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variation]}`}
      disabled={isLoading}
    >
      {children}
    </button>
  );
}
