import RentCard from "@/app/components/RentCard"
import prisma from "@/db/db"

export default async function RentingPortal() {

  const items = await prisma.item.findMany();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

      <div className="flex flex-wrap justify-center gap-4">
        {items.map((item) => (
          <RentCard key={item.id} name={item.name} description={item.description} owner_id={item.ownerId} price={item.price} img_url={item.image} />
        ))}
        {items.map((item) => (
          <RentCard key={item.id} name={item.name} description={item.description} owner_id={item.ownerId} price={item.price} img_url={item.image} />
        ))}
        {items.map((item) => (
          <RentCard key={item.id} name={item.name} description={item.description} owner_id={item.ownerId} price={item.price} img_url={item.image} />
        ))}
      </div>
    </main>
  );

}
