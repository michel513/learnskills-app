import Image from "next/image";
import { useCallback } from "react";

import { cn } from "@/lib/utils";


type Props = {
  id: string;
  text: string;
  selected?: boolean;
  onClick: () => void;
  disabled?: boolean;
};

export const CardAnswer = ({
  text,
  selected,
  onClick,
  disabled,
}: Props) => {

  const handleClick = useCallback(() => {
    if (disabled) return;

    onClick();
  }, [disabled, onClick]);

  return (
    <div
      onClick={handleClick} 
      className={cn(
        "h-full border-2 rounded-xl border-b-4 hover:bg-black/5 p-4 lg:p-6 cursor-pointer active:border-b-2",
        selected && "border-sky-300 bg-sky-100 hover:bg-sky-100",
        disabled && "pointer-events-none hover:bg-white",
        "lg:p-3 w-full"
      )}
    >
      <p className={cn(
          "text-neutral-600 text-sm lg:text-base",
          selected && "text-sky-500",
        )}>
          {text}
        </p>
    </div>
  );
};
