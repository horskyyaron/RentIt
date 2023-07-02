import prisma from "@/lib/db";
import { CardInitData } from "@/lib/types";
import { currentUser } from "@clerk/nextjs";
import { RentStatus, TransactionType } from "@prisma/client";
import { NextResponse } from "next/server";
import { eachDayOfInterval, format } from "date-fns";

export async function POST(req: Request) {
  //get data from body
  const {
    item_name,
    description,
    rent,
    uploadingthing_data,
    endDate,
    startDate,
  } = (await req.json()) as CardInitData;

  console.log(startDate, endDate)
  
  const dates_range = eachDayOfInterval({
    start: new Date(startDate),
    end: new Date(endDate),
  });

  const formattedDates = dates_range.map((date) => format(date, "dd/MM/yyyy"));
  console.log(formattedDates);

  const dates_data = formattedDates.map((date) => ({
    date: new Date(date),
    rentingStatus: RentStatus.AVAILABLE,
  }));

  try {
    const user = await currentUser();
    if (!user) throw new Error("user not connected");
    const card = await prisma.rentCard.create({
      data: {
        proposerId: user.id,
        type: TransactionType.ASK,
        rentPerDay: Number(rent),
        rentingDays: {
          create: dates_data,
        },
        item: {
          create: {
            name: item_name,
            description: description,
            ownerId: user.id,
            images: {
              createMany: {
                data: uploadingthing_data,
              },
            },
          },
        },
      },
    });
    console.log("[SERVER]: prisma query succesfull");
    return NextResponse.json({ msg: "db updated sucessfully" });
  } catch (e) {
    console.log("[SERVER]: prisma query ERROR");
    console.log(e);

    return NextResponse.json({ error: e });
  }
}
