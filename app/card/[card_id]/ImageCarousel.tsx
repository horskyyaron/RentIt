"use client";
import { ArrowBigLeftDash, ArrowBigRightDash } from "lucide-react";
import { Image as ImageType } from "@/lib/types";
import Image from "next/image";
import { useState } from "react";

export default function ImageCarousel({ images }: { images: ImageType[] }) {
    const [index, setIndex] = useState(0);
    console.log(index);

    return (
        <div>
            <Image
                alt=""
                src={images[index].fileUrl}
                width={300}
                height={300}
                style={{ objectFit: "cover" }}
                className="rounded-lg shadow-md"
            />
            <div className="mt-3 flex items-center justify-between">
                <ArrowBigLeftDash
                    width={35}
                    height={35}
                    className="rounded-full bg-blue-400 hover:cursor-pointer hover:bg-blue-200"
                    onClick={() => {
                        let temp = index - 1;
                        if (temp < 0) {
                            temp = images.length - 1;
                        }
                        setIndex(temp);
                    }}
                />
                {images.length == 1 ? "1 pic" : `${images.length} pics`}
                <ArrowBigRightDash
                    width={35}
                    height={35}
                    className="rounded-full bg-blue-400 hover:cursor-pointer hover:bg-blue-200"
                    onClick={() => {
                        let temp = (index + 1) % images.length;
                        setIndex(temp);
                    }}
                />
            </div>
        </div>
    );
}
