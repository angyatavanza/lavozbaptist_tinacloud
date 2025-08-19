import { NextResponse } from 'next/server';
import { getLatestMessageUrl } from '@/lib/utils';

// Allow this route to be statically exported in Next.js "output: export" mode
export const dynamic = 'force-static';
export const revalidate = 300; // seconds

export async function GET() {
  try {
    const latestMessageUrl = await getLatestMessageUrl();
    return NextResponse.json({ latestMessageUrl });
  } catch (error) {
    console.error('Error fetching latest message:', error);
    return NextResponse.json({ latestMessageUrl: '/messages' }, { status: 500 });
  }
} 