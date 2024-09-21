import { ArrowLeftCircle } from "lucide-react";
import Link from "next/link";

export default function BackButton({ text, link }) {
  return (
    <Link
      href={link}
      className="mb-5 flex items-center gap-1 font-bold text-gray-500 hover:underline"
    >
      <ArrowLeftCircle size={20} />
      {text}
    </Link>
  );
}
