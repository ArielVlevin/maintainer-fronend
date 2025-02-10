"use client";

import Layout from "@/components/layout/Layout";
import { AuthProvider } from "@/context/authContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Layout>{children}</Layout>
        </AuthProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
