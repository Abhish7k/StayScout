import { useCountries } from "@/lib/countries";
import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { AddToFavouriteButton } from "./SubmitButton";
import { addToFavourite } from "@/app/actions";

interface iAppProps {
  imagePath: string;
  description: string;
  location: string;
  city: string;
  price: number;
  userId: string | undefined;
  isInFavoriteList: boolean;
  favoriteId: string;
  homeId: string;
  // pathName: string;
}

export default function ListingCard({
  description,
  imagePath,
  location,
  city,
  price,
  userId,
  isInFavoriteList,
  favoriteId,
  homeId,
}: iAppProps) {
  const { getCountryByValue } = useCountries();
  const country = getCountryByValue(location);

  return (
    <div className="flex flex-col">
      <div className="relative h-72">
        <Link href={"/"}>
          <Image
            src={`https://wzkljcmrurwndgrcbxuz.supabase.co/storage/v1/object/public/images/${imagePath}`}
            alt="house image"
            fill
            className="rounded-lg object-cover mb-2"
          />
        </Link>

        {userId && (
          <div className="z-10 absolute top-2 right-2 rounded-full hover:scale-110">
            {isInFavoriteList ? (
              <form>
                <AddToFavouriteButton />
              </form>
            ) : (
              <form action={addToFavourite}>
                <input type="hidden" name="userId" value={userId} />
                <input type="hidden" name="homeId" value={homeId} />
                <AddToFavouriteButton />
              </form>
            )}
          </div>
        )}
      </div>

      <Link href={"/"}>
        <h3 className="font-medium text-base mt-4">
          <span className="capitalize">{city},</span> {country?.label}
        </h3>
        <p className="text-muted-foreground text-sm line-clamp-2">
          {description}
        </p>
        <p className="pt-2 text-muted-foreground">
          <span className="font-medium text-black">₹{price}</span> night
        </p>
      </Link>
    </div>
  );
}
