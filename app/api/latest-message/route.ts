import { NextResponse } from 'next/server';
import { getLatestMessageUrl } from '@/lib/utils';

export async function GET() {
  try {
    const latestMessageUrl = await getLatestMessageUrl();
    return NextResponse.json({ latestMessageUrl });
  } catch (error) {
    console.error('Error fetching latest message:', error);
    return NextResponse.json({ latestMessageUrl: '/messages' }, { status: 500 });
  }
} 