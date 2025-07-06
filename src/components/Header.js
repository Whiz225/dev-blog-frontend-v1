// src/components/Header.js
import Link from "next/link";
import Navigation from "./Navigation";
import Button from "./Button";
import Logo from "./Logo";

export default async function Header({ user }) {
  return (
    <header className="bg-white shadow-sm sm:fixed sm:w-full sm:top-0 sm:z-50">
      <div className="container mx-auto px-4 py-3.2 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-indigo-600">
          <div className="flex gap-2 justify-center items-center relative">
            <div className="relative">
              <Logo />
              <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold">
                DevBlog
              </span>
            </div>
          </div>
        </Link>

        <div className="flex items-center space-x-4">
          {!user ? (
            <>
              <Link
                href="/login"
                className="text-gray-600 hover:text-indigo-600"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/posts"
                className="block w-full text-left px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
              >
                Manage MyPosts
              </Link>
              <Button
                logout={true}
                className="block w-full text-left px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
              >
                Logout
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
