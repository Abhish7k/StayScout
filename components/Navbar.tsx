import UserNav from "./UserNav";
import SearchComponent from "./SearchComponent";

export default function Navbar() {
  return (
    <div className="w-full border-b sticky top-0 bg-white z-10">
      <div className="flex items-center justify-between container mx-auto px-5 lg:px-10 py-4">
        <a href="/" className="text-3xl font-semibold text-primary">
          <span>stayscout</span>
        </a>

        <div className="hidden md:block transition-all ease-in-out">
          <SearchComponent />
        </div>

        <div className="flex gap-4">
          <div className="md:hidden">
            <SearchComponent />
          </div>
          <UserNav />
        </div>
      </div>
    </div>
  );
}
