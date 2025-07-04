// "use client";

import Link from "next/link";
import Navigation from "./Navigation";
import Button from "./Button";
import Logo from "./Logo";
// import { headers } from "next/headers";

export default async function Header({ user }) {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex gap-2 justify-center items-center">
          <Link href="/" className="text-2xl font-bold text-indigo-600">
            <Logo />
            <span>DevBlog</span>
          </Link>
        </div>
        <Navigation />

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
                Manage Post
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
