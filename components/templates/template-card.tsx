"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Template } from "@/app/types/template";

interface Props {
  template: Template;
  priority?: boolean;
}

export default function TemplateCard({
  template,
  priority = false
}: Props) {
  return (
    <Card className="overflow-hidden">
      <div className="relative aspect-[3/4]">
        <Image
          src={template.thumbnailUrl}
          alt={template.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          priority={priority}
          className="object-cover"
        />
      </div>

      <CardContent className="space-y-3 p-4">
        <div>
          <h3 className="font-semibold">
            {template.title}
          </h3>

          <p className="text-sm text-muted-foreground">
            {template.occasionType}
          </p>
        </div>

        <Button
          asChild
          className="w-full"
        >
          <Link
            href={`/create-poster?template=${template._id}`}
          >
            Use Template
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}