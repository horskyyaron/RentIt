import Link from 'next/link';

export default function NotFoundPage() {
    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-r from-gray-800 to-indigo-800 text-white font-sans">
            <div className="text-center">
                <h1 className="text-5xl font-bold mb-4">Oops! Page Not Found</h1>
                <p className="text-lg mb-8">The page youre looking for does not exist.</p>
                <div className="text-6xl mb-4">😢</div>
                <Link href="/" className="inline-block px-6 py-3 text-lg font-semibold bg-white text-gray-900 rounded-full shadow hover:shadow-lg transition duration-200">Go Back Home</Link>
            </div>
        </div>
    );
}

