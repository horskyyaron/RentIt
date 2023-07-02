"use client";
import { RentingDay } from "@/lib/types";
import da from "date-fns/locale/da";
import dayjs from "dayjs";
import { useState } from "react";

export default function DateEntry({
    date,
    handleSelect,
}: {
    date: RentingDay;
    handleSelect: (id: number) => void;
}) {
    const [isSelected, setIsSelected] = useState(false);

    if (date.rentingStatus === "AVAILABLE") {
        return (
            <button
                onClick={() => {
                    setIsSelected(!isSelected);
                    handleSelect(date.id);
                }}
            >
                <div className="bg-green-300 p-5">
                    {dayjs(date.date).format("MM/DD/YYYY")}
                </div>
                {isSelected && <h1>selected!</h1>}
            </button>
        );
    } else {
        return (
            <div className="bg-red-300 p-5">
                {dayjs(date.date).format("MM/DD/YYYY")}
            </div>
        );
    }
}
