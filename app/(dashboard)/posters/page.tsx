"use client";

import Image from "next/image";
import Link from "next/link";

import {
  Card,
  CardContent
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { useMyPosters } from "@/app/hooks/use-posters";

export default function PostersPage() {
  const {
    data: posters = [],
    isLoading
  } = useMyPosters();

  if (isLoading) {
    return (
      <div className="p-10 text-center">
        Loading history...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl p-6">

      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          My Posters
        </h1>

        <p className="mt-2 text-muted-foreground">
          View and download your previous posters.
        </p>
      </div>

      {posters.length === 0 ? (
        <div className="rounded-xl border p-12 text-center">
          <h2 className="text-xl font-semibold">
            No posters yet
          </h2>

          <p className="mt-2 text-muted-foreground">
            Create your first poster.
          </p>

          <Button
            asChild
            className="mt-5"
          >
            <Link href="/templates">
              Browse Templates
            </Link>
          </Button>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

          {posters.map((poster) => (
            <Card
              key={poster._id}
              className="overflow-hidden"
            >

              {poster.generatedImageUrl ? (
                <div className="relative aspect-[3/4]">
                  <Image
                    src={
                      poster.generatedImageUrl
                    }
                    alt={
                      poster.formData.headline
                    }
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="flex aspect-[3/4] items-center justify-center bg-muted">
                  {poster.status}
                </div>
              )}

              <CardContent className="space-y-3 p-4">

                <div>
                  <h3 className="font-semibold">
                    {poster.formData.headline}
                  </h3>

                  <p className="text-sm text-muted-foreground">
                    {poster.formData.name}
                  </p>
                </div>

                <Button
                  asChild
                  className="w-full"
                >
                  <Link
                    href={`/posters/${poster._id}`}
                  >
                    View Poster
                  </Link>
                </Button>

              </CardContent>

            </Card>
          ))}

        </div>
      )}

    </div>
  );
}