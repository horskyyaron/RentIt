import prisma from "@/db/db"
import { currentUser } from "@clerk/nextjs"

type CardData = {
    clerk_id: string,
    item_name: string,
    description: string,
    rent: number,
    uploadingthing_data: [
        {
            fileKey: string,
            fileUrl: string
        }
    ]
}

import { NextResponse } from "next/server"
export async function POST(
    req: Request,
) {
    //get data from body
    const { item_name, description, rent, uploadingthing_data } = await req.json() as CardData

    try {
        const user = await currentUser()
        if (!user) throw new Error("user not connected")
        const card = await prisma.rentingQueryCard.create({
            data: {
                proposerId: user.id,
                item: {
                    create: {
                        name: item_name,
                        description: description,
                        rentPerDay: Number(rent),
                        ownerId: user.id,
                        images: {
                            createMany: {
                                data: uploadingthing_data
                            }
                        }
                    }
                }
            }
        })
        return NextResponse.json({ msg: "db updated sucessfully" })
    } catch (e) {
        return NextResponse.json({ error: e })
    }
}

