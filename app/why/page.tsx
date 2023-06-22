export const metadata = {
  title: "Why?",
};

export default async function About() {
  return (
    <div className="max-w-3xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <h1 className="text-3xl font-bold text-center mb-10">Why RentIt?</h1>
      <div className="text-black grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Convenience</h2>
          <p>
            RentIt offers a convenient way to find and rent items you need. With
            just a few clicks, you can browse through a wide range of available
            items and quickly book them for your desired duration.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Cost-effective</h2>
          <p>
            Renting items instead of buying them can save you money. RentIt
            provides affordable rental options, allowing you to access
            high-quality items without the need for long-term commitments or
            large upfront costs.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">
            Environmentally friendly
          </h2>
          <p>
            By renting instead of buying, you contribute to a more sustainable
            future. RentIt promotes the sharing economy and reduces waste by
            maximizing the utilization of items, minimizing unnecessary
            production, and lowering carbon footprints.
          </p>
        </div>
      </div>
    </div>
  );
}
