import LoginForm from "@/components/LoginForm";
import Logo from "@/components/Logo";
import Heading from "@/components/Heading";

export const metadata = {
  title: "Login",
};

export default function LoginPage() {
  return (
    <main className="min-h-screen grid grid-cols-1 place-content-center justify-items-center gap-8 bg-gray-50 p-4">
      <div className="flex gap-2 justify-center items-center relative">
        <div className="relative">
          <Logo />
          <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold">
            DevBlog
          </span>
        </div>
      </div>
      <Heading as="h4">Log in to your account</Heading>
      <LoginForm />
    </main>
  );
}
