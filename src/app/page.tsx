import Link from "next/link";
import { LatestPost } from "@/app/_components/post";
import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default function Home() {
  return (
    <div style={{
      padding: `clamp(1rem, 2vw, 2rem)`,
      gap: `clamp(0.5rem, 1vw, 1.5rem)`,
      fontSize: `clamp(1.5rem, 3vw, 2.5rem)`,
    }} className="flex text-red-600">
      <Link href="/create">Create</Link>
      <Link href="/dashboard">Dashboard</Link>
      
    </div>
  );
}
