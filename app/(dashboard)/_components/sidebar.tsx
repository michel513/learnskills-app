import Logo from "./logo";
import SidebarRoutes from "./sidebar-routes";

interface SidebarProps {
   teacherId: string;
}

const Sidebar = async ({
   teacherId,
}:SidebarProps) => {

    return ( 
        <div className="h-lvh  border-r flex flex-col overflow-y-auto bg-white shadow-sm">
           <div className="p-6">
            <Logo/>
           </div>
           <div className="flex flex-col w-full">
            <SidebarRoutes params={{
                teacherId: teacherId,
             }}/>
           </div>
        </div>
     );
}
 
export default Sidebar;