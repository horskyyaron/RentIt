"use client";
import { RentingDay } from "@/lib/types";
import DateEntry from "./DateEntry";
import { useState } from "react";
import { Alert, Snackbar } from "@mui/material";
import { useRouter } from "next/navigation";

export default function DatesHandler({
    dates,
    cardId,
}: {
    dates: RentingDay[];
    cardId: number;
}) {
    console.log();

    const [selected, setSelected] = useState<Array<number>>([]);
    const [openError, setOpenError] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [isScheduling, setIsScheduling] = useState(false);

    const router = useRouter();

    const updateSelected = (id: number) => {
        if (selected.includes(id)) {
            setSelected(selected.filter((n) => n !== id));
        } else {
            setSelected([...selected, id]);
        }
    };

    const handleClose = (
        event: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === "clickaway") {
            return;
        }
        setOpenError(false);
    };

    const handleCloseSuccess = (
        event: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === "clickaway") {
            return;
        }
        setOpenSuccess(false);
    };

    const handleSubmit = async () => {
        setIsScheduling(true);
        if (selected.length == 0) {
            setOpenError(true);
            return;
        }
        try {
            const res = await fetch("/api/schedule", {
                body: JSON.stringify({
                    ids: selected,
                    cardId: cardId,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
            });
            const { msg, error } = await res.json();
            if (!error) {
                setOpenSuccess(true);
                setTimeout(() => {
                    router.refresh()
                }, 3000);
            }
        } catch (error) {
            console.log(error);
            alert("there was an error, please refresh and try again");
        } finally {
            setIsScheduling(false);
        }
    };

    return (
        <div>
            <div className="flex items-center justify-center">
                <button
                    className="btn mb-3 border-2 border-black transition duration-500 ease-out hover:bg-gray-600 hover:text-white"
                    disabled={isScheduling}
                    onClick={() => {
                        handleSubmit();
                    }}
                >
                    {isScheduling ? "scheduling..." : "Schedule"}
                </button>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {dates &&
                    dates.map((d) => {
                        return (
                            <DateEntry date={d} key={d.id} handleSelect={updateSelected} />
                        );
                    })}
            </div>
            <Snackbar
                open={openError}
                autoHideDuration={2500}
                onClose={handleClose}
                onClick={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert severity="error" sx={{ width: "100%" }}>
                    No dates have been chosen
                </Alert>
            </Snackbar>
            <Snackbar
                open={openSuccess}
                autoHideDuration={2500}
                onClose={handleCloseSuccess}
                onClick={handleCloseSuccess}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert severity="success" sx={{ width: "100%" }}>
                    Your item has been scheduled!
                </Alert>
            </Snackbar>
        </div>
    );
}
