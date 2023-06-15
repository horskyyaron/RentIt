import RentCard from "@/app/components/RentCard"
import { ImageUploader } from "../components/ImageUploader";
import prisma from "@/db/db"

export default async function RentingPortal() {

    const items = await prisma.item.findMany();
    console.log(items);

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <ImageUploader />
        </main>
    );

}
