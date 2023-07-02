import "./globals.css";
import Navbar from "@/components/Navbar";
import { ClerkProvider } from "@clerk/nextjs";
// import { Providers } from "./providers";

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
      <html lang="en" suppressHydrationWarning>
        <body>
          {/* <Providers> */}
            <div className="flex min-h-screen flex-col">
              <header>
                <Navbar />
              </header>
              <main className="flex-grow bg-rent_primary">
                {children}
              </main>
              {/* <footer className="bg-gray-900 px-6 py-4 text-white"> */}
              {/*   <h1>footer</h1> */}
              {/* </footer> */}
            </div>
          {/* </Providers> */}
        </body>
      </html>
    </ClerkProvider>
  );
}
