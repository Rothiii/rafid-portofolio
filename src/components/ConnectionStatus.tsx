"use client";

import { useState, useEffect } from 'react';

interface ConnectionStatus {
  userConnections: number;
  totalConnections: number;
  maxAllowed: number;
  availableSlots: number;
}

const ConnectionStatus = () => {
  const [status, setStatus] = useState<ConnectionStatus | null>(null);
  const [showDebug, setShowDebug] = useState(false);

  useEffect(() => {
    // Only show in development
    if (process.env.NODE_ENV === 'development') {
      setShowDebug(true);
      
      const fetchStatus = async () => {
        try {
          const response = await fetch('/api/connection-status');
          const data = await response.json();
          setStatus(data);
        } catch (error) {
          console.error('Failed to fetch connection status:', error);
        }
      };

      fetchStatus();
      const interval = setInterval(fetchStatus, 5000); // Update every 5 seconds

      return () => clearInterval(interval);
    }
  }, []);

  if (!showDebug || !status) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-3 rounded-lg text-xs z-50">
      <div className="font-semibold mb-1">Connection Status</div>
      <div>Active: {status.totalConnections}/{status.maxAllowed}</div>
      <div>Available: {status.availableSlots}</div>
      <div>Your connections: {status.userConnections}</div>
    </div>
  );
};

export default ConnectionStatus;
