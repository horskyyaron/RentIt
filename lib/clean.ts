import { PrismaClient } from "@prisma/client";

async function resetDatabase() {

    const prisma = new PrismaClient()

    try {
        // Delete all existing data
        console.log("deleting rows...")
        await prisma.image.deleteMany();
        console.log("deleting images...")
        await prisma.item.deleteMany();
        console.log("deleting item...")
        await prisma.rentingQueryCard.deleteMany();
        console.log("deleting card...")
        await prisma.user.deleteMany();
        console.log("deleting user...")

        console.log('Database reset completed.');
    } catch (error) {
        console.error('Error resetting the database:', error);
    } finally {
        await prisma.$disconnect();
    }
}

// Run the resetDatabase function
resetDatabase();
