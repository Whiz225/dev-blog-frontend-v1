"use client";

// import {useDarkMode} from "@/contexts/DarkModeContext"

function Logo() {
  // const { isDarkMode } = useDarkMode();
  // const src = isDarkMode ? "/logo-dark.png" : "/logo-light.png";

  return (
    <div className="text-center">
      <img src="/logo-dark.png" alt="Logo" className="h-24 w-auto" />
    </div>
  );
}

export default Logo;
