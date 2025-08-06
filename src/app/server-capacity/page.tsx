"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ServerCapacityError() {
  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-6xl font-bold text-accent mb-4">503</h1>
          <h2 className="text-3xl font-semibold text-white mb-6">
            Server at Capacity
          </h2>
          <p className="text-white/60 text-lg mb-8 max-w-md mx-auto">
            The website is currently experiencing high traffic. Please wait a
            moment and try again.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={handleRetry}
              className="bg-accent hover:bg-accent-hover text-primary"
            >
              Try Again
            </Button>

            <Link
              href="/"
              className="text-white hover:text-accent transition-colors"
            >
              Go to Homepage
            </Link>
          </div>

          <div className="mt-8 text-sm text-white/40">
            <p>Maximum concurrent connections reached (50/50)</p>
            <p>Please wait for other users to finish browsing</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
