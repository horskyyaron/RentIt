import BlurImage from "@/app/renting-portal/BlurImage";
import { clerkClient } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { CardType } from "@/lib/types";
dayjs.extend(relativeTime);

export default async function RentCard({ card }: { card: CardType }) {
    const user = await clerkClient.users.getUser(card.proposerId);

    return (
        <Link href={`/card/${card.id}`}>
            <div className="overflow-hidden rounded-lg border-2 border-black shadow-md">
                <div className="text-white">
                    <div className="relative aspect-square">
                        {/* <BlurImage img_url={card.item.images[0].fileUrl} link={"#"}/> */}
                        <Image
                            alt=""
                            src={card.item.images[0].fileUrl}
                            fill
                            style={{ objectFit: "cover" }}
                            className="duration-700 ease-in-out group-hover:opacity-75"
                        />
                    </div>
                    <div className="flex items-center justify-center border-b font-ysabeau text-xl font-bold">
                        <p className="mb-1">{card.item.name}</p>
                    </div>
                    <div className="my-2 ml-2 text-gray-300">
                        <div className="mb-2 font-inter text-sm">
                            <p>{card.item.description}</p>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="font-inter font-semibold">
                                {card.rentPerDay}🪙 / per day
                            </span>
                        </div>
                    </div>
                </div>
                <div className="text-gray-200">
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
                            created at: {dayjs(card.createdAt).fromNow()}
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    );
}
