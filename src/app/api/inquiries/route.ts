import { NextResponse } from 'next/server';
import { INITIAL_INQUIRIES } from '@/lib/mockData'; 

// GET /api/inquiries?search=...&min=...
export async function GET(request: Request) {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const { searchParams } = new URL(request.url);

  // პარამეტრების წაკითხვა
  const search = searchParams.get('search')?.toLowerCase() || '';
  const min = Number(searchParams.get('min')) || 0;
  const from = searchParams.get('from');
  const to = searchParams.get('to');

  // ფილტრაციის ლოგიკა
  let filteredData = [...INITIAL_INQUIRIES];

  if (search) {
    filteredData = filteredData.filter((item) =>
      item.clientName.toLowerCase().includes(search)
    );
  }

  if (min > 0) {
    filteredData = filteredData.filter((item) => item.potentialValue >= min);
  }

  if (from || to) {
    filteredData = filteredData.filter((item) => {
      const date = item.eventDate.split('T')[0];
      let pass = true;
      if (from) pass = pass && date >= from;
      if (to) pass = pass && date <= to;
      return pass;
    });
  }

  return NextResponse.json(filteredData);
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