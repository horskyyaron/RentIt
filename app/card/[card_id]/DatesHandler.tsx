"use client";
import { RentingDay } from "@/lib/types";
import DateEntry from "./DateEntry";
import { useState } from "react";
import { Alert, Snackbar } from "@mui/material";

export default function DatesHandler({
    dates,
    cardId,
}: {
    dates: RentingDay[];
    cardId: number;
}) {
    console.log();

    const [selected, setSelected] = useState<Array<number>>([]);
    const [open, setOpen] = useState(false);

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
        setOpen(false);
    };
    const handleSubmit = async () => {
        if (selected.length == 0) {
            setOpen(true);
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
            console.log(await res.json());
        } catch (error) {
            console.log("there was an error", error);
        }
        // try {
        ////upload to uploadthing server
        //const res = await startUpload(files).then(async (ut_data) => {
        //    //update db.
        //    const res = await fetch("/api/offer", {
        //        body: JSON.stringify({
        //            item_name: item_name,
        //            description: item_description,
        //            rent: rent,
        //            startDate: from,
        //            endDate: to,
        //            uploadingthing_data: ut_data,
        //        }),
        //        headers: {
        //            "Content-Type": "application/json",
        //        },
        //        method: "POST",
        //    });

        //    const { msg, error } = await res.json();
        //    if (error) {
        //        console.log("there was an error");
        //        console.log(error);
        //    } else {
        //        console.log("db updated!!!!");
        //    }
        //});
        //} catch (error) {
        //console.log(error);
        //}
        //setOpen(true);
        //resetForm();
    };

    return (
        <div>
            <div className="flex items-center justify-center">
                <button
                    className="btn mb-3 border-2 border-black transition duration-500 ease-out hover:bg-gray-600 hover:text-white"
                    onClick={() => {
                        handleSubmit();
                    }}
                >
                    Schedule
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
                open={open}
                autoHideDuration={2500}
                onClose={handleClose}
                onClick={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert severity="error" sx={{ width: "100%" }}>
                    No dates have been chosen
                </Alert>
            </Snackbar>
        </div>
    );
}
