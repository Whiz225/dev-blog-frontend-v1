"use client";
import { useFormStatus } from "react-dom";

import SpinnerMini from "./SpinnerMini";

const sizeClasses = {
  small: "text-[1.2rem] p-[0.4rem_0.8rem] uppercase font-semibold text-center",
  medium: "text-sm px-4 py-3 font-medium",
  large: "text-base px-6 py-3 font-medium",
};

const variantClasses = {
  primary: "text-brand-50 bg-brand-600 hover:bg-brand-700",
  secondary: "text-gray-600 bg-white border border-gray-200 hover:bg-gray-50",
  danger: "text-red-100 bg-red-700 hover:bg-red-800",
};

export default function FormButton({
  children,
  pendingLabel,
  size = "medium",
  variation = "primary",
}) {
  const { pending } = useFormStatus();

  const baseClasses =
    "border-none rounded-sm shadow-sm disabled:opacity-75 disabled:cursor-not-allowed transition-colors";

  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variation]}`}
      disabled={pending}
    >
      {!pending ? children : <SpinnerMini />}
    </button>
  );
}
