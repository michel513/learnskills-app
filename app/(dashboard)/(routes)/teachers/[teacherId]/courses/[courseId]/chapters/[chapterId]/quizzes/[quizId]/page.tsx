import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import {
    Box,
    Button,
    Center,
    Container,
    Divider,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    IconButton,
    Input,
    SimpleGrid,
    Text,
    Textarea,
  } from '@chakra-ui/react';

import { Field, FieldArray, Form, Formik, getIn } from 'formik';
import Link from "next/link";
import { ArrowLeft,  LayoutDashboardIcon, MessageCircleQuestionIcon } from "lucide-react";
import { IconBadge } from "@/components/icon-badge";
import { QuiztitleForm } from "./_components/quiz-title-form";
import { QuizDescriptionForm } from "./_components/quiz-description-form";
import { QuizQuestionsForm } from "./_components/quiz-question-form";
import { Banner } from "@/components/banner";
import { ChapterActions } from "./_components/quiz-actions";

const QuizIdPge = async ({
    params
}: {
    params: {teacherId: string; courseId: string; chapterId: string; quizId: string}
}) => {

    const {userId} = auth();

    if (!userId){
        return redirect('/');
    }

    const quiz = await db.quiz.findUnique({
        where: {
            id: params.quizId,
            chapterId: params.chapterId,
        },
        include: {
            questions: {
                include: {
                    answers: true, 
                },
            },
        },
    });

    if(!quiz) {
        return redirect('/');
    }

    const requieredFields = [
        quiz.title,
        quiz.description,
        quiz.questions.some(question => question.text && question.answers)
    ];

    const totalFields = requieredFields.length;
    const compltedFields = requieredFields.filter(Boolean).length;

    const completionText = `(${compltedFields}/${totalFields})`;

    const isComplete = requieredFields.every(Boolean);

    return ( 
       <>
         {!quiz.isPublished && (
            <Banner
                variant="warning"
                label="This Quiz is unpublished . It will not be visible in the chapter "
            />
        )}
        <div className="p-6 lg:px-12">
           <div className=" flex  items-center justify-between">
                <div className="w-full">
                    <Link
                        href={`/teachers/${params.teacherId}/courses/${params.courseId}/chapters/${params.chapterId}`}
                        className="flex items-center text-sm hover:opacity-75 transition mb-6"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2"/>
                        Back to  chapter Setup
                    </Link>
                    <div className="flex items-center justify-between w-full">
                        <div className="flex flex-col gap-y-2">
                            <h1 className="text-2xl font-medium">
                                Quiz Creation
                            </h1>
                            <span className="text-sm text-slate-700">
                                Complete all fields {completionText}
                            </span>
                        </div>
                        <ChapterActions
                            disabled={!isComplete}
                            teacherId={params.teacherId}
                            courseId={params.courseId}
                            chapterId={params.chapterId}
                            isPublished={quiz.isPublished}
                            quizId={params.quizId}
                        />
                   </div>
                </div>   
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
                <div className="space-y-4">
                    <div>
                        <div className="flex items-center gap-x-2">
                            <IconBadge icon={LayoutDashboardIcon}/>
                            <h2 className="text-xl">
                                Customize your Quiz
                            </h2>
                        </div>
                        <QuiztitleForm
                            initialData={quiz}
                            quizId={params.quizId}
                            chapterId={params.chapterId}
                            courseId={params.courseId}                            
                            teacherId={params.teacherId}
                        />
                        <QuizDescriptionForm
                            initialData={quiz}                            
                            teacherId={params.teacherId}
                            courseId={params.courseId}
                            chapterId={params.chapterId}
                            quizId={params.quizId}
                        />
                    </div>
                </div>
                    <div>
                        <div className="flex items-center gap-x-2">
                            <IconBadge icon={MessageCircleQuestionIcon}/>
                            <h2 className="text-xl">
                                Enter your question data 
                            </h2>
                            
                        </div>
                        <QuizQuestionsForm
                            initialData={quiz}                            
                            teacherId={params.teacherId}
                            courseId={params.courseId}
                            chapterId={params.chapterId}
                            quizId={params.quizId}
                        />
                   </div>
           </div>
        </div>
       </>
     );
}
 
export default QuizIdPge;