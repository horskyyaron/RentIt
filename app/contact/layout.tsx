"use client";
export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="mt-5 flex flex-col items-center justify-center">
            <h1 className="mb-3 font-ysabeau text-4xl font-bold">Contact Us</h1>
            <p className="mb-3 font-ysabeau text-sm font-semibold">
                We always love to get feedback here at rent it, for good and bad!
            </p>
            <div className="w-4/5 max-w-xl rounded-lg bg-white p-8 shadow-lg sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3">
                {children}
            </div>
        </div>
    );
}
