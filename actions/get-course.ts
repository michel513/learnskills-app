import { db } from "@/lib/db";
import { Attachment, Chapter } from "@prisma/client";

interface GetCourseProps {
    userId: string;
    courseId: string;
};

export const getCourse = async ( {
    userId,
    courseId,
}: GetCourseProps) => {
    try {

        const course = await db.course.findUnique({
            where: {
                isPublished : true,
                id: courseId,
            }
        });

        const chapters = await db.chapter.count({
            where:{
                courseId : courseId,
            }
        });

        if(!chapters || !course) {
            throw new Error("Chapter or course not found");
        }

        let muxDataPreview = null;

        if(course.isPublished) {
            muxDataPreview = await db.muxPreview.findUnique({
                where: {
                    courseId: courseId,
                }
            });

        }

        return {
            chapters,
            course,
            muxDataPreview,
        };

    } catch (err) {
        console.log("[GET_CHAPTER]",err);
        return {
            chapters: null,
            course: null,
            muxDataPreview: null,
        }
    }
}