import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { error } from "console";
import { NextResponse } from "next/server";

export async function POST(
    req: Request,
    {params} : {params: {teacherId: string}}
) {
    try {

        const {userId} = auth();
        const {title} = await req.json();

        if(!userId) {
            return new NextResponse("unauthorized", {status : 401})
        }

        const course = await db.course.create({
            data: {
                userId,
                title,
                teacherId: params.teacherId,
            }
        });

        return NextResponse.json(course);

    }catch {
        console.log("[COURSES", error);
        return new NextResponse("internal erro", {status: 500});
    }
}