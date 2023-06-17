import Navbar from './components/Navbar'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'

export const metadata = {
    title: 'RentIT',
    description: 'Generated by create next app',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body>
                    <div className="flex flex-col min-h-screen">
                        <header className="bg-gray-900 text-white py-4 px-6">
                            <Navbar />
                        </header>
                        <main className="flex-grow bg-gray-100">
                            {children}
                        </main>
                        <footer className="bg-gray-900 text-white py-4 px-6">
                            <h1>footer</h1>
                        </footer>
                    </div>
                </body>
            </html >
        </ClerkProvider >
    )
}
