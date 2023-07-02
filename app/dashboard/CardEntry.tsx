import { CardType } from "@/lib/types";

export function CardEntry({ card }: { card: CardType }) {
    return (
        <div
            className={`ml-2 mr-2 border-black border-3 flex justify-between ${card.type == "OFFER" ? "bg-red-400" : "bg-blue-400"
                }`}
        >
            <h1>{card.item.name}</h1>
            <h2>{card.type}</h2>
        </div>
    );
}
