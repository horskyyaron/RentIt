"use client";

import { useRouter } from "next/navigation";

export default async function Contact() {
    const router = useRouter()

    async function handleOnSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = e.currentTarget;
        const name = form.elements.namedItem("name") as HTMLInputElement;
        const email = form.elements.namedItem("email") as HTMLInputElement;
        const message = form.elements.namedItem("message") as HTMLInputElement;

        try {
            const res = await fetch("/api/contact", {
                body: JSON.stringify({
                    name: name.value,
                    email: email.value,
                    msg: message.value,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
            });

            const { msg, error } = await res.json();

            if (error) {
                console.log("problem with posting mail", error);
            } else {
                console.log("email sent!");
            }
            alert("email sent!")
            router.push("/")

        } catch (error) {
            console.log(error);
        }

    }
    return (
        <div className="flex flex-col items-center justify-center mt-5">
            <h1 className="text-4xl font-bold mb-8 ">Contact Us</h1>
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-xl w-4/5 sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3">
                <form onSubmit={handleOnSubmit}>
                    <div className="mb-4">
                        <label
                            htmlFor="name"
                            className="block text-gray-700 text-lg font-semibold mb-2"
                        >
                            Your Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="border border-gray-300 text-black rounded-lg p-2 w-full focus:outline-none focus:border-blue-500"
                            placeholder="Enter your name"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-gray-700 text-lg font-semibold mb-2"
                        >
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            className="border border-gray-300 text-black rounded-lg p-2 w-full focus:outline-none focus:border-blue-500"
                            placeholder="Enter your email address"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="message"
                            className="block text-gray-700 text-lg font-semibold mb-2"
                        >
                            Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            className="border border-gray-300 text-black rounded-lg p-2 w-full h-40 resize-none focus:outline-none focus:border-blue-500"
                            placeholder="Enter your message"
                        ></textarea>
                    </div>
                    <button type="submit" className="text-black">
                        sendit
                    </button>
                </form>
            </div>
        </div>
    );
}
