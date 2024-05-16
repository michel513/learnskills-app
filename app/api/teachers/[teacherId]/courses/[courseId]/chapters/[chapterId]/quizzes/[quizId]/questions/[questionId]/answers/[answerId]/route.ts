import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function DELETE(
    req: Request,
    { params }: { params: { courseId: string; chapterId: string; quizId: string; questionId: string; answerId: string } }
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
    }
});

        if (!quiz) {
            return new NextResponse("Unauthorized", {status: 404});
        }

        const question = await db.question.findUnique({
            where: {
                id: params.questionId,
                quizId: params.quizId,
            }
        });

        if (!question) {
            return new NextResponse("Unauthorized", {status: 404});
        }

        const deleteAnswer = await db.answer.delete({
            where: {
                id: params.answerId,
                questionId: params.questionId,
            }
        });

        if (!deleteAnswer) {
            return new NextResponse("Error deleting answer", {status: 404});
        }

        return NextResponse.json(deleteAnswer);

    }catch (err) {
        console.log("[DELETE_ANSWER_ID]",err);
        return new NextResponse("internal error", {status: 500});
    }
}

export async function PATCH(
    req: Request,
    { params }: { params: { courseId: string; chapterId: string; quizId: string; questionId: string; answerId: string } }
) {
    try {

        const { userId } = auth();
        const jsonData = await req.json();
        const {isCorrect, ...values} = jsonData;

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

        const answer = await db.answer.update({
            where: {
                id: params.answerId,
                questionId: params.questionId,
            }, 
            data: {
                ...values,
                isCorrect,
            }
        });

        return NextResponse.json(answer);


    } catch (e) {
        console.log(`[ANSWER_QUESTION_ID] : ${e}`);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

