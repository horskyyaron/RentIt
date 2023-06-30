export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mt-5 flex flex-col items-center justify-center">
      <h1 className="mb-8 text-4xl font-bold text-white">
        Offer Item For Renting
      </h1>
      <div className="w-4/5 max-w-xl rounded-lg bg-white p-8 shadow-lg sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3">
        {children}
      </div>
    </div>
  );
}
