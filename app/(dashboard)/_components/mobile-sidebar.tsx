import { Menu } from "lucide-react";

import {
    Sheet,
    SheetContent,
    SheetTrigger
} from "@/components/ui/sheet";
import Sidebar from "./sidebar";
import { db } from "@/lib/db";

interface MobileSidebarProps {
    teacherId: string
}

const MobileSidebar = async ({
    teacherId,
}:MobileSidebarProps) => {

    

    return ( 
       <Sheet>
        <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
             <Menu/>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 bg-white">
            <Sidebar teacherId={teacherId}/>
        </SheetContent>
       </Sheet>
     );
}
 
export default MobileSidebar;