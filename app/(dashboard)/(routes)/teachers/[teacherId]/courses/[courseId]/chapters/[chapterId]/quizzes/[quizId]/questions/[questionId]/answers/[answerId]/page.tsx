import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";
import { AnswerAccessForm } from "./_components/answer-access-form";
import { AnswertitleForm } from "./_components/answer-title-form";
import { AnswerActions } from "./_components/answer-actions";

const QuestionPage = async ({
    params
}: {
    params: {teacherId: string, courseId: string; chapterId: string; quizId: string; questionId: string; answerId: string}
}) => {

    const {userId} = auth();

    if (!userId){
        return redirect('/');
    }

    const answer = await  db.answer.findUnique({
        where: {
            id: params.answerId,
        },
    });

    if (!answer) {
        return redirect('/');
    }

    const requieredFields = [
        answer.text,
        answer.isCorrect,
    ]

    const totalFields = requieredFields.length;
    const compltedFields = requieredFields.filter(Boolean).length;

    const completionText = `(${compltedFields}/${totalFields})`;

    const isComplete = requieredFields.every(Boolean);

    

    return ( 
        <div className="p-6 lg:px-12">
           <div className=" flex  items-center justify-between">
                <div className="w-full">
                        <Link
                            href={`/teachers/${params.teacherId}/courses/${params.courseId}/chapters/${params.chapterId}/quizzes/${params.quizId}/questions/${params.questionId}`}
                            className="flex items-center text-sm hover:opacity-75 transition mb-6"
                        >
                            <ArrowLeft className="h-4 w-4 mr-2"/>
                            Back to  Quiz Setup
                        </Link>
        
                    <div className="flex items-center justify-between w-full">
                        <div className="flex flex-col gap-y-2">
                            <h1 className="text-2xl font-medium">
                                    Question Creation
                                </h1>
                                <span className="text-sm text-slate-700">
                                    Complete all fields {completionText}
                                </span>
                       </div> 
                       <AnswerActions
                            disabled={!isComplete}
                            teacherId={params.teacherId}
                            courseId={params.courseId}
                            chapterId={params.chapterId}
                            quizId={params.quizId}
                            questionId={params.questionId}
                            answerId={params.answerId}
                        />    
                    </div>  
                </div>   
           </div>
           <div>
           <AnswertitleForm
                    initialData={answer}
                    teacherId={params.teacherId}
                    courseId={params.courseId}
                    chapterId={params.chapterId}
                    quizId={params.quizId}
                    questionId={params.questionId}
                    answerId={params.answerId}
                />
           <AnswerAccessForm
                        initialData={answer}
                        teacherId={params.teacherId}
                        courseId={params.courseId}
                        chapterId={params.chapterId}
                        quizId={params.quizId}
                        questionId={params.questionId}
                        answerId={params.answerId}
                    />
           </div>
        </div>
     );
}
 
export default QuestionPage;