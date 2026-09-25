import { NewTodo, TodosGrid } from "@/app/todos";
import { getTodos } from "@/app/todos/actions/todo-actions";


export const metadata = {
  title: 'Listado de Todos',
  description: 'Seo title'
}

export default async function RestTodosPage() {

  //const todos = await prisma.todo.findMany({ orderBy: {description: 'asc'}})
  const todos = await getTodos();

  return (
    <>
      <NewTodo />
      <TodosGrid todos={todos} />
    </>
  );
}