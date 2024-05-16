import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';


export async function POST(
    req: Request,
    { params }: { params: { courseId: string; chapterId: string; quizId: string } }
) {
    try {

        const { userId } = auth();
        const jsonData = await req.json();
        const { text } = jsonData;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const ownCourse = await db.course.findUnique({
            where: {
                id: params.courseId,
                userId: userId,
            }
        });

        if (!ownCourse) {
            return new NextResponse("Unauthorized", { status: 401 });
        }


        const chapter = await db.chapter.findUnique({
            where: {
                id: params.chapterId,
                courseId: params.courseId,
            }
        });


       
        const quiz = await db.quiz.findUnique({
           where: {
            id: params.quizId,
            chapterId: params.chapterId,
           }
        });

        const lastQuestion = await db.question.findFirst({
            where:{
                quizId: params.quizId,
            },
            orderBy: {
                position: "desc",
            },
        });

        const newPosition = lastQuestion ? lastQuestion.position + 1 : 1;

        const question = await db.question.create({
            data: {
                text,
                quizId: params.quizId,
                position: newPosition,
            }
        });
        return NextResponse.json(question);


    } catch (e) {
        console.log(`[QUIZ_CHAPTER_ID] : ${e}`);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

