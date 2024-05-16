"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";


import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {  Loader2, PlusCircle } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import { Question, Quiz} from "@prisma/client";
import { Input } from "@/components/ui/input";
import { ChapterQuizList } from "./quiz-question-list";

interface  QuizQuestionsFormProps {
    initialData:   Quiz & { questions: Question[]};
    teacherId: string;
    courseId: string;
    chapterId: string;
    quizId: string;
};

const fromSchema = z.object({
   text: z.string().min(1),
});

export  const  QuizQuestionsForm = ({
    initialData,
    teacherId,
    courseId,
    chapterId,
    quizId,
}:  QuizQuestionsFormProps) => {
    const [isCreating, setIsCreating] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);

    const toggleCreating = () => {
        setIsCreating((current) => !current);
    }

    const router = useRouter();

    const form = useForm<z.infer<typeof fromSchema>>({
        resolver: zodResolver(fromSchema),
        defaultValues: {
            text: "",
        },
    });

    const {isSubmitting, isValid} = form.formState;

    const onSubmit = async (values: z.infer<typeof fromSchema>) =>{
        try{
            await axios.post(`/api/teachers/${teacherId}/courses/${courseId}/chapters/${chapterId}/quizzes/${quizId}/questions`, values);
            toast.success("Quiz created");
            toggleCreating();
            router.refresh();
        }catch {
            toast.error("Something went wrong");
        }
    }

    const onReorder = async (updateData: {id: string; position : number}[]) => {
        try{
            setIsUpdating(true);

            await axios.put(`/api/teachers/${teacherId}/courses/${courseId}/chapters/${chapterId}/quizzes/reorder`, {
                list: updateData
            });
            toast.success("Quiz Reordered");
            router.refresh();

        } catch {
            toast.error("Something went wrong");
        } finally {
            setIsUpdating(false);
        }
    }

    const onEdit = (id: string) => {
        router.push(`/teachers/${teacherId}/courses/${courseId}/chapters/${chapterId}/quizzes/${quizId}/questions/${id}`);
    }

    return (
        <div className="relative mt-6 border bg-slate-100 rounded-md p-4">
            {isUpdating && (
                <div className="absolute h-full w-full bg-slate-500/20 top-0 right-0 rounded-md flex items-center justify-center">
                    <Loader2 className="animate-spin h-6 w-6 text-sky-700"/>
                </div>
            )}
            <div className="font-medium flex items-center justify-between">
                  Quiz Questions
               <Button onClick={toggleCreating} variant="ghost">
                {isCreating && (
                    <>Cancel</>
                )}
                {!isCreating &&(
                    <>
                     <PlusCircle className="h-4 w-4 mr-2"/>
                        Add a Question
                    </>
                )}
               </Button>
            </div>
            {isCreating&& (
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4 mt-4"
                    >
                        <FormField
                            control={form.control}
                            name="text"
                            render={({field}) =>(
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            disabled={isSubmitting}
                                            placeholder="e.g.' question of the quiz '"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                      <Button
                        disabled= {!isValid || isSubmitting}
                        type="submit"
                      >
                         Create
                      </Button>
                    </form>
                </Form>
            )}
            {!isCreating && (
                <div className={cn(
                    "text-sm mt-2",
                    !initialData.questions.length && "text-slate-500 italic"
                )}>
                    {!initialData.questions.length && "No Questions"}
                   <ChapterQuizList 
                        onEdit ={onEdit}
                        items = {initialData.questions || []}
                   />
                </div>
            )}
            {!isCreating && (
                <p className="text-xs text-muted-foreground mt-4">
                    Drag and drop to reorder the Questions
                </p>
            )}
        </div>
    )
}
