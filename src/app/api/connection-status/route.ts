import { NextRequest, NextResponse } from "next/server";
import { getActiveConnections } from "@/lib/connection-limiter";

export async function GET(request: NextRequest) {
  const ip =
    request.ip ??
    request.headers.get("x-forwarded-for")?.split(",")[0] ??
    "127.0.0.1";

  const userConnections = getActiveConnections(ip) as number;
  const totalConnections = Array.from(
    (getActiveConnections() as Map<string, number>).values()
  ).reduce((sum, count) => sum + count, 0);

  return NextResponse.json({
    userConnections,
    totalConnections,
    maxAllowed: 50,
    availableSlots: 50 - totalConnections,
  });
}
