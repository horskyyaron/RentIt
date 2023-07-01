import { SignOutButton, clerkClient, currentUser } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import HamburgerMenuButton from "./Hamburger";
import VerticalMenu from "./MenuVertical";
import Logo from "./Logo";

export default async function Navbar() {
  const user = await currentUser();

  return (
    <>
      <nav className="mb-2 mt-2 flex  items-center justify-between px-6 text-white shadow ">
        <Logo width={40} height={40} />

        <ul className="m hidden md:flex md:space-x-3">
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
            <Link
              href="/renting-portal"
              className="text-lg hover:text-gray-300"
            >
              Portal
            </Link>
          </li>
          <li>
            <Link href="/contact" className="text-lg hover:text-gray-300">
              Contact
            </Link>
          </li>
          {!user ? (
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
        <span className="flex items-center">
          <HamburgerMenuButton />
          <UserButton afterSignOutUrl="/" />
        </span>
      </nav>
      <VerticalMenu isLoggedIn={user ? true : false} />
    </>
  );
}
