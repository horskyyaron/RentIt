"use client"
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function BlurImage({ img_url }: { img_url: string }) {
  const [isLoading, setLoading] = useState(true);

  return (
      <div className="border-gray-600 border-2 w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
        <Image
          alt=""
          src={img_url}
          fill
          style={{ objectFit: "cover" }}
          className={cn(
            "group-hover:opacity-75 duration-700 ease-in-out",
            isLoading
              ? "grayscale blur-2xl scale-110"
              : "grayscale-0 blur-0 scale-100"
          )}
          onLoadingComplete={() => setLoading(false)}
        />
      </div>
  );
}
