"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@/app/globals.css";
import Providers from "./provider";
import Layout from "@/components/layout/Layout";

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
            <Layout>{children}</Layout>
          </QueryClientProvider>
        </Providers>
      </body>
    </html>
  );
}
