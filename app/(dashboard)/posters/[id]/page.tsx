"use client";

import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

import { useParams, useRouter } from "next/navigation";


import { Button } from "@/components/ui/button";
import { getApiErrorMessage } from "@/lib/api";
import {
  useDeletePoster,
  usePoster,
  useRegeneratePoster
} from "@/app/hooks/use-posters";

export default function PosterDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;

  const {
    data: poster,
    isLoading,
    isError
  } = usePoster(id);

  const regenerate = useRegeneratePoster();
  const remove = useDeletePoster();

  const handleRegenerate = async () => {
    try {
      await regenerate.mutateAsync(id);
      window.location.reload();
    } catch (error: unknown) {
      window.alert(
        getApiErrorMessage(error, "Poster regeneration failed")
      );
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this poster?")) {
      return;
    }

    try {
      await remove.mutateAsync(id);
      toast.success("Poster deleted successfully");
      router.push("/posters");
    } catch (error: unknown) {
      toast.error(getApiErrorMessage(error, "Poster deletion failed"));
    }
  };

  if (isLoading) {
    return (
      <div className="p-10 text-center">
        Loading poster...
      </div>
    );
  }

  if (isError || !poster) {
    return (
      <div className="p-10 text-center">
        Poster not found.
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl p-6">

      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Poster Preview
          </h1>

          <p className="text-muted-foreground">
            {poster.formData.headline}
          </p>
        </div>

        <Button asChild>
          <Link href="/posters">
            History
          </Link>
        </Button>
      </div>

      {poster.status ===
        "generating" && (
          <div className="rounded-xl border p-10 text-center">
            <p className="text-lg font-semibold">
              Your poster is being generated...
            </p>

            <p className="mt-2 text-muted-foreground">
              Please wait.
            </p>
          </div>
        )}

      {poster.status ===
        "failed" && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-10 text-center">
            <h2 className="font-semibold text-red-600">
              Generation Failed
            </h2>

            <p className="mt-2 text-red-500">
              {poster.generationError}
            </p>
          </div>
        )}

      {poster.status ===
        "completed" &&
        poster.generatedImageUrl && (
          <div className="space-y-6">

            <div className="mx-auto max-w-2xl overflow-hidden rounded-xl border shadow-lg">
              <Image
                src={
                  poster.generatedImageUrl
                }
                alt={
                  poster.formData.headline
                }
                width={1200}
                height={1600}
                className="h-auto w-full"
              />
            </div>

            <div className="flex flex-wrap justify-center gap-3">

              <Button asChild>
                <a
                  href={
                    poster.generatedImageUrl
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open Full Size
                </a>
              </Button>

              <Button
                variant="outline"
                asChild
              >
                <a
                  href={
                    poster.generatedImageUrl
                  }
                  download
                >
                  Download PNG
                </a>
              </Button>

              <Button
                variant="outline"
                onClick={() => window.print()}
              >
                Save PDF
              </Button>

              <Button
                variant="outline"
                onClick={handleRegenerate}
                disabled={regenerate.isPending}
              >
                {regenerate.isPending
                  ? "Regenerating..."
                  : "Regenerate"}
              </Button>

              <Button
                variant="destructive"
                onClick={handleDelete}
                disabled={remove.isPending}
              >
                Delete
              </Button>

            </div>

          </div>
        )}

    </div>
  );
}