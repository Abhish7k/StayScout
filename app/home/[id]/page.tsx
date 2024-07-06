import React from "react";
import prisma from "@/lib/db";
import Image from "next/image";
import { useCountries } from "@/lib/countries";
import { Dot } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { CaegoryShowcase } from "@/components/CaegoryShowcase";
import { HomeMap } from "@/components/HomeMap";

async function getData(homeId: string) {
  const data = await prisma.home.findUnique({
    where: {
      id: homeId,
    },

    select: {
      photo: true,
      description: true,
      guests: true,
      bedrooms: true,
      bathrooms: true,
      title: true,
      categoryName: true,
      price: true,
      country: true,
      city: true,

      User: {
        select: {
          firstName: true,
          profileImage: true,
        },
      },
    },
  });

  return data;
}

export default async function HomeRoute({
  params,
}: {
  params: { id: string };
}) {
  const homeId = params.id;

  const data = await getData(homeId);

  const { getCountryByValue } = useCountries();
  const country = getCountryByValue(data?.country as string);

  return (
    <div className="mx-[15%] my-10">
      <h1 className="font-medium text-3xl mt-5 mb-5">{data?.title}</h1>
      <div className="relative h-[600px]">
        <Image
          src={`https://wzkljcmrurwndgrcbxuz.supabase.co/storage/v1/object/public/images/${data?.photo}`}
          alt="home-image"
          fill
          className="rounded-lg h-full object-cover w-full"
        />
      </div>

      <div className="flex justify-between gap-x-24 mt-10">
        <div className="w-2/3">
          <h3 className="text-xl font-medium capitalize">
            {data?.city}, {country?.label}
          </h3>

          <div className="flex items-center mt-2 text-muted-foreground">
            <p>{data?.guests} Guests</p>
            <Dot />
            <p>{data?.bedrooms} Bedrooms</p>
            <Dot />
            {data?.bathrooms} Bathrooms
          </div>

          <div className="mt-10 flex flex-col gap-4">
            <Separator />

            <div className="flex items-center">
              <img
                src={
                  data?.User?.profileImage ??
                  "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
                }
                alt="User Profile"
                className="w-10 h-10 rounded-full"
              />
              <div className="flex items-center ml-4">
                <h3 className="font-medium">
                  Hosted by {data?.User?.firstName}
                </h3>
              </div>
            </div>

            <Separator className="mb-5" />

            <CaegoryShowcase categoryName={data?.categoryName as string} />

            <Separator className="my-5" />

            <p className="text-muted-foreground">{data?.description}</p>

            <Separator className="my-10" />

            <div className="flex flex-col w-full">
              <div className="mb-5">
                <h1 className="text-xl font-medium">Where you&apos;ll be</h1>
                <h4 className="capitalize mt-2">
                  {data?.city}, {country?.label}
                </h4>
              </div>
              <HomeMap locationValue={country?.value as string} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
