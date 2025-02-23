import { createContext, useContext, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { IUser } from "@/types/IUser";
import { fetchUserById } from "@/api/auth";

interface AuthContextType {
  user: IUser | null;
  isLoading: boolean;
  refreshUser: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  refreshUser: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();

  const isSessionLoading = status === "loading";

  const {
    data,
    isLoading: isUserLoading,
    refetch,
  } = useQuery({
    queryKey: ["user", session?.user?._id],
    queryFn: async () => {
      if (!session?.user?._id) return null;
      return await fetchUserById(session.user._id);
    },
    enabled: !!session?.user?._id && !isSessionLoading,
    staleTime: 1000 * 60 * 5,
  });

  const user: IUser | null = data ?? null;

  const refreshUser = useCallback(() => {
    refetch();
  }, [refetch]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading: isSessionLoading || isUserLoading,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
