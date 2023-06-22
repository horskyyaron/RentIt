import { clerkClient } from "@clerk/nextjs";
import Image from "next/image";

export default async function UserPage({
  params,
}: {
  params: { user_id: string };
}) {
  const user = await clerkClient.users.getUser(params.user_id);

  return (
    <div className="flex justify-center items-center flex-col mt-5">
      <div>user: {user.username ? user.username : user.firstName}</div>
      <Image src={user.imageUrl} alt="" width={500} height={500} className="rounded-full"/>
    </div>
  );
}
