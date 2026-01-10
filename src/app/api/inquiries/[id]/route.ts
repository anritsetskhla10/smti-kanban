import { NextResponse } from 'next/server';

// PATCH 
export async function PATCH(
  _request: Request, 
  { params }: { params: { id: string } }
) {
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  return NextResponse.json({ 
    success: true, 
    id: params.id,
    message: "Phase updated successfully" 
  });
}