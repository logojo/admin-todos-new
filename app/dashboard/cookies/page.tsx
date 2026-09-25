//export const instant = false

import { TabBar } from "@/app/components"
import { cookies } from "next/headers"
import { Suspense } from 'react';

export const metadata = {
  title: 'Cookies page',
  description: 'Seo title'
}

const TabsView = async () => {
  const cookieStore = await cookies()
  const tab = cookieStore.get('selectedTab')?.value ?? 1
  return <TabBar currentTab={ +tab }/>
}


export default async function CookiesPage()  {
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div className="flex flex-col gap-3">
        <span className="text-3xl">Tabs</span>
        <Suspense fallback={<div>cargando</div>}>
          <TabsView />
        </Suspense>
      </div>
    </div>
  )
}


