import { HeartHandshake } from "lucide-react";
import { ReactNode } from "react";

export default function StatCard({
    title,
    value,
    svgComp,
}: {
    title: string;
    value: number;
    svgComp?: ReactNode;
}) {
    return (
        <div className="flex flex-col">
            <div className="ml-3 mr-3 mt-3 rounded-lg border-2 border-black bg-white p-4 shadow-md">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-xl font-bold">{title}</h2>
                    {svgComp}
                </div>
                <p className="mb-4 text-gray-600">{value}</p>
            </div>
        </div>
    );
}
