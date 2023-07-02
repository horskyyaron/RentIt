export default async function CardPage({
  params,
}: {
  params: { card_id: string };
}) {
  const { card_id } = params;

  return <h1>{card_id}</h1>;
}
