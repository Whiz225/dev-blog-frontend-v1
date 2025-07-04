import { Inter } from "next/font/google";
import "@/styles/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Providers } from "@/providers/provider";
import { headers } from "next/headers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Dev Blog",
  description: "A developer community platform",
};

export default async function RootLayout({ children }) {
  const headersList = await headers();

  // Try to get user info from headers first, then fallback to cookies
  const user = headersList.get("x-user-username");

  return (
    <html lang="en" className="h-full bg-gray-50">
      <body className={`${inter.className} flex flex-col min-h-full`}>
        <Header user={user} />

        <main className="flex-grow container mx-auto px-4 py-8">
          <Providers>{children}</Providers>
        </main>

        <Footer />
      </body>
    </html>
  );
}
