import { NextRequest, NextResponse } from 'next/server';
import { releaseConnection } from '@/lib/connection-limiter';

export async function POST(request: NextRequest) {
  try {
    const { ip } = await request.json();
    
    if (!ip) {
      return NextResponse.json({ error: 'IP address required' }, { status: 400 });
    }

    releaseConnection(ip);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error releasing connection:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
