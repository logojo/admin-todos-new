import { prisma } from '@/app/lib/prisma';
import { NextResponse, NextRequest } from 'next/server'


interface Segments {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(request: NextRequest, { params }: Segments ) { 
   const { id } =  await params;
   
 
    const todo = await prisma.todo.findUnique({
      where: { id },
    });

    if( !todo )
        return NextResponse.json({
            error: 'Todo not found',
        },{ status: 404 });

    return NextResponse.json(todo);
  
}