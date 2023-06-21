"use client"
import Image from "next/image";
import Link from "next/link";
import { useState } from 'react';

interface CardProps {
    name: string;
    description: string;
    price: number;
    owner_id: number;
    img_url: string;
}

function cn(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}

function BlurImage({ img_url }: { img_url: string }) {
    const [isLoading, setLoading] = useState(true)

    return (
        <Link href="#" className="group">
            <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                <Image
                    alt=""
                    src={img_url}
                    fill
                    style={{ objectFit: "cover" }}
                    className={cn(
                        'group-hover:opacity-75 duration-700 ease-in-out',
                        isLoading
                            ? 'grayscale blur-2xl scale-110'
                            : 'grayscale-0 blur-0 scale-100'
                    )}
                    onLoadingComplete={() => setLoading(false)}
                />
            </div>
            <h3 className="mt-4 text-sm">Lee Robinson</h3>
            <p className="mt-1 text-lg font-medium">@leeerob</p>
        </Link>
    );
}

export default function RentCard({ name, description, price, owner_id, img_url }: CardProps) {
    return (
        <div className="flex-col">
            <BlurImage img_url={img_url} />
            <h1>hi</h1>
        </div>
    );
};























