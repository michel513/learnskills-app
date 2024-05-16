import { db } from "@/lib/db";

export const getQuizQuestionProgress = async (
    userId: string,
    quizId: string,
): Promise<number> => {

    try{
            const publischedQuiz = await db.question.findMany({
                where: {
                    quizId: quizId,
                },
                select: {
                    id: true,
                }
            });

            const publischedQuestionsIds = publischedQuiz.map((question)=> question.id);

            const valideCompletedQuestions = await db.questionProgress.count({
                where: {
                    userId: userId,
                    questionId: {
                        in: publischedQuestionsIds,
                    },
                    isCompleted: true,
                }
            });
            
            const progressPercentage = Math.floor((valideCompletedQuestions / publischedQuestionsIds.length) * 100);

            return progressPercentage;

    }catch (err) {
        console.log("[GET_QUIZ_QUESTION_PROGRESS]",err);
        return 0;
    }

}