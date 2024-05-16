import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';


export async function POST(
    req: Request,
    { params }: { params: { courseId: string; chapterId: string; } }
) {
    try {

        const { userId } = auth();
        const jsonData = await req.json();
        const { title } = jsonData;

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


        const lastQuiz = await db.quiz.findFirst({
            where: {
                chapterId: params.chapterId,
            },
            orderBy: {
                position: "desc",
            },
        });

        const newPosition = lastQuiz ? lastQuiz.position + 1 : 1;

        const quiz = await db.quiz.create({
            data: {
                title,
                chapterId: params.chapterId,
                position: newPosition,
            }
        });

        return NextResponse.json(quiz);


    } catch (e) {
        console.log(`[QUIZ_CHAPTER_ID] : ${e}`);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

