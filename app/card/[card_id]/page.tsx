import prisma from "@/lib/db";

export default async function CardPage({
  params,
}: {
  params: { card_id: string };
}) {
  const { card_id } = params;
  const card = await prisma.rentCard.findUnique({
    where: {
      id: Number(card_id),
    },
  });

  console.log("[SERVER]: this is the card info");
  console.log(card);

  return <h1>{card_id}</h1>;
}
