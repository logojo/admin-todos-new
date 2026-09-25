import { Sidebar, TopMenu } from "../components";


export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
       <Sidebar />

        {/* Main Layout content - Contenido principal del Layout */}
        <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%] min-h-screen bg-gray-100">

            <TopMenu />
   
            <div className="px-6 py-6 bg-white p-2 m-2 rounded shadow ">
                { children }
            </div>
        </div>
    </div>

  );
}