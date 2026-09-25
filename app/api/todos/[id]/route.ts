import { NextResponse, NextRequest } from 'next/server'
import { z } from 'zod';

import { prisma } from '@/app/lib/prisma';
import { Prisma } from '@/app/generated/prisma/client';


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

//creado objeto de validacion para post
const todoSchema = z.object({
  description: z.string().min(1).max(200),
  completed: z.boolean().optional().default(false),
})
.strict();

export async function PUT(request: NextRequest, { params }: Segments ) { 
   const { id } =  await params;

   const result = await todoSchema.safeParseAsync(await request.json());

    if (!result.success) {
      return NextResponse.json(
        {
          error: 'Invalid request body',
          issues: result.error.issues,
        },
        { status: 400 }
      );
    }
   
 
    try {
      const todo = await prisma.todo.update({
        data: result.data,
        where: { id },
      });

      return NextResponse.json(todo);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        return NextResponse.json(
          { error: 'Todo not found' },
          { status: 404 }


          
        );
      }

      console.error(error);

      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      );
    }

  
}