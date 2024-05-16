import { useKey, useMedia } from "react-use";
import { CheckCircle, XCircle } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type Props = {
  onCheck: () => void;
  disabled?: boolean;
  status: "Next" | "Finish";
};

export const Footer = ({
  onCheck,
  disabled,
  status
}: Props) => {
  useKey("Enter", onCheck, {}, [onCheck]);
  const isMobile = useMedia("(max-width: 1024px)");
  
  return (
    <footer className={cn(
      "lg:-h[140px] h-[100px] border-t-2",
     
    )}>
      <div className=" h-full mx-auto flex items-center justify-between px-6 lg:px-10">
          <div className="text-gray-500 font-bold text-base lg:text-xl flex items-center">
            <CheckCircle className="h-4 w-4 lg:h-5 lg:w-5 mr-4" />
             
            {status === "Finish" && "Quiz finished"}
            {status === "Next" && "next question"} 
          </div>  
          
        <Button
          disabled={disabled}
          className="ml-auto"
          onClick={onCheck}
          size={isMobile ? "sm" : "lg"}
          variant={"default"}  
        >
          {status === "Finish" && "finish"}
          {status === "Next" && "Continue"}
        
        </Button>
      </div>
    </footer>
  );
};
