import RentCard from "@/app/components/RentCard"
import { ImageUploader } from "../components/ImageUploader";

export default function RentingPortal() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <ImageUploader />
        </main>
    );

}
