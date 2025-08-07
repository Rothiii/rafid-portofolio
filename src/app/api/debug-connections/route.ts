import { NextRequest, NextResponse } from "next/server";
import {
  getDebugInfo,
  clearAllConnections,
  addTestConnection,
} from "../../../lib/connection-limiter";

export async function GET(request: NextRequest) {
  // Only allow debug operations in development
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json(
      { error: "Debug endpoints are only available in development" },
      { status: 403 }
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get("action");
    const countParam = searchParams.get("count");

    console.log(
      `🐛 Debug API called with action: ${action}, count: ${countParam}`
    );

    switch (action) {
      case "add": {
        const count = countParam ? parseInt(countParam, 10) : 1;

        if (isNaN(count) || count < 1) {
          return NextResponse.json(
            { error: "Invalid count parameter" },
            { status: 400 }
          );
        }

        // Add multiple test connections with limit checking
        let successCount = 0;
        let rejectedCount = 0;
        
        for (let i = 0; i < count; i++) {
          // Generate fake IPs for testing
          const fakeIP = `192.168.1.${Math.floor(Math.random() * 254) + 1}`;
          const success = addTestConnection(fakeIP);
          
          if (success) {
            successCount++;
          } else {
            rejectedCount++;
            // Stop trying once we hit the limit
            break;
          }
        }

        const debugInfo = getDebugInfo();
        console.log(
          `✅ Test connections: ${successCount} added, ${rejectedCount} rejected. Total: ${debugInfo.totalConnections}/${debugInfo.maxConnections}`
        );

        return NextResponse.json({
          success: true,
          message: `Added ${successCount} test connections, ${rejectedCount} rejected (limit reached)`,
          details: {
            requested: count,
            added: successCount,
            rejected: rejectedCount,
            limitReached: rejectedCount > 0
          },
          debugInfo,
        });
      }

      case "cleanup": {
        const beforeCount = getDebugInfo().totalConnections;
        clearAllConnections();
        const afterCount = getDebugInfo().totalConnections;

        console.log(
          `🧹 Cleaned up ${beforeCount} connections. Remaining: ${afterCount}`
        );

        return NextResponse.json({
          success: true,
          message: `Cleaned up ${beforeCount} connections`,
          debugInfo: getDebugInfo(),
        });
      }

      case "status":
      default: {
        const debugInfo = getDebugInfo();
        console.log(
          `📊 Debug status requested. Current connections: ${debugInfo.totalConnections}`
        );

        return NextResponse.json({
          success: true,
          debugInfo,
        });
      }
    }
  } catch (error) {
    console.error("❌ Debug API error:", error);

    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// Set cache control headers to prevent caching of debug responses
export const dynamic = "force-dynamic";
export const revalidate = 0;
