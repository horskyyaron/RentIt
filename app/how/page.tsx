export const metadata = {
  title: "How?",
};

export default async function About() {
  return (
    <div className="max-w-3xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <h1 className="text-3xl font-bold text-center mb-10">
        How Does This Work?
      </h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 text-black">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Renting Items</h2>
          <p>
            1. Browse the RentIt portal to find the item you need.
            <br />
            2. Check the item details, availability, and rental terms.
            <br />
            3. Request to rent the item by selecting the desired rental
            duration.
            <br />
            4. Wait for the owner&aposs confirmation and payment details.
            <br />
            5. Make the payment to secure your rental.
            <br />
            6. Arrange pickup or delivery with the owner.
            <br />
            7. Return the item at the agreed time and in the specified
            condition.
            <br />
            8. Leave a review for the owner and complete the rental process.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">
            Offering Items for Rent
          </h2>
          <p>
            1. Sign up as a RentIt user and create a listing for your item.
            <br />
            2. Provide accurate details, including item description, rental
            price, and availability.
            <br />
            3. Respond to rental requests promptly and confirm availability.
            <br />
            4. Arrange pickup or delivery with the renter.
            <br />
            5. Receive payment from the renter.
            <br />
            6. Ensure the item is in good condition for the rental period.
            <br />
            7. Coordinate the return of the item at the agreed time.
            <br />
            8. Receive feedback from the renter and complete the rental process.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Finding Items</h2>
          <p>
            1. Visit the RentIt portal and explore the available categories or
            search for specific items.
            <br />
            2. Use filters to refine your search based on location, price, or
            other preferences.
            <br />
            3. Read item descriptions, view images, and check rental terms.
            <br />
            4. Contact the item owner if you have any questions or need
            additional information.
            <br />
            5. Submit a rental request for the desired item and rental duration.
            <br />
            6. Wait for the owner&aposs confirmation and payment details.
            <br />
            7. Make the payment to secure your rental.
            <br />
            8. Arrange pickup or delivery with the owner.
            <br />
            9. Return the item at the agreed time and in the specified
            condition.
            <br />
            10. Leave a review for the owner and complete the rental process.
          </p>
        </div>
      </div>
    </div>
  );
}
