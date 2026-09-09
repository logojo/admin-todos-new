import { NextResponse, NextRequest } from 'next/server'
import { success, z } from 'zod';

import { prisma } from '@/app/lib/prisma';

export async function GET(request: NextRequest) { 
 //* anteriormente se hacia así
//  const { searchParams } = new URL( request.url );
//  const take = Number( searchParams.get('take') );

 const take = Number(request.nextUrl.searchParams.get('take') ?? '10');
 const skip = Number(request.nextUrl.searchParams.get('skip') ?? '0');

 if ( isNaN(take) )
       return NextResponse.json({
            message: 'Take should be a valid number'
       }, { status: 400 })

 if ( isNaN(skip) )
       return NextResponse.json({
            message: 'skip should be a valid number'
       }, { status: 400 })
       


  const todos = await prisma.todo.findMany({
    skip,
    take
 });

  return NextResponse.json( todos );
}


const createTodoSchema = z.object({
  description: z.string().min(1).max(200),
  completed: z.boolean().default(false),
});


export async function POST(request: NextRequest) { 
   const body = await request.json();
    console.log( body )
  //const result = createTodoSchema.safeParse(body);
  const result = { success: false }

  if (!result.success) {
    console.log('******** entro *******');
    
    return NextResponse.json(
      {
        error: 'Invalid request body',
        //issues: result.error.issues,
      },
      { status: 400 }
    );
  }
 
  const todo = await prisma.todo.create({
    data:{
        description: body.description
    }
 });

  return NextResponse.json( todo, { status: 201} );
}