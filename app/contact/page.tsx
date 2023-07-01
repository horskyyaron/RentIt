// "use client";
// import { useState } from "react";

// export default async function Contact() {
//   const [sent, setSent] = useState(false);

//   async function handleOnSubmit(e: React.FormEvent<HTMLFormElement>) {
//     e.preventDefault();

//     const form = e.currentTarget;
//     const name = form.elements.namedItem("name") as HTMLInputElement;
//     const email = form.elements.namedItem("email") as HTMLInputElement;
//     const message = form.elements.namedItem("message") as HTMLInputElement;

//     try {
//       const res = await fetch("/api/contact", {
//         body: JSON.stringify({
//           name: name.value,
//           email: email.value,
//           msg: message.value,
//         }),
//         headers: {
//           "Content-Type": "application/json",
//         },
//         method: "POST",
//       });

//       const { msg, error } = await res.json();

//       if (error) {
//         console.log("problem with posting mail", error);
//       } else {
//         console.log("email sent!");
//       }
//       setSent(true);
//     } catch (error) {
//       console.log(error);
//     }
//   }
//   if (sent) {
//     return (
//       <div className="mt-10 flex items-center justify-center">
//         <div className="w-1/4">
//           <h1>sent to rentit!</h1>
//         </div>
//       </div>
//     );
//   }
//   return (
//     <div className="mt-5 flex flex-col items-center justify-center">
//       <h1 className="mb-8 text-4xl font-bold ">Contact Us</h1>
//       <div className="w-4/5 max-w-xl rounded-lg bg-white p-8 shadow-lg sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3">
//         <form onSubmit={handleOnSubmit}>
//           <div className="mb-4">
//             <label
//               htmlFor="name"
//               className="mb-2 block text-lg font-semibold text-gray-700"
//             >
//               Your Name
//             </label>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               className="w-full rounded-lg border border-gray-300 p-2 text-black focus:border-blue-500 focus:outline-none"
//               placeholder="Enter your name"
//             />
//           </div>
//           <div className="mb-4">
//             <label
//               htmlFor="email"
//               className="mb-2 block text-lg font-semibold text-gray-700"
//             >
//               Email Address
//             </label>
//             <input
//               type="email"
//               name="email"
//               id="email"
//               className="w-full rounded-lg border border-gray-300 p-2 text-black focus:border-blue-500 focus:outline-none"
//               placeholder="Enter your email address"
//             />
//           </div>
//           <div className="mb-4">
//             <label
//               htmlFor="message"
//               className="mb-2 block text-lg font-semibold text-gray-700"
//             >
//               Message
//             </label>
//             <textarea
//               id="message"
//               name="message"
//               className="h-40 w-full resize-none rounded-lg border border-gray-300 p-2 text-black focus:border-blue-500 focus:outline-none"
//               placeholder="Enter your message"
//             ></textarea>
//           </div>
//           <button type="submit" className="text-black">
//             sendit
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

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
