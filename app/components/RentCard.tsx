interface CardProps {
  title: string;
  item: string;
  requester: string;
  status: string;
}

export default function RentCard({ title, item, requester, status } : CardProps) { 
  return (
    <div className="bg-white shadow-md rounded-lg p-4 min-w-[200px]">

      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p>Item: {item}</p>
      <p>Requester: {requester}</p>
      <p>Status: {status}</p>
    </div>
  );
};

