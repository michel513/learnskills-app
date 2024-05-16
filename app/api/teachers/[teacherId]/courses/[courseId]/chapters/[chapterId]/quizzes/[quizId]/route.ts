import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";


export async function DELETE (
    req: Request,
    {params} : {params: {courseId: string; chapterId: string; quizId: string}}
) {
    try {
        const {userId} = auth();

        if (!userId) {
            return new NextResponse("Unauthorized", {status: 401});
        }

        const ownCourse = await db.course.findUnique({
            where: {
                id: params.courseId,
                userId: userId
            }
        });

        if (!ownCourse) {
            return new NextResponse("Unauthorized", {status: 401});
        }

        const chapter = await db.chapter.findUnique({
            where: {
                id: params.chapterId,
                courseId: params.courseId,
            }
        });

        if (!chapter) {
            return new NextResponse("Unauthorized", {status: 404});
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
                    }
                }
            }
        });
        
        if (quiz) {
            for (const question of quiz.questions) {
                if (question.id) {
                    for (const answer of question.answers) {
                        if (answer.id) {
                            await db.answer.delete({
                                where: { 
                                    id: answer.id
                                }
                            }); 
                        }        
                    }
                    await db.question.delete({
                        where: {
                            id: question.id
                        }
                    });
                }
            }
        }
        

        await db.question.deleteMany({
            where: {
                quizId: params.quizId,
            },
        });

        await db.answer.deleteMany({
            where: {
                question: {
                    quizId: params.quizId,
                },
            },
        });

        const publishedQuizInChapter = await db.quiz.findMany({
            where: {
                chapterId: params.chapterId,
                isPublished: true,
            }
        });

        if (!publishedQuizInChapter.length) {
            await db.chapter.update({
                where: {
                    id: params.chapterId,
                },
                data: {
                    isPublished: false,
                }
            });
        }

        const deletedQuiz = await db.quiz.delete({
            where: {
                id: params.quizId,
            }
        });

        return NextResponse.json(deletedQuiz);

    } catch (err) {
        console.log("[QUIZ_ID_DELETE]", err);
        return new NextResponse("Internal Server Error ", {status: 500});
    }
}

export async function PATCH (
    req: Request,
    {params} : {params: {courseId: string; chapterId: string; quizId: string}}
){
    try {
        const {userId} = auth();
        const  {isPublished , ...values} = await req.json();

        if(!userId) {
            return new NextResponse("Unauthorized", {status: 401});
        }

        const ownCourse = await db.course.findUnique({
            where: {
                id: params.courseId,
                userId
            }
        });

        if(!ownCourse) {
            return new NextResponse("Unauthorized", {status: 401});
        }

        const ownChapter = await db.chapter.findUnique({
            where: {
                id: params.chapterId,
            }
        });

        if(!ownChapter) {
            return new NextResponse("Unauthorized", {status: 401});
        }

        const quiz = await db.quiz.update({
            where: {
                id: params.quizId,
                chapterId: params.chapterId,
            },
            data: {
                ...values,
            }
        });

        return NextResponse.json(quiz);

    } catch (e) {
        console.log("[QUIZ_ID_DELETE]",e);
        return new NextResponse("Internal Error", {status: 500});
    }
}