import type { Metadata } from "next";

import "./globals.css";
import QueryProvider from "./providers/query-provider";
import { Toaster } from "sonner";


export const metadata: Metadata = {
  title: "AI Political Poster Maker",
  description:
    "Create professional Bangla political and community posters with AI assistance."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn">
      <body>
        <QueryProvider>
          {children}
        </QueryProvider>
        <Toaster
          position="top-right"
          richColors
        />
      </body>
    </html>
  );
}