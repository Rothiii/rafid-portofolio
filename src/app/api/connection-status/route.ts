import { NextRequest, NextResponse } from "next/server";
import { getActiveConnections } from "@/lib/connection-limiter";

export async function GET(request: NextRequest) {
  const ip =
    request.ip ??
    request.headers.get("x-forwarded-for")?.split(",")[0] ??
    "127.0.0.1";

  const userConnections = getActiveConnections(ip) as number;
  const connectionsMap = getActiveConnections() as Map<string, { count: number; lastSeen: number }>;
  const totalConnections = Array.from(connectionsMap.values())
    .reduce((sum, conn) => sum + conn.count, 0);

  return NextResponse.json({
    userConnections,
    totalConnections,
    maxAllowed: 50,
    availableSlots: 50 - totalConnections,
  });
}
