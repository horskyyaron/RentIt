import prisma from "@/lib/db";
import ImageCarousel from "./Carousel";

export default async function CardPage({
  params,
}: {
  params: { card_id: string };
}) {
  const { card_id } = params;

  //getting card date from the db
  const card = await prisma.rentCard.findUnique({
    where: {
      id: Number(card_id),
    },
    include: {
      rentingDays: true,
      item: true,
    },
  });

  return (
    <div className="mt-6 flex items-center justify-center">
      <h1>{card?.item?.name}</h1>
      <ImageCarousel />
    </div>
  );
}
