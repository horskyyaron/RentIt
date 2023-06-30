import { clerkClient } from "@clerk/nextjs";
import Image from "next/image";

export default async function UserPage({
  params,
}: {
  params: { user_id: string };
}) {
  const user = await clerkClient.users.getUser(params.user_id);

  return (
    <div className="mt-5 flex flex-col items-center justify-center">
      <div>user: {user.username ? user.username : user.firstName}</div>
      <Image
        src={user.imageUrl}
        alt=""
        width={500}
        height={500}
        className="rounded-full"
      />
    </div>
  );
}
