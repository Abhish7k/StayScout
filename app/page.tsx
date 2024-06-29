import ListingCard from "@/components/ListingCard";
import MapFilterItems from "@/components/MapFilterItems";
import { NoItems } from "@/components/NoItems";
import { SkeltonCard } from "@/components/SkeltonCard";
import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Suspense } from "react";

async function getData({
  userId,
  searchParams,
}: {
  userId: string | undefined;
  searchParams?: {
    filter?: string;
  };
}) {
  const data = await prisma.home.findMany({
    where: {
      addedCategory: true,
      addedLocation: true,
      addedDescription: true,
      categoryName: searchParams?.filter ?? undefined,
    },
    select: {
      photo: true,
      id: true,
      price: true,
      description: true,
      country: true,
      city: true,
      Favourite: {
        where: {
          userId: userId ?? undefined,
        },
      },
    },
  });

  return data;
}

export default function Home({
  searchParams,
}: {
  searchParams?: {
    filter?: string;
  };
}) {
  return (
    <main className="container mx-auto px-5 lg:px-10 mb-20">
      <MapFilterItems />

      <Suspense key={searchParams?.filter} fallback={<SkeletonLoading />}>
        <ShowItems searchParams={searchParams} />
      </Suspense>
    </main>
  );
}

async function ShowItems({
  searchParams,
}: {
  searchParams?: {
    filter?: string;
  };
}) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const data = await getData({ userId: user?.id, searchParams: searchParams });

  return (
    <>
      {data.length === 0 ? (
        <NoItems
          description="Please check a other category or create your own listing!"
          title="Sorry no listings found for this category..."
        />
      ) : (
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-10">
          {data.map((item, idx) => (
            <ListingCard
              key={idx}
              description={item.description as string}
              imagePath={item.photo as string}
              price={item.price as number}
              location={item.country as string}
              city={item.city as string}
              userId={user?.id as string}
              favoriteId={item.Favourite[0]?.id}
              isInFavoriteList={item.Favourite.length > 0 ? true : false}
              homeId={item.id}
              pathName="/"
            />
          ))}
        </div>
      )}
    </>
  );
}

function SkeletonLoading() {
  return (
    <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
      <SkeltonCard />
      <SkeltonCard />
      <SkeltonCard />
      <SkeltonCard />
    </div>
  );
}
