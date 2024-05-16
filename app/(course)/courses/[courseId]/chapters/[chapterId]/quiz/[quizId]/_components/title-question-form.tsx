"use client";

import { Answer, Question } from "@prisma/client";
import { useState, useTransition } from "react";
import { AnswersForm } from "./answer-form";
import { Footer } from "./footer-form";
import axios from "axios";
import { getQuestion } from "@/actions/get-question";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { upsertQuizQuestionProgress } from "@/actions/quiz-progress";
import { ResultCard } from "./result-card-answer";
import  Image  from "next/image";
import finish from "../../../../../../../../../public/images/finish.svg";

type TitleQuestionFormProps = {
    questions: (Question & {
         answers: Answer[]
         }
    )[];
    quizId: string;
    userId: string;
    initialPercentage: number;
    teacherId: string;
    courseId: string;
    chapterId: string;
  };

const TitleQuestionForm =  ({
    teacherId,
    questions,
    userId,
    quizId,
    initialPercentage,
    courseId,
    chapterId
}: TitleQuestionFormProps) => {

     const router = useRouter();
    const [activeIndex, setActiveIndex] = useState(() => {
        const unCompletedIndex = questions.findIndex((question) => !question);
        return unCompletedIndex === -1 ? 0 : unCompletedIndex;
    });

    const question = questions[activeIndex];
    const answers = question?.answers ?? [];

    const isCorrectAnswer = answers.find((answer) => answer.isCorrect === true);
    const isCorrect = isCorrectAnswer?.isCorrect ?? false;

    const title = question?.text ?? "undefined";


    const [selectedAnswer, setSelectedAnswer] = useState<string | undefined>();
    const [pending, startTransition] = useTransition();
    const [percentage, setPercentage] = useState(() => {
        return initialPercentage === 100 ? 0 : initialPercentage;
      });

    const onNext = async () => {
        setActiveIndex((current) => current + 1);

        const {
          QuestionProgress,
      } = await getQuestion({
          userId,
          quizId: quizId,
          questionId: question.id,
      });

      
    const completeOnEnd = !QuestionProgress?.isCompleted;
        
        if(completeOnEnd) {
          await axios.put(`/api/teachers/${teacherId}/courses/${courseId}/chapters/${chapterId}/quizzes/${quizId}/questions/${question.id}/progress`, {
            isCompleted: true,
        });
        
        router.refresh();
        }
      };
    

    const onSelect = (id: string) => {    
        setSelectedAnswer(id);
    };

      const onContinue = () => {
        if (!selectedAnswer) return;
    
        if (!isCorrectAnswer) {
          setSelectedAnswer(undefined);
          return;
        }
    
        if ( isCorrectAnswer) {
          onNext();
          setSelectedAnswer(undefined);
          return;
        }
    
        const correctAnswer = answers.find((answer) => answer.isCorrect === true);
    
        if (!correctAnswer) {
          return;
        }
    
        if (correctAnswer && correctAnswer.id === selectedAnswer) {
          console.log("correct answer selected");
           startTransition(() => {
             upsertQuizQuestionProgress(
                 question.id,
                 ).then((response) => {
                 
                 setPercentage((prev) => prev + 100 / questions.length);
    
               
              }).catch(() => toast.error("Something went wrong. Please try again."))
           });
        } 
      };

      if (!question) {
        return (
          <>
            <div className="flex flex-col pb-10 gap-y-8 lg:gap-y-8 max-w-lg mx-auto text-center items-center justify-center h-full">
              <Image
                src={finish}
                alt="Finish"
                className="hidden lg:block"
                height={100}
                width={100}
              />
              
              <h1 className="text-xl lg:text-3xl font-bold text-neutral-700">
                Great job! <br /> You&apos;ve completed the Quiz.
              </h1>
              <div className="flex items-center gap-x-4 w-full">
                <ResultCard
                  variant="points"
                  value={questions.length * 10}
                />
              </div>
            </div>
            <Footer
              status="Finish"
              onCheck={() => router.push(`/courses/${courseId}/chapters/${chapterId}`)}
            />
          </>
        );
      }    

    return (
        <>
            <div className=" flex items-center justify-center ">
                <div className="min-h-[500px] pt-28  lg:w-[600px] w-full px-6 lg: flex flex-col ">
                     <h1 className="text-lg pb-5 lg:text-1xl text-center lg:text-start font-bold text-neutral-700">
                        {title}
                    </h1>  
                    <div>
                        <AnswersForm
                            answers={answers}
                            onSelect={onSelect}
                            selectAnswer={selectedAnswer}
                            disabled={pending}
                        />
                    </div>
                </div>
            </div>
            <Footer
            status="Next"
                disabled={pending || !selectedAnswer}
                onCheck={onContinue}
            />
        </>
      );
}
 
export default TitleQuestionForm;