import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const upsertQuizQuestionProgress = async (
    questionId: string,
): Promise<number | void> => {
    try {

        const { userId } = await auth();

        if (!userId) {
            throw new Error("Unauthorized"); 
        }

       const question = await db.question.findFirst({
            where: {
                id: questionId,
            }
        });

        if (!question) {
            throw new Error("question not found");
        
        }

        const quizid  = question.quizId;

        const quiz = await db.quiz.findUnique({
            where: {
                id: quizid,
            }
        })

        const chapterId = quiz?.chapterId;

        const chapter = await db.chapter.findUnique({
            where: {
                id: chapterId,
            }
        });

        const courseId = chapter?.courseId;

        const existingQuestionProgress = await db.questionProgress.findFirst({
            where: {
                userId: userId,
                questionId: questionId
            }
        });

        const isPratice = !!existingQuestionProgress;

        if(isPratice) {
            await db.questionProgress.update({
                data: {
                    isCompleted: true,
                },
                where: {
                    id: existingQuestionProgress.questionId,
                }
            });

            return redirect(`/courses/${courseId}/chapters/${chapterId}`);
        }
        
        return console.log("isPratice is false !!!"); 
        
    } catch (e) {
        console.log("[GET_QUIZ_PROGRESS]", e);
        return 0;
    }
}
