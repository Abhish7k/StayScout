import ListingCard from "@/components/ListingCard";
import MapFilterItems from "@/components/MapFilterItems";
import prisma from "@/lib/db";

async function getData() {
  const data = await prisma.home.findMany({
    where: {
      addedCategory: true,
      addedLocation: true,
      addedDescription: true,
    },
    select: {
      photo: true,
      id: true,
      price: true,
      description: true,
    },
  });

  return data;
}

export default async function Home() {
  const data = await getData();

  return (
    <main className="container mx-auto px-5 lg:px-10">
      <MapFilterItems />
      <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-10">
        {data.map((item, idx) => (
          <ListingCard
            key={idx}
            description={item.description as string}
            imagePath={item.photo as string}
            price={item.price as number}
          />
        ))}
      </div>
    </main>
  );
}
