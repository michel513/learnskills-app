import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function PUT(
    req: Request,
    {params} : {params: {courseId: string, chapterId: string}}
) {
    try {

        const {userId} = auth();
        
        if(!userId) {
            return new NextResponse("Unauthorized", {status: 401});
        }

        const  {list} = await req.json();
        
        const ownCourse = await db.course.findUnique({
            where: {
                id: params.courseId,
                userId: userId,
            }
        });

        if(!ownCourse) {
            return new NextResponse("Unauthorized", {status: 401});
        }

        const chapter = await db.chapter.findUnique({
            where: {
                id: params.chapterId,
                courseId: params.courseId,
            }
        });

        for(let item of list) {
            await db.quiz.update({
                where: {id: item.id},
                data: {position: item.position}
            });
        }

        return new NextResponse("Success", {status: 200});

    } catch (err) {
        console.log("[REORDER]", err);
        return new NextResponse("Internal Error", {status: 500});
    }
}