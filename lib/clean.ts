import { PrismaClient } from "@prisma/client";

async function resetDatabase() {

    const prisma = new PrismaClient()

    try {
        // Delete all existing data
        console.log("deleting rows...")
        
        await prisma.image.deleteMany();
        await prisma.item.deleteMany();
        await prisma.rentingQueryCard.deleteMany();
        await prisma.user.deleteMany();

        console.log('Database reset completed.');
    } catch (error) {
        console.error('Error resetting the database:', error);
    } finally {
        await prisma.$disconnect();
    }
}

// Run the resetDatabase function
resetDatabase();
