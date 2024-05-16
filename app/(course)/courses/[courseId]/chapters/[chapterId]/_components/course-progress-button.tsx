"use client";

import { Button } from "@/components/ui/button";
import { useConfettiStore } from "@/hooks/use-confetti-store";
import axios from "axios";
import { CheckCircle, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface CourseProgessButtonProps {
    chapterId: string;
    teacherId: string;
    courseId: string;
    isCompleted?: boolean;
    nextChapterId?: string;
}
const CourseProgessButton = ({
    chapterId,
    teacherId,
    courseId, 
    isCompleted, 
    nextChapterId,
}: CourseProgessButtonProps) => {
    const router = useRouter();
    const confetti = useConfettiStore();
    const [isLoading, setIsLoading] = useState(false);

    const onClick = async () => {
        try {
            setIsLoading(true);

            await axios.put(`/api/teachers/${teacherId}/courses/${courseId}/chapters/${chapterId}/progress`, {
                isCompleted: !isCompleted,
            });

            if (!isCompleted && !nextChapterId) {
                confetti.onOpen();
            }

            if (!isCompleted && nextChapterId) {
                router.push(`/courses/${courseId}/chapters/${nextChapterId}`)
            }

            toast.success("progress updated");
            router.refresh();

        }catch {
            toast.error("something went wrong");
        }finally {
            setIsLoading(false)
        }
    }

    const Icon = isCompleted ? XCircle: CheckCircle;

    return ( 
        <Button 
            onClick={onClick}
            disabled={isLoading}
            type="button"
            variant={isCompleted ? "outline" : "success"}
            className="w-ful md:w-auto"
        >
            {isCompleted ? "Not completed" : "Mark as complete"}
            <Icon className="h-4 w-4 ml-2"/>
        </Button>
     );
}
 
export default CourseProgessButton;