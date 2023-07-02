import prisma from "@/lib/db";
import { currentUser } from "@clerk/nextjs";
import ErrorPage from "../error";
import { Box, CircleDollarSign, HeartHandshake } from "lucide-react";
import StatCard from "./comp";
import OnGoingCards from "./ongoing";


export default async function Dashboard() {
    try {
        const user = await currentUser().then(async (clerk) => {
            return prisma.user.findUnique({
                where: {
                    clerkId: clerk?.id,
                },
            });
        });

        const cards = await prisma.rentingQueryCard.findMany({
            where: {
                proposerId: user?.clerkId,
            },
            include: {
                item: {
                    include: {
                        images: true,
                    },
                },
            },
        });

        return (
            <div>
                <div
                    id="stats"
                    className="sm:flex sm:flex-grow sm:justify-between sm:space-x-2"
                >
                    <StatCard
                        title="Times Rented"
                        value={200}
                        svgComp={<HeartHandshake />}
                    />
                    <StatCard title="Times Borrowed" value={200} svgComp={<Box />} />
                    <StatCard
                        title="Total Income"
                        value={200}
                        svgComp={<CircleDollarSign />}
                    />
                    <StatCard
                        title="Total Paid"
                        value={200}
                        svgComp={
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="h-6 w-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                                />
                            </svg>
                        }
                    />
                </div>
                <div className="grid gap-4 lg:grid-cols-3">
                <OnGoingCards cards={cards}/>
                    <StatCard title="Open Cards" value={200} />
                    {/* <StatCard title="Ongoing Transactions" value={200} /> */}
                    {/* <StatCard title="History" value={200} /> */}
                </div>
            </div>
        );
    } catch (error) {
        return <ErrorPage />;
    }
}
