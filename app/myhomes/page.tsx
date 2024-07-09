import React from "react";
import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { NoItems } from "@/components/NoItems";
import ListingCard from "@/components/ListingCard";
import { unstable_noStore as noStore } from "next/cache";

async function getData(userId: string) {
  noStore();

  const data = await prisma.home.findMany({
    where: {
      userId: userId,
      addedCategory: true,
      addedDescription: true,
      addedLocation: true,
    },

    select: {
      id: true,
      country: true,
      city: true,
      photo: true,
      title: true,
      description: true,
      price: true,
      Favourite: {
        where: {
          userId: userId,
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  return data;
}

export default async function page() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/");
  }

  const data = await getData(user.id);

  return (
    <section className="container mx-auto px-5 lg:px-10 mt-10">
      <div className="text-3xl font-semibold tracking-tight">Your Homes</div>

      {data.length === 0 ? (
        <NoItems
          description="Please list a hoeme on airbnb so that you can see it right here"
          title="Your dont have any Homes listed"
        />
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-8">
          {data.map((item) => (
            <ListingCard
              key={item.id}
              imagePath={item.photo as string}
              homeId={item.id}
              price={item.price as number}
              title={item.title as string}
              description={item.description as string}
              location={item.country as string}
              city={item.city as string}
              userId={user.id}
              pathName="/my-homes"
              favoriteId={item.Favourite[0]?.id}
              isInFavoriteList={item.Favourite.length > 0 ? true : false}
            />
          ))}
        </div>
      )}
    </section>
  );
}
