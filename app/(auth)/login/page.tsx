"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { saveAuth } from "@/lib/auth";
import { getApiErrorMessage } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { toast } from "sonner";
import { loginUser } from "@/app/services/auth.service";

const schema = z.object({
  email: z.string().email("Valid email required"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
});

type LoginForm = z.infer<typeof schema>;

export default function LoginPage() {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginForm>({
    resolver: zodResolver(schema)
  });

  const onSubmit = async (
    data: LoginForm
  ) => {
    try {
      setLoading(true);

      const response =
        await loginUser(data);

      saveAuth(
        response.data.token,
        response.data.user
      );

      toast.success("Login successful");

      router.push("/dashboard");
    } catch (error: unknown) {
      toast.error(
        getApiErrorMessage(error, "Login failed")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4">
      <div className="w-full max-w-md rounded-xl border bg-background p-8 shadow-sm">
        <h1 className="mb-2 text-3xl font-bold">
          Login
        </h1>

        <p className="mb-6 text-muted-foreground">
          Login to create your poster
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >
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
              placeholder="********"
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
              ? "Logging in..."
              : "Login"}
          </Button>
        </form>
      </div>
    </div>
  );
}