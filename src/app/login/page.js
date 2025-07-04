import LoginForm from "@/components/LoginForm";
import Logo from "@/components/Logo";
import Heading from "@/components/Heading";
// import { Suspense } from "react";
// import Spinner from "@/components/Spinner";

export const metadata = {
  title: "Login",
};

export default function LoginPage() {
  return (
    <main className="min-h-screen grid grid-cols-1 place-content-center justify-items-center gap-8 bg-gray-50 p-4">
      <Logo />
      <Heading as="h4">Log in to your account</Heading>
      {/* <Suspense fallback={<Spinner />}> */}
      <LoginForm />
      {/* </Suspense> */}
    </main>
  );
}

// export default page;

/////////////////////////////////////////////////////////
/*
// pages/login.js
// import { useState } from "react";
// import { useRouter } from "next/router";
import Link from "next/link";
// import { useAuth } from "@/contexts/AuthContext";
import { login } from "@/lib/actions";

export default function Login() {
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  // const [error, setError] = useState("");
  // const [isLoading, setIsLoading] = useState(false);
  // const { login } = useAuth();
  // const router = useRouter();

  // async function handleSubmit(e) {
  //   e.preventDefault();
  //   setError("");
  //   setIsLoading(true);

  //   try {
  //     await login(username, password);
  //     router.push("/");
  //   } catch (err) {
  //     setError("Invalid username or password");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>

        //  {error && (
        //   <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        //     {error}
        //   </div>
        // )} 

        //  <form className="mt-8 space-y-6" onSubmit={handleSubmit}> 
        <form className="mt-8 space-y-6" action={login}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Username"
                // value={username}
                // onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                // value={password}
                // onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
          </div>
        </form>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <Link href="/register">
              <a className="font-medium text-blue-600 hover:text-blue-500">
                Register
              </a>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
*/
