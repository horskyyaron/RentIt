import BlurImage from "@/app/renting-portal/BlurImage";
import { Badge } from "@/components/ui/badge";
import { clerkClient } from "@clerk/nextjs";
import { QueryType } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
dayjs.extend(relativeTime);

type Image = {
  fileKey: string;
  fileUrl: string;
};

interface CardProps {
  name: string;
  description: string;
  price: number;
  owner_id: string;
  images: Image | any;
  query_type: QueryType;
  published: Date;
}

export default async function RentCard({
  name,
  description,
  price,
  owner_id,
  images,
  query_type,
  published,
}: CardProps) {
  const user = await clerkClient.users.getUser(owner_id);

  return (
    <div
      className={`${
        query_type === QueryType.ASK ? "bg-purple-800" : "bg-blue-800"
      } w-full max-w-sm border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700`}
    >
      <div className="flex items-center justify-center mt-2 mb-2">
        <h1 className="text-center text-white">{name}</h1>
      </div>
      <div className="px-5 text-white">
        <div className="aspect-square relative">
          <BlurImage img_url={images[0].fileUrl} />
        </div>
        <div className="my-2">
          <div className="text-white text-sm">
            <p>{description}</p>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold dark:text-white">
              {price} 🪙/per day
            </span>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-200 dark:border-gray-700" />
      <div className="flex flex-wrap space-x-1 space-y-1 my-2 mx-2">
        <Badge variant="default">hello</Badge>
        <Badge variant="default">Badge</Badge>
      </div>
      <div className="border-t border-gray-200 dark:border-gray-700" />
      <Link href={`/user/${owner_id}`}>
        <div className="my-2 flex space-x-1 items-center justify-center">
          <Avatar>
            <AvatarImage src={user.imageUrl} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <p>{user.username ? user.username : user.firstName}</p>
        </div>
        <div>
          <p className="text-center">
            created at: {dayjs(published).fromNow()}
          </p>
        </div>
      </Link>
    </div>
  );
}
