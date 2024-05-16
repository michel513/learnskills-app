import { Category, Course } from "@prisma/client";
import CourseDetails from "./course-details";


interface CoursesListProps {
    id: string;
    Description: string;
    title: string;
    chaptersLength: number;
    category: string,
    price: number;
}

export const ChaptersList = ({
    id,
    title,
    Description,
    chaptersLength,
    category,
    price,
}: CoursesListProps) => {
    return (
        <div className="pb-4">
            <div >
                <CourseDetails
                    id={id}
                    title={title}
                    chaptersLength={chaptersLength}
                    Description={Description}
                    price={price}
                    category={category}/>
            </div>
        </div>
    )
}