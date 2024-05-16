import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    {params} : {params : {courseId: string, chapterId: string, quizId: string}}
) {
    try {

        const {userId} = auth();

        if(!userId) {
            return new NextResponse("Unauthorized", {status: 401});
        }

        const ownCourse = await db.course.findUnique({
            where: {
                id: params.courseId,
                userId,
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

        if(!chapter) {
            return new NextResponse("Unauthorized", {status: 401});
        }

        const quiz = await db.quiz.findUnique({
            where: {
                id: params.quizId,
                chapterId: params.chapterId,
            },
            include: {
                questions: {
                    include: {
                        answers: true,
                    },
                },
            },
        });

        if(!quiz) {
            return new NextResponse("Not found", {status: 404});
        }

        const hasPublishedQuestionHasAnswer = quiz.questions.some((question) => question.answers.some((answer) => answer.text));

        if(!quiz || !quiz?.description || !quiz.title || !hasPublishedQuestionHasAnswer ) {
            return new NextResponse("Missing required fields", {status: 400})
        }

        const publishedQuiz = await db.quiz.update({
            where: {
                id: params.quizId
            },
            data: {
                isPublished: true,
            }
        });

        return NextResponse.json(publishedQuiz);

    } catch (err) {
        console.log("[CHAPTER_PUBLISH]",err);
        return new NextResponse("Internal Server Error", {status: 500})
    }
}