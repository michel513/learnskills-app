import { db } from "@/lib/db";
import { Attachment, Chapter, MuxData } from "@prisma/client";

interface GetChapterProps {
    userId: string;
    courseId: string;
    chapterId: string;
}

export const getChapter = async ({
    userId,
    courseId,
    chapterId,
}: GetChapterProps) => {
    try {
        
        const course = await db.course.findUnique({
            where: {
                isPublished : true,
                id: courseId,
            }
        });

        const firstFreeChapter = await db.chapter.findFirst({
            where: {
                courseId: courseId,
                isPublished: true,
                isFree: true,
            },
            orderBy: {
                position: "asc",
            },
        });

        if (!firstFreeChapter) {
            throw new Error("Chapter not found");
        }

        const muxData = await db.muxData.findUnique({
            where: {
                chapterId: firstFreeChapter.id,
            },
        });

        const attachments = await db.attachment.findMany({
            where: {
                courseId: courseId,
            },
        });

        const chapters = await db.chapter.count({
            where: {
                courseId: courseId,
                isPublished: true,
            }
        })

        return {
            chapter: firstFreeChapter,
            muxData,
            course,
            chapters,
        };
    } catch (err) {
        console.log("[GET_CHAPTER]", err);
        return {
            chapter: null,
            muxData: null,
            course: null,
            chapters: null,
        };
    }
};
