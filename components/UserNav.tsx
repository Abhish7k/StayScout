import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { LoginButton, LogoutButton, RegisterButton } from "./AuthButtons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { MenuIcon } from "lucide-react";

export default async function UserNav() {
  const { getUser } = getKindeServerSession();

  const user = await getUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
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
