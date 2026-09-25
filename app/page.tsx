import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="min-h-screen">

      <section className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-950 via-green-800 to-red-900 px-6 text-white">

        <div className="mx-auto max-w-4xl text-center">

          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-white/70">
            AI Political Poster Maker
          </p>

          <h1 className="text-5xl font-black leading-tight md:text-7xl">
            Create Professional
            <br />
            Bangla Posters with AI
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80">
            Choose a template, upload your photos,
            add your information and generate a
            print-ready poster.
          </p>

          <div className="mt-8 flex justify-center gap-4">

            <Button
              size="lg"
              asChild
              variant="secondary"
            >
              <Link href="/register">
                Get Started
              </Link>
            </Button>

            <Button
              size="lg"
              asChild
              variant="outline"
              className="text-black"
            >
              <Link href="/login">
                Login
              </Link>
            </Button>

          </div>

        </div>

      </section>

    </main>
  );
}