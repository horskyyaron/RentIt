import { currentUser } from "@clerk/nextjs"
import prisma from "@/db/db"
export default async function Home() {
    const user = await currentUser()

    if (user) {
        // check if users exists in the db.
        const clerk_id = user.id
        const is_db_user = await prisma.user.findUnique({
            where: {
                clerkId: clerk_id
            }

        })
        // add user to db if he's not already registered.
        if (!is_db_user) {
            //add user to db
            const new_user = await prisma.user.create({
                data: {
                    clerkId: clerk_id
                }
            })
            console.log("new user added!")
        } else {
            console.log("user already in db!")

        }
    } else {
        console.log("No user is connected")

    }

    return (
        <div>
            <h1>Welcome to RentIT!</h1>
            {user && <h2>logged in!!!!</h2>}
        </div>
    )
}

