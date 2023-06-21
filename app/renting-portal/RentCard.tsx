import BlurImage from "@/app/renting-portal/BlurImage";
import Image from "next/image";

type Image = {
  fileKey: string;
  fileUrl: string;
};

interface CardProps {
  name: string;
  description: string;
  price: number;
  owner_id: string;
  images: Image | any;
}

export default function RentCard({
  name,
  description,
  price,
  owner_id,
  images,
}: CardProps) {
  return (
    <div className="flex-col">
      <h1>{name}</h1>
      <p>{owner_id}</p>
      <BlurImage img_url={images[0].fileUrl} />
      <h2>{price}/per day</h2>
      <p>{description}</p>
    </div>
  );
}
