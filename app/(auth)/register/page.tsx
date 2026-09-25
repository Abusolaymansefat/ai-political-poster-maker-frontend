"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { getApiErrorMessage } from "@/lib/api";
import { registerUser } from "@/app/services/auth.service";

const schema = z.object({
  name: z
    .string()
    .min(2, "Name is required"),

  email: z
    .string()
    .email("Valid email required"),

  password: z
    .string()
    .min(
      6,
      "Password must be at least 6 characters"
    )
});

type RegisterForm = z.infer<typeof schema>;

export default function RegisterPage() {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterForm>({
    resolver: zodResolver(schema)
  });

  const onSubmit = async (
    data: RegisterForm
  ) => {
    try {
      setLoading(true);

      await registerUser(data);

      toast.success(
        "Registration successful"
      );

      router.push("/login");
    } catch (error: unknown) {
      toast.error(
        getApiErrorMessage(error, "Registration failed")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4">
      <div className="w-full max-w-md rounded-xl border bg-background p-8 shadow-sm">
        <h1 className="mb-2 text-3xl font-bold">
          Create Account
        </h1>

        <p className="mb-6 text-muted-foreground">
          Start creating professional posters
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >
          <div className="space-y-2">
            <Label>Name</Label>

            <Input
              placeholder="Your name"
              {...register("name")}
            />

            {errors.name && (
              <p className="text-sm text-red-500">
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Email</Label>

            <Input
              type="email"
              placeholder="you@example.com"
              {...register("email")}
            />

            {errors.email && (
              <p className="text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Password</Label>

            <Input
              type="password"
              {...register("password")}
            />

            {errors.password && (
              <p className="text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full"
          >
            {loading
              ? "Creating..."
              : "Create Account"}
          </Button>
        </form>
      </div>
    </div>
  );
}