import { CardType } from "@/lib/types";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Coins } from "lucide-react";

export default function OnGoingCards({ cards }: { cards: CardType[] }) {
    const getRatio = (card: CardType) => {
        const total = card.rentingDays.length;
        const scheduled = card.rentingDays.filter(
            (day) => day.rentingStatus === "TAKEN"
        ).length;
        if (total == scheduled) {
            return "FULLY BOOKED!";
        }
        return `${scheduled}/${total}`;
    };

    console.log(getRatio(cards[0]));

    return (
        <div className="mx-4 mt-3">
            <Table>
                <TableCaption>
                    A list of your ongoing renting requests or offers
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Item Name</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead className="w-[100px]">
                            Status (booked/total days)
                        </TableHead>
                        <TableHead className="text-right">Rent Per Day</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {cards.map((card) => (
                        <TableRow key={card.id}>
                            <TableCell className="font-medium">{card.item.name}</TableCell>
                            <TableCell>{card.type}</TableCell>
                            <TableCell>{getRatio(card)}</TableCell>
                            <TableCell className="text-right">{card.rentPerDay} 🪙</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
