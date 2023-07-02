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
    /* .card { */
    /*     @apply bg-white rounded-lg overflow-hidden shadow-md relative */
    /* } */
    <div
      className={`${
        card.type == "OFFER" ? "bg-purple-800" : "bg-blue-800"
      } relative overflow-hidden rounded-lg border-2 border-black shadow-md  `}
    >
      {/* <div className="mb-2 mt-2 flex items-center justify-center"> */}
      {/*   <h1 className="text-center text-white">{card.item.name}</h1> */}
      {/* </div> */}
      <div className="text-white">
        <div className="relative aspect-square">
          <BlurImage img_url={card.item.images[0].fileUrl} />
        </div>
        <div className="flex justify-center items-center font-ysabeau font-bold text-xl border-b">
          <p className="mb-1">{card.item.name}</p>
        </div>
        <div className="my-2 ml-2">
          <div className="text-sm font-inter mb-2">
            <p>{card.item.description}</p>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-semibold font-inter">
              {card.rentPerDay}🪙 / per day
            </span>
          </div>
        </div>
      </div>
      <div className="text-white">
        <div className="my-2 flex items-center justify-center space-x-1">
          <Image
            src={user.imageUrl}
            alt=""
            className="rounded-full"
            width={30}
            height={30}
          />
          <p>{user.username ? user.username : user.firstName}</p>
        </div>
        <div>
          <p className="text-center">
            created at: {dayjs(card.createdAt).fromNow()}
          </p>
        </div>
      </div>
    </div>
  );
}
