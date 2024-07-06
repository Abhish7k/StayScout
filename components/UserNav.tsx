import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { LoginButton, LogoutButton, RegisterButton } from "./AuthButtons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { createHome } from "@/app/actions";

export default async function UserNav() {
  const { getUser } = getKindeServerSession();

  const user = await getUser();

  const createHomeWithId = createHome.bind(null, {
    userId: user?.id as string,
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-full hover:shadow-md transition-all">
        <div className="rounded-full border px-2 py-2 lg:px-4 lg:py-2 flex items-center gap-x-3">
          <MenuIcon className="w-6 h-6 lg:w-5 lg:h-5" />
          <img
            src={
              user?.picture ??
              "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
            }
            alt="user"
            className="rounded-full h-8 w-8 hidden lg:block"
          ></img>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px] bg-white">
        {user ? (
          <>
            <DropdownMenuItem>{user.given_name}</DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem>
              <form action={createHomeWithId} className="w-full">
                <button type="submit" className="w-full text-start">
                  List Your Home
                </button>
              </form>
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Link href="/myhomes" className="w-full">
                My Listings
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Link href="/favourites" className="w-full">
                My Favourites
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Link href="/my-reservations" className="w-full">
                My Reservation
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem>
              <LogoutButton />
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem>
              <RegisterButton />
            </DropdownMenuItem>

            <DropdownMenuItem>
              <LoginButton />
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
