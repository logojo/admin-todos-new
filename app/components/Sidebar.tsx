import Link from 'next/link'
import Image from 'next/image'

import { CiLogout, CiShoppingBasket } from 'react-icons/ci'
import { IoCalendarOutline, IoCheckboxOutline, IoListOutline, IoLogoReact } from 'react-icons/io5'
import { FaCookieBite } from 'react-icons/fa';
import { SidebarItem } from './SidebarItem';

const menuItems = [
    { icon: <IoCalendarOutline size={30} />, title: 'Dasboard', path: '/dashboard' },
    { icon: <IoCheckboxOutline size={30} /> , title:'Todos',  path:'/dashboard/rest-todos' },
    { icon: <IoListOutline size={30} /> , title:'Server Actions',  path:'/dashboard/server-todos' },
    { icon: <FaCookieBite  size={30} /> , title:'Cookies',  path:'/dashboard/cookies' },
    { icon: <CiShoppingBasket  size={30} /> , title:'Products',  path:'/dashboard/products' }
];

export const Sidebar = () => {
  return (
    <>
       <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r border-gray-100 bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
            <div>
                <div className="-mx-6 px-6 py-4">
                   
                    <Link className="flex items-center" href="/dashboard" title="home">
                 
                        <IoLogoReact className="mr-2 text-3xl" />
                    <span className="text-3xl">Dash</span>
                    </Link>
                </div>

                <div className="mt-8 text-center">
            
                    <Image
                        src="https://images.unsplash.com/photo-1542909168-82c3e7fdca5c"
                        width={150}
                        height={150}
                        loading="eager"
                        alt=""
                        className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"
                    />

                    <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">
                    Cynthia J. Watts
                    </h5>

                    <span className="hidden text-gray-400 lg:block">
                    Admin
                    </span>
                </div>

                <ul className="space-y-2 tracking-wide mt-8">
                    {
                        menuItems.map(( item, index ) => (
                            <SidebarItem 
                              key={`${item.title}-${index}`}
                              icon={ item.icon }
                              path={ item.path }
                              title={ item.title}
                            />
                        ))
                    }
                </ul>
                
                
            </div>

            <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t border-gray-100">
                <button
                    type="button"
                    className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group"
                >
                    <CiLogout />
                    <span className="group-hover:text-gray-700">
                    Logout
                    </span>
                </button>
            </div>
        </aside>
    </>
  )
}
