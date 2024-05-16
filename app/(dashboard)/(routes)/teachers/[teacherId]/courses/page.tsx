import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";


   

const CoursesPage = async ({
    params
}: {
    params: {teacherId: string}
}) => {
    const { userId } = auth();

    if(!userId){
        return redirect("/");
    }

    const courses = await db.course.findMany({
        where: {
            userId,
        },
        orderBy: {
            createdAt: "desc",
        }
    });

    const teacher = await db.teacher.findUnique({
        where: {
            id: params.teacherId,
        },
    });

    if(!teacher) {
        console.log("Teacher not found");
    }

    if(teacher?.username == undefined || teacher?.firstName == undefined || teacher?.lastName == undefined) {
       redirect(`/create/teacher/${params.teacherId}`)
    }

    return (  
        <div className="p-6">
             <DataTable teacherId={params.teacherId} columns={columns} data={courses} />
        </div>
    );
}
 
export default CoursesPage;