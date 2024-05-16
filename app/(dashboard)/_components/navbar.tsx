import NavbarRoutes from "@/components/navbar-routes";
import MobileSidebar from "./mobile-sidebar";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";

const Navbar = async () => {
    const { userId } = auth();

    if (!userId) {
        console.error("Erreur: userId est manquant ou invalide.");
        return null;
    }
    
    let iscreate = false;

    const teacherIsCreating = await db.teacher.findFirst({
        where: {
            userId: userId as string, 
        }
    });

    if (teacherIsCreating) {
        iscreate = true;
    }
    
    const teacherId = teacherIsCreating?.id;

    return ( 
        <div className="p-4 border-b h-full flex items-center bg-white shadow-sm lg:px-12">
            <MobileSidebar teacherId ={teacherId as string} />
            <NavbarRoutes teacherId={teacherId as string} isCreate= {iscreate}/>
        </div>
     );
}
 
export default Navbar;


