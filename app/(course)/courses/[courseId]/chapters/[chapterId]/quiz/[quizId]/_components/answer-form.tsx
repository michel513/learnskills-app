import { cn } from "@/lib/utils";

import { CardAnswer } from "./card-form";
import { Answer } from "@prisma/client";

type Props = {
  answers: Answer[];
  onSelect: (id: string) => void;
  selectAnswer?: string;
  disabled?: boolean;
};

export const AnswersForm = ({
  answers,
  onSelect,
  selectAnswer,
  disabled,
}: Props) => {


  return (
    <div className={cn(
      "grid gap-5",
      )}>
      {answers.map((answer, i) => (
        <CardAnswer
          key={answer.id}
          id={answer.id}
          text={answer.text}
          selected={selectAnswer === answer.id}
          onClick={() => onSelect(answer.id)}
          disabled={disabled}
        />
      ))}
    </div>
  );
};
