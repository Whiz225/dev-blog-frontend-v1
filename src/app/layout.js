// src/app/layout.js

import { Inter } from "next/font/google";
import { headers } from "next/headers";

import "@/styles/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Providers } from "@/providers/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    template: "%s / Dev Blog",
    default: "Welcome / Dev Blog",
  },
  // title: "Dev Blog",
  description: "A developer community platform",
};

export default async function RootLayout({ children }) {
  const headersList = await headers();
  const user = headersList.get("x-user-username");

  return (
    <html lang="en" className="h-full bg-gray-50">
      <body className={`${inter.className} flex flex-col min-h-full`}>
        <Header user={user} />

        {/* Add pt-16 (or appropriate value) to account for fixed header height on mobile */}
        <main className="flex-grow container mx-auto px-4 py-8 sm:pt-24">
          <Providers>{children}</Providers>
        </main>

        <Footer />
      </body>
    </html>
  );
}
