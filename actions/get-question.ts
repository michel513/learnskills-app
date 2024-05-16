import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";


interface GetQuestionProps {
  userId: string;
  questionId: string;
  quizId: string;
};

export const getQuestion = async ( {
  userId,
  questionId,
  quizId,
}: GetQuestionProps) => {

try{

  const {userId} = auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const quiz = await db.quiz.findUnique({
    where: {
      id: quizId,
    }
  })

  const QuestionProgress = await db.questionProgress.findUnique({
    where: {
        userId_questionId: {
            userId,
            questionId,
        }
    }
});

return {
  QuestionProgress,
}


}catch (err) {
  console.log("[GET_CHAPTER]",err);
  return {
      QuestionProgress: null,
  }
}

}