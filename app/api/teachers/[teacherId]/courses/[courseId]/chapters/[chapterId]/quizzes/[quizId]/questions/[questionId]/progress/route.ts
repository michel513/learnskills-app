import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { json } from "stream/consumers";

export async function PUT(
    req: Request,
    {params} : {params: {courseId: string; chapterId: string; quizId: string; questionId: string}}
) {
    try {
        const {userId} = auth();
        const {isCompleted} = await req.json();

        if (!userId) {
            return new NextResponse("Unauthorized",{status: 401})
        }

        const questionProgress = await db.questionProgress.upsert({
            where: {
                userId_questionId: {
                    userId,
                    questionId: params.questionId,
                }
            },
            update: {
                isCompleted
            },
            create: {
                userId,
                questionId: params.questionId,
                isCompleted,
            }
        });

        return NextResponse.json(questionProgress);

    } catch (err) {
        console.log("[QUESTION_ID_PROGRESS]", err);
        return new NextResponse("internal error", {status: 500});
    }
}