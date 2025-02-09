"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-red-100 text-red-700">
      <h1 className="text-3xl font-bold">Something went wrong</h1>
      <p className="text-lg">
        {error.message || "An unexpected error occurred."}
      </p>
      <button
        onClick={() => reset()}
        className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg"
      >
        Try Again
      </button>
    </div>
  );
}
