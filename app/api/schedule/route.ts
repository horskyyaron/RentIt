import prisma from "@/lib/db";
import { clerkClient } from "@clerk/nextjs";
import { NextResponse } from "next/server";

type DatesIds = {
    ids: number[];
    cardId: number;
};

export async function POST(req: Request) {
    const { ids, cardId } = (await req.json()) as DatesIds;

    const card = await prisma.rentCard.findUnique({
        where: {
            id: cardId,
        },
    });

    const user = await clerkClient.users.getUser(card?.proposerId || "");
    const ownerEmail = user.emailAddresses[0].emailAddress;
    return NextResponse.json({ msg: "schedule succeeded", email: ownerEmail });

    try {
        const res = await prisma.rentingDay.updateMany({
            where: {
                id: {
                    in: ids,
                },
                rentingCardId: cardId,
                rentingStatus: "AVAILABLE",
            },
            data: {
                rentingStatus: "TAKEN",
            },
        });
        console.log("[SERVER]: db updated");
        return NextResponse.json({ msg: "schedule succeeded", email: ownerEmail });
    } catch (error) {
        console.log("[SERVER]: there was an error when querying the db");
        return NextResponse.json({
            msg: "there was an error when querying the db",
            error: error,
        });
    }
}
