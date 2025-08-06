"use client";

import { useEffect } from "react";

const ConnectionTracker = () => {
  useEffect(() => {
    // Get IP from response header or use a fallback
    const clientIP =
      document
        .querySelector('meta[name="client-ip"]')
        ?.getAttribute("content") || "unknown";

    // Function to notify server when user leaves
    const handleBeforeUnload = () => {
      // Use sendBeacon for reliable cleanup even when page is closing
      if (navigator.sendBeacon) {
        navigator.sendBeacon(
          "/api/release-connection",
          JSON.stringify({ ip: clientIP })
        );
      }
    };

    // Function to handle visibility change
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        // Page is hidden (user switched tabs, minimized browser, etc.)
        fetch("/api/release-connection", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ip: clientIP }),
          keepalive: true,
        }).catch(() => {
          // Fallback to sendBeacon if fetch fails
          if (navigator.sendBeacon) {
            navigator.sendBeacon(
              "/api/release-connection",
              JSON.stringify({ ip: clientIP })
            );
          }
        });
      }
    };

    // Add event listeners
    window.addEventListener("beforeunload", handleBeforeUnload);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Cleanup when component unmounts
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("visibilitychange", handleVisibilityChange);

      // Final cleanup attempt
      handleBeforeUnload();
    };
  }, []);

  return null; // This component doesn't render anything
};

export default ConnectionTracker;
