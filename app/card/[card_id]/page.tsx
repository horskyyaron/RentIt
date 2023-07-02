import prisma from "@/lib/db";
import ImageCarousel from "./ImageCarousel";
import { clerkClient } from "@clerk/nextjs";
import Image from "next/image";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import DateEntry from "./DateEntry";
dayjs.extend(relativeTime);

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
            item: {
                include: {
                    images: true,
                },
            },
        },
    });

    const user = await clerkClient.users.getUser(card?.proposerId || "");

    const images = card?.item?.images;
    const dates = card?.rentingDays;

    if (dates) {
        console.log(dayjs(dates[0].date).format("DD/MM/YYYY"));
    }

    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="mb-5 mt-5 font-ysabeau text-4xl font-bold">
                {card && card.item?.name}
            </h1>
            <h2>Description:</h2>
            <p className="mb-2">{card && card.item?.description}</p>
            {/* @ts-ignore */}
            <ImageCarousel images={images} />

            <div>
                <div className="my-2 flex items-center justify-center space-x-1">
                    <Image
                        src={user.imageUrl}
                        alt=""
                        className="rounded-full"
                        width={30}
                        height={30}
                    />
                    <p className="font-ysabeau text-lg font-semibold">
                        {user.username ? user.username : user.firstName}
                    </p>
                </div>
                <div>
                    <p className="text-center font-inter">
                        created at: {dayjs(card?.createdAt).fromNow()}
                    </p>
                </div>
            </div>

            <h1 className="mb-4 mt-8 text-2xl font-semibold">Availability:</h1>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {/* Loop through your items */}
                {dates &&
                    dates.map((d) => {
                        return <DateEntry date={d} key={d.id} />;
                    })}
            </div>
        </div>
    );
}
