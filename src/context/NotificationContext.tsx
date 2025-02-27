"use client";

import { createContext, useContext } from "react";
import { toast } from "react-toastify";

interface NotificationContextType {
  showError: (message: string) => void;
  showSuccess: (message: string) => void;
}

/**
 * Context for managing global error and success notifications.
 */
const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

/**
 * Provides error and success handling using react-toastify.
 */
export const NotificationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const showError = (message: string) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const showSuccess = (message: string) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  return (
    <NotificationContext.Provider value={{ showError, showSuccess }}>
      {children}
    </NotificationContext.Provider>
  );
};

/**
 * Hook for accessing the error handler.
 */
export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context)
    throw new Error(
      "useNotification must be used within an NotificationProvider"
    );

  return context;
};
