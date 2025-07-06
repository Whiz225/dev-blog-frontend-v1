"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import Button from "@/components/Button";
import Logo from "./Logo";

export default function Navbar({ user }) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-sm sm:fixed sm:w-full sm:top-0 sm:z-50">
      <div className="max-w-7xl mx-auto px-4 py-5 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl font-bold text-gray-900">
                <div className="flex gap-2 justify-center items-center relative">
                  <div className="relative">
                    <Logo />
                    <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold">
                      DevBlog
                    </span>
                  </div>
                </div>
                {/* <Logo />
                <span>DevBlog</span> */}
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="/posts"
                className={`${
                  pathname === "/posts"
                    ? "border-blue-500 text-gray-900"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
              >
                Posts
              </Link>
              <Link
                href="/create"
                className={`${
                  pathname === "/create"
                    ? "border-blue-500 text-gray-900"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
              >
                Create Post
              </Link>
            </div>
          </div>

          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {user ? (
              <div className="ml-3 relative">
                <div className="flex space-x-4 items-center">
                  <span className="text-gray-700 text-sm font-medium">
                    Hello, {user}
                  </span>
                  <Button logout={true}>Logout</Button>
                </div>
              </div>
            ) : (
              <div className="flex space-x-4">
                <Link
                  href="/login"
                  className={`${
                    pathname === "/login"
                      ? "text-gray-900"
                      : "text-gray-500 hover:text-gray-700"
                  } px-3 py-2 rounded-md text-sm font-medium`}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className={`${
                    pathname === "/register"
                      ? "text-gray-900"
                      : "text-gray-500 hover:text-gray-700"
                  } px-3 py-2 rounded-md text-sm font-medium`}
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="-mr-1 px-4 bg-brand-200 flex items-center sm:hidden">
            <Button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon when menu is closed */}
              <svg
                className={`${isMenuOpen ? "hidden" : "block"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              {/* Icon when menu is open */}
              <svg
                className={`${isMenuOpen ? "block" : "hidden"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu - show/hide based on menu state */}
      <div
        className={`sm:hidden ${isMenuOpen ? "block" : "hidden"}`}
        id="mobile-menu"
      >
        <div className="pt-2 pb-3 space-y-1">
          <Link
            href="/posts"
            onClick={() => setIsMenuOpen(false)}
            className={`${
              pathname === "/posts"
                ? "bg-blue-50 border-blue-500 text-blue-700"
                : "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
            } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
          >
            Posts
          </Link>
          {user && (
            <Link
              href="/create"
              onClick={() => setIsMenuOpen(false)}
              className={`${
                pathname === "/create"
                  ? "bg-blue-50 border-blue-500 text-blue-700"
                  : "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
              } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
            >
              Create Post
            </Link>
          )}
        </div>
        <div className="pt-4 pb-3 border-t border-gray-200">
          {user ? (
            <>
              <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                  <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-gray-500">
                    <span className="text-sm font-medium leading-none text-white">
                      {user.charAt(0).toUpperCase()}
                    </span>
                  </span>
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">
                    {user}
                  </div>
                </div>
              </div>
              <div className="mt-3 space-y-1">
                <Button
                  onClick={() => setIsMenuOpen(false)}
                  logout={true}
                  className="block w-full text-left px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                >
                  Logout
                </Button>
              </div>
            </>
          ) : (
            <div className="mt-3 space-y-1">
              <Link
                href="/login"
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
              >
                Login
              </Link>
              <Link
                href="/register"
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
