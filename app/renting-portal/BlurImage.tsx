"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function BlurImage({ img_url }: { img_url: string }) {
  const [isLoading, setLoading] = useState(true);

  return (
    <div className="group">
      <div className="aspect-w-1 aspect-h-1 xl:aspect-w-7 xl:aspect-h-8 w-full overflow-hidden rounded-lg border-2 border-gray-600 bg-gray-200">
        <Image
          alt=""
          src={img_url}
          fill
          style={{ objectFit: "cover" }}
          className={cn(
            "duration-700 ease-in-out group-hover:opacity-75",
            isLoading
              ? "scale-110 blur-2xl grayscale"
              : "scale-100 blur-0 grayscale-0"
          )}
          onLoadingComplete={() => setLoading(false)}
        />
      </div>
    </div>
  );
}
