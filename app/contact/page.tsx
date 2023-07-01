"use client";
import { Alert, Snackbar, TextField } from "@mui/material";
import { Button } from "antd";
import { useState } from "react";
import {
    useForm,
    SubmitHandler,
    Controller,
    useFormState,
} from "react-hook-form";

type Inputs = {
    name: string;
    email: string;
    message: string;
};

export default function App() {
    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = useForm<Inputs>();

    const { isSubmitting, isSubmitSuccessful } = useFormState({
        control,
    });
    const [open, setOpen] = useState(false);

    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };

    const resetForm = () => {
        reset({
            name: "",
            email: "",
            message: "",
        });
    };

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        const { name, email, message } = data;

        try {
            const res = await fetch("/api/contact", {
                body: JSON.stringify({
                    name: name,
                    email: email,
                    msg: message,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
            });

            const { msg, error } = await res.json();

            if (error) {
                console.log("problem with posting mail", error);
                return;
            } else {
                console.log("email sent!");
            }
            setOpen(true);
            resetForm()
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mt-3 flex flex-col items-center justify-center space-y-3">
                    <Controller
                        render={({ field }) => (
                            <TextField {...field} variant="outlined" label="Name" />
                        )}
                        name="name"
                        control={control}
                        rules={{
                            required: { value: true, message: "required" },
                        }}
                    />
                    {errors.name && (
                        <p className="text-sm text-red-500">{errors.name.message}</p>
                    )}
                    <Controller
                        render={({ field }) => (
                            <TextField {...field} variant="outlined" label="Email" />
                        )}
                        name="email"
                        control={control}
                        rules={{
                            required: { value: true, message: "required" },
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Invalid email address",
                            },
                        }}
                    />
                    {errors.email && (
                        <p className="text-sm text-red-500">{errors.email.message}</p>
                    )}

                    <Controller
                        render={({ field }) => (
                            <TextField
                                {...field}
                                variant="outlined"
                                label="Message"
                                rows={2}
                                multiline
                            />
                        )}
                        name="message"
                        control={control}
                        rules={{
                            required: { value: true, message: "required" },
                            minLength: {
                                value: 5,
                                message:
                                    "please elaborate, we can't learn from 5 characters :)",
                            },
                        }}
                    />
                    {errors.message && (
                        <p className="text-sm text-red-500">{errors.message.message}</p>
                    )}

                    {isSubmitting ? (
                        <Button type="default" loading disabled>
                            Publishing item...
                        </Button>
                    ) : (
                        <Button
                            type="default"
                            htmlType="submit"
                            className="mr-3 bg-slate-400"
                        >
                            send
                        </Button>
                    )}
                </div>
            </form>

            <Snackbar
                open={open}
                autoHideDuration={2500}
                onClose={handleClose}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert severity="success" sx={{ width: "100%" }}>
                    Your item was published successfully!
                </Alert>
            </Snackbar>
        </>
    );
}
