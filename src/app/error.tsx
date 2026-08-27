"use client";

import { useEffect } from "react";

const ErrorPage = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="min-h-[70vh] flex items-center justify-center">
      <div className="flex flex-col items-center justify-center text-center px-6">
        <h1 className="h2 mb-4">Something went wrong</h1>
        <p className="mb-6 text-theme-fg/80">
          An unexpected error occurred. Please try again.
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 px-6 py-3 border border-accent text-accent rounded-full hover:bg-accent hover:text-primary transition-all duration-500 text-sm font-medium"
        >
          Try again
        </button>
      </div>
    </section>
  );
};

export default ErrorPage;
