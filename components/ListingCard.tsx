import { useCountries } from "@/lib/countries";
import Image from "next/image";
import Link from "next/link";
import {
  AddToFavouriteButton,
  DeleteFromFavouriteButton,
} from "./SubmitButton";
import { addToFavourite, deleteFromFavorite } from "@/app/actions";

interface iAppProps {
  imagePath: string;
  title: string;
  description: string;
  location: string;
  city: string;
  price: number;
  userId: string | undefined;
  isInFavoriteList: boolean;
  favoriteId: string;
  homeId: string;
  pathName: string;
}

export default function ListingCard({
  title,
  description,
  imagePath,
  location,
  city,
  price,
  userId,
  isInFavoriteList,
  favoriteId,
  homeId,
  pathName,
}: iAppProps) {
  const { getCountryByValue } = useCountries();
  const country = getCountryByValue(location);

  return (
    <div className="flex flex-col hover:opacity-95 transition-all">
      <div className="relative h-72">
        <Link href={`/home/${homeId}`}>
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
              <form action={deleteFromFavorite}>
                <input type="hidden" name="userId" value={userId} />
                <input type="hidden" name="favoriteId" value={favoriteId} />
                <input type="hidden" name="pathName" value={pathName} />

                <DeleteFromFavouriteButton />
              </form>
            ) : (
              <form action={addToFavourite}>
                <input type="hidden" name="userId" value={userId} />
                <input type="hidden" name="homeId" value={homeId} />
                <input type="hidden" name="pathName" value={pathName} />

                <AddToFavouriteButton />
              </form>
            )}
          </div>
        )}
      </div>

      <Link href={`/home/${homeId}`}>
        <h3 className="font-medium text-base mt-4">
          <span className="capitalize">{city},</span> {country?.label}
        </h3>
        <p className="text-muted-foreground text-sm line-clamp-2">{title}</p>
        <p className="pt-2 text-muted-foreground">
          <span className="font-medium text-black">${price}</span> night
        </p>
      </Link>
    </div>
  );
}
