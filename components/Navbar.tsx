import Link from "next/link";
import UserNav from "./UserNav";

export default function Navbar() {
  return (
    <div className="w-full border-b">
      <div className="flex items-center justify-between container mx-auto px-5 lg:px-10 py-4">
        <Link href="/" className="text-3xl font-semibold text-primary">
          <span>stayscout</span>
        </Link>

        <div className="rounded-full border px-5 py-2">
          <h1>Hello from search</h1>
        </div>

        <UserNav />
      </div>
    </div>
  );
}
