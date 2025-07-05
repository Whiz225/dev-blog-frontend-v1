import Navbar from "./Navbar";
import { Suspense } from "react";

export default function Layout({ children, title = "Dev-Blog", user }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Suspense fallback={<p>Loading....</p>}>
        <Navbar user={user} />
      </Suspense>

      <main className="pb-12">{children}</main>
    </div>
  );
}
