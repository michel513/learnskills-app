"use client";

import { Answer} from "@prisma/client";
import { useEffect, useState } from "react";
import {
    DragDropContext,
    Droppable,
    Draggable,
    DropResult,
} from "@hello-pangea/dnd";

import { cn } from "@/lib/utils";
import { Grip, Pencil } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ChaptersListProps {
    items: Answer[];
    onEdit: (id: string) => void;
}

export const QuestionAnswerList = ({
    items,
    onEdit
}:ChaptersListProps) => {
    const [isMounted, setIsMounted] = useState(false);
    const [Answers, setAnswers] = useState(items);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        setAnswers(items)
    },[items])

    const onDragEnd = (result: DropResult) =>{
        if(!result.destination) return;

        const items = Array.from(Answers);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        const startIndex = Math.min(result.source.index, result.destination.index);
        const endIndex = Math.max(result.source.index, result.destination.index);

        const updatedQuestions = items.slice(startIndex, endIndex + 1);

        setAnswers(items);

        const bulkUpdateData = updatedQuestions.map((question) => ({
            id: question.id,
            position: items.findIndex((item) => item.id === question.id)
        }));

    }

    if (!isMounted) {
        return null;
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="chapters">
                {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                        {Answers.map((answer, index) =>(
                            <Draggable 
                                key={answer.id} 
                                draggableId={answer.id} 
                                index={index}
                            >
                                {(provided)  => (
                                    <div
                                        className={cn(
                                            "flex items-center gap-x-2 bg-slate-200 border-slate-200 border text-slate-700 rounded-md mb-4 text-sm",
                                            answer.isCorrect && "bg-sky-100 border-sky-200 text-sky-700"
                                        )}
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                    >
                                        <div
                                            className={cn(
                                                "px-2 py-3 border-r border-r-slate-200 hover:bg-slate-300 rounded-l-md transition",
                                                answer.isCorrect && "border-r-sky-200 hover:bg-sky-200"
                                            )}
                                            {...provided.dragHandleProps}
                                        >
                                            <Grip
                                                className="h-5 w-5"
                                            />
                                        </div>
                                        {answer.text}
                                        <div className="ml-auto pr-2 flex items-center gap-x-2">
                                        <Badge
                                                className={cn(
                                                    "bg-slate-500",
                                                    answer.isCorrect && "bg-sky-700"
                                                )}
                                            >
                                                {answer.isCorrect ? "is Correct " : " is not Correct "}
                                            </Badge>
                                            <Pencil
                                                onClick={() => onEdit(answer.id)}
                                                className="w-4 h-4 cursor-pointer hover:opacity-75 transition"
                                            />
                                        </div>
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    )
}