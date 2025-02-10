import { createContext, useContext, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { IUser } from "@/types";
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

  // ✅ אם `status === "loading"`, נמתין לטעינה
  const isSessionLoading = status === "loading";

  // ✅ `useQuery` לשליפת המשתמש (עם ערך ברירת מחדל `null`)
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
    enabled: !!session?.user?._id && !isSessionLoading, // ✅ לא מפעיל עד שה-`session` סיים להיטען
    staleTime: 1000 * 60 * 5, // נתונים נשמרים במטמון ל-5 דקות
  });

  // ✅ לוודא שהמשתמש תמיד `IUser | null`
  const user: IUser | null = data ?? null;

  // ✅ פונקציה לרענון המשתמש
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
