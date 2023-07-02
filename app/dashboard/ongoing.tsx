import { CardType } from "@/lib/types";
import { CardEntry } from "./CardEntry";

export default function OnGoingCards({ cards }: { cards: CardType[] }) {
    return (
        <div className="ml-3 mr-3 mt-3 p-2 rounded-lg border-2 border-black bg-red-400">
            <h2 className="text-xl font-bold">Open Cards</h2>
            <ul>
                {cards.map((card) => {
                    return (
                        <li key={card.id}>
                            <CardEntry card={card} />
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
