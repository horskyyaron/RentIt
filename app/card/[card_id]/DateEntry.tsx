import { RentingDay } from "@/lib/types";
import dayjs from "dayjs";

export default function DateEntry({ date }: { date: RentingDay }) {
    return (
        <div
            className={`${date.rentingStatus === "AVAILABLE" ? "bg-green-200" : "bg-red-500"
                } p-5`}
        >
            {dayjs(date.date).format("MM/DD/YYYY")}
        </div>
    );
}
