'use client'

//import { useRouter } from "next/navigation";
import { Todo } from "@/app/generated/prisma/client"
import { TodoItem } from "./TodoItem";
import { toogleTodo } from "../actions/todo-actions";
//import { updateTodo } from "../helpers/todos";

interface Props {
    todos?: Todo[];
}

export const TodosGrid = ({ todos = [] } : Props) => {
  //const router = useRouter();

  //* Esta funsión ejecuta el update con llamada api
  // const toogleTodo = async( id: string, todo: Todo ) => {
  //   const updatedTodo = await updateTodo(id, todo);

  //   //Esto es para refrescar la ruta actual pero no toda la app
  //   router.refresh();
  // }


  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {
        todos.map(todo => (
          <TodoItem 
              key={todo.id} 
              todo={todo} 
              toggleTodo={toogleTodo}
          />
        ))
      }
    </div>
  )
}

