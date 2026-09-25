'use client'

import { startTransition, useOptimistic } from "react";
import { Todo } from "@/app/generated/prisma/client";

import styles from '../TodoItem.module.css'
import { IoCheckboxOutline, IoSquareOutline } from "react-icons/io5";
import { ToggleTodoResult, toogleTodo } from "../actions/todo-actions";

interface Props {
    todo: Todo;
    toggleTodo: (id: string, todo: Todo) => Promise<ToggleTodoResult>
}

export const TodoItem = ({ todo, toggleTodo } : Props ) => {
  const [ todoOptimistic, toggleTodoOptimistic] =  useOptimistic( 
    todo,
    ( state, newTodo: Todo ) => newTodo
 );

 const onToggleTodo = async () => {
    //Aqui se cambia el valor de completed para que lo actualice el optimistic
    const newTodo = { ...todoOptimistic, completed: !todoOptimistic.completed}
    startTransition( async() => {
        toggleTodoOptimistic( newTodo );

        try {
            //Aqui manda el valor de completed tal como va por que la funsión toogleTodo ya hace ese cambio
            await toogleTodo( todoOptimistic.id, todoOptimistic )
        } catch (error) {
            console.log(error)
        }
    })
 }


  return (
    <div className={ todoOptimistic.completed ? styles.todoDone : styles.todoPending }>
        <div 
          onClick={ onToggleTodo } 
          //onClick={() => toggleTodo( todoOptimistic.id, todoOptimistic ) } sin petición optimista
          className="flex flex-col sm:flex-row justify-start items-center gap-4">
            <div className={`flex p-2 rounded-sm cursor-pointer hover:bg-opacity-60 active:scale-90
                             ${ todoOptimistic.completed ? 'bg-blue-100' : 'bg-red-100'}
                            `}>
             {
                todoOptimistic.completed 
                ?  <IoCheckboxOutline  size={30}/>
                :  <IoSquareOutline  size={30}/>
             }
            </div>
        </div>

        <div className="text-center sm:text-left">
            { todoOptimistic.description }
        </div>
    </div>
  )
} 
