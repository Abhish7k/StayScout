import ListingCard from "@/components/ListingCard";
import MapFilterItems from "@/components/MapFilterItems";
import prisma from "@/lib/db";

async function getData({
  searchParams,
}: {
  searchParams?: {
    filter: string;
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
    },
  });

  return data;
}

export default async function Home({
  searchParams,
}: {
  searchParams?: {
    filter?: string;
  };
}) {
  const data = await getData({ searchParams: searchParams });

  return (
    <main className="container mx-auto px-5 lg:px-10 mb-20">
      <MapFilterItems />
      <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-10">
        {data.map((item, idx) => (
          <ListingCard
            key={idx}
            description={item.description as string}
            imagePath={item.photo as string}
            price={item.price as number}
            location={item.country as string}
            city={item.city as string}
          />
        ))}
      </div>
    </main>
  );
}
