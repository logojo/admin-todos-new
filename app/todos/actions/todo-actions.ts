'use server'

import { revalidatePath, revalidateTag } from "next/cache";
import { Todo } from "@/app/generated/prisma/client";
import { prisma } from "@/app/lib/prisma";

const sleep = (seconds : number = 0) => {
    return new Promise(( resolve ) => {
        setTimeout(() => {
            resolve(true)
        }, seconds * 1000)
    })
}


//* Se crea la funsión afuera cuando se usa la configuración cacheComponents en true
export async function getTodos() {
  //'use cache' //cacheando la funsión y estableciendo el periodo con cacheLife y asignandole un tag con cacheTag

  // cacheLife('hours')
  // cacheTag('todos')

  return prisma.todo.findMany({
    orderBy: {
      description: 'asc',
    },
  })
}

export type ToggleTodoResult =
  | {
      ok: true;
      todo: Todo;
    }
  | {
      ok: false;
      error: string;
    };

export const toogleTodo = async( id: string, todo: Todo ) : Promise<ToggleTodoResult> => {
    try {
        
       // await sleep(3)
    
        const currentTodo  = await prisma.todo.findFirst({ where: { id } })
    
        if( !currentTodo  )
           return {
            ok: false,
            error: "Todo no encontrado",
          };
    
    
        const updateTodo = await prisma.todo.update({
            data: {
                completed: !todo.completed,
                description: todo.description,
            },
            where: { id },
        });
        
        //*con esto actualiza los cambios que se hicieron el la ruta especificada
        revalidatePath('/dashboard/server-todos')

        //*con esto actualiza los cambios solo al tag con el nombre especificado
        //revalidateTag('todos', 'max')
        return {
          ok: true,
          todo: updateTodo,
        };
    } catch (error) {
        console.error(error);

        return {
            ok: false,
            error: "No fue posible actualizar el Todo",
        };
    }
}

export const createTodo = async( description: string ) : Promise<Todo> => {
    try {
        const todo = await prisma.todo.create({
            data: { description }
        });
        
        revalidatePath('/dashboard/server-todos')

        //*con esto actualiza los cambios solo al tag con el nombre especificado
        //*Para que se actulice el todo creado necesito usar el form así <form action={createTodo}> 
        //revalidateTag('todos', 'max')
        return todo;

    }catch (error) {
     console.log( error )
     throw `Ocurrio un error `
    }
}

export const deleteTodo = async ()  => {
    try {
        await prisma.todo.deleteMany({
        where: { completed: true },
        });

        revalidatePath('/dashboard/server-todos')
        return { 
            messaje: 'Todos eliminados', 
            status: true
        }
        
    } catch (error) {
        console.error(error);

        return { 
            messaje: 'Internal server error', 
            status: false
        }
    }
}

