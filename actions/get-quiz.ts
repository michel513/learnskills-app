import { db } from "@/lib/db";
import { Attachment, Chapter } from "@prisma/client";

interface GetQuizProps {
    userId: string;
    courseId: string;
    chapterId: string;
    quizId: string;
};

export const getQuiz = async ({
    userId,
    courseId,
    chapterId,
    quizId,
}: GetQuizProps) => {
    try {
        const course = await db.course.findUnique({
            where: {
                id: courseId,
                isPublished: true,
            },
            select: {
                teacherId: true,
            }
        });

        const chapter = await db.chapter.findUnique({
            where: {
                id: chapterId,
                isPublished: true,
            },
        });

        const quiz = await db.quiz.findUnique({
            where: {
                id: quizId,
                isPublished: true,
            },
        });

        const questions = await db.question.findMany({
            where: {
                quizId: quizId,
            },
            include: {
                answers: true,
            },
        });

        return {
            chapter,
            course,
            questions,
            quiz,
        };
    } catch (err) {
        console.log("[GET_QUIZ]", err);
        return {
            chapter: null,
            course: null,
            quiz: null,
            questions: null,
        };
    }
};
