"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { Heart, Loader2 } from "lucide-react";

export function CreationSubmit() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button disabled size="lg">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please Wait
        </Button>
      ) : (
        <Button type="submit" size="lg">
          Next
        </Button>
      )}
    </>
  );
}

export function AddToFavouriteButton() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <button className="bg-[#DCE6F1] p-1.5 rounded-full hover:bg-white transition-all">
          <Loader2 className="h-4 w-4 animate-spin text-primary" />
        </button>
      ) : (
        <button
          className="bg-[#DCE6F1] p-1.5 rounded-full hover:bg-white transition-all"
          type="submit"
        >
          <Heart className="w-4 h-4 " />
        </button>
      )}
    </>
  );
}
