import { SignOutButton, clerkClient, currentUser } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import logo from "@/app/favicon_io/android-chrome-192x192.png";

export default async function Navbar() {
  const user = await currentUser();

  return (
    <nav className="flex items-center justify-between bg-gray-900 text-white px-6 shadow">
      <div className="text-xl font-bold">
        <Link href="/">
          <Image
            src={logo}
            key={"logo"}
            id="logo"
            alt=""
            className="rounded-full"
            width={40}
            height={40}
          />
        </Link>
      </div>

      <ul className="flex space-x-4 items-center">
        <li>
          <Link href="/about" className="hover:text-gray-300 text-lg">
            About
          </Link>
        </li>
        <li>
          <Link href="/why" className="hover:text-gray-300 text-lg">
            Why Rent?
          </Link>
        </li>
        <li>
          <Link href="/how" className="hover:text-gray-300 text-lg">
            How Does This Works?
          </Link>
        </li>
        <li>
          <Link href="/renting-portal" className="hover:text-gray-300 text-lg">
            Renting Portal
          </Link>
        </li>
        <li>
          <Link href="/contact" className="hover:text-gray-300 text-lg">
            Contact
          </Link>
        </li>
        {!user ? (
          <li>
            <Link href="/sign-in/" className="hover:text-gray-300 text-lg">
              Log-In
            </Link>
          </li>
        ) : (
          <>
            <li>
              <Link href="/ask" className="hover:text-gray-300 text-lg">
                Ask
              </Link>
            </li>
            <li>
              <Link href="/offer" className="hover:text-gray-300 text-lg">
                Offer
              </Link>
            </li>
            <UserButton afterSignOutUrl="/" />
          </>
        )}
      </ul>
    </nav>
  );
}
