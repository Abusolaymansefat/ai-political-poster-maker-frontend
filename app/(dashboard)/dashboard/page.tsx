"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

import {
  useMyPosters
} from "@/app/hooks/use-posters";

export default function DashboardPage() {
  const {
    data: posters = []
  } = useMyPosters();

  const completed =
    posters.filter(
      (poster) =>
        poster.status === "completed"
    ).length;

  const generating =
    posters.filter(
      (poster) =>
        poster.status === "generating"
    ).length;

  return (
    <div className="p-6">

      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div>
          <h1 className="text-3xl font-bold">
            Dashboard
          </h1>

          <p className="mt-2 text-muted-foreground">
            Manage your AI-generated posters.
          </p>
        </div>

        <Button asChild>
          <Link href="/templates">
            Create New Poster
          </Link>
        </Button>

      </div>

      <div className="grid gap-4 md:grid-cols-3">

        <Card>
          <CardHeader>
            <CardTitle>
              Total Posters
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold">
              {posters.length}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              Completed
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold">
              {completed}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              Generating
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold">
              {generating}
            </p>
          </CardContent>
        </Card>

      </div>

    </div>
  );
}