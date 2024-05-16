"use client";

import { ConfirmModal } from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import { useConfettiStore } from "@/hooks/use-confetti-store";
import axios from "axios";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface ActionsProps {
    disabled: boolean;
    courseId: string;
    isPublished: boolean;
    teacherId: string;
}

export const Actions = ({
    disabled,
    courseId,
    isPublished,
    teacherId
}: ActionsProps) => {
    const router = useRouter();
    const confetti = useConfettiStore();
    const [isloading, setIsLoading] = useState(false);

    const onClick = async () => {
        try {
            
            if (isPublished) {
                await axios.patch(`/api/teachers/${teacherId}/courses/${courseId}/unpublish`);
                toast.success("Course unpublished");
            } else {
                await axios.patch(`/api/teachers/${teacherId}/courses/${courseId}/publish`);
                toast.success("Course published");
                confetti.onOpen();
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

            await axios.delete(`/api/teachers/${teacherId}/courses/${courseId}`);
            toast.success("Course deleted successfully");
            
            router.refresh();
            router.push(`/teachers/${teacherId}/courses`);

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