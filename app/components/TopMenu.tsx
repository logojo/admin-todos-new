
import { cookies } from 'next/headers'
import { Suspense } from 'react'
import { CiChat1, CiMenuBurger, CiSearch, CiShoppingCart } from 'react-icons/ci'



const LoadindCart = () => {
  return (
    <div className="p-2 flex items-center justify-center cursor-pointer h-10 rounded-xl shadow-lg bg-gray-100 focus:bg-gray-100 active:bg-gray-200">
      <div
            className="size-4 animate-spin rounded-full border-4 border-gray-200 border-t-sky-500"
            role="status"
            aria-label="Cargando"
        />
        <CiShoppingCart size={25} />
    </div>
  )
}


const ShopingCart = async () => {
  const cookieStore = await cookies()
  const cart = JSON.parse(cookieStore.get('cart')?.value ?? '{}')

  const getTotalCount = () => {
    let items = 0;

    Object.values( cart ).forEach( (value) => {
        items += value as number;
    })

    return items
  }

  return <button
            type="button"
            className="p-2 flex items-center justify-center cursor-pointer h-10 rounded-xl shadow-lg bg-gray-100 focus:bg-gray-100 active:bg-gray-200"
        >
            <span className='text-sm mr-2 font-bold'>{ getTotalCount() }</span>
            <CiShoppingCart size={25} />
        </button>
}


export const TopMenu = () => {
   
  return (
    <div className="sticky z-10 top-0 h-16 border-b border-gray-100 bg-white lg:py-2.5">
        <div className="px-6 flex items-center justify-between space-x-4">
            <h5
                hidden
                className="text-2xl text-gray-600 font-medium lg:block"
            >
                Dashboard
            </h5>

            <button
                type="button"
                className="w-12 h-16 -mr-2 border-r border-gray-100 lg:hidden"
            >
                <CiMenuBurger size={30} />
            </button>

            <div className="flex space-x-2">

                <div hidden className="md:block">
                    <div className="relative flex items-center text-gray-400 focus-within:text-cyan-400">

                    <span className="absolute left-4 h-6 flex items-center pr-3 border-r border-gray-100">
                        <CiSearch />
                    </span>

                    <input
                        type="search"
                        name="leadingIcon"
                        id="leadingIcon"
                        placeholder="Search here"
                        className="w-full pl-14 pr-4 py-2.5 rounded-xl text-sm text-gray-600 outline-none border border-gray-300 focus:border-cyan-300 transition"
                    />
                    </div>
                </div>

                <button
                    type="button"
                    className="flex items-center justify-center cursor-pointer w-10 h-10 rounded-xl shadow-lg bg-gray-100 focus:bg-gray-100 active:bg-gray-200 md:hidden"
                >
                    <CiSearch />
                </button>

                <button
                    type="button"
                    className="flex items-center justify-center cursor-pointer w-10 h-10 rounded-xl shadow-lg bg-gray-100 focus:bg-gray-100 active:bg-gray-200"
                >
                    <CiChat1 size={25} />
                </button>

                <Suspense fallback={<LoadindCart />}>
                    <ShopingCart />
                </Suspense>

                
            </div>

        </div>
    </div>
   
  )
}

