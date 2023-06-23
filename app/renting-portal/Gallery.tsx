import prisma from "@/lib/db";
import RentCard from "./RentCard";

export const revalidate = 60; // revalidate this page every 60 seconds

export default async function Gallery() {
  const cards = await prisma.rentingQueryCard.findMany({
    include: {
      item: {
        include: {
          images: true,
        },
      },
    },
  });

  if (cards.length == 0) {
    return (
      <div className="text-white flex flex-col items-center justify-center mt-24">
        <h1 className="text-4xl font-bold mb-8">No offers so far</h1>
      </div>
    );
  } else {
    return (
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {cards.map((card) => (
            <div key={card.id} className="mb-1">
              <RentCard
                name={card.item?.name || ""}
                description={card.item?.description || ""}
                owner_id={card.proposerId || ""}
                price={card.item?.rentPerDay || 1}
                images={card.item?.images}
                query_type={card.type}
                published={card.createdAt}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}
