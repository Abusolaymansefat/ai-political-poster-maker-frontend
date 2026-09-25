"use client";

import { Suspense, useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import { useForm } from "react-hook-form";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import PhotoUploader from "@/components/poster/photo-uploader";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
  toast
} from "sonner";
import { getApiErrorMessage } from "@/lib/api";
import { useCreatePoster } from "@/app/hooks/use-posters";

const schema = z.object({
  name: z.string().min(2),

  designation: z
    .string()
    .min(2),

  party: z.string().optional(),

  organization:
    z.string().optional(),

  union:
    z.string().optional(),

  thana:
    z.string().optional(),

  district:
    z.string().optional(),

  occasion:
    z.string().min(1),

  headline:
    z.string().min(2)
});

type FormValues =
  z.infer<typeof schema>;

function CreatePosterForm() {
  const router = useRouter();

  const searchParams =
    useSearchParams();

  const templateId =
    searchParams.get("template");

  const [photos, setPhotos] =
    useState<File[]>([]);

  const mutation =
    useCreatePoster();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: zodResolver(schema),

    defaultValues: {
      occasion: "victory-day"
    }
  });

  const onSubmit = async (
    values: FormValues
  ) => {
    if (!templateId) {
      toast.error(
        "Please select a template"
      );
      return;
    }

    if (photos.length === 0) {
      toast.error(
        "Please upload at least one photo"
      );
      return;
    }

    try {
      const poster =
        await mutation.mutateAsync({
          templateId,

          ...values,

          photos
        });

      toast.success(
        "Poster generated successfully"
      );

      router.push(
        `/posters/${poster._id}`
      );
    } catch (error: unknown) {
      toast.error(
        getApiErrorMessage(error, "Poster generation failed")
      );
    }
  };

  const onInvalid = () => {
    toast.error("Please complete all required fields");
  };

  return (
    <div className="mx-auto max-w-5xl p-6">

      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Create Poster
        </h1>

        <p className="mt-2 text-muted-foreground">
          Enter your information and generate
          your poster.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit, onInvalid)}
        className="space-y-8"
      >

        <div className="grid gap-6 md:grid-cols-2">

          <div className="space-y-2">
            <Label>Name *</Label>

            <Input
              placeholder="আপনার নাম"
              {...register("name")}
            />

            {errors.name && (
              <p className="text-sm text-red-500">
                Name is required
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Designation *</Label>

            <Input
              placeholder="পদবি"
              {...register("designation")}
            />

            {errors.designation && (
              <p className="text-sm text-red-500">
                Designation is required
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label>
              Party / Organization
            </Label>

            <Input
              placeholder="দল / সংগঠন"
              {...register("party")}
            />
          </div>

          <div className="space-y-2">
            <Label>Organization</Label>

            <Input
              placeholder="সংগঠন"
              {...register(
                "organization"
              )}
            />
          </div>

          <div className="space-y-2">
            <Label>Union</Label>

            <Input
              placeholder="ইউনিয়ন"
              {...register("union")}
            />
          </div>

          <div className="space-y-2">
            <Label>Thana</Label>

            <Input
              placeholder="থানা"
              {...register("thana")}
            />
          </div>

          <div className="space-y-2">
            <Label>District</Label>

            <Input
              placeholder="জেলা"
              {...register("district")}
            />
          </div>

          <div className="space-y-2">
            <Label>Occasion *</Label>

            <select
              {...register("occasion")}
              className="h-10 w-full rounded-md border bg-background px-3"
            >
              <option value="victory-day">
                বিজয় দিবস
              </option>

              <option value="condolence">
                শোক ও স্মরণ
              </option>

              <option value="campaign">
                প্রচার
              </option>

              <option value="greeting">
                শুভেচ্ছা
              </option>

              <option value="eid">
                ঈদ
              </option>
            </select>
          </div>

        </div>

        <div className="space-y-2">
          <Label>Headline *</Label>

          <Textarea
            placeholder="মহান বিজয় দিবস"
            rows={3}
            {...register("headline")}
          />

          {errors.headline && (
            <p className="text-sm text-red-500">
              Headline is required
            </p>
          )}
        </div>

        <div className="space-y-3 rounded-xl border p-6">
          <div>
            <h2 className="font-semibold">
              Upload Photos
            </h2>

            <p className="text-sm text-muted-foreground">
              Upload up to 3 photos.
            </p>
          </div>

          <PhotoUploader
            files={photos}
            onChange={setPhotos}
          />
        </div>

        <Button
          type="submit"
          size="lg"
          disabled={mutation.isPending}
          className="w-full"
        >
          {mutation.isPending
            ? "Generating Poster..."
            : "Generate Poster"}
        </Button>

      </form>
    </div>
  );
}

export default function CreatePosterPage() {
  return (
    <Suspense fallback={<div className="p-6">Loading...</div>}>
      <CreatePosterForm />
    </Suspense>
  );
}