import prisma from "@/utils/db";
import RentCard from "./RentCard";

export const revalidate = 10; // revalidate this page every 60 seconds

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

  return (
    <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-10 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-12">
        {cards.map((card) => (
          <RentCard
            key={card.id}
            name={card.item?.name || ""}
            description={card.item?.description || ""}
            owner_id={card.proposerId || ""}
            price={card.item?.rentPerDay || 1}
            images={card.item?.images}
          />
        ))}
      </div>
    </div>
  );
}
