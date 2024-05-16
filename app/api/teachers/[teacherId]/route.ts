import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    {params}: {params: {teacherId: string}}
)  {
    try {

        const { userId } = auth();
        const { teacherId } = params;
        const {...values} = await req.json();
        
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const teacher = await db.teacher.update({
            where:{
                id: teacherId,
                userId
            },
            data: {
                ...values,
            }
        });



        return NextResponse.json(teacher);

    } catch (err) {
        console.log("[COURSE_ID]", err)
        return new NextResponse("Internal Server Error", {status: 500});
    }
}