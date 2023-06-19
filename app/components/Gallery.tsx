import prisma from "@/db/db"
import RentCard from "./RentCard";

export default async function Gallery() {
    const items = await prisma.item.findMany();
    return (
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                {items.map((item) => (
                    <RentCard key={item.id} name={item.name} description={item.description} owner_id={item.ownerId} price={item.price} img_url={item.image} />
                ))}
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
        </div>
    )
}


