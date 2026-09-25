import { Todo } from "@/app/generated/prisma/client";

export const updateTodo = async( id: string, todo: Todo) : Promise<Todo> => {
    const body = { completed: !todo.completed, description: todo.description };

    await sleep(2);
    const newTodo = await  fetch(`/api/todos/${id}`, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
            'Content-type': 'application/json'
        }
    }).then( res => res.json());

    
    

    return newTodo;
}

export const createTodo = async( description: string ) : Promise<Todo> => {

    const newTodo = await  fetch(`/api/todos`, {
        method: 'POST',
        body: JSON.stringify({ description }),
        headers: {
            'Content-type': 'application/json'
        }
    }).then( res => res.json());

    
    

    return newTodo;
}

export const deleteTodo = async() : Promise<void> => {

    const confirmDelete = confirm("¿Estás seguro de que deseas eliminar este elemento?");
    if (!confirmDelete) return;

    try {
        const response = await fetch(`/api/todos`, {
            method: 'DELETE',     
            headers: {
                'Content-type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Error al intentar eliminar los todos');
        }

        const data = await response.json();
        
        alert('Todos eliminados correctamente')
        
    } catch (error) {
        console.error(error);
    }
}

const sleep = (seconds : number = 0) => {
    return new Promise(( resolve ) => {
        setTimeout(() => {
            resolve(true)
        }, seconds * 1000)
    })
}