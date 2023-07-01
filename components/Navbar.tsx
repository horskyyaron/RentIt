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
            <nav className="flex items-center justify-between  bg-gray-300 px-6 pb-2 pt-2 font-semibold shadow">
                <Logo width={40} height={40} />

                <ul className="hidden md:flex md:space-x-3 ">
                    <li>
                        <Link
                            href="/about"
                            className="btn border-2 border-black transition duration-500 ease-out hover:bg-gray-600 hover:text-white"
                        >
                            About
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/why"
                            className="btn border-2 border-black transition duration-500 ease-out hover:bg-gray-600 hover:text-white"
                        >
                            Why?
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/how"
                            className="btn border-2 border-black transition duration-500 ease-out hover:bg-gray-600 hover:text-white"
                        >
                            How?
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/renting-portal"
                            className="btn border-2 border-black transition duration-500 ease-out hover:bg-gray-600 hover:text-white"
                        >
                            Portal
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/contact"
                            className="btn border-2 border-black transition duration-500 ease-out hover:bg-gray-600 hover:text-white"
                        >
                            Contact
                        </Link>
                    </li>
                    {!user ? (
                        <li>
                            <Link
                                href="/sign-in"
                                className="btn border-2 border-black transition duration-500 ease-out hover:bg-gray-600 hover:text-white"
                            >
                                Login
                            </Link>
                        </li>
                    ) : (
                        <>
                            <li>
                                <Link
                                    href="/ask"
                                    className="btn border-2 border-black transition duration-500 ease-out hover:bg-gray-600 hover:text-white"
                                >
                                    Ask
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/offer"
                                    className="btn border-2 border-black transition duration-500 ease-out hover:bg-gray-600 hover:text-white"
                                >
                                    Offer
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/dashboard"
                                    className="btn border-2 border-black transition duration-500 ease-out hover:bg-gray-600 hover:text-white"
                                >
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
