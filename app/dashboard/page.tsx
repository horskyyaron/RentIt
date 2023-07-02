import prisma from "@/lib/db";
import { currentUser } from "@clerk/nextjs";
import ErrorPage from "../error";
import OnGoingCards from "./OnGoingCards";

export default async function Dashboard() {
    try {
        const user = await currentUser().then(async (clerk) => {
            return prisma.user.findUnique({
                where: {
                    clerkId: clerk?.id,
                },
            });
        });

        const cards = await prisma.rentCard.findMany({
            where: {
                proposerId: user?.clerkId,
            },
            include: {
                item: {
                    include: {
                        images: true,
                    },
                },
                rentingDays: true,
            },
        });

        return (
            <div>
                <div className="sm:m-16 md:m-20">
                    {/* @ts-ignore */}
                    <OnGoingCards cards={cards} />
                </div>
            </div>
        );
    } catch (error) {
        return <ErrorPage />;
    }
}
