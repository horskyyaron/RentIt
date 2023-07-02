// "use client";
import { currentUser } from "@clerk/nextjs";
import prisma from "@/lib/db";
import { useTheme } from "next-themes";
import ceo from "@/mocking_images/ceo.jpg";
import logo from "@/app/favicon_io/logo32.png";
import Image from "next/image";

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
          coins: 100,
        },
      });
      console.log("new user added!");
    } else {
      console.log("user already in db!");
    }
  } else {
    console.log("No user is connected");
  }

  // const { theme, setTheme, themes, systemTheme } = useTheme();
  // console.log(theme);

  return (
    <div>
      <div className="mt-10 flex flex-col items-center justify-center ">
        <h1 className="font-ysabeau text-3xl font-bold">Rentit</h1>
        <p className="mb-8 ml-20 mr-20 mt-3 flex justify-center text-center font-inter text-xl font-extrabold">
          The app where sharing is caring, and borrowing is the new life style.
          Join the borrowing revolution and discover a world where stuff gets
          around more than gossip.
        </p>
        <figure className="mx-auto max-w-screen-md text-center">
          <svg
            aria-hidden="true"
            className="mx-auto mb-3 h-12 w-12 text-gray-400 dark:text-gray-600"
            viewBox="0 0 24 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
              fill="currentColor"
            />
          </svg>
          <blockquote>
            <p className="text-2xl font-medium italic text-gray-900 dark:text-white">
              &quot; I&apos;ve mastered the art of sharing without ever owning.
              It&apos;s like having a closet full of things I don&apos;t
              actually possess. My friends love me, and my wallet does too!
              &quot;
            </p>
          </blockquote>
          <figcaption className="mt-6 flex items-center justify-center space-x-3">
            <Image
              className="rounded-full"
              src={ceo}
              alt="profile picture"
              width={35}
              height={35}
            />
            <div className="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
              <cite className="pr-3 font-medium text-gray-900 dark:text-white">
                Yaron Horsky
              </cite>
              <cite className="pl-3 text-sm text-gray-500 dark:text-gray-400">
                CEO at Rentit
              </cite>
            </div>
          </figcaption>
        </figure>
      </div>
    </div>
  );
}
