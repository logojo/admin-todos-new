export const instant = false;

import { Suspense } from "react";
import { NewTodo, TodosGrid } from "@/app/todos";
import { getTodos } from "@/app/todos/actions/todo-actions";


export const metadata = {
  title: 'Serve actions de Todos',
  description: 'Seo title'
}

//*Cuando tienes habilitada la opción cacheComponents debes crear un componente dinamico para poder poner en suspense 
//* llamada de la petición y evitar errores
//* tambien puedes usar esta linea export const instant = false, pero prefiero suspense para poder un loading
//*Esto evita el error que se muestra en la ruta rest-todos
async function TodosContent() {
  const todos = await getTodos()

  return <TodosGrid todos={todos} />
}

export default async function ServerTodosPage() {
  //const todos = await prisma.todo.findMany({ orderBy: {description: 'asc'}})
  //const todos = await getTodos();

  return (
    <>
      <h1 className="text-3xl mb-5 text-center">Server Actions</h1>
      <NewTodo />
      <Suspense fallback={<div>Cargando..</div>}>
        <TodosContent />
      </Suspense>
    </>
  );
}
