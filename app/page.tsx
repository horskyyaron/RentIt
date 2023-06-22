import { currentUser } from "@clerk/nextjs";
import prisma from "@/lib/db";
import { TypographyH1 } from "@/components/ui/Typography";

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
      <div className="flex flex-col mt-10 items-center justify-center ">
        <TypographyH1 label="RentIT" />
        <p className="text-xl text-white mb-8">
          Find and rent items from people near you.
        </p>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
          Get Started
        </button>
      </div>
    </div>
  );
}
