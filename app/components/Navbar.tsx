import { SignOutButton, clerkClient, currentUser } from '@clerk/nextjs';
import { UserButton } from "@clerk/nextjs";
import Link from 'next/link';

export default async function Navbar() {
  const user = await currentUser();

  return (
    <nav className="flex items-center justify-between bg-gray-900 text-white py-4 px-6 shadow">
      <div className="text-xl font-bold">Your Logo</div>

      <ul className="flex space-x-4 items-center">
        <li><Link href="/about" className="hover:text-gray-300 text-lg">About</Link></li>
        <li><Link href="/renting-portal" className="hover:text-gray-300 text-lg">Renting Portal</Link></li>
        <li><Link href="/contact" className="hover:text-gray-300 text-lg">Contact</Link></li>
        {user ? (<UserButton afterSignOutUrl='/' />) :
          <li><Link href="/sign-in/" className="hover:text-gray-300 text-lg">log-in</Link></li>
        }
      </ul>
    </nav>
  )
}

