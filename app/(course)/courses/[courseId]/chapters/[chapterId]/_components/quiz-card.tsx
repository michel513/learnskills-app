"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { redirect } from "next/navigation";

interface QuizCardProps  {
    courseId: string;
    chapterId: string;
    quizId: string;
    index: number,
}

const QuizCard = ({
    courseId,
    chapterId,
    quizId,
    index,
}: QuizCardProps) => {

    return ( 
    
              <Link
              href={`/courses/${courseId}/chapters/${chapterId}/quiz/${quizId}`}
        
                className='w-full md:w-auto rounded-md  bg-sky-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sky-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400'
                >
                    <p className="text-center">
                       Complete the quiz chapter {index}
                   </p>
             </Link>
     );
}
 
export default QuizCard;