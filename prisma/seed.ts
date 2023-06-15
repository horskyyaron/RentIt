import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Create users
    const user1 = await prisma.user.create({
        data: {
            name: 'Jake Paul',
        },
    });

    const user2 = await prisma.user.create({
        data: {
            name: 'James Deen',
        },
    });

    const user3 = await prisma.user.create({
        data: {
            name: 'Robert Witteker',
        },
    });

    // Create items associated with users
    const item1 = await prisma.item.create({
        data: {
            name: 'Folding Chair',
            description: 'A folding chair for the beach',
            price: 10.99,
            category: 'Electronics',
            image: 'https://uploadthing.com/f/d6873b64-9ca4-486a-ae97-d05a7394bca0_folding_chair.jpg',
            ownerId: user1.id,
        },
    });

    const item2 = await prisma.item.create({
        data: {
            name: 'Anova nano',
            description: 'Sous vide for the home use',
            price: 25.99,
            category: 'Home & Kitchen',
            image: 'https://uploadthing.com/f/5f644d1a-163f-47c8-81fe-309b4cec0698_anova.jpg',
            ownerId: user2.id,
        },
    });

    const item3 = await prisma.item.create({
        data: {
            name: 'Jacket',
            description: 'Very modern cool Jacket',
            price: 15.99,
            category: 'Clothing',
            image: 'https://uploadthing.com/f/d6873b64-9ca4-486a-ae97-d05a7394bca0_folding_chair.jpg',
            ownerId: user3.id,
        },
    });

    console.log('Seed data created successfully!');
}

main()
    .catch((error) => {
        console.error(error);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
