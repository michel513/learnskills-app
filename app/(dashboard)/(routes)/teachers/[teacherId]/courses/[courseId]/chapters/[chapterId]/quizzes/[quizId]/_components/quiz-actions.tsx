"use client";

import { ConfirmModal } from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface ChapterActionsProps {
    disabled: boolean;
    teacherId: string;
    courseId: string;
    chapterId: string;
    quizId: string;
    isPublished: boolean;
}

export const ChapterActions = ({
    disabled,
    teacherId,
    courseId,
    chapterId,
    quizId,
    isPublished
}: ChapterActionsProps) => {
    const router = useRouter();
    const [isloading, setIsLoading] = useState(false);

    const onClick = async () => {
        try {
            if (isPublished) {
                await axios.patch(`/api/teachers/${teacherId}/courses/${courseId}/chapters/${chapterId}/quizzes/${quizId}/unpublish`);
                toast.success("quiz unpublished");
            } else {
                await axios.patch(`/api/teachers/${teacherId}/courses/${courseId}/chapters/${chapterId}/quizzes/${quizId}/publish`);
                toast.success("quiz published");
            }

            router.refresh();

        } catch {
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    }
    
    
    const onDelete = async () => {
        try{
            setIsLoading(true);

            await axios.delete(`/api/teachers/${teacherId}/courses/${courseId}/chapters/${chapterId}/quizzes/${quizId}`);
            toast.success("quiz deleted successfully");
            router.refresh();
            router.push(`/teachers/${teacherId}/courses/${courseId}/chapters/${chapterId}`);

        }catch {
            toast.error("something went wrong");
        } finally{
            setIsLoading(false);
        }
    }

    return (
        <div className="flex items-center gap-x-2">
            <Button
                onClick={onClick}
                disabled= {disabled || isloading}
                variant="outline"
                size="sm"
            >
                {isPublished ? "Unpublished" : "Publish"}
            </Button>
            <ConfirmModal onConfirm={onDelete}>
                <Button size="sm" disabled={isloading}>
                    <Trash className="h-4 w-4"/>
                </Button>
            </ConfirmModal>
        </div>
    )
}