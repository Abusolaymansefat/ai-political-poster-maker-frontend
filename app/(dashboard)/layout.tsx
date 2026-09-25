"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSyncExternalStore } from "react";

import {
  LayoutDashboard,
  ImageIcon,
  PlusCircle,
  History,
  LogOut,
  ShieldCheck
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { getStoredUser, logout } from "@/lib/auth";

const subscribeToAuth = () => () => { };
const getAdminSnapshot = () =>
  getStoredUser()?.role === "admin";
const getServerAdminSnapshot = () => false;

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const isAdmin = useSyncExternalStore(
    subscribeToAuth,
    getAdminSnapshot,
    getServerAdminSnapshot
  );

  const handleLogout = () => {
    logout();

    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-muted/20">

      <header className="border-b bg-background">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

          <Link
            href="/dashboard"
            className="text-xl font-bold"
          >
            AI Poster Maker
          </Link>

          <Button
            variant="ghost"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>

        </div>
      </header>

      <div className="mx-auto flex max-w-7xl">

        <aside className="hidden min-h-[calc(100vh-64px)] w-64 border-r bg-background p-4 md:block">

          <nav className="space-y-2">

            <Link
              href="/dashboard"
              className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-muted"
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Link>

            <Link
              href="/templates"
              className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-muted"
            >
              <ImageIcon className="h-4 w-4" />
              Templates
            </Link>

            <Link
              href="/create-poster"
              className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-muted"
            >
              <PlusCircle className="h-4 w-4" />
              Create Poster
            </Link>

            <Link
              href="/posters"
              className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-muted"
            >
              <History className="h-4 w-4" />
              My Posters
            </Link>

            {isAdmin && (
              <Link
                href="/admin"
                className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-muted"
              >
                <ShieldCheck className="h-4 w-4" />
                Admin Dashboard
              </Link>
            )}

          </nav>

        </aside>

        <main className="min-w-0 flex-1">
          {children}
        </main>

      </div>
    </div>
  );
}