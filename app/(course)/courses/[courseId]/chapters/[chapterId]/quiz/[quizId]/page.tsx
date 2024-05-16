import { getQuiz } from "@/actions/get-quiz";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Header } from "./_components/header-form";
import TitleQuestionForm from "./_components/title-question-form";
import { getQuizQuestionProgress } from "@/actions/get-quiz-question-progress";

const QuizPage = async ({
    params
}: {
    params: {courseId: string; chapterId: string; quizId: string}
}) => {
    const {userId} = auth();

    if (!userId) {
        return redirect("/");
    }

    const {
        quiz,
        chapter,
        course,
        questions,
    } = await getQuiz({
        userId,
        chapterId: params.chapterId,
        courseId: params.courseId,
        quizId: params.quizId
    });

    if (!chapter || !course || !quiz ) {
        return redirect("/");
    }

    const initialPercentage = questions.filter((question) => question.text).length / questions.length * 100;


    return (
        <div>
           <Header  
            userId={userId}
            quizId={params.quizId}
            />
            <div className="flex-1">
                <TitleQuestionForm
                    userId={userId}
                    quizId={params.quizId}
                    teacherId={course.teacherId!}
                    questions={questions} 
                    initialPercentage={initialPercentage} 
                    courseId={params.courseId}
                    chapterId={params.chapterId}

                  />
            </div>
        </div>
    );
}

export default QuizPage;
