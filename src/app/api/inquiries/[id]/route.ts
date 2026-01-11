import { NextResponse } from 'next/server';

// PATCH /api/inquiries/:id
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  await new Promise((resolve) => setTimeout(resolve, 500));

  try {
    const body = await request.json();
    const { id } = params;

    return NextResponse.json({
      id,
      ...body,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
  }
}