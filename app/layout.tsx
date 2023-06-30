import "./globals.css";
import Navbar from "@/components/Navbar";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata = {
  title: {
    default: "RentIT",
    template: "%s | RentIT",
  },
  icons: {
    shortcut: "./favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <div className="flex flex-col min-h-screen">
            <header className="bg-gray-900 py-2 px-6">
              <Navbar />
            </header>
            <main className="flex-grow bg-gradient-to-r from-gray-800 to-indigo-800 font-sans">
              {children}
            </main>
            <footer className="bg-gray-900 text-white py-4 px-6">
              <h1>footer</h1>
            </footer>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
