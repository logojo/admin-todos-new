import { NextResponse, NextRequest } from 'next/server'
import { z } from 'zod';

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


//creado objeto de validacion para post
const todoSchema = z.object({
  description: z.string().min(1).max(200),
  completed: z.boolean().optional().default(false),
})
.strict(); // me permite mandar mensaje al usuario en caso de mandar otras propiedades que no esten en el esquema


export async function POST(request: NextRequest) { 

try {

  //realizando validacion asincrona
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
 
  const todo = await prisma.todo.create({
    data: result.data
 });

  return NextResponse.json( todo, { status: 201} );
} catch (error) {
  
  return NextResponse.json(
      {
        error
      },
      { status: 400 }
    );
}


}

export async function DELETE() { 
 
    try {
      await prisma.todo.deleteMany({
        where: { completed: true },
      });

      return NextResponse.json(
        { messaje: 'Todos eliminados' },
        { status: 200 }
      );
    } catch (error) {
      console.error(error);

      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      );
    }

  
}