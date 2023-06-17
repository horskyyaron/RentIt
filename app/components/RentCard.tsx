"use client"
import { Rating } from "@mui/material";
import Image from "next/image";

interface CardProps {
    name: string;
    description: string;
    price: number;
    owner_id: number;
    img_url: string;
}

export default function RentCard({ name, description, price, owner_id, img_url }: CardProps) {
    return (
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col">
            <h2>{name}</h2>
            <Image className="p-8 rounded-t-lg" width={400} height={400} src={img_url} alt="product image" />
            <div className="px-5 pb-5 flex-grow flex flex-col justify-between">
                <div>
                    <a href="#">
                        <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{description}</h5>
                    </a>
                    <p>owner id: {owner_id}</p>

                    <div className="flex items-center mt-2.5 mb-5">
                        <Rating value={5} readOnly />
                        <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">5.0</span>
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">{price}$<span className="text-xl font-medium">/day</span></span>
                    <a href="#" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Contact owner</a>
                </div>
            </div>
        </div>
    );
};

























