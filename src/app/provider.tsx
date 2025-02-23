"use client";

import Layout from "@/components/layout/Layout";
import { AuthProvider } from "@/context/authContext";
import { ErrorHandlerProvider } from "@/context/ErrorContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ErrorHandlerProvider>
            <Layout>{children}</Layout>
            {isClient && (
              <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar
              />
            )}
          </ErrorHandlerProvider>
        </AuthProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
