"use client"
import { useState, useEffect } from "react"
import { experimental_useFormStatus as useFormStatus } from "react-dom"

export default function SubmitFormButton({ label }: { label: string }) {

    const { pending } = useFormStatus()
    const [isSentMsg, setSentMsg] = useState(false)

    function handleSubmit() {
        setSentMsg(true)
        setIsVisible(true);
    }

    if (isSentMsg && !pending) {
        setSentMsg(false)

    }
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                setIsVisible(false);
            }, 2000); // Duration in milliseconds

            return () => {
                clearTimeout(timer);
            };
        }
    }, [isVisible]);


    return (
        <>
            {isVisible && <div className="toast text-green-500 font-bold text-xl">SENT!</div>}
            <button
                type="submit"
                disabled={pending}
                className={`${pending ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-600"} text-white py-2 px-4 rounded-lg  focus:outline-none focus:bg-blue-600 w-full `}
                onClick={handleSubmit}
            >
                {!pending ? label : "sending..."}
            </button>
        </>
    )

}
