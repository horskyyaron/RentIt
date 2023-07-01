"use client";

import Link from "next/link";

export default function ErrorPage() {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="mb-6 text-6xl font-bold">Oops! Page Not Found</h1>
      <div className="mb-6 text-9xl">😮</div>
      <p className="mb-6 text-xl">
        Sorry! there was some kind of error, please try again!
      </p>
      <Link
        href="/"
        className="text-blue-500 underline transition duration-300 hover:text-blue-300"
      >
        Go back to Home
      </Link>
    </div>
  );
}
