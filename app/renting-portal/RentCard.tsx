import BlurImage from "@/app/renting-portal/BlurImage";
import { clerkClient } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { CardType } from "@/lib/types";
dayjs.extend(relativeTime);

type Image = {
  fileKey: string;
  fileUrl: string;
};

export default async function RentCard({ card }: { card: CardType }) {

  const user = await clerkClient.users.getUser(card.proposerId);

  return (
    <div
      className={`${
        card.type == "OFFER" ? "bg-purple-800" : "bg-blue-800"
      } w-full max-w-sm rounded-lg border border-gray-200 shadow dark:border-gray-700 dark:bg-gray-800`}
    >
      <div className="mb-2 mt-2 flex items-center justify-center">
        <h1 className="text-center text-white">{card.item.name}</h1>
      </div>
      <div className="px-5 text-white">
        <div className="relative aspect-square">
          <BlurImage img_url={card.item.images[0].fileUrl} />
        </div>
        <div className="my-2">
          <div className="text-sm text-white">
            <p>{card.item.description}</p>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold dark:text-white">
              {card.rentPerDay} 🪙/per day
            </span>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-200 dark:border-gray-700" />
      {/* <div className="flex flex-wrap space-x-1 space-y-1 my-2 mx-2"> */}
      {/*   <Badge variant="default">hello</Badge> */}
      {/*   <Badge variant="default">Badge</Badge> */}
      {/* </div> */}
      <div className="border-t border-gray-200 dark:border-gray-700" />
      <Link href={`/user/${card.proposerId}`}>
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
      </Link>
    </div>
  );
}
