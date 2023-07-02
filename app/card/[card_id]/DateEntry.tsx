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
                <div
                    className={` ${isSelected ? "border-2 border-black bg-green-600" : "bg-green-300"
                        }  p-5`}
                >
                    {dayjs(date.date).format("MM/DD/YYYY")}
                </div>
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
