"use client"

import { experimental_useFormStatus as useFormStatus } from "react-dom"

export default function SubmitFormButton({ label }: { label: string }) {

    const { pending } = useFormStatus()

    return (
        <button
            type="submit"
            disabled={pending}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600 w-full"
        >
            {label}
        </button>
    )

}
