import { NextResponse } from 'next/server';
import { INITIAL_INQUIRIES } from '@/lib/mockData'; 

// GET
export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  return NextResponse.json(INITIAL_INQUIRIES);
}

// POST
export async function POST(request: Request) {
  try {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const body = await request.json();
    
    const newInquiry = {
        ...body,
        id: body.id || `INQ-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };

    return NextResponse.json(newInquiry, { status: 201 });
  } catch (error) {
    console.error("API Error:", error); 
    return NextResponse.json({ error: 'Failed to create inquiry' }, { status: 500 });
  }
}