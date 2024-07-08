import UserNav from "./UserNav";
import SearchComponent from "./SearchComponent";

export default function Navbar() {
  return (
    <div className="w-full border-b">
      <div className="flex items-center justify-between container mx-auto px-5 lg:px-10 py-4">
        <a href="/" className="text-3xl font-semibold text-primary">
          <span>stayscout</span>
        </a>

        <SearchComponent />

        <UserNav />
      </div>
    </div>
  );
}
