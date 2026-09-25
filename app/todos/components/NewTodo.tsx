'use client';

//import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoTrashOutline } from "react-icons/io5";
import { createTodo, deleteTodo } from "../actions/todo-actions";
//import { createTodo, deleteTodo } from "../helpers/todos";



export const NewTodo = () => { 
  //const router = useRouter();
  const [description, setDescription] = useState('')
  
  //* Esta funsión ejecuta el create con llamada api
  // const onSubmit = async( e: React.SubmitEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   if( description.trim().length === 0) return;

  //   //por si quiere hacer algo con el todo actualizado
  //   const todo = await createTodo( description);
  //   setDescription('');
  //   router.refresh();
    
   
  // }


  //* Esta funsión ejecuta el create con un serverAction
  const onSubmit = async( e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if( description.trim().length === 0) return;

    await createTodo( description )
    setDescription('');
  }

  //* Esta funsión ejecuta el delete con llamada api
  // const deleteCompleted = async() => {
  //   await deleteTodo();
  //   router.refresh();
  // }

  return (
    <form onSubmit={ onSubmit }  className='flex w-full mb-5'>
      <input 
        type="text"
        onChange={(e) => setDescription(e.target.value ) }
       value={description}
        className="w-6/12  pl-3 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-sky-500 transition-all"
        placeholder="¿Qué necesita ser hecho?" />

      <button type='submit' className="flex items-center justify-center rounded ml-2 bg-sky-500 p-2 text-white hover:bg-sky-700 transition-all">
        Crear
      </button>
      
      <span className='flex flex-1'></span>

      <button 
        onClick={ deleteTodo }
        type='button' className="flex items-center justify-center rounded ml-2 bg-red-400 p-2 text-white hover:bg-red-700 transition-all">
        <IoTrashOutline />
        <span className="ml-2">Borrar completados</span>
      </button>


    </form>
  )
}