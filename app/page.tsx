import { currentUser } from "@clerk/nextjs";
import prisma from "@/lib/db";

export default async function Home() {
  const user = await currentUser();

  if (user) {
    // check if users exists in the db.
    const clerk_id = user.id;
    const is_db_user = await prisma.user.findUnique({
      where: {
        clerkId: clerk_id,
      },
    });
    // add user to db if he's not already registered.
    if (!is_db_user) {
      //add user to db
      const new_user = await prisma.user.create({
        data: {
          clerkId: clerk_id,
        },
      });
      console.log("new user added!");
    } else {
      console.log("user already in db!");
    }
  } else {
    console.log("No user is connected");
  }

  return (
    <div>
      <div className="mt-10 flex flex-col items-center justify-center ">
        <h1>rent it</h1>
        <p className="mb-8 text-xl text-white">
          Find and rent items from people near you.
        </p>
        <button className="rounded bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600">
          Get Started
        </button>
      </div>
    </div>
  );
}
