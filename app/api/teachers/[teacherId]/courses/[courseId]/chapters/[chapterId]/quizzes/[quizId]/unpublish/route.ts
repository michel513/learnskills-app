import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    {params} : {params : {courseId: string; chapterId: string; quizId: string}}
) {
    try {

        const {userId} = auth();

        if(!userId) {
            return new NextResponse("Unauthorized", {status: 401});
        }

        const course = await db.course.findUnique({
            where: {
                id: params.courseId,
                userId,
            }
        });

        if(!course) {
            return new NextResponse("Not found", {status: 404});
        }

        const chapter = await db.chapter.findUnique({
            where: {
                id: params.chapterId,
                courseId: course.id
            }
        })

        if(!chapter) {
            return new NextResponse("Not found", {status: 404});
        }

        const quiz = await db.quiz.findUnique({
            where: {
                id: params.quizId,
                chapterId: params.chapterId,
            }
        });

        const unpublishedQuiz = await db.quiz.update({
            where: {
                id: params.quizId,
                chapterId: params.chapterId,
            },
            data: {
                isPublished: false,
            }
        });

        return NextResponse.json(unpublishedQuiz);

    } catch (err) {
        console.log("[QUIZ_ID_UNPUBLISH]",err);
        return new NextResponse("Internal Server Error", {status: 500})
    }
}