import { InfinityIcon, X } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { getQuizQuestionProgress } from "@/actions/get-quiz-question-progress";

type HeaderProps = {
  userId: string,
  quizId: string;
};

export const Header = async ({
  userId,
  quizId
}: HeaderProps) => {

  const progressQuizQuestionCount = await getQuizQuestionProgress(userId, quizId);

  return (
    <header className="lg:pt-[50px] pt-[20px] px-10 flex gap-x-7 items-center justify-between max-w-[1140px] mx-auto w-full">
      <X
        
        className="text-slate-500 hover:opacity-75 transition cursor-pointer"
      />
      <Progress value={progressQuizQuestionCount} />
      <div className="text-slate-700 flex items-center font-bold">
        
        {progressQuizQuestionCount == null
          ? <InfinityIcon className="h-6 w-6 stroke-[3] shrink-0" />
          : progressQuizQuestionCount
        }
      </div>
    </header>
  );
};
