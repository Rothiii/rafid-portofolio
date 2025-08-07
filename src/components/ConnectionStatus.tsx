"use client";

import { useEffect, useState, useCallback } from "react";

interface ConnectionData {
  userConnections: number;
  totalConnections: number;
  maxAllowed: number;
  availableSlots: number;
  debug?: {
    detectedIP: string;
    allConnections: Record<string, { count: number; lastSeen: number }>;
  };
  error?: string;
}

const ConnectionStatus = () => {
  const [data, setData] = useState<ConnectionData | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(false);

  const fetchStatus = useCallback(async (forceRefresh = false) => {
    try {
      setIsLoading(true);

      // Add cache busting to force fresh data
      const timestamp = new Date().getTime();
      const url = `/api/connection-status?t=${timestamp}${
        forceRefresh ? "&force=true" : ""
      }`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      setData(result);
      setLastUpdated(new Date());
      console.log("📊 Connection status updated:", result);
    } catch (error) {
      console.error("Failed to fetch connection status:", error);
      // Show error in UI
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      setData((prev) => (prev ? { ...prev, error: errorMessage } : null));
    } finally {
      setIsLoading(false);
    }
  }, []);

  const testConnection = async () => {
    try {
      setIsLoading(true);
      console.log("🧪 Testing connection limit...");

      const response = await fetch(
        "/api/debug-connections?action=add&count=55",
        {
          headers: {
            "Cache-Control": "no-cache",
          },
        }
      );

      const result = await response.json();
      console.log("🔴 Test connection result:", result);

      // Wait a bit for server to process, then force refresh
      setTimeout(() => {
        fetchStatus(true);
      }, 500);
    } catch (error) {
      console.error("Failed to test connection:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const cleanupConnections = async () => {
    try {
      setIsLoading(true);
      console.log("🧹 Cleaning up connections...");

      const response = await fetch("/api/debug-connections?action=cleanup", {
        headers: {
          "Cache-Control": "no-cache",
        },
      });

      const result = await response.json();
      console.log("🟡 Cleanup result:", result);

      // Immediately update local state to show change
      setData((prev) =>
        prev
          ? {
              ...prev,
              totalConnections: 0,
              availableSlots: prev.maxAllowed,
              debug: {
                ...prev.debug!,
                allConnections: {},
              },
            }
          : null
      );

      // Then fetch fresh data from server to confirm
      setTimeout(() => {
        fetchStatus(true);
      }, 300);
    } catch (error) {
      console.error("Failed to cleanup connections:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const addSingleConnection = async () => {
    try {
      setIsLoading(true);
      console.log("➕ Adding single connection...");

      const response = await fetch(
        "/api/debug-connections?action=add&count=1",
        {
          headers: {
            "Cache-Control": "no-cache",
          },
        }
      );

      const result = await response.json();
      console.log("🟢 Add single result:", result);

      setTimeout(() => {
        fetchStatus(true);
      }, 300);
    } catch (error) {
      console.error("Failed to add connection:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      fetchStatus(); // Always fetch once on mount

      if (autoRefresh) {
        const interval = setInterval(() => fetchStatus(), 10000); // 10 seconds
        return () => clearInterval(interval);
      }
    }
  }, [fetchStatus, autoRefresh]);

  // Only show in development
  if (process.env.NODE_ENV !== "development") return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setIsVisible(!isVisible)}
        className={`bg-blue-600 text-white px-3 py-2 rounded text-sm mb-2 block transition-all ${
          isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
        }`}
        disabled={isLoading}
      >
        {isVisible ? "Hide" : "Show"} Debug {isLoading && "⏳"}
      </button>

      {isVisible && (
        <div className="bg-black/90 text-white p-4 rounded-lg text-xs max-w-sm border border-gray-600 shadow-lg">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold">Connection Status</h3>
            <div className="flex items-center gap-2">
              {lastUpdated && (
                <span className="text-xs text-gray-400">
                  {lastUpdated.toLocaleTimeString()}
                </span>
              )}
              <button
                onClick={() => setAutoRefresh(!autoRefresh)}
                className={`text-xs px-2 py-1 rounded transition-colors ${
                  autoRefresh
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-gray-600 hover:bg-gray-700"
                }`}
              >
                Auto: {autoRefresh ? "ON" : "OFF"}
              </button>
            </div>
          </div>

          {data ? (
            <>
              <div className="space-y-1 mb-3">
                <p className="flex justify-between">
                  <span>Your Connections:</span>
                  <span className="font-bold text-blue-400">
                    {data.userConnections}
                  </span>
                </p>
                <p className="flex justify-between">
                  <span>Total Active:</span>
                  <span
                    className={`font-bold ${
                      data.totalConnections >= data.maxAllowed
                        ? "text-red-400"
                        : data.totalConnections > data.maxAllowed * 0.8
                        ? "text-yellow-400"
                        : "text-green-400"
                    }`}
                  >
                    {data.totalConnections}/{data.maxAllowed}
                  </span>
                </p>
                <p className="flex justify-between">
                  <span>Available Slots:</span>
                  <span className="font-bold text-green-400">
                    {data.availableSlots}
                  </span>
                </p>
              </div>

              {data.debug && (
                <div className="mt-2 pt-2 border-t border-gray-600">
                  <p className="font-semibold mb-1">Debug Info:</p>
                  <p className="text-xs">
                    IP:{" "}
                    <span className="font-mono">{data.debug.detectedIP}</span>
                  </p>

                  <details className="mt-2">
                    <summary className="cursor-pointer text-xs hover:text-blue-400">
                      All Connections (
                      {Object.keys(data.debug.allConnections).length} IPs)
                    </summary>
                    <pre className="text-xs bg-gray-800 p-2 rounded mt-1 max-h-32 overflow-y-auto">
                      {JSON.stringify(data.debug.allConnections, null, 2)}
                    </pre>
                  </details>
                </div>
              )}

              <div className="mt-3 space-y-1">
                <button
                  onClick={testConnection}
                  disabled={isLoading}
                  className="bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-2 py-1 rounded text-xs w-full transition-colors"
                >
                  {isLoading ? "Testing..." : "🔴 Test Limit (Add 55)"}
                </button>

                <button
                  onClick={addSingleConnection}
                  disabled={isLoading}
                  className="bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-2 py-1 rounded text-xs w-full transition-colors"
                >
                  {isLoading ? "Adding..." : "➕ Add Single Connection"}
                </button>

                <button
                  onClick={cleanupConnections}
                  disabled={isLoading}
                  className="bg-yellow-600 hover:bg-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-2 py-1 rounded text-xs w-full transition-colors"
                >
                  {isLoading ? "Cleaning..." : "🧹 Cleanup All"}
                </button>

                <button
                  onClick={() => fetchStatus(true)}
                  disabled={isLoading}
                  className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-2 py-1 rounded text-xs w-full transition-colors"
                >
                  {isLoading ? "Refreshing..." : "🔄 Force Refresh"}
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center py-4">
              <span>Loading...</span>
              {isLoading && <span className="ml-2 animate-spin">⚡</span>}
            </div>
          )}

          {data?.error && (
            <div className="mt-2 p-2 bg-red-900/50 border border-red-600 rounded text-xs">
              <strong>Error:</strong> {data.error}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ConnectionStatus;
