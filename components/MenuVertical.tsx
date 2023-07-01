"use client";
import { User } from "@clerk/nextjs/dist/types/server";
import Link from "next/link";

export default function VerticalMenu({ isLoggedIn }: { isLoggedIn: boolean }) {
  return (
    <ul
      className="hidden "
      id="menu_vertical"
      onClick={() => {
        const menu = document.querySelector("#menu_vertical");
        if (menu?.classList.contains("hidden")) {
          menu.classList.remove("hidden");
        } else {
          menu?.classList.add("hidden");
        }
      }}
    >
      <li>
        <Link href="/about" className="text-lg hover:text-gray-300">
          About
        </Link>
      </li>
      <li>
        <Link href="/why" className="text-lg hover:text-gray-300">
          Why?
        </Link>
      </li>
      <li>
        <Link href="/how" className="text-lg hover:text-gray-300">
          How?
        </Link>
      </li>
      <li>
        <Link href="/renting-portal" className="text-lg hover:text-gray-300">
          Portal
        </Link>
      </li>
      <li>
        <Link href="/contact" className="text-lg hover:text-gray-300">
          Contact
        </Link>
      </li>
      {!isLoggedIn ? (
        <li>
          <Link href="/sign-in/" className="text-lg hover:text-gray-300">
            Log-In
          </Link>
        </li>
      ) : (
        <>
          <li>
            <Link href="/ask" className="text-lg hover:text-gray-300">
              Ask
            </Link>
          </li>
          <li>
            <Link href="/offer" className="text-lg hover:text-gray-300">
              Offer
            </Link>
          </li>
          <li>
            <Link href="/dashboard" className="text-lg hover:text-gray-300">
              dashboard
            </Link>
          </li>
        </>
      )}
    </ul>
  );
}
