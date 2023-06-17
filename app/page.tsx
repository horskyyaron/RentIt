import { currentUser } from "@clerk/nextjs"
export default async function Home() {
    const user = await currentUser()
    return (
        <div>
            <h1>Welcome to RentIT!</h1>
            {user && <h2>logged in!!!!</h2>}
        </div>
    )
}

