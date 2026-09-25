"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
      Card,
      CardContent,
      CardHeader,
      CardTitle
} from "@/components/ui/card";
import { getApiErrorMessage } from "@/lib/api";
import { getStoredUser } from "@/lib/auth";
import {
      useAdminPosters,
      useAdminUsers,
      useDeleteAdminPoster,
      useDeleteAdminUser
} from "@/app/hooks/use-admin";

const subscribeToAuth = () => () => { };
const getAdminSnapshot = () =>
      getStoredUser()?.role === "admin";
const getServerAdminSnapshot = () => false;

export default function AdminPage() {
      const isAdmin = useSyncExternalStore(
            subscribeToAuth,
            getAdminSnapshot,
            getServerAdminSnapshot
      );
      const { data: users = [], isLoading: usersLoading } =
            useAdminUsers(isAdmin);
      const { data: posters = [], isLoading: postersLoading } =
            useAdminPosters(isAdmin);
      const deleteUser = useDeleteAdminUser();
      const deletePoster = useDeleteAdminPoster();

      const handleDeleteUser = async (id: string) => {
            if (!window.confirm("Delete this user and all of their posters?")) {
                  return;
            }

            try {
                  await deleteUser.mutateAsync(id);
                  toast.success("User deleted");
            } catch (error: unknown) {
                  toast.error(getApiErrorMessage(error, "User deletion failed"));
            }
      };

      const handleDeletePoster = async (id: string) => {
            if (!window.confirm("Delete this poster?")) {
                  return;
            }

            try {
                  await deletePoster.mutateAsync(id);
                  toast.success("Poster deleted");
            } catch (error: unknown) {
                  toast.error(getApiErrorMessage(error, "Poster deletion failed"));
            }
      };

      if (!isAdmin) {
            return (
                  <div className="p-10 text-center">
                        <h1 className="text-2xl font-bold">Admin access required</h1>
                        <Button asChild className="mt-4">
                              <Link href="/dashboard">Back to dashboard</Link>
                        </Button>
                  </div>
            );
      }

      return (
            <div className="mx-auto max-w-7xl space-y-8 p-6">
                  <div>
                        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                        <p className="mt-2 text-muted-foreground">
                              Manage registered users and generated posters.
                        </p>
                  </div>

                  <Card>
                        <CardHeader>
                              <CardTitle>Users ({users.length})</CardTitle>
                        </CardHeader>
                        <CardContent>
                              {usersLoading ? (
                                    <p>Loading users...</p>
                              ) : users.length === 0 ? (
                                    <p className="text-muted-foreground">No users found.</p>
                              ) : (
                                    <div className="divide-y">
                                          {users.map((user) => (
                                                <div
                                                      key={user.id}
                                                      className="flex flex-wrap items-center justify-between gap-3 py-3"
                                                >
                                                      <div>
                                                            <p className="font-medium">{user.name}</p>
                                                            <p className="text-sm text-muted-foreground">
                                                                  {user.email} · {user.role}
                                                            </p>
                                                      </div>
                                                      <Button
                                                            variant="destructive"
                                                            onClick={() => handleDeleteUser(user.id)}
                                                            disabled={deleteUser.isPending || user.role === "admin"}
                                                      >
                                                            Delete User
                                                      </Button>
                                                </div>
                                          ))}
                                    </div>
                              )}
                        </CardContent>
                  </Card>

                  <Card>
                        <CardHeader>
                              <CardTitle>Posters ({posters.length})</CardTitle>
                        </CardHeader>
                        <CardContent>
                              {postersLoading ? (
                                    <p>Loading posters...</p>
                              ) : posters.length === 0 ? (
                                    <p className="text-muted-foreground">No posters found.</p>
                              ) : (
                                    <div className="divide-y">
                                          {posters.map((poster) => (
                                                <div
                                                      key={poster._id}
                                                      className="flex flex-wrap items-center justify-between gap-3 py-3"
                                                >
                                                      <div>
                                                            <p className="font-medium">{poster.formData.headline}</p>
                                                            <p className="text-sm text-muted-foreground">
                                                                  {poster.formData.name} · {poster.status}
                                                            </p>
                                                      </div>
                                                      <div className="flex gap-2">
                                                            <Button variant="outline" asChild>
                                                                  <Link href={`/posters/${poster._id}`}>View</Link>
                                                            </Button>
                                                            <Button
                                                                  variant="destructive"
                                                                  onClick={() => handleDeletePoster(poster._id)}
                                                                  disabled={deletePoster.isPending}
                                                            >
                                                                  Delete Poster
                                                            </Button>
                                                      </div>
                                                </div>
                                          ))}
                                    </div>
                              )}
                        </CardContent>
                  </Card>
            </div>
      );
}