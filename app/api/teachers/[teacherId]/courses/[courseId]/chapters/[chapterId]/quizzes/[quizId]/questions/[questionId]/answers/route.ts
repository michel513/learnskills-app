import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';


export async function POST(
    req: Request,
    { params }: { params: { courseId: string; chapterId: string; quizId: string; questionId: string } }
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

        if (!chapter) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
       
        const quiz = await db.quiz.findUnique({
           where: {
            id: params.quizId,
            chapterId: params.chapterId,
           }
        });

        if (!quiz) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const question = await db.question.findUnique({
            where: {
              id: params.questionId,
              quizId: params.quizId,
            }
          });

          if (!question) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const lastAnswer = await db.answer.findFirst({
            where:{
                questionId: params.questionId,
            },
            orderBy: {
                position: "desc",
            },
        });

        const newPosition = lastAnswer ? lastAnswer.position + 1 : 1;

        const answer = await db.answer.create({
            data: {
                text,
                questionId: params.questionId,
                position: newPosition,
            }
        });

        return NextResponse.json(answer);


    } catch (e) {
        console.log(`[QUIZ_CHAPTER_ID] : ${e}`);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

