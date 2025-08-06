// Map to track active connections per IP
const activeConnections = new Map<string, number>();
const MAX_CONCURRENT_CONNECTIONS = 50;

export function trackConnection(ip: string): boolean {
  const current = activeConnections.get(ip) || 0;
  
  if (current >= MAX_CONCURRENT_CONNECTIONS) {
    return false; // Reject connection
  }
  
  // Increment connection count
  activeConnections.set(ip, current + 1);
  return true;
}

export function releaseConnection(ip: string): void {
  const current = activeConnections.get(ip) || 0;
  if (current > 0) {
    activeConnections.set(ip, current - 1);
  }
  
  // Clean up if no connections
  if (activeConnections.get(ip) === 0) {
    activeConnections.delete(ip);
  }
}

export function getActiveConnections(ip?: string): number | Map<string, number> {
  if (ip) {
    return activeConnections.get(ip) || 0;
  }
  return activeConnections;
}

// Cleanup function for stale connections
export function cleanupStaleConnections(): void {
  const now = Date.now();
  // Reset all connections every 5 minutes to handle cases where cleanup didn't work
  if (now % 300000 < 1000) {
    activeConnections.clear();
  }
}
