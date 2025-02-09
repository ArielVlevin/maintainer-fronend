"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@/app/globals.css";
import Providers from "./provider";

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </Providers>
      </body>
    </html>
  );
}
