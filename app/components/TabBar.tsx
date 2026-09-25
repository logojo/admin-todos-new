'use client'

import { setCookie } from "cookies-next";
import { useState } from "react";

interface Props {
  currentTab?: number;
  tabOptions?: number[]
}

export const  TabBar = ({ currentTab = 1, tabOptions = [1,2,3,4]} : Props) => {

   const [check, setCheck] = useState(currentTab)

   const onTabChecked = ( tab : number ) => {
    setCheck( tab );
    //estableciendo valor de la cookie del lado del cliente
    setCookie('selectedTab', tab.toString())
   }

   return (
    <div className={`grid w-full space-x-2 rounded-xl bg-gray-200 p-2`}
        style={{
          gridTemplateColumns: `repeat(${tabOptions.length}, minmax(0, 1fr))`,
        }}>
      
      {
        tabOptions.map( tab => (
          <div key={tab}>
            <input 
              type="radio" 
              id={`${tab}`} 
              checked={ check === tab }
              onChange={ () => {} }
              className="peer hidden"  
            />
            <label 
            onClick={() => onTabChecked( tab) }
            className="transition-all ease-in-out block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white">
                { tab }
            </label>
          </div>
        ))
      }

    </div>
  )
}
