// Global connection tracking (persists across requests)
let activeConnections = new Map<string, { count: number; lastSeen: number }>();
const MAX_CONCURRENT_CONNECTIONS = 50;
const CONNECTION_TIMEOUT = 300000; // 5 minutes timeout

// Helper function for development-only logging
const devLog = (message: string, data?: any) => {
  if (process.env.NODE_ENV === "development") {
    if (data) {
      console.log(message, data);
    } else {
      console.log(message);
    }
  }
};

export function trackConnection(ip: string): boolean {
  const now = Date.now();

  // Clean up stale connections first
  cleanupStaleConnections();

  // Get current total connections
  const totalConnections = getTotalActiveConnections();

  devLog(
    `[CONNECTION] IP: ${ip}, Current total: ${totalConnections}, Max: ${MAX_CONCURRENT_CONNECTIONS}`
  );

  // Check if we're at capacity
  if (totalConnections >= MAX_CONCURRENT_CONNECTIONS) {
    devLog(
      `[CONNECTION] REJECTED - At capacity (${totalConnections}/${MAX_CONCURRENT_CONNECTIONS})`
    );

    // Only log critical information in production
    if (process.env.NODE_ENV === "production") {
      console.warn(
        `[LIMIT] Capacity reached: ${totalConnections}/${MAX_CONCURRENT_CONNECTIONS}`
      );
    }

    return false;
  }

  // Track this connection
  const existing = activeConnections.get(ip);
  if (existing) {
    activeConnections.set(ip, {
      count: existing.count + 1,
      lastSeen: now,
    });
  } else {
    activeConnections.set(ip, {
      count: 1,
      lastSeen: now,
    });
  }

  devLog(
    `[CONNECTION] ACCEPTED - IP: ${ip}, New total: ${getTotalActiveConnections()}`
  );
  return true;
}

export function releaseConnection(ip: string): void {
  const existing = activeConnections.get(ip);
  if (existing && existing.count > 0) {
    if (existing.count === 1) {
      activeConnections.delete(ip);
    } else {
      activeConnections.set(ip, {
        count: existing.count - 1,
        lastSeen: Date.now(),
      });
    }
    devLog(
      `[CONNECTION] RELEASED - IP: ${ip}, New total: ${getTotalActiveConnections()}`
    );
  }
}

export function getActiveConnections(
  ip?: string
): number | Map<string, { count: number; lastSeen: number }> {
  cleanupStaleConnections();

  if (ip) {
    const connection = activeConnections.get(ip);
    return connection ? connection.count : 0;
  }
  return activeConnections;
}

function getTotalActiveConnections(): number {
  return Array.from(activeConnections.values()).reduce(
    (sum, conn) => sum + conn.count,
    0
  );
}

export function cleanupStaleConnections(): void {
  const now = Date.now();
  const ipsToDelete: string[] = [];

  activeConnections.forEach((connection, ip) => {
    if (now - connection.lastSeen > CONNECTION_TIMEOUT) {
      ipsToDelete.push(ip);
    }
  });

  ipsToDelete.forEach((ip) => {
    activeConnections.delete(ip);
    devLog(`[CONNECTION] CLEANED UP stale connection for IP: ${ip}`);
  });
}

// Export for debugging and testing
export function getDebugInfo() {
  return {
    activeConnections: Object.fromEntries(activeConnections),
    totalConnections: getTotalActiveConnections(),
    maxConnections: MAX_CONCURRENT_CONNECTIONS,
  };
}

// Test utilities (for unit testing)
export function resetConnections(): void {
  activeConnections.clear();
}

// Debug utilities (development only)
export function clearAllConnections(): void {
  if (process.env.NODE_ENV === "development") {
    const count = getTotalActiveConnections();
    activeConnections.clear();
    devLog(`[DEBUG] Cleared all connections (${count} total)`);
  }
}

export function addTestConnection(ip: string): boolean {
  if (process.env.NODE_ENV === "development") {
    // Use the same limit checking logic as trackConnection
    const now = Date.now();

    // Clean up stale connections first
    cleanupStaleConnections();

    // Get current total connections
    const totalConnections = getTotalActiveConnections();

    // Check if we're at capacity BEFORE adding
    if (totalConnections >= MAX_CONCURRENT_CONNECTIONS) {
      devLog(
        `[DEBUG] Test connection REJECTED for IP: ${ip} - At capacity (${totalConnections}/${MAX_CONCURRENT_CONNECTIONS})`
      );
      return false;
    }

    // Add the connection since we're under the limit
    const existing = activeConnections.get(ip);
    if (existing) {
      activeConnections.set(ip, {
        count: existing.count + 1,
        lastSeen: now,
      });
    } else {
      activeConnections.set(ip, {
        count: 1,
        lastSeen: now,
      });
    }

    devLog(
      `[DEBUG] Added test connection for IP: ${ip}, Total: ${getTotalActiveConnections()}/${MAX_CONCURRENT_CONNECTIONS}`
    );
    return true;
  }
  return false;
}

export function setConnectionTimeout(timeout: number): void {
  // This would be used for testing with shorter timeouts
}

export function getCurrentTimestamp(): number {
  return Date.now();
}
