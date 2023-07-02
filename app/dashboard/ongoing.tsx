import { CardType } from "@/lib/types";
import { CardEntry } from "./CardEntry";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function OnGoingCards({ cards }: { cards: CardType[] }) {
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Item Name</TableHead>
          <TableHead>Type</TableHead>
          <TableHead className="text-right">Rent</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {cards.map((card) => (
          <TableRow key={card.id}>
            <TableCell className="font-medium">{card.item.name}</TableCell>
            <TableCell>{card.type}</TableCell>
            <TableCell className="text-right">{card.item.rentPerDay}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
