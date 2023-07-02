import prisma from "@/lib/db";
import RentCard from "./RentCard";
import { currentUser } from "@clerk/nextjs";

export const revalidate = 60; // revalidate this page every 60 seconds

export default async function Gallery() {
  const cards = await prisma.rentCard.findMany({
    include: {
      item: {
        include: {
          images: true,
        },
      },
      rentingDays: true,
    },
  });

  if (cards.length == 0) {
    return (
      <div className="mt-24 flex flex-col items-center justify-center">
        <h1 className="mb-8 font-ysabeau text-4xl font-bold">
          No available requests or offers so far...
        </h1>
        <h2 className="mt-2 font-ysabeau text-xl">
          What are you waiting for? go and rent something or ask for an item
          yourself!
        </h2>
      </div>
    );
  } else {
    return (
      <div className="m-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 xl:gap-x-8">
        {cards.map((card) => (
          <div key={card.id}>
            {/* @ts-ignore */}
            <RentCard card={card} />
          </div>
        ))}
      </div>
    );
  }
}
