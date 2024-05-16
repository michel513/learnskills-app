
import Navbar from "./_components/navbar";
import Sidebar from "./_components/sidebar";
import Footer from "./_components/footer";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";

const DashboardLayout: React.FC<{ children: React.ReactNode }> = async ({ children }) => {

  const { userId } = auth();

    if (!userId) {
        console.error("Erreur: userId est manquant ou invalide.");
        return null;
    }
    
    const teacherIsCreating = await db.teacher.findFirst({
        where: {
            userId: userId as string, 
        }
    });

    const teacherId = teacherIsCreating?.id;

    return (
      <div className="h-lvh">
        <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50">
            <Navbar/>
        </div>
        <div className="hidden md:flex h-lvh w-64 flex-col fixed inset-y-0 z-50">
            <Sidebar teacherId={teacherId!}/>
        </div>
        <main className="md:pl-56 pt-[80px] h-full flex flex-col justify-between">
           {children}
           <Footer/>
        </main>
      </div>
    );
  };
 
export default DashboardLayout;