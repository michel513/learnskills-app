"use client";

import { ConfirmModal } from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface QuestionActionsProps {
    disabled: boolean;
    teacherId: string;
    courseId: string;
    chapterId: string;
    quizId: string;
    questionId: string;
}

export const QuestionActions = ({
    disabled,
    teacherId,
    courseId,
    chapterId,
    quizId,
    questionId,
}: QuestionActionsProps) => {
    const router = useRouter();
    const [isloading, setIsLoading] = useState(false);    
    
    const onDelete = async () => {
        try{
            setIsLoading(true);

            await axios.delete(`/api/teachers/${teacherId}/courses/${courseId}/chapters/${chapterId}/quizzes/${quizId}/questions/${questionId}`);
            toast.success("quiz deleted successfully");
            router.refresh();
            router.push(`/teachers/${teacherId}/courses/${courseId}/chapters/${chapterId}/quizzes/${quizId}`);

        }catch {
            toast.error("something went wrong");
        } finally{
            setIsLoading(false);
        }
    }

    return (
        <div className="flex items-center gap-x-2">
            <ConfirmModal onConfirm={onDelete}>
                <Button size="sm" disabled={isloading}>
                    <Trash className="h-4 w-4"/>
                </Button>
            </ConfirmModal>
        </div>
    )
}