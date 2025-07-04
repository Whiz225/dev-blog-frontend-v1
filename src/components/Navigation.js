"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Button from "./Button";
import Input from "./Input";
import { useEffect, useState } from "react";

export default function Navigation() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentURL = pathname;
  // const currentURL = `${pathname}?${searchParams.toString()}`;

  console.log("URL", currentURL);

  function handleClick(sort) {
    const params = new URLSearchParams(searchParams.toString());

    params.set("sortBy", sort);
    router.push(`?${params.toString()}`);
  }

  if (currentURL !== "/" || currentURL !== "/posts") return null;

  return (
    <nav className="hidden md:flex space-x-8">
      <Button
        variation="secondary"
        size="small"
        onClick={() => handleClick("all")}
      >
        All Posts
      </Button>
      <Button
        variation="secondary"
        size="small"
        onClick={() => handleClick("recent")}
      >
        Recent Posts
      </Button>
      <Input
        placeholder="search by category..."
        onChange={(e) => handleClick(e.target.value)}
      />

      {/* <Button
        variation="secondary"
        size="small"
        onClick={() => handleClick("category")}
      >
        Category
      </Button> */}

      {/* <Button href="/about" className="text-gray-600 hover:text-indigo-600">
        About
      </Button> */}
    </nav>
  );
}
