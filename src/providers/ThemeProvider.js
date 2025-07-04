// src/providers/ThemeProvider.jsx
"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";

export function ThemeProvider({ children }) {
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    // Initialize theme
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
  }, [setTheme]);

  return <>{children}</>;
}
