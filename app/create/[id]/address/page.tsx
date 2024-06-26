"use client";

import { createLocation } from "@/app/actions";
import CreationBottomBar from "@/components/CreationBottomBar";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useCountries } from "@/lib/countries";
import dynamic from "next/dynamic";
import { useState } from "react";

export default function AddressPage({ params }: { params: { id: string } }) {
  const { getAllCountries } = useCountries();
  const [locationValue, setLocationValue] = useState("");

  const LazyMap = dynamic(() => import("@/components/Map"), {
    ssr: false,
    loading: () => <Skeleton className="h-[50vh] w-[60%] mx-auto" />,
  });

  return (
    <>
      <div className="w-3/5 mx-auto">
        <h2 className="text-3xl font-semibold tracking-tight transition-colors mb-10">
          Where is your Home located?
        </h2>
      </div>

      <form action={createLocation}>
        <input type="hidden" name="homeId" value={params.id} />
        <input type="hidden" name="countryValue" value={locationValue} />
        <div className="w-3/5 mx-auto mb-10">
          <div className="mb-5">
            <Select required onValueChange={(value) => setLocationValue(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a Country" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Countries</SelectLabel>
                  {getAllCountries().map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.flag} {item.label} / {item.region}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="w-3/5 mx-auto mb-10">
          <div className="mb-5">
            <Input placeholder="Enter City" name="city" />
          </div>
        </div>

        <LazyMap locationValue={locationValue} />

        <CreationBottomBar />
      </form>
    </>
  );
}
