import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function DELETE (
    req: Request,
    {params} : {params: {courseId: string; chapterId: string; quizId: string; questionId: string}}
) {
    try{

        const { userId } = auth();
        
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const ownChapter = await db.chapter.findUnique({
            where: {
                id: params.chapterId,
            }
        });

        if(!ownChapter) {
            return new NextResponse("Unauthorized", {status: 401});
        }

        const quiz = await db.quiz.findUnique({
            where: {
                id: params.quizId,
                chapterId: params.chapterId,
            }
        });

        if(!quiz) {
            return new NextResponse("Unauthorized", {status: 401});
        }


        const question = await db.question.findUnique({
            where:{
                id: params.questionId,
            },
            include: {
                answers: true,
            }
        });

        if (!question) {
            return new NextResponse("Not found", { status: 404 });
        }

        for(const answer of question.answers) {
            if(answer.id) {
                await db.answer.delete({
                    where: { 
                        id: answer.id
                    }
                });
            }
        };
        
        const deletedQuestion = await db.question.delete({
            where: {
                id: params.questionId,
                quizId: params.quizId,
            }
        });


        return  NextResponse.json(deletedQuestion);

    } catch(err){
        console.log("[QUESTION_ID_DELETE]",err);
        return new NextResponse("Internal Error", {status: 500});
    }
}

export async function PATCH (
    req: Request,
    {params} : {params: {courseId: string; chapterId: string; quizId: string; questionId: string}}
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

        const quiz = await db.quiz.findUnique({
            where: {
                id: params.quizId,
                chapterId: params.chapterId,
            }
        });

        if(!quiz) {
            return new NextResponse("Unauthorized", {status: 401});
        }

        const question = await db.question.update({
            where: {
                id: params.questionId,
                quizId: params.quizId,
            },
            data: {
                ...values,
            }
        });

        return NextResponse.json(question);

    } catch (e) {
        console.log("[COURSE_CHAPTER_ID]",e);
        return new NextResponse("Internal Error", {status: 500});
    }
}