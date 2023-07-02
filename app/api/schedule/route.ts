import prisma from "@/lib/db";
import { NextResponse } from "next/server";

type DatesIds = {
    ids: number[];
    cardId: number;
};

export async function POST(req: Request) {
    const { ids, cardId } = (await req.json()) as DatesIds;

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
        return NextResponse.json({ msg: "schedule succeeded" });
    } catch (error) {
        console.log("[SERVER]: there was an error when querying the db")
        return NextResponse.json({
            msg: "there was an error when querying the db",
            error: error,
        });
    }
}
