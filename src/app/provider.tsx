"use client";

import LayoutWrapper from "@/components/layout/LayoutWrapper";
import { AuthProvider } from "@/context/authContext";
import { NotificationProvider } from "@/context/NotificationContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <NotificationProvider>
            <LayoutWrapper pathname={pathname}>{children}</LayoutWrapper>
            {isClient && (
              <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar
              />
            )}
          </NotificationProvider>
        </AuthProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
