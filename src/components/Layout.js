import Navbar from "./Navbar";

export default function Layout({ children, title = "Dev-Blog" }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="pb-12">{children}</main>
    </div>
  );
}
