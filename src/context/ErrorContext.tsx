"use client";

import { createContext, useContext } from "react";
import { toast } from "react-toastify";

interface ErrorHandlerContextType {
  showError: (message: string) => void;
  showSuccess: (message: string) => void;
}

/**
 * Context for managing global error and success notifications.
 */
const ErrorHandlerContext = createContext<ErrorHandlerContextType | undefined>(
  undefined
);

/**
 * Provides error and success handling using react-toastify.
 */
export const ErrorHandlerProvider = ({
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
    <ErrorHandlerContext.Provider value={{ showError, showSuccess }}>
      {children}
    </ErrorHandlerContext.Provider>
  );
};

/**
 * Hook for accessing the error handler.
 */
export const useErrorHandler = () => {
  const context = useContext(ErrorHandlerContext);
  if (!context) {
    throw new Error(
      "useErrorHandler must be used within an ErrorHandlerProvider"
    );
  }
  return context;
};
